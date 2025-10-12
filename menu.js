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

  // Gestion du diaporama
  const carousel = document.querySelector('.carousel');
  const inner = document.querySelector('.carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  const indicators = document.querySelectorAll('.carousel-indicator');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  let currentIndex = 0;
  let intervalId = null;
  const intervalTime = 5000; // 5 secondes
  
  // Fonction pour mettre à jour le diaporama
  function updateCarousel() {
    inner.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Mettre à jour les indicateurs
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  // Fonction pour passer à la diapositive suivante
  function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  }
  
  // Fonction pour passer à la diapositive précédente
  function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
  }
  
  // Démarrer le défilement automatique
  function startAutoSlide() {
    intervalId = setInterval(nextSlide, intervalTime);
  }
  
  // Arrêter le défilement automatique
  function stopAutoSlide() {
    clearInterval(intervalId);
  }
  
  // Événements pour les boutons de navigation
  nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });
  
  prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });
  
  // Événements pour les indicateurs
  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      stopAutoSlide();
      currentIndex = parseInt(indicator.getAttribute('data-index'));
      updateCarousel();
      startAutoSlide();
    });
  });
  
  // Arrêter le défilement automatique quand la souris est sur le diaporama
  carousel.addEventListener('mouseenter', stopAutoSlide);
  
  // Redémarrer le défilement automatique quand la souris quitte le diaporama
  carousel.addEventListener('mouseleave', startAutoSlide);
  
  // Démarrer le diaporama
  startAutoSlide();
});