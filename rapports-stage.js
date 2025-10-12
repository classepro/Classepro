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
  
  // Initialisation des carrousels
  initCarousels();
});

// Fonction pour initialiser tous les carrousels
function initCarousels() {
  initCarousel('models');
  initCarousel('tips');
  initCarousel('examples');
  initCarousel('services');
}

// Fonction pour initialiser un carrousel spécifique
function initCarousel(carouselId) {
  const container = document.getElementById(`${carouselId}-container`);
  const carousel = document.getElementById(`${carouselId}-carousel`);
  const prevBtn = document.getElementById(`${carouselId}-prev`);
  const nextBtn = document.getElementById(`${carouselId}-next`);
  const indicatorsContainer = document.getElementById(`${carouselId}-indicators`);
  
  if (!carousel || !prevBtn || !nextBtn) return;
  
  const items = carousel.querySelectorAll('.carousel-item');
  const itemCount = items.length;
  let currentIndex = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  // Créer les indicateurs (uniquement pour desktop)
  if (window.innerWidth >= 768) {
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < itemCount; i++) {
      const indicator = document.createElement('div');
      indicator.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
      indicator.addEventListener('click', () => goToSlide(i));
      indicatorsContainer.appendChild(indicator);
    }
  }
  
  // Mettre à jour les indicateurs
  function updateIndicators() {
    if (window.innerWidth >= 768) {
      const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }
  }
  
  // Aller à un slide spécifique
  function goToSlide(index) {
    currentIndex = index;
    const translateX = -currentIndex * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
    updateIndicators();
    updateButtons();
  }
  
  // Mettre à jour l'état des boutons (uniquement pour desktop)
  function updateButtons() {
    if (window.innerWidth >= 768) {
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === itemCount - 1;
    }
  }
  
  // Événements pour les boutons (uniquement pour desktop)
  if (window.innerWidth >= 768) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (currentIndex < itemCount - 1) {
        goToSlide(currentIndex + 1);
      }
    });
  }
  
  // Gestion du balayage tactile pour mobile
  if (container) {
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Gestion de la souris pour le desktop (optionnel)
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);
  }
  
  function handleTouchStart(e) {
    if (window.innerWidth < 768) {
      startX = e.touches[0].clientX;
      isDragging = true;
    }
  }
  
  function handleTouchMove(e) {
    if (!isDragging || window.innerWidth >= 768) return;
    currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    carousel.style.transform = `translateX(calc(-${currentIndex * 100}% - ${diff}px))`;
  }
  
  function handleTouchEnd() {
    if (!isDragging || window.innerWidth >= 768) return;
    isDragging = false;
    
    const diff = startX - currentX;
    const threshold = 50; // Seuil de balayage en pixels
    
    if (diff > threshold && currentIndex < itemCount - 1) {
      // Balayage vers la gauche - aller au slide suivant
      goToSlide(currentIndex + 1);
    } else if (diff < -threshold && currentIndex > 0) {
      // Balayage vers la droite - aller au slide précédent
      goToSlide(currentIndex - 1);
    } else {
      // Retour à la position actuelle
      goToSlide(currentIndex);
    }
  }
  
  // Gestion de la souris pour le desktop (optionnel)
  function handleMouseDown(e) {
    if (window.innerWidth >= 768) {
      startX = e.clientX;
      isDragging = true;
      container.style.cursor = 'grabbing';
    }
  }
  
  function handleMouseMove(e) {
    if (!isDragging || window.innerWidth < 768) return;
    currentX = e.clientX;
    const diff = startX - currentX;
    carousel.style.transform = `translateX(calc(-${currentIndex * 100}% - ${diff}px))`;
  }
  
  function handleMouseUp() {
    if (window.innerWidth >= 768) {
      isDragging = false;
      container.style.cursor = 'grab';
      
      const diff = startX - currentX;
      const threshold = 50; // Seuil de balayage en pixels
      
      if (diff > threshold && currentIndex < itemCount - 1) {
        // Balayage vers la gauche - aller au slide suivant
        goToSlide(currentIndex + 1);
      } else if (diff < -threshold && currentIndex > 0) {
        // Balayage vers la droite - aller au slide précédent
        goToSlide(currentIndex - 1);
      } else {
        // Retour à la position actuelle
        goToSlide(currentIndex);
      }
    }
  }
  
  // Mettre à jour l'affichage initial
  updateButtons();
  
  // Gérer le redimensionnement de la fenêtre
  window.addEventListener('resize', () => {
    goToSlide(currentIndex);
    updateButtons();
    
    // Recréer les indicateurs si on passe au-dessus de 768px
    if (window.innerWidth >= 768 && indicatorsContainer.children.length === 0) {
      indicatorsContainer.innerHTML = '';
      for (let i = 0; i < itemCount; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
      }
      updateIndicators();
    }
  });
}