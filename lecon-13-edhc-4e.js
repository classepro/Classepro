// JAVASCRIPT COMPLET POUR LA LEÇON 13

// Variables pour suivre la progression
let progress = 0;
const totalExercises = 12;

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
        'exercices': 'Exercices',
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

function checkClassification() {
    const naturels = document.getElementById('naturels').value.toLowerCase();
    const artificiels = document.getElementById('artificiels').value.toLowerCase();
    
    const naturelsAttendus = ['marigot', 'rivière', 'fleuve', 'source'];
    const artificielsAttendus = ['borne-fontaine', 'puits', 'robinet', 'pompe hydraulique', 'pompe'];
    
    let scoreNaturels = 0;
    let scoreArtificiels = 0;
    
    // Vérifier les points d'eau naturels
    naturelsAttendus.forEach(terme => {
        if (naturels.includes(terme)) scoreNaturels++;
    });
    
    // Vérifier les points d'eau artificiels
    artificielsAttendus.forEach(terme => {
        if (artificiels.includes(terme)) scoreArtificiels++;
    });
    
    const totalScore = scoreNaturels + scoreArtificiels;
    const maxScore = 8; // 8 points d'eau à classer
    
    if (totalScore >= 7) {
        showSuccessModal(
            '🌟 Classification parfaite !',
            `Tu as bien classé ${totalScore}/${maxScore} points d'eau.`,
            'Tu maîtrises parfaitement la distinction entre points d\'eau naturels et artificiels.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (totalScore >= 5) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as classé ${totalScore}/${maxScore} points d'eau correctement.`,
            'Tu progresses bien dans la compréhension des différents types de points d\'eau.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as classé ${totalScore}/${maxScore} points d'eau correctement.`,
            'Consulte les corrections pour mieux comprendre la différence entre points d\'eau naturels et artificiels.'
        );
    }
}

