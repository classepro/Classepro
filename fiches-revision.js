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

// Configuration Paystack (comme dans exposes.html)
const publicKey = "pk_live_777a7c63bdb21fe5600c3bc048da89da3b756d86";

// Références aux éléments du DOM
const fichesContainer = document.getElementById('fiches-container');
const loadingIndicator = document.getElementById('loading-indicator');
const emptyState = document.getElementById('empty-state');
const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');
const searchInput = document.getElementById('search-input');
const levelFilter = document.getElementById('level-filter');
const filterBtns = document.querySelectorAll('.filter-btn');

// Éléments de la modale de paiement (comme dans exposes.html)
const paymentModal = document.getElementById('payment-modal');
const paymentEmail = document.getElementById('payment-email');
const ficheTitleElement = document.getElementById('fiche-title');
const paymentAmount = document.getElementById('payment-amount');
const paystackBtn = document.getElementById('paystack-btn');
const paymentStatus = document.getElementById('payment-status');
const closePaymentModal = document.getElementById('close-payment-modal');

// Variables pour la gestion des données
let allFiches = [];
let filteredFiches = [];
let currentPage = 1;
const fichesPerPage = 6;
let currentFicheId = null;
let currentFichePrice = 0;
let currentFicheTitle = '';

// Charger les fiches depuis Firestore
async function loadFiches() {
  try {
    loadingIndicator.classList.remove('hidden');
    fichesContainer.innerHTML = '';
    emptyState.classList.add('hidden');
    
    const q = query(collection(db, "fiches de révision"), orderBy("titre"));
    const querySnapshot = await getDocs(q);
    
    allFiches = [];
    querySnapshot.forEach((doc) => {
      const ficheData = doc.data();
      ficheData.id = doc.id;
      allFiches.push(ficheData);
    });
    
    // Appliquer les filtres initiaux
    applyFilters();
    
    loadingIndicator.classList.add('hidden');
  } catch (error) {
    console.error("Erreur lors du chargement des fiches:", error);
    loadingIndicator.innerHTML = '<p class="text-red-500">Erreur lors du chargement des fiches</p>';
  }
}

