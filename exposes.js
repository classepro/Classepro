// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";

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
const analytics = getAnalytics(app);
const db = getFirestore(app);

// URL de votre backend (à adapter selon votre déploiement)
const BACKEND_URL = "https://ton-backend.herokuapp.com"; // Remplace par ton URL de backend

// Références aux éléments du DOM
const exposesContainer = document.getElementById('exposes-container');
const loadingIndicator = document.getElementById('loading-indicator');
const emptyState = document.getElementById('empty-state');
const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');
const searchInput = document.getElementById('search-input');
const levelFilter = document.getElementById('level-filter');
const filterBtns = document.querySelectorAll('.filter-btn');

// Éléments de la modale de paiement
const paymentModal = document.getElementById('payment-modal');
const paymentEmail = document.getElementById('payment-email');
const paymentAmount = document.getElementById('payment-amount');
const paystackBtn = document.getElementById('paystack-btn');
const paymentStatus = document.getElementById('payment-status');
const closePaymentModal = document.getElementById('close-payment-modal');

// Variables pour la gestion des données
let allExposes = [];
let filteredExposes = [];
let currentPage = 1;
const exposesPerPage = 6;
let currentExposeId = null;
let currentExposePrice = 0;
let currentExposeTitle = "";

// Fonction pour vérifier si un paiement vient d'être effectué
function verifierPaiementRecent() {
  const urlParams = new URLSearchParams(window.location.search);
  const paid = urlParams.get('paid');
  
  if (paid === 'true') {
    // Afficher un message de succès
    showSuccessMessage('🎉 Paiement réussi ! Votre contenu est maintenant disponible.');
    
    // Optionnel: retirer le paramètre de l'URL sans recharger la page
    window.history.replaceState({}, document.title, window.location.pathname);
    
    // Recharger les exposés pour afficher le contenu débloqué
    loadExposes();
  }
}

// Fonction pour afficher un message de succès
function showSuccessMessage(message) {
  // Créer une notification toast
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Supprimer la notification après 3 secondes
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 3000);
}

