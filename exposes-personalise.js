// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQTr4HGsOl-UWxb7WTYWkqxCiLYnGtT4Y",
  authDomain: "classepro-9bc37.firebaseapp.com",
  projectId: "classepro-9bc37",
  storageBucket: "classepro-9bc37.firebasestorage.app",
  messagingSenderId: "262239552918",
  appId: "1:262239552918:web:9030760c731b844c76c9b7",
  measurementId: "G-YCSFJY3R9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// URL de votre backend (à adapter selon votre déploiement)
const BACKEND_URL = "https://ton-backend.herokuapp.com"; // Remplace par ton URL de backend

// Références aux éléments du DOM
const form = document.getElementById('expose-request-form');
const nombreParticipantsInput = document.getElementById('nombre-participants');
const participantsContainer = document.getElementById('participants-container');
const addParticipantBtn = document.getElementById('add-participant');

// Éléments pour la sélection du moyen de notification
const notificationOptions = document.querySelectorAll('.notification-option');
const whatsappInputContainer = document.getElementById('whatsapp-input-container');
const gmailInputContainer = document.getElementById('gmail-input-container');
const whatsappNumberInput = document.getElementById('whatsapp-number');
const gmailAddressInput = document.getElementById('gmail-address');
const notificationTypeInput = document.getElementById('notification-type');

// Éléments de la modale de paiement
const paymentModal = document.getElementById('payment-modal');
const paymentEmail = document.getElementById('payment-email');
const paymentAmount = document.getElementById('payment-amount');
const paystackBtn = document.getElementById('paystack-btn');
const paymentStatus = document.getElementById('payment-status');
const closePaymentModal = document.getElementById('close-payment-modal');

// Variables pour stocker les données du formulaire
let formData = {};
let currentPaymentData = {};

// Fonction pour marquer une demande comme payée dans le localStorage
function markExposeAsPaid(exposeId) {
  const paidExposes = JSON.parse(localStorage.getItem('paidExposes')) || {};
  paidExposes[exposeId] = true;
  localStorage.setItem('paidExposes', JSON.stringify(paidExposes));
}

// Fonction pour vérifier si une demande a été payée
function isExposePaid(exposeId) {
  const paidExposes = JSON.parse(localStorage.getItem('paidExposes')) || {};
  return paidExposes[exposeId] === true;
}

// Gestion de la sélection du moyen de notification
function selectNotificationOption(selectedOption) {
  // Réinitialiser toutes les options
  notificationOptions.forEach(option => {
    option.classList.remove('selected');
  });
  
  // Marquer l'option sélectionnée
  selectedOption.classList.add('selected');
  
  // Masquer tous les champs d'entrée
  whatsappInputContainer.classList.remove('active');
  gmailInputContainer.classList.remove('active');
  
  // Afficher le champ d'entrée approprié
  const notificationType = selectedOption.dataset.type;
  notificationTypeInput.value = notificationType;
  
  if (notificationType === 'whatsapp') {
    whatsappInputContainer.classList.add('active');
    whatsappNumberInput.required = true;
    gmailAddressInput.required = false;
  } else if (notificationType === 'gmail') {
    gmailInputContainer.classList.add('active');
    gmailAddressInput.required = true;
    whatsappNumberInput.required = false;
  }
}

// Ajouter des écouteurs d'événements aux options de notification
notificationOptions.forEach(option => {
  option.addEventListener('click', () => {
    selectNotificationOption(option);
  });
});

// Gestion de l'ajout/suppression de participants
function updateParticipants() {
  const nombreParticipants = parseInt(nombreParticipantsInput.value) || 1;
  const currentParticipants = participantsContainer.querySelectorAll('.participant-item').length;
  
  // Ajouter des participants si nécessaire
  if (currentParticipants < nombreParticipants) {
    for (let i = currentParticipants; i < nombreParticipants; i++) {
      addParticipant(i + 1);
    }
  }
  // Supprimer des participants si nécessaire
  else if (currentParticipants > nombreParticipants) {
    for (let i = currentParticipants; i > nombreParticipants; i--) {
      participantsContainer.lastChild.remove();
    }
  }
  
  // Afficher/masquer les boutons de suppression
  const removeButtons = participantsContainer.querySelectorAll('.remove-participant');
  if (nombreParticipants > 1) {
    removeButtons.forEach(btn => btn.style.display = 'flex');
  } else {
    removeButtons.forEach(btn => btn.style.display = 'none');
  }
}

function addParticipant(index) {
  const participantItem = document.createElement('div');
  participantItem.className = 'participant-item';
  participantItem.innerHTML = `
    <input type="text" class="form-input participant-input" placeholder="Nom et prénom du participant ${index}" required>
    <button type="button" class="remove-participant" ${index === 1 ? 'style="display: none;"' : ''}>
      <i class="fas fa-times"></i>
    </button>
  `;
  participantsContainer.appendChild(participantItem);
  
  // Ajouter un écouteur d'événement au bouton de suppression
  const removeBtn = participantItem.querySelector('.remove-participant');
  removeBtn.addEventListener('click', function() {
    if (participantsContainer.querySelectorAll('.participant-item').length > 1) {
      participantItem.remove();
      nombreParticipantsInput.value = participantsContainer.querySelectorAll('.participant-item').length;
      updateParticipants();
    }
  });
}

