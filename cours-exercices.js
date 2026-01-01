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
        
        // Fermer le menu en cliquant sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                document.querySelectorAll('.menu-toggle span').forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
    
    // Gestion du dépliage des niveaux
    const levelHeaders = document.querySelectorAll('.level-header');
    
    levelHeaders.forEach(header => {
        // Animation d'entrée séquentielle
        header.style.animationDelay = `${Array.from(levelHeaders).indexOf(header) * 0.2}s`;
        
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-level') + '-classes';
            const targetElement = document.getElementById(targetId);
            const toggleIcon = this.querySelector('.toggle-icon i');
            
            // Basculer l'affichage
            targetElement.classList.toggle('active');
            
            // Animation de l'icône
            if (targetElement.classList.contains('active')) {
                toggleIcon.style.transform = 'rotate(180deg)';
            } else {
                toggleIcon.style.transform = 'rotate(0deg)';
            }
            
            // Animation des cartes de classe
            const classCards = targetElement.querySelectorAll('.class-card');
            classCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        });
    });
    
    // Animation d'entrée pour les cartes de classe
    document.querySelectorAll('.class-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Effet visuel de sélection
            this.style.transform = 'scale(0.98)';
            this.style.boxShadow = '0 2px 8px rgba(61, 59, 142, 0.2)';
            
            // Rétablir après un court délai
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 150);
        });
    });
});