// Fonction pour initier le paiement avec callback_url dynamique
async function initierPaiement(email, montant, sourcePage) {
  try {
    const response = await fetch(`${BACKEND_URL}/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        amount: montant,
        sourcePage: sourcePage
      }),
    });

    const data = await response.json();
    
    if (data.status && data.data.authorization_url) {
      // Rediriger vers l'URL de paiement Paystack
      window.location.href = data.data.authorization_url;
    } else {
      throw new Error(data.message || 'Erreur lors de la création du paiement');
    }
  } catch (error) {
    console.error('Erreur:', error);
    paymentStatus.textContent = "❌ Erreur: " + error.message;
    paymentStatus.className = "payment-status payment-error";
  }
}

// Charger les exposés depuis Firestore
async function loadExposes() {
  try {
    loadingIndicator.classList.remove('hidden');
    exposesContainer.innerHTML = '';
    emptyState.classList.add('hidden');
    
    const q = query(collection(db, "exposes"), orderBy("titre"));
    const querySnapshot = await getDocs(q);
    
    allExposes = [];
    querySnapshot.forEach((doc) => {
      const exposeData = doc.data();
      exposeData.id = doc.id;
      allExposes.push(exposeData);
    });
    
    // Appliquer les filtres initiaux
    applyFilters();
    
    loadingIndicator.classList.add('hidden');
  } catch (error) {
    console.error("Erreur lors du chargement des exposés:", error);
    loadingIndicator.innerHTML = '<p class="text-red-500">Erreur lors du chargement des exposés</p>';
  }
}

// Appliquer les filtres et la recherche
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = document.querySelector('.filter-btn.active').dataset.category;
  
  filteredExposes = allExposes.filter(expose => {
    const matchesSearch = expose.titre.toLowerCase().includes(searchTerm) || 
                         expose.description.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || expose.matiere === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  displayExposes();
}

// Vérifier si un exposé a été payé
function isExposePaid(exposeId) {
  const paidExposes = JSON.parse(localStorage.getItem('paidExposes')) || {};
  return paidExposes[exposeId] === true;
}

// Marquer un exposé comme payé
function markExposeAsPaid(exposeId) {
  const paidExposes = JSON.parse(localStorage.getItem('paidExposes')) || {};
  paidExposes[exposeId] = true;
  localStorage.setItem('paidExposes', JSON.stringify(paidExposes));
}

// Afficher les exposés avec pagination
function displayExposes() {
  exposesContainer.innerHTML = '';
  
  if (filteredExposes.length === 0) {
    emptyState.classList.remove('hidden');
    pagination.classList.add('hidden');
    return;
  }
  
  emptyState.classList.add('hidden');
  
  // Calculer les exposés à afficher pour la page actuelle
  const startIndex = (currentPage - 1) * exposesPerPage;
  const endIndex = startIndex + exposesPerPage;
  const exposesToShow = filteredExposes.slice(startIndex, endIndex);
  
  // Générer le HTML pour chaque exposé
  exposesToShow.forEach(expose => {
    const exposeCard = document.createElement('div');
    exposeCard.className = 'expose-card';
    
    // Image par défaut si aucune image n'est fournie
    const imageUrl = expose.imageUrl || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
    
    // Déterminer si l'exposé est gratuit ou payant
    const isFree = expose.prix === 0;
    const isPaid = isExposePaid(expose.id);
    
    // Déterminer si l'exposé est accessible (gratuit ou payé)
    const isAccessible = isFree || isPaid;
    
    // Générer le bouton d'action (téléchargement ou paiement)
    let actionButton = '';
    if (isAccessible) {
      actionButton = `<a href="${expose.downloadUrl}" target="_blank" class="expose-download">
        <i class="fas fa-download mr-2"></i>Télécharger
      </a>`;
    } else {
      actionButton = `<button class="payment-btn" onclick="openPaymentModal('${expose.id}', ${expose.prix}, '${expose.titre.replace(/'/g, "\\'")}')">
        <i class="fas fa-lock mr-1"></i>Accéder à l'exposé
        <span class="price-tag">${expose.prix} CFA</span>
      </button>`;
    }
    
    // Générer le bouton d'aperçu (uniquement pour les exposés accessibles avec previewUrl)
    let previewButton = '';
    if (isAccessible && expose.previewUrl) {
      previewButton = `<a href="${expose.previewUrl}" target="_blank" class="preview-btn" title="Voir l'exposé">
        <i class="fas fa-eye"></i> Voir l'exposé
      </a>`;
    }
    
    exposeCard.innerHTML = `
      <div class="expose-image" style="background-image: url('${imageUrl}')">
        ${previewButton}
        <span class="expose-category">${expose.matiere}</span>
      </div>
      <div class="expose-content">
        <h3 class="expose-title">${expose.titre}</h3>
        <p class="expose-description">${expose.description}</p>
        <div class="expose-meta">
          <span><i class="fas fa-clock mr-1"></i> ${expose.duree ? expose.duree + ' min' : 'Non spécifié'}</span>
          <span><i class="fas fa-slideshare mr-1"></i> ${expose.nombre_pages} pages</span>
        </div>
        <div class="expose-meta">
          <span><i class="fas fa-file-alt mr-1"></i> ${expose.type_document}</span>
          <span><i class="fas fa-money-bill-wave mr-1"></i> ${isFree ? 'Gratuit' : (isPaid ? 'Déjà payé' : expose.prix + ' CFA')}</span>
        </div>
        ${actionButton}
      </div>
    `;
    
    exposesContainer.appendChild(exposeCard);
  });
  
  // Mettre à jour la pagination
  updatePagination();
}

// Ouvrir la modale de paiement
window.openPaymentModal = function(exposeId, price, exposeTitle) {
  currentExposeId = exposeId;
  currentExposePrice = price;
  currentExposeTitle = exposeTitle;
  
  // Remplir les informations de la modale
  paymentEmail.value = localStorage.getItem('userEmail') || '';
  paymentAmount.textContent = `Montant: ${price} CFA - ${exposeTitle}`;
  paymentStatus.textContent = '';
  paymentStatus.className = 'payment-status';
  
  // Afficher la modale
  paymentModal.style.display = 'flex';
};

// Fermer la modale de paiement
function closeModal() {
  paymentModal.style.display = 'none';
  currentExposeId = null;
  currentExposePrice = 0;
  currentExposeTitle = "";
}

// Fonction pour initier le paiement avec redirection
async function initiatePayment() {
  const email = paymentEmail.value.trim();

  if (!email) {
    paymentStatus.textContent = "⚠️ Veuillez entrer un email valide.";
    paymentStatus.className = "payment-status payment-error";
    return;
  }

  localStorage.setItem('userEmail', email);
  
  // Déterminer la page source (pour exposes.html, c'est "exposes")
  const sourcePage = "exposes";
  
  paymentStatus.textContent = "🔄 Redirection vers Paystack...";
  paymentStatus.className = "payment-status";
  
  // Appeler la nouvelle fonction de paiement
  await initierPaiement(email, currentExposePrice, sourcePage);
}

// Mettre à jour la pagination
function updatePagination() {
  const totalPages = Math.ceil(filteredExposes.length / exposesPerPage);
  
  if (totalPages > 1) {
    pagination.classList.remove('hidden');
    pageInfo.textContent = `Page ${currentPage} sur ${totalPages}`;
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  } else {
    pagination.classList.add('hidden');
  }
}

// Gestion des événements
searchInput.addEventListener('input', () => {
  currentPage = 1;
  applyFilters();
});

levelFilter.addEventListener('change', applyFilters);

filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentPage = 1;
    applyFilters();
  });
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayExposes();
  }
});

nextBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(filteredExposes.length / exposesPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayExposes();
  }
});

// Gestion des événements de la modale de paiement
paystackBtn.addEventListener('click', initiatePayment);
closePaymentModal.addEventListener('click', closeModal);

// Fermer la modale en cliquant à l'extérieur
paymentModal.addEventListener('click', (e) => {
  if (e.target === paymentModal) {
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
  
  // Charger les exposés au chargement de la page
  loadExposes();
});