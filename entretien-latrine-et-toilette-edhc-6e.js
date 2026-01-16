// JAVASCRIPT COMPLET - Adapté pour ce cours

// Variables pour suivre la progression
let progress = 0;
const totalExercises = 10;

// Éléments de la modale
const modalOverlay = document.getElementById('modalOverlay');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalDetails = document.getElementById('modalDetails');
const modalButton = document.getElementById('modalButton');
const feedbackModal = document.getElementById('feedbackModal');

// Fonction pour afficher une modale de succès
function showSuccessModal(title, message, details = '', showConfetti = true) {
    feedbackModal.classList.remove('error-modal');
    feedbackModal.classList.add('success-modal');
    modalIcon.innerHTML = '<i class="fas fa-check-circle success-icon"></i>';
    modalIcon.className = 'modal-icon success-icon';
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    if (details) {
        modalDetails.innerHTML = details;
        modalDetails.style.display = 'block';
    } else {
        modalDetails.style.display = 'none';
    }
    
    modalButton.textContent = 'Continuer';
    modalButton.onclick = closeModal;
    
    modalOverlay.classList.add('active');
    
    if (showConfetti) {
        createConfetti();
    }
}

// Fonction pour afficher une modale d'erreur
function showErrorModal(title, message, details = '', correctAnswer = '') {
    feedbackModal.classList.remove('success-modal');
    feedbackModal.classList.add('error-modal');
    modalIcon.innerHTML = '<i class="fas fa-exclamation-triangle error-icon"></i>';
    modalIcon.className = 'modal-icon error-icon';
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    if (details) {
        modalDetails.innerHTML = details;
        modalDetails.style.display = 'block';
    } else {
        modalDetails.style.display = 'none';
    }
    
    if (correctAnswer) {
        modalDetails.innerHTML += `<p style="margin-top: 10px; font-weight: bold; color: var(--success);">La bonne réponse était : ${correctAnswer}</p>`;
        modalDetails.style.display = 'block';
    }
    
    modalButton.textContent = 'Compris';
    modalButton.onclick = closeModal;
    
    modalOverlay.classList.add('active');
}

// Fonction pour fermer la modale
function closeModal() {
    modalOverlay.classList.remove('active');
}

// Fonction pour créer des confettis
function createConfetti() {
    const colors = ['#FF7E5F', '#3D3B8E', '#6883BA', '#4BB543', '#FF9800'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        const animationDuration = Math.random() * 3 + 2;
        confetti.style.animation = `confettiRain ${animationDuration}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        // Supprimer le confetti après l'animation
        setTimeout(() => {
            confetti.remove();
        }, animationDuration * 1000);
    }
}

// Fermer la modale en cliquant en dehors
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Fermer la modale avec la touche Échap
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Fonction pour changer d'onglet
function switchTab(tabName) {
    // Masquer tous les contenus d'onglet
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Désactiver tous les onglets
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Activer l'onglet sélectionné
    document.getElementById(tabName).classList.add('active');
    
    // Activer le bouton d'onglet correspondant
    document.querySelectorAll('.tab').forEach(tab => {
        if (tab.textContent.includes(getTabName(tabName))) {
            tab.classList.add('active');
        }
    });
    
    // Animer le contenu de l'onglet
    const activeTab = document.getElementById(tabName);
    activeTab.style.animation = 'none';
    setTimeout(() => {
        activeTab.style.animation = 'fadeInUp 0.5s ease-out';
    }, 10);
}

function getTabName(tabId) {
    const names = {
        'lecon': 'Leçon',
        'exercices': 'Exercice',
        'astuces': 'Astuces',
        'evaluation': 'Évaluation'
    };
    return names[tabId] || tabId;
}

// Fonction pour mettre à jour la barre de progression
function updateProgress() {
    progress = Math.min(progress + 1, totalExercises);
    const percent = Math.round((progress / totalExercises) * 100);
    document.getElementById('progressPercent').textContent = `${percent}%`;
    document.getElementById('progressFill').style.width = `${percent}%`;
}

// Fonctions pour les exercices interactifs
function checkRadio(questionName, correctAnswer) {
    const radios = document.getElementsByName(questionName);
    let selectedValue = '';
    let selectedRadio = null;
    
    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            selectedRadio = radio;
            break;
        }
    }
    
    if (!selectedValue) {
        showErrorModal(
            'Réponse manquante',
            'Tu dois sélectionner une réponse avant de vérifier.',
            'Clique sur "Vrai" ou "Faux" pour choisir ta réponse.'
        );
        return;
    }
    
    if (selectedValue === correctAnswer) {
        // Bonne réponse
        showSuccessModal(
            '🎉 Excellente réponse !',
            'Félicitations, tu as bien compris cette notion.',
            'Continue comme ça !'
        );
        updateProgress();
        
        // Colorer la bonne réponse
        radios.forEach(radio => {
            if (radio.value === correctAnswer) {
                radio.parentElement.style.color = 'var(--success)';
                radio.parentElement.style.fontWeight = 'bold';
            }
        });
    } else {
        // Mauvaise réponse
        const correctAnswerText = correctAnswer === 'vrai' ? 'VRAI' : 'FAUX';
        const userAnswerText = selectedValue === 'vrai' ? 'VRAI' : 'FAUX';
        
        showErrorModal(
            'Presque !',
            `Ta réponse : <strong>${userAnswerText}</strong>`,
            `Ne te décourage pas ! Chaque erreur est une occasion d'apprendre.`,
            `Réponse correcte : ${correctAnswerText}`
        );
        
        // Colorer les réponses
        radios.forEach(radio => {
            if (radio.value === correctAnswer) {
                radio.parentElement.style.color = 'var(--success)';
                radio.parentElement.style.fontWeight = 'bold';
            } else if (radio.checked) {
                radio.parentElement.style.color = 'var(--warning)';
            }
        });
    }
}

function checkMesures() {
    const mesuresChecked = [];
    
    // Vérifier quelles mesures sont cochées
    if (document.getElementById('mesure1').checked) mesuresChecked.push('vidanger');
    if (document.getElementById('mesure2').checked) mesuresChecked.push('nettoyer');
    if (document.getElementById('mesure3').checked) mesuresChecked.push('uriner');
    if (document.getElementById('mesure4').checked) mesuresChecked.push('desinfecter');
    if (document.getElementById('mesure5').checked) mesuresChecked.push('utiliser');
    
    if (mesuresChecked.length === 0) {
        showErrorModal(
            'Réponse manquante',
            'Tu dois cocher au moins une mesure avant de vérifier.',
            'Relis bien la question et coche les cases correspondantes.'
        );
        return;
    }
    
    // Les bonnes réponses : vidanger, nettoyer, désinfecter, utiliser
    const bonnesReponses = ['vidanger', 'nettoyer', 'desinfecter', 'utiliser'];
    const mauvaiseReponse = ['uriner']; // À ne pas cocher
    
    let score = 0;
    let erreurs = 0;
    
    // Compter les bonnes réponses
    mesuresChecked.forEach(mesure => {
        if (bonnesReponses.includes(mesure)) score++;
        if (mauvaiseReponse.includes(mesure)) erreurs++;
    });
    
    const totalCorrect = bonnesReponses.length;
    
    if (score === totalCorrect && erreurs === 0) {
        showSuccessModal(
            '🎯 Parfait !',
            'Tu as identifié correctement toutes les mesures d\'entretien.',
            'Excellent travail de mémorisation !'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (score >= 2 && erreurs === 0) {
        showSuccessModal(
            '👍 Très bien !',
            `Tu as identifié ${score}/${totalCorrect} mesures d'entretien.`,
            'Continue à réviser pour identifier toutes les mesures correctement.'
        );
        updateProgress();
    } else {
        const details = `Tu as coché ${score} bonne(s) réponse(s) et ${erreurs} mauvaise(s) réponse(s).<br>Les mesures d'entretien sont : Vidanger, Nettoyer, Désinfecter, Utiliser correctement.`;
        showErrorModal(
            '🧹 À revoir',
            'Tu as fait quelques erreurs dans l\'identification des mesures.',
            details
        );
    }
}

function checkImportance() {
    const reponse = document.getElementById('importance').value.toLowerCase();
    
    // Les bonnes réponses : b, d, e, f
    const bonnesReferences = ['b', 'd', 'e', 'f'];
    const termesImportance = ['préserver', 'cadre', 'vie', 'économies', 'santé', 'populations', 'propagation', 'maladies'];
    
    let score = 0;
    
    // Vérifier la présence des références
    bonnesReferences.forEach(ref => {
        if (reponse.includes(ref)) score++;
    });
    
    // Vérifier la présence des termes clés
    termesImportance.forEach(terme => {
        if (reponse.includes(terme)) score++;
    });
    
    if (score >= 6) {
        showSuccessModal(
            '🌟 Excellent !',
            'Tu as parfaitement compris l\'importance de l\'entretien des toilettes.',
            'Tu maîtrises bien les enjeux sanitaires et économiques.'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 4) {
        showSuccessModal(
            '👍 Bon travail !',
            'Tu as bien identifié l\'essentiel de l\'importance de l\'entretien.',
            'Tu progresses bien dans la compréhension des bénéfices.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            'Tu as omis plusieurs aspects importants de l\'entretien.',
            'Relis bien la leçon pour comprendre tous les bénéfices de l\'entretien des toilettes.'
        );
    }
}

function showAllAnswers() {
    const answersDiv = document.getElementById('allAnswers');
    if (answersDiv.style.display === 'block') {
        answersDiv.style.display = 'none';
    } else {
        answersDiv.style.display = 'block';
        answersDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

// Fonction pour soumettre l'évaluation
function submitEvaluation() {
    const eval1 = document.getElementById('eval1').value.trim();
    const eval2 = document.getElementById('eval2').value.trim();
    const eval3 = document.getElementById('eval3').value.trim();
    const eval4 = document.getElementById('eval4').value.trim();
    const eval5 = document.getElementById('eval5').value.trim();
    const eval6 = document.getElementById('eval6').value.trim();
    
    if (!eval1 || !eval2 || !eval3 || !eval4 || !eval5 || !eval6) {
        showErrorModal(
            'Évaluation incomplète',
            'Tu dois répondre à toutes les questions avant de soumettre.',
            'Prends le temps de développer tes réponses.'
        );
        return;
    }
    
    const resultsDiv = document.getElementById('evalResults');
    const scoreDisplay = document.getElementById('evalScore');
    const correctionsDiv = document.getElementById('evalCorrections');
    
    let score = 0;
    let maxScore = 18; // 6 questions × 3 points
    let feedback = '';
    
    // Question 1.1
    if (eval1.length > 10 && (eval1.includes('refus') || eval1.includes('participer') || eval1.includes('journée') || eval1.includes('entretien'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1.1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.1 :</strong> Bon début, tu peux être plus précis.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.1 :</strong> Pense à formuler clairement le refus de participation.</p>';
    }
    
    // Question 1.2
    if (eval2.length > 20 && (eval2.includes('nettoyer') || eval2.includes('désinfecter') || eval2.includes('utiliser') || eval2.includes('vidanger'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1.2 :</strong> Excellente énumération des pratiques d\'entretien.</p>';
    } else if (eval2.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.2 :</strong> Tu as compris, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.2 :</strong> Pense aux différentes mesures vues dans la leçon.</p>';
    }
    
    // Question 1.3
    if (eval3.length > 30 && (eval3.includes('santé') || eval3.includes('maladies') || eval3.includes('propagation') || eval3.includes('environnement'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1.3 :</strong> Excellente justification de ton refus.</p>';
    } else if (eval3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.3 :</strong> Bonne direction, argumente davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.3 :</strong> Pense aux conséquences sur la santé et l\'environnement.</p>';
    }
    
    // Question 2.1
    if (eval4.length > 10 && (eval4.includes('responsable') || eval4.includes('opération') || eval4.includes('toilette propre') || eval4.includes('désigné'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2.1 :</strong> Bonne identification du problème.</p>';
    } else if (eval4.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.1 :</strong> Bon début, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.1 :</strong> Pense à décrire ta nomination comme responsable.</p>';
    }
    
    // Question 2.2
    if (eval5.length > 15 && (eval5.includes('besoins') || eval5.includes('hors') || eval5.includes('papier') || eval5.includes('non convenable') || eval5.includes('manque'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2.2 :</strong> Parfaite énumération des pratiques insalubres.</p>';
    } else if (eval5.length > 8) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.2 :</strong> Tu as compris, cite des exemples concrets.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.2 :</strong> Pense aux mauvaises pratiques vues dans la leçon.</p>';
    }
    
    // Question 2.3
    if (eval6.length > 40 && (eval6.includes('important') || eval6.includes('santé') || eval6.includes('environnement') || eval6.includes('maladies') || eval6.includes('dégradation'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2.3 :</strong> Excellente justification de ton acceptation.</p>';
    } else if (eval6.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.3 :</strong> Bon raisonnement, développe tes arguments.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.3 :</strong> Pense à l\'importance de l\'entretien pour la santé collective.</p>';
    }
    
    const percentage = Math.round((score / maxScore) * 100);
    let message = '';
    let modalTitle = '';
    let modalMessage = '';
    
    if (percentage >= 80) {
        modalTitle = '🏆 Excellent travail !';
        modalMessage = `Tu as obtenu ${score}/${maxScore} points (${percentage}%).`;
        message = `🎉 Excellent travail ! ${score}/${maxScore} points (${percentage}%)`;
        createConfetti();
    } else if (percentage >= 60) {
        modalTitle = '👍 Bon travail !';
        modalMessage = `Tu as obtenu ${score}/${maxScore} points (${percentage}%).`;
        message = `👍 Bon travail ! ${score}/${maxScore} points (${percentage}%)`;
    } else if (percentage >= 40) {
        modalTitle = '✅ Assez bien !';
        modalMessage = `Tu as obtenu ${score}/${maxScore} points (${percentage}%).`;
        message = `✅ Assez bien ! ${score}/${maxScore} points (${percentage}%)`;
    } else {
        modalTitle = '📚 À revoir !';
        modalMessage = `Tu as obtenu ${score}/${maxScore} points (${percentage}%).`;
        message = `📚 À revoir ! ${score}/${maxScore} points (${percentage}%)`;
    }
    
    showSuccessModal(
        modalTitle,
        modalMessage,
        feedback
    );
    
    scoreDisplay.innerHTML = `<strong>${message}</strong>`;
    
    // Générer les corrections détaillées
    let corrections = "<h4>Corrections suggérées :</h4>";
    
    corrections += "<p><strong>Situation 1 : Refus de participer</strong></p>";
    corrections += "<p><strong>1. Problème posé :</strong></p>";
    corrections += "<p>Refus de participer à une journée d'entretien des toilettes sous prétexte qu'elles sont trop sales.</p>";
    
    corrections += "<p><strong>2. Trois pratiques d'entretien :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Nettoyer les toilettes avec des produits adaptés</li>";
    corrections += "<li>Désinfecter régulièrement les toilettes</li>";
    corrections += "<li>Utiliser correctement les toilettes (visée précise, papier adapté)</li>";
    corrections += "<li>Vidanger les fosses septiques si nécessaire</li>";
    corrections += "<li>Maintenir le matériel en bon état</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Justification du refus :</strong></p>";
    corrections += "<p>Je refuse de suivre mes camarades parce que :</p>";
    corrections += "<ul>";
    corrections += "<li>L'entretien des toilettes contribue à freiner la propagation des maladies</li>";
    corrections += "<li>Il permet d'éviter la détérioration de la santé des populations</li>";
    corrections += "<li>Des toilettes propres préservent notre cadre de vie</li>";
    corrections += "<li>Participer à cet entretien est un acte citoyen important</li>";
    corrections += "<li>C'est l'occasion d'améliorer nos conditions de vie à l'école</li>";
    corrections += "</ul>";
    
    corrections += "<hr style='margin: 20px 0;'>";
    
    corrections += "<p><strong>Situation 2 : Responsable de l'opération</strong></p>";
    corrections += "<p><strong>1. Problème posé :</strong></p>";
    corrections += "<p>Désignation comme responsable de la journée « toilette propre » pour remédier au manque d'entretien.</p>";
    
    corrections += "<p><strong>2. Deux pratiques insalubres :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Faire ses besoins (déféquer ou uriner) hors du trou de la latrine ou de la cuvette du WC prévue à cet effet</li>";
    corrections += "<li>Utiliser du papier non convenable après les selles</li>";
    corrections += "<li>Négliger l'entretien régulier des toilettes</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Justification de l'acceptation :</strong></p>";
    corrections += "<p>J'accepte cette responsabilité parce que :</p>";
    corrections += "<ul>";
    corrections += "<li>L'entretien des toilettes est très important pour notre santé</li>";
    corrections += "<li>Il permet d'éviter la dégradation de notre environnement scolaire</li>";
    corrections += "<li>Il contribue à prévenir la propagation des maladies</li>";
    corrections += "<li>C'est une occasion de montrer l'exemple et de sensibiliser les autres</li>";
    corrections += "<li>Des toilettes propres améliorent nos conditions de vie à l'école</li>";
    corrections += "</ul>";
    
    correctionsDiv.innerHTML = corrections;
    resultsDiv.style.display = 'block';
    
    // Mettre à jour la progression
    if (percentage >= 60) {
        updateProgress();
        updateProgress();
        updateProgress(); // Triple progression pour l'évaluation
    }
}

// Menu mobile et initialisation
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
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
    
    // Animation séquentielle
    const lessonSections = document.querySelectorAll('.lesson-section');
    lessonSections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
        setTimeout(() => {
            section.style.opacity = '1';
        }, 100);
    });
    
    // Initialiser la barre de progression
    updateProgress();
    
    // Gestion du responsive pour les tableaux
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            document.querySelectorAll('table').forEach(table => {
                if (!table.hasAttribute('data-mobile-style')) {
                    table.setAttribute('data-mobile-style', 'true');
                    table.style.display = 'block';
                    table.style.overflowX = 'auto';
                }
            });
        }
    });
    
    // Déclencher une fois au chargement
    window.dispatchEvent(new Event('resize'));
});