// Événement pour ajouter un participant via le bouton
addParticipantBtn.addEventListener('click', function() {
  const currentCount = participantsContainer.querySelectorAll('.participant-item').length;
  if (currentCount < 10) {
    nombreParticipantsInput.value = currentCount + 1;
    updateParticipants();
  }
});

// Événement pour mettre à jour les participants quand le nombre change
nombreParticipantsInput.addEventListener('change', updateParticipants);

// Fonction pour initier le paiement avec callback_url dynamique
async function initierPaiement(email, montant, sourcePage, formData) {
  try {
    const response = await fetch(`${BACKEND_URL}/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        amount: montant,
        sourcePage: sourcePage,
        formData: formData,
        // Spécifier la page de retour explicite
        callback_url: window.location.origin + '/exposes-personalise.html?paid=true'
      }),
    });

    const data = await response.json();
    
    if (data.status && data.data.authorization_url) {
      // Stocker les données du formulaire dans le localStorage pour récupération après paiement
      localStorage.setItem('pendingExposeRequest', JSON.stringify(formData));
      
      // Sauvegarder l'ID temporaire pour référence
      localStorage.setItem('lastExposeRequestId', 'expose_perso_' + Date.now());
      
      // Rediriger vers l'URL de paiement Paystack
      window.location.href = data.data.authorization_url;
    } else {
      throw new Error(data.message || 'Erreur lors de la création du paiement');
    }
  } catch (error) {
    console.error('Erreur:', error);
    paymentStatus.textContent = "❌ Erreur: " + error.message;
    paymentStatus.className = "payment-status payment-error";
    paymentStatus.classList.remove('hidden');
  }
}

// Fonction pour enregistrer la demande dans Firestore
async function enregistrerDemandeFirestore(donnees) {
  try {
    const docRef = await addDoc(collection(db, "demandes_exposes_personnalises"), {
      ...donnees,
      statut: 'payé',
      montantPaye: 1000,
      datePaiement: serverTimestamp(),
      statutPaiement: 'succès',
      dateSoumission: serverTimestamp()
    });
    
    console.log("Demande d'exposé personnalisé enregistrée avec ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la demande: ", error);
    throw error;
  }
}

// Fonction pour afficher la confirmation avec SweetAlert2
function afficherConfirmationSucces() {
  Swal.fire({
    title: '✅ Demande envoyée avec succès !',
    text: 'Votre demande d\'exposé personnalisé a été reçue et sera traitée dans les plus brefs délais. Vous recevrez une confirmation par ' + (formData.notificationType === 'whatsapp' ? 'WhatsApp' : 'email') + ' sous peu.',
    icon: 'success',
    confirmButtonText: 'Retour aux exposés',
    confirmButtonColor: '#3D3B8E',
    background: '#F9F9F9',
    customClass: {
      popup: 'animated bounceIn'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // Rediriger vers la page des exposés
      window.location.href = 'exposes.html';
    }
  });
}

// Vérifier si un paiement vient d'être effectué
async function verifierPaiementRecent() {
  const urlParams = new URLSearchParams(window.location.search);
  const paid = urlParams.get('paid');
  
  if (paid === 'true') {
    // Récupérer les données du formulaire depuis le localStorage
    const pendingData = localStorage.getItem('pendingExposeRequest');
    
    if (pendingData) {
      try {
        const formData = JSON.parse(pendingData);
        
        // Afficher un indicateur de chargement
        Swal.fire({
          title: 'Traitement en cours...',
          text: 'Enregistrement de votre demande',
          icon: 'info',
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        
        // Enregistrer la demande dans Firestore
        const docId = await enregistrerDemandeFirestore(formData);
        
        // Marquer comme payé dans le localStorage
        markExposeAsPaid(docId);
        
        // Nettoyer le localStorage
        localStorage.removeItem('pendingExposeRequest');
        localStorage.removeItem('lastExposeRequestId');
        
        // Nettoyer l'URL et rediriger vers exposes-personalise.html
        window.history.replaceState({}, document.title, 'exposes-personalise.html');
        
        // Afficher la confirmation de succès
        Swal.close();
        afficherConfirmationSucces();
        
      } catch (error) {
        console.error("Erreur lors de l'enregistrement après paiement: ", error);
        Swal.fire({
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'enregistrement de votre demande. Veuillez nous contacter.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } else {
      // Si pas de données dans le localStorage mais paiement réussi
      Swal.fire({
        title: 'Paiement réussi !',
        text: 'Votre paiement a été traité avec succès.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.history.replaceState({}, document.title, 'exposes-personalise.html');
      });
    }
  }
}

// Ouvrir la modale de paiement
function openPaymentModal(formData) {
  currentPaymentData = formData;
  
  // Remplir les informations de la modale
  paymentEmail.value = formData.notificationType === 'gmail' ? formData.notificationValue : '';
  paymentAmount.textContent = '1000 FCFA';
  paymentStatus.textContent = '';
  paymentStatus.className = 'payment-status hidden';
  
  // Afficher la modale
  paymentModal.style.display = 'flex';
  
  // Focus sur le champ email
  setTimeout(() => {
    paymentEmail.focus();
  }, 300);
}

// Fermer la modale de paiement
function closeModal() {
  paymentModal.style.display = 'none';
  currentPaymentData = {};
}

// Soumission du formulaire
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Vérifier qu'un moyen de notification a été sélectionné
  if (!notificationTypeInput.value) {
    Swal.fire({
      title: 'Information manquante',
      text: 'Veuillez sélectionner un moyen de notification (WhatsApp ou Gmail)',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    return;
  }
  
  // Vérifier que le champ de notification approprié est rempli
  if (notificationTypeInput.value === 'whatsapp' && !whatsappNumberInput.value.trim()) {
    Swal.fire({
      title: 'Information manquante',
      text: 'Veuillez saisir votre numéro WhatsApp',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    return;
  }
  
  if (notificationTypeInput.value === 'gmail' && !gmailAddressInput.value.trim()) {
    Swal.fire({
      title: 'Information manquante',
      text: 'Veuillez saisir votre adresse Gmail',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    return;
  }
  
  // Récupérer les valeurs du formulaire
  const theme = document.getElementById('theme').value;
  const matiere = document.getElementById('matiere').value;
  const etablissement = document.getElementById('etablissement').value;
  const professeur = document.getElementById('professeur').value;
  const nombreParticipants = document.getElementById('nombre-participants').value;
  const groupe = document.getElementById('groupe').value;
  const niveau = document.getElementById('niveau').value;
  const instructions = document.getElementById('instructions').value;
  const dateRemise = document.getElementById('date-remise').value;
  const notificationType = notificationTypeInput.value;
  const notificationValue = notificationType === 'whatsapp' 
    ? whatsappNumberInput.value 
    : gmailAddressInput.value;
  
  // Récupérer les noms des participants
  const participants = [];
  const participantInputs = participantsContainer.querySelectorAll('.participant-input');
  participantInputs.forEach(input => {
    if (input.value.trim() !== '') {
      participants.push(input.value.trim());
    }
  });
  
  // Stocker les données du formulaire
  formData = {
    theme: theme,
    matiere: matiere,
    etablissement: etablissement,
    professeur: professeur,
    nombreParticipants: parseInt(nombreParticipants),
    participants: participants,
    groupe: groupe || 'Non spécifié',
    niveau: niveau,
    instructions: instructions || 'Aucune instruction supplémentaire',
    dateRemise: dateRemise || 'Non spécifiée',
    notificationType: notificationType,
    notificationValue: notificationValue,
    dateSoumission: serverTimestamp(),
    statut: 'En attente de paiement',
    montant: 1000
  };
  
  // Afficher la modale de paiement
  openPaymentModal(formData);
});

// Gestion du paiement Paystack
paystackBtn.addEventListener('click', async function() {
  const email = paymentEmail.value.trim();
  
  if (!email) {
    paymentStatus.textContent = "⚠️ Veuillez entrer un email valide.";
    paymentStatus.className = "payment-status payment-error";
    paymentStatus.classList.remove('hidden');
    return;
  }
  
  // Montant fixe pour un exposé personnalisé
  const amount = 1000 * 100; // 1000 FCFA en centimes
  
  // Déterminer la page source
  const sourcePage = "expose_personnalise";
  
  paymentStatus.textContent = "🔄 Redirection vers Paystack...";
  paymentStatus.className = "payment-status payment-processing";
  paymentStatus.classList.remove('hidden');
  
  // Appeler la fonction de paiement
  await initierPaiement(email, amount, sourcePage, formData);
});

// Gestion des événements de la modale de paiement
closePaymentModal.addEventListener('click', closeModal);

// Fermer la modale en cliquant à l'extérieur
paymentModal.addEventListener('click', (e) => {
  if (e.target === paymentModal) {
    closeModal();
  }
});

// Fermer la modale avec la touche Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && paymentModal.style.display === 'flex') {
    closeModal();
  }
});

// Gestion du menu hamburger pour mobile
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Animation des lignes du hamburger
      const spans = this.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        document.querySelectorAll('.menu-toggle span').forEach(span => {
          span.style.transform = 'none';
          span.style.opacity = '1';
        });
      }
    });
  }

  // Vérifier si un paiement vient d'être effectué
  verifierPaiementRecent();
  
  // Initialiser les participants
  updateParticipants();
});