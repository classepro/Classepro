// Configuration Paystack
const publicKey = "pk_test_7b8c7b4c175d2a76f17dc3d449ff410d88dd5d89";
const BACKEND_URL = "https://test-pehc.onrender.com";

// Éléments de la modale de paiement
const paymentModal = document.getElementById('payment-modal');
const paymentEmail = document.getElementById('payment-email');
const forfaitTitleElement = document.getElementById('forfait-title');
const paymentAmount = document.getElementById('payment-amount');
const paystackBtn = document.getElementById('paystack-btn');
const paymentStatus = document.getElementById('payment-status');
const closePaymentModal = document.getElementById('close-payment-modal');

// Variables pour la gestion des données
let currentForfaitId = null;
let currentForfaitPrice = 0;
let currentForfaitTitle = '';

// Fonction pour vérifier si un paiement vient d'être effectué
function verifierPaiementRecent() {
  const urlParams = new URLSearchParams(window.location.search);
  const paid = urlParams.get('paid');
  
  if (paid === 'true') {
    showSuccessMessage('🎉 Paiement réussi ! Votre forfait est maintenant activé.');

    // Débloquer automatiquement le forfait payé
    const lastForfaitId = localStorage.getItem('lastForfaitId');
    if (lastForfaitId) {
      markForfaitAsPaid(lastForfaitId);
      localStorage.removeItem('lastForfaitId');
      updateForfaitButtons();
    }

    // Retirer le paramètre de l'URL sans recharger la page
    window.history.replaceState({}, document.title, window.location.pathname);
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
    paymentStatus.classList.remove('hidden');
  }
}

// Vérifier si un forfait a été payé
function isForfaitPaid(forfaitId) {
  const paidForfaits = JSON.parse(localStorage.getItem('paidForfaits')) || {};
  return paidForfaits[forfaitId] === true;
}

// Marquer un forfait comme payé
function markForfaitAsPaid(forfaitId) {
  const paidForfaits = JSON.parse(localStorage.getItem('paidForfaits')) || {};
  paidForfaits[forfaitId] = true;
  localStorage.setItem('paidForfaits', JSON.stringify(paidForfaits));
}

// Mettre à jour l'affichage des boutons selon le statut de paiement
function updateForfaitButtons() {
  // Forfait hebdomadaire
  if (isForfaitPaid('forfait_hebdo')) {
    const container = document.getElementById('forfait-hebdo-btn-container');
    container.innerHTML = `
      <a href="ia.html" class="pricing-btn" id="forfait-hebdo-btn">
        <i class="fas fa-robot mr-2"></i>Accéder à l'IA
      </a>
    `;
  }

  // Forfait mensuel
  if (isForfaitPaid('forfait_mensuel')) {
    const container = document.getElementById('forfait-mensuel-btn-container');
    container.innerHTML = `
      <a href="ia.html" class="pricing-btn" id="forfait-mensuel-btn">
        <i class="fas fa-robot mr-2"></i>Accéder à l'IA
      </a>
    `;
  }
}

// Ouvrir la modale de paiement
window.openPaymentModal = function(forfaitId, price, forfaitTitle) {
  currentForfaitId = forfaitId;
  currentForfaitPrice = price;
  currentForfaitTitle = forfaitTitle;
  
  // Sauvegarde temporaire du forfait en cours de paiement
  localStorage.setItem('lastForfaitId', forfaitId);
  
  // Remplir les informations de la modale
  paymentEmail.value = localStorage.getItem('userEmail') || '';
  forfaitTitleElement.textContent = forfaitTitle;
  paymentAmount.textContent = price + ' CFA';
  paymentStatus.textContent = '';
  paymentStatus.className = 'payment-status hidden';
  
  // Afficher la modale
  paymentModal.style.display = 'flex';
  
  // Focus sur le champ email
  setTimeout(() => {
    paymentEmail.focus();
  }, 300);
};

// Fermer la modale de paiement
function closeModal() {
  paymentModal.style.display = 'none';
  currentForfaitId = null;
  currentForfaitPrice = 0;
  currentForfaitTitle = '';
}

// Fonction pour initier le paiement avec redirection
async function initiatePayment() {
  const email = paymentEmail.value.trim();

  if (!email) {
    paymentStatus.textContent = "⚠️ Veuillez entrer un email valide.";
    paymentStatus.className = "payment-status payment-error";
    paymentStatus.classList.remove('hidden');
    return;
  }

  localStorage.setItem('userEmail', email);
  
  // Déterminer la page source (pour cette page, c'est "ia-professor")
  const sourcePage = "ia-professor";
  
  paymentStatus.textContent = "🔄 Redirection vers Paystack...";
  paymentStatus.className = "payment-status payment-processing";
  paymentStatus.classList.remove('hidden');
  
  // Appeler la fonction de paiement
  await initierPaiement(email, currentForfaitPrice, sourcePage);
}

// Gestion des événements de la modale de paiement
paystackBtn.addEventListener('click', initiatePayment);
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

// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    menuOverlay.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Fermer le menu en cliquant sur un lien
    const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // FAQ interactif
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Fermer tous les autres éléments FAQ
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Basculer l'état de l'élément actuel
      item.classList.toggle('active');
    });
  });

  // Vérifier si un paiement vient d'être effectué
  verifierPaiementRecent();
  
  // Mettre à jour l'affichage des boutons selon le statut de paiement
  updateForfaitButtons();
});