// Appliquer les filtres et la recherche
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = document.querySelector('.filter-btn.active').dataset.category;
  const selectedLevel = levelFilter.value;
  
  filteredFiches = allFiches.filter(fiche => {
    const matchesSearch = fiche.titre.toLowerCase().includes(searchTerm) || 
                         (fiche.description && fiche.description.toLowerCase().includes(searchTerm));
    const matchesCategory = selectedCategory === 'all' || fiche.matiere === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || fiche.niveau === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  displayFiches();
}

// Vérifier si une fiche a été payée
function isFichePaid(ficheId) {
  const paidFiches = JSON.parse(localStorage.getItem('paidFiches')) || {};
  return paidFiches[ficheId] === true;
}

// Marquer une fiche comme payée
function markFicheAsPaid(ficheId) {
  const paidFiches = JSON.parse(localStorage.getItem('paidFiches')) || {};
  paidFiches[ficheId] = true;
  localStorage.setItem('paidFiches', JSON.stringify(paidFiches));
}

// Afficher les fiches avec pagination
function displayFiches() {
  fichesContainer.innerHTML = '';
  
  if (filteredFiches.length === 0) {
    emptyState.classList.remove('hidden');
    pagination.classList.add('hidden');
    return;
  }
  
  emptyState.classList.add('hidden');
  
  // Calculer les fiches à afficher pour la page actuelle
  const startIndex = (currentPage - 1) * fichesPerPage;
  const endIndex = startIndex + fichesPerPage;
  const fichesToShow = filteredFiches.slice(startIndex, endIndex);
  
  // Générer le HTML pour chaque fiche
  fichesToShow.forEach(fiche => {
    const ficheCard = document.createElement('div');
    ficheCard.className = 'fiche-card';
    
    // Image par défaut si aucune image n'est fournie
    const imageUrl = fiche.imageUrl || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
    
    // Déterminer si la fiche est gratuite ou payante
    const isFree = fiche.prix === 0;
    const isPaid = isFichePaid(fiche.id);
    
    // Déterminer si la fiche est accessible (gratuite ou payée)
    const isAccessible = isFree || isPaid;
    
    // Générer le bouton d'action (téléchargement ou paiement)
    let actionButton = '';
    if (isAccessible) {
      actionButton = `<a href="${fiche.downloadUrl}" target="_blank" class="fiche-download-btn">
        <i class="fas fa-download mr-2"></i>Télécharger
      </a>`;
    } else {
      actionButton = `<button class="payment-btn" onclick="openPaymentModal('${fiche.id}', ${fiche.prix}, '${fiche.titre.replace(/'/g, "\\'")}')">
        <i class="fas fa-lock mr-1"></i>Accéder à la fiche
        <span class="price-tag">${fiche.prix} CFA</span>
      </button>`;
    }
    
    // Générer le bouton d'aperçu (uniquement pour les fiches accessibles avec previewUrl)
    let previewButton = '';
    if (isAccessible && fiche.previewUrl) {
      previewButton = `<a href="${fiche.previewUrl}" target="_blank" class="preview-btn" title="Voir la fiche">
        <i class="fas fa-eye"></i> Voir la fiche
      </a>`;
    }
    
    ficheCard.innerHTML = `
      <div class="fiche-image" style="background-image: url('${imageUrl}')">
        ${previewButton}
        <span class="fiche-category">${fiche.matiere}</span>
      </div>
      <div class="fiche-content">
        <h3 class="fiche-title">${fiche.titre}</h3>
        <p class="fiche-description">${fiche.description || 'Fiche de révision complète et structurée.'}</p>
        <div class="fiche-meta">
          <span><i class="fas fa-file-pdf mr-1"></i> ${fiche.type_document || 'PDF'} - ${fiche.nombre_pages} pages</span>
          <span><i class="fas fa-graduation-cap mr-1"></i> ${fiche.niveau}</span>
        </div>
        <div class="fiche-meta">
          <span><i class="fas fa-money-bill-wave mr-1"></i> ${isFree ? 'Gratuit' : (isPaid ? 'Déjà payé' : fiche.prix + ' CFA')}</span>
        </div>
        ${actionButton}
      </div>
    `;
    
    fichesContainer.appendChild(ficheCard);
  });
  
  // Mettre à jour la pagination
  updatePagination();
}

// Ouvrir la modale de paiement (version améliorée comme dans exposes.html)
window.openPaymentModal = function(ficheId, price, ficheTitle) {
  currentFicheId = ficheId;
  currentFichePrice = price;
  currentFicheTitle = ficheTitle;
  
  // Remplir les informations de la modale
  paymentEmail.value = localStorage.getItem('userEmail') || '';
  ficheTitleElement.textContent = ficheTitle;
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
  currentFicheId = null;
  currentFichePrice = 0;
  currentFicheTitle = '';
}

// Fonction pour initier le paiement directement avec Paystack Inline (comme dans exposes.html)
async function initiatePayment() {
  const email = paymentEmail.value.trim();

  if (!email) {
    paymentStatus.textContent = "⚠️ Veuillez entrer un email valide.";
    paymentStatus.className = "payment-status payment-error";
    paymentStatus.classList.remove('hidden');
    return;
  }

  if (!email.includes('@')) {
    paymentStatus.textContent = "⚠️ Format d'email invalide.";
    paymentStatus.className = "payment-status payment-error";
    paymentStatus.classList.remove('hidden');
    return;
  }

  localStorage.setItem('userEmail', email);
  paymentStatus.textContent = "⏳ Ouverture du portail de paiement...";
  paymentStatus.className = "payment-status payment-processing";
  paymentStatus.classList.remove('hidden');
  
  try {
    const handler = PaystackPop.setup({
      key: publicKey,
      email: email,
      amount: currentFichePrice * 100, // conversion en kobo
      currency: "XOF",
      ref: 'CLASSEPRO_' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Fiche de révision",
            variable_name: "fiche",
            value: currentFicheTitle
          }
        ]
      },
      callback: function(response) {
        // Ici, le paiement est validé par Paystack
        paymentStatus.textContent = "🎉 Paiement réussi ! Redirection...";
        paymentStatus.className = "payment-status payment-success";
        paymentStatus.classList.remove('hidden');

        // Marquer la fiche comme payée
        markFicheAsPaid(currentFicheId);

        setTimeout(() => {
          closeModal();
          displayFiches(); // rafraîchir la liste
        }, 2000);
      },
      onClose: function() {
        paymentStatus.textContent = "❌ Paiement annulé. Vous pouvez réessayer.";
        paymentStatus.className = "payment-status payment-error";
        paymentStatus.classList.remove('hidden');
      }
    });

    handler.openIframe();

  } catch (error) {
    paymentStatus.textContent = "❌ Erreur : " + error.message;
    paymentStatus.className = "payment-status payment-error";
    paymentStatus.classList.remove('hidden');
  }
}

// Mettre à jour la pagination
function updatePagination() {
  const totalPages = Math.ceil(filteredFiches.length / fichesPerPage);
  
  if (totalPages > 1) {
    pagination.classList.remove('hidden');
    pageInfo.textContent = `Page ${currentPage} sur ${totalPages}`;
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Appliquer des styles pour les boutons désactivés
    if (currentPage === 1) {
      prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    
    if (currentPage === totalPages) {
      nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
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
    displayFiches();
  }
});

nextBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(filteredFiches.length / fichesPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayFiches();
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

  // Charger les fiches au chargement de la page
  loadFiches();
});