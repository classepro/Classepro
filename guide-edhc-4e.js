function openLesson(card) {
    const href = card.getAttribute('data-href');
    if (href) {
        // Animation de sélection
        card.style.backgroundColor = 'rgba(104, 131, 186, 0.1)';
        card.style.borderColor = 'var(--secondary)';
        
        // Redirection après un court délai pour l'effet visuel
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    }
}

// Gestion du menu hamburger pour mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Ajouter des écouteurs d'événements aux cartes de leçon
    const lessonCards = document.querySelectorAll('.lesson-card[data-href]');
    lessonCards.forEach(card => {
        card.addEventListener('click', function() {
            openLesson(this);
        });
    });
    
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
    
    // Animation séquentielle des cartes
    lessonCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });
});