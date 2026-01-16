// Fonction pour ouvrir une leçon
function openLesson(lessonLink, lessonName, card) {
    // Animation de sélection
    if (card) {
        // Ajouter un effet visuel de sélection
        card.style.backgroundColor = 'rgba(104, 131, 186, 0.1)';
        card.style.borderColor = 'var(--secondary)';
    }
    
    // Vérifier si un lien est fourni
    if (lessonLink && lessonLink !== '#') {
        // Rediriger vers la page de la leçon
        setTimeout(() => {
            window.location.href = lessonLink;
        }, 300);
    } else {
        // Si pas de lien, montrer l'alerte
        setTimeout(() => {
            alert(`Ouverture de la leçon: ${lessonName}\n\nCette fonctionnalité sera implémentée prochainement avec le contenu détaillé de la leçon.`);
            // Réinitialiser le style
            if (card) {
                card.style.backgroundColor = '';
                card.style.borderColor = '';
            }
        }, 300);
    }
}

// Gestion du menu hamburger pour mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Gestion des clics sur les cartes de leçons
    const lessonCards = document.querySelectorAll('.lesson-card');
    lessonCards.forEach(card => {
        card.addEventListener('click', function() {
            const lessonLink = this.getAttribute('data-link');
            const lessonName = this.getAttribute('data-name');
            openLesson(lessonLink, lessonName, this);
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