function checkPollution() {
    const polluants = [
        document.getElementById('poll1').checked, // hydrocarbures
        document.getElementById('poll2').checked, // gaz
        document.getElementById('poll3').checked, // eaux grises
        document.getElementById('poll4').checked, // pesticides
        document.getElementById('poll5').checked, // engrais
        document.getElementById('poll6').checked  // filets
    ];
    
    // Réponses correctes : hydrocarbures, eaux grises, pesticides, engrais
    const correctes = [true, false, true, true, true, false];
    
    let score = 0;
    for (let i = 0; i < polluants.length; i++) {
        if (polluants[i] === correctes[i]) {
            score++;
        }
    }
    
    if (score === 6) {
        showSuccessModal(
            '🎯 Parfait !',
            'Tu as identifié correctement tous les polluants.',
            'Tu connais bien les principales causes de pollution des points d\'eau.'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 4) {
        showSuccessModal(
            '👍 Bien joué !',
            `Tu as ${score}/6 bonnes réponses.`,
            'Tu connais les principales causes de pollution, mais attention à certains détails.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '💡 À réviser',
            `Tu as ${score}/6 bonnes réponses.`,
            'Revise bien les différentes sources de pollution des points d\'eau.'
        );
    }
}

function checkDefinition() {
    const def1 = document.getElementById('def1').value.trim().toLowerCase();
    const def2 = document.getElementById('def2').value.trim().toLowerCase();
    const def3 = document.getElementById('def3').value.trim().toLowerCase();
    
    const correct1 = 'des endroits';
    const correct2 = "s'approvisionne en eau";
    const correct3 = 'la satisfaction de ses besoins';
    
    let score = 0;
    let feedback = '';
    
    if (def1.includes('endroits') || def1.includes('des endroits')) {
        score++;
        feedback += '<p>✓ <strong>Premier mot :</strong> Correct !</p>';
    } else {
        feedback += '<p>✗ <strong>Premier mot :</strong> Pense à "des endroits"</p>';
    }
    
    if (def2.includes('s\'approvisionne') || def2.includes('approvisionne')) {
        score++;
        feedback += '<p>✓ <strong>Deuxième mot :</strong> Correct !</p>';
    } else {
        feedback += '<p>✗ <strong>Deuxième mot :</strong> Pense à "s\'approvisionne en eau"</p>';
    }
    
    if (def3.includes('satisfaction') || def3.includes('besoins')) {
        score++;
        feedback += '<p>✓ <strong>Troisième mot :</strong> Correct !</p>';
    } else {
        feedback += '<p>✗ <strong>Troisième mot :</strong> Pense à "la satisfaction de ses besoins"</p>';
    }
    
    if (score === 3) {
        showSuccessModal(
            '📚 Définition maîtrisée !',
            'Tu as parfaitement complété la définition d\'un point d\'eau.',
            feedback
        );
        updateProgress();
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '🔍 Presque !',
            'Tu as bien compris l\'essentiel de la définition.',
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '🧠 À retravailler',
            'Relis bien la définition dans la leçon.',
            feedback
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
    // Récupérer toutes les réponses
    const eval1_1 = document.getElementById('eval1-1').value.trim();
    const eval1_2 = document.getElementById('eval1-2').value.trim();
    const eval1_3 = document.getElementById('eval1-3').value.trim();
    
    const eval2_1 = document.getElementById('eval2-1').value.trim();
    const eval2_2 = document.getElementById('eval2-2').value.trim();
    const eval2_3 = document.getElementById('eval2-3').value.trim();
    
    // Vérifier que toutes les réponses sont remplies
    if (!eval1_1 || !eval1_2 || !eval1_3 || !eval2_1 || !eval2_2 || !eval2_3) {
        showErrorModal(
            'Évaluation incomplète',
            'Tu dois répondre à toutes les questions avant de soumettre.',
            'Prends le temps de développer tes réponses pour les 2 situations.'
        );
        return;
    }
    
    const resultsDiv = document.getElementById('evalResults');
    const scoreDisplay = document.getElementById('evalScore');
    const correctionsDiv = document.getElementById('evalCorrections');
    
    let score = 0;
    let maxScore = 12; // 2 points par question × 6 questions
    let feedback = '';
    
    // Évaluer les réponses de la situation 1
    // Question 1.1
    if (eval1_1.length > 10 && (eval1_1.includes('problème') || eval1_1.includes('invitation') || eval1_1.includes('baigner') || eval1_1.includes('pollué'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 1 :</strong> Bonne idée, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 1 :</strong> Le problème est l\'invitation à se baigner dans un point d\'eau pollué.</p>';
    }
    
    // Question 1.2
    if (eval1_2.length > 15 && (eval1_2.includes('construction') || eval1_2.includes('barrière') || eval1_2.includes('code') || eval1_2.includes('épuration') || eval1_2.includes('protection'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 2 :</strong> Bonnes mesures citées.</p>';
    } else if (eval1_2.length > 8) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 2 :</strong> Tu cites des mesures, précise-les davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 2 :</strong> Pense aux mesures comme la construction de barrières ou l\'élaboration d\'un code de conduite.</p>';
    }
    
    // Question 1.3
    if (eval1_3.length > 20 && (eval1_3.includes('maladie') || eval1_3.includes('risque') || eval1_3.includes('danger') || eval1_3.includes('pollution') || eval1_3.includes('pratique'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 3 :</strong> Excellente justification du refus.</p>';
    } else if (eval1_3.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 3 :</strong> Bon début de justification, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 3 :</strong> Justifie en parlant des risques de maladies et du caractère polluant de cette pratique.</p>';
    }
    
    // Évaluer les réponses de la situation 2
    // Question 2.1
    if (eval2_1.length > 10 && (eval2_1.includes('invitation') || eval2_1.includes('consommer') || eval2_1.includes('poissons') || eval2_1.includes('pollué') || eval2_1.includes('plage'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval2_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 1 :</strong> Bonne direction, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 1 :</strong> Le problème est l\'invitation à consommer des poissons ramassés sur une plage polluée.</p>';
    }
    
    // Question 2.2
    if (eval2_2.length > 20 && (eval2_2.includes('domestique') || eval2_2.includes('agricole') || eval2_2.includes('industriel') || eval2_2.includes('rejet'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 2 :</strong> Excellente énumération des causes.</p>';
    } else if (eval2_2.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 2 :</strong> Tu cites des causes, organise-les mieux.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 2 :</strong> Pense aux trois grandes catégories : rejets domestiques, agricoles et industriels.</p>';
    }
    
    // Question 2.3
    if (eval2_3.length > 25 && (eval2_3.includes('santé') || eval2_3.includes('maladie') || eval2_3.includes('danger') || eval2_3.includes('mort') || eval2_3.includes('toxic') || eval2_3.includes('pollution'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 3 :</strong> Très bonne justification du refus.</p>';
    } else if (eval2_3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 3 :</strong> Bonne justification, développe davantage les risques.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 3 :</strong> Justifie en parlant des risques pour la santé et de la toxicité des poissons contaminés.</p>';
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
    
    corrections += "<h5>Situation 1 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong></p>";
    corrections += "<p>L'invitation à se baigner dans un point d'eau (rivière) où les jeunes font régulièrement leurs besoins et prennent leur bain, ce qui pollue l'eau.</p>";
    
    corrections += "<p><strong>2. Mesures de préservation des points d'eau :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Construction de barrières de protection autour des points d'eau</li>";
    corrections += "<li>Élaboration d'un code de conduite pour la gestion rationnelle de l'eau</li>";
    corrections += "<li>Épuration des rejets industriels avant leur déversement</li>";
    corrections += "<li>Sanctions pénales contre les pollueurs</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Justification du refus :</strong></p>";
    corrections += "<p>Se baigner et faire ses besoins dans la même eau est une mauvaise pratique qui :</p>";
    corrections += "<ul>";
    corrections += "<li>Pollue l'eau et la rend dangereuse pour la santé</li>";
    corrections += "<li>Expose à des maladies comme la bilharziose, l'onchocercose, l'ulcère de Buruli</li>";
    corrections += "<li>Peut causer des diarrhées, du choléra ou d'autres infections</li>";
    corrections += "<li>Contamine l'eau pour les autres usagers</li>";
    corrections += "</ul>";
    
    corrections += "<h5>Situation 2 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong></p>";
    corrections += "<p>L'invitation à consommer des poissons ramassés sur une plage polluée par une nappe noire de pétrole, avec des poissons et crustacés morts.</p>";
    
    corrections += "<p><strong>2. Causes de la pollution des points d'eau :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>Rejets domestiques :</strong> Eaux usées, déchets ménagers</li>";
    corrections += "<li><strong>Rejets agricoles :</strong> Pesticides, engrais chimiques</li>";
    corrections += "<li><strong>Rejets industriels :</strong> Hydrocarbures, produits chimiques, métaux lourds</li>";
    corrections += "<li><strong>Déversements accidentels :</strong> Comme la nappe de pétrole dans cette situation</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Justification du refus :</strong></p>";
    corrections += "<p>La consommation de ces poissons présente des dangers graves :</p>";
    corrections += "<ul>";
    corrections += "<li>Les poissons morts à cause de la pollution peuvent être toxiques</li>";
    corrections += "<li>Ils peuvent contenir des produits chimiques dangereux pour la santé</li>";
    corrections += "<li>Leur consommation peut provoquer des intoxications alimentaires graves</li>";
    corrections += "<li>Dans les cas extrêmes, cela peut entraîner la mort</li>";
    corrections += "</ul>";
    corrections += "<p>Il est donc essentiel de refuser ce repas et d'alerter les autorités sur la pollution.</p>";
    
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