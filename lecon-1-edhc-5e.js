// JAVASCRIPT COMPLET AVEC MODALES AMÉLIORÉES

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

// Fonctions pour les exercices interactifs avec modales améliorées

// Vérification Vrai/Faux
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

// Vérification classification
function checkClassification() {
    const developpement = document.getElementById('developpement').value.toLowerCase();
    const participation = document.getElementById('participation').value.toLowerCase();
    
    // Réponses attendues
    const devAttendus = ['b', 'éducation', 'c', 'culturelles'];
    const partAttendus = ['a', 'exprimer', 'opinions', 'd', 'informations', 'droits'];
    
    let scoreDev = 0;
    let scorePart = 0;
    
    // Vérifier les droits au développement
    devAttendus.forEach(terme => {
        if (developpement.includes(terme)) scoreDev++;
    });
    
    // Vérifier les droits à la participation
    partAttendus.forEach(terme => {
        if (participation.includes(terme)) scorePart++;
    });
    
    const totalScore = scoreDev + scorePart;
    const maxScore = 4; // 4 droits à classer
    
    if (totalScore >= 4) {
        showSuccessModal(
            '🌟 Classification parfaite !',
            `Tu as bien classé tous les droits (${totalScore}/${maxScore}).`,
            'Tu maîtrises parfaitement la distinction entre droits au développement et droits à la participation.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (totalScore >= 2) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as classé ${totalScore}/${maxScore} droits correctement.`,
            'Tu progresses bien dans la compréhension des différents types de droits.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as classé ${totalScore}/${maxScore} droits correctement.`,
            'Consulte les corrections pour mieux comprendre la différence entre droits au développement et droits à la participation.'
        );
    }
}

// Vérification violations
function checkViolations() {
    const q3a = document.querySelector('input[name="q3-a"]:checked');
    const q3b = document.querySelector('input[name="q3-b"]:checked');
    const q3c = document.querySelector('input[name="q3-c"]:checked');
    const q3d = document.querySelector('input[name="q3-d"]:checked');
    
    if (!q3a || !q3b || !q3c || !q3d) {
        showErrorModal(
            'Réponses incomplètes',
            'Tu dois répondre à toutes les questions avant de vérifier.',
            'Coche "Violation" ou "Pas une violation" pour chaque situation.'
        );
        return;
    }
    
    let score = 0;
    
    // Vérifications
    if (q3a.value === 'oui') score++; // a) Interdire l'école = violation
    if (q3b.value === 'oui') score++; // b) Interdire amis de sexe opposé = violation
    if (q3c.value === 'non') score++; // c) Interdire de sortir tard = pas violation
    if (q3d.value === 'non') score++; // d) Interdire un gang = pas violation
    
    const maxScore = 4;
    
    if (score >= 4) {
        showSuccessModal(
            '💡 Parfaitement compris !',
            `Tu as identifié correctement ${score}/${maxScore} situations.`,
            'Tu sais bien faire la différence entre une violation des droits et une mesure de protection légitime.'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '🔍 Bon début !',
            `Tu as identifié ${score}/${maxScore} situations correctement.`,
            'Continue à réfléchir : certaines interdictions sont des protections, pas des violations.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '🧠 À approfondir',
            `Tu as identifié ${score}/${maxScore} situations correctement.`,
            'Rappelle-toi : toutes les interdictions ne sont pas des violations. Certaines protègent l\'enfant.'
        );
    }
}

// Vérification texte à compléter
function checkComplet() {
    const mot1 = document.getElementById('mot1').value.trim().toLowerCase();
    const mot2 = document.getElementById('mot2').value.trim().toLowerCase();
    const mot3 = document.getElementById('mot3').value.trim().toLowerCase();
    const mot4 = document.getElementById('mot4').value.trim().toLowerCase();
    
    if (!mot1 || !mot2 || !mot3 || !mot4) {
        showErrorModal(
            'Texte incomplet',
            'Tu dois remplir tous les champs avant de vérifier.',
            'Utilise les mots proposés : croissance, santé, éducation, liberté'
        );
        return;
    }
    
    let score = 0;
    let feedback = '';
    
    // Vérifier chaque mot
    if (mot1.includes('éducation') || mot1.includes('education')) {
        score++;
        feedback += '<p>✓ <strong>Mot 1 :</strong> Correct !</p>';
    } else {
        feedback += '<p>✗ <strong>Mot 1 :</strong> Le développement passe par l\'éducation</p>';
    }
    
    if (mot2.includes('croissance')) {
        score++;
        feedback += '<p>✓ <strong>Mot 2 :</strong> Correct !</p>';
    } else {
        feedback += '<p>✗ <strong>Mot 2 :</strong> C\'est la croissance qui doit être harmonieuse</p>';
    }
    
    if (mot3.includes('santé') || mot3.includes('sante')) {
        score++;
        feedback += '<p>✓ <strong>Mot 3 :</strong> Correct !</p>';
    } else {
        feedback += '<p>✗ <strong>Mot 3 :</strong> L\'épanouissement nécessite une bonne santé</p>';
    }
    
    if (mot4.includes('liberté') || mot4.includes('liberte')) {
        score++;
        feedback += '<p>✓ <strong>Mot 4 :</strong> Correct !</p>';
    } else {
        feedback += '<p>✗ <strong>Mot 4 :</strong> C\'est la liberté d\'expression qui est importante</p>';
    }
    
    const maxScore = 4;
    
    if (score >= 4) {
        showSuccessModal(
            '📝 Parfait !',
            `Tu as trouvé ${score}/${maxScore} mots correctement.`,
            feedback
        );
        updateProgress();
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '👍 Presque !',
            `Tu as trouvé ${score}/${maxScore} mots correctement.`,
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as trouvé ${score}/${maxScore} mots correctement.`,
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
    let score = 0;
    let maxScore = 0;
    let feedback = '<h4>Corrections détaillées :</h4>';
    
    // Évaluation 1
    const eval1_1 = document.getElementById('eval1-1').value.trim();
    const eval1_2 = document.getElementById('eval1-2').value.trim();
    const eval1_3 = document.getElementById('eval1-3').value.trim();
    
    // Évaluation 2
    const eval2_1 = document.getElementById('eval2-1').value.trim();
    const eval2_2 = document.getElementById('eval2-2').value.trim();
    const eval2_3 = document.getElementById('eval2-3').value.trim();
    
    // Évaluation 3
    const eval3_1 = document.getElementById('eval3-1').value.trim();
    const eval3_2 = document.getElementById('eval3-2').value.trim();
    const eval3_3 = document.getElementById('eval3-3').value.trim();
    
    // Vérifier si toutes les réponses sont remplies
    if (!eval1_1 || !eval1_2 || !eval1_3 || !eval2_1 || !eval2_2 || !eval2_3 || !eval3_1 || !eval3_2 || !eval3_3) {
        showErrorModal(
            'Évaluation incomplète',
            'Tu dois répondre à toutes les questions des 3 situations avant de soumettre.',
            'Reviens compléter les réponses manquantes.'
        );
        return;
    }
    
    // Correction Situation 1
    maxScore += 3;
    feedback += '<h5>Situation 1 :</h5>';
    
    if (eval1_1.length > 10 && (eval1_1.includes('participation') || eval1_1.includes('expression') || eval1_1.includes('parole'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 1 :</strong> Bonne identification du problème</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est le non-respect du droit à la participation</p>';
    }
    
    if (eval1_2.length > 30 && eval1_2.includes('croissance') && eval1_2.includes('ouverture') && eval1_2.includes('compréhension')) {
        score += 1;
        feedback += '<p>✓ <strong>Question 2 :</strong> Excellente énumération des avantages</p>';
    } else if (eval1_2.length > 15) {
        score += 0.5;
        feedback += '<p>↔ <strong>Question 2 :</strong> Bon début, tu peux citer : croissance harmonieuse, ouverture d\'esprit, compréhension des réalités</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Les avantages sont : croissance harmonieuse, ouverture d\'esprit, compréhension des réalités</p>';
    }
    
    if (eval1_3.length > 20 && (eval1_3.includes('avis') || eval1_3.includes('exprimer') || eval1_3.includes('participer'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 3 :</strong> Bonne justification</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Justification : L\'enfant a le droit de donner son avis sur des questions familiales</p>';
    }
    
    // Correction Situation 2
    maxScore += 3;
    feedback += '<h5>Situation 2 :</h5>';
    
    if (eval2_1.length > 10 && eval2_1.includes('participation')) {
        score += 1;
        feedback += '<p>✓ <strong>Question 1 :</strong> Bonne identification du problème</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Problème : non-respect du droit à la participation</p>';
    }
    
    if (eval2_2.length > 20 && eval2_2.includes('expression') && eval2_2.includes('éducation')) {
        score += 1;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonne énumération des droits</p>';
    } else if (eval2_2.length > 10) {
        score += 0.5;
        feedback += '<p>↔ <strong>Question 2 :</strong> Bon début, tu peux citer : liberté d\'expression, liberté de pensée, droit à l\'éducation, droit à la santé</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Droits à citer : liberté d\'expression et de pensée (participation) ; droit à l\'éducation et à la santé (développement)</p>';
    }
    
    if (eval2_3.length > 30 && (eval2_3.includes('école') || eval2_3.includes('étudier') || eval2_3.includes('former'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellents conseils</p>';
    } else if (eval2_3.length > 15) {
        score += 0.5;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bon début, conseils : aller à l\'école pour se former, parler calmement avec ses parents</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Conseils : Aller à l\'école est essentiel pour son avenir, parler avec ses parents plutôt que de protester</p>';
    }
    
    // Correction Situation 3
    maxScore += 3;
    feedback += '<h5>Situation 3 :</h5>';
    
    if (eval3_1.length > 10 && eval3_1.includes('exclusion') || eval3_1.includes('bagarre')) {
        score += 1;
        feedback += '<p>✓ <strong>Question 1 :</strong> Bonne identification du problème</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Problème : exclusion d\'élèves suite à une bagarre</p>';
    }
    
    if (eval3_2.length > 10 && (eval3_2.includes('association') || eval3_2.includes('expression') || eval3_2.includes('opinion'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonne énumération des droits</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Droits à citer : liberté d\'association, liberté d\'opinion</p>';
    }
    
    if (eval3_3.length > 20 && eval3_3.includes('ouverture') || eval3_3.includes('comprendre')) {
        score += 1;
        feedback += '<p>✓ <strong>Question 3 :</strong> Bonne justification</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Justification : Le respect des droits à la participation permet l\'ouverture d\'esprit et la compréhension des réalités</p>';
    }
    
    const percentage = Math.round((score / maxScore) * 100);
    let message = '';
    let modalTitle = '';
    let modalMessage = '';
    
    if (percentage >= 80) {
        modalTitle = '🏆 Excellent travail !';
        modalMessage = `Tu as obtenu ${Math.round(score)}/${maxScore} points (${percentage}%).`;
        message = `🎉 Excellent ! ${Math.round(score)}/${maxScore} points (${percentage}%)`;
        createConfetti();
    } else if (percentage >= 60) {
        modalTitle = '👍 Bon travail !';
        modalMessage = `Tu as obtenu ${Math.round(score)}/${maxScore} points (${percentage}%).`;
        message = `👍 Bon travail ! ${Math.round(score)}/${maxScore} points (${percentage}%)`;
    } else if (percentage >= 40) {
        modalTitle = '✅ Assez bien !';
        modalMessage = `Tu as obtenu ${Math.round(score)}/${maxScore} points (${percentage}%).`;
        message = `✅ Assez bien ! ${Math.round(score)}/${maxScore} points (${percentage}%)`;
    } else {
        modalTitle = '📚 À revoir !';
        modalMessage = `Tu as obtenu ${Math.round(score)}/${maxScore} points (${percentage}%).`;
        message = `📚 À revoir ! ${Math.round(score)}/${maxScore} points (${percentage}%)`;
    }
    
    showSuccessModal(
        modalTitle,
        modalMessage,
        feedback
    );
    
    const scoreDisplay = document.getElementById('evalScore');
    const resultsDiv = document.getElementById('evalResults');
    const correctionsDiv = document.getElementById('evalCorrections');
    
    scoreDisplay.innerHTML = `<strong>${message}</strong>`;
    
    // Générer les corrections détaillées
    let corrections = "<h4>Réponses attendues :</h4>";
    
    corrections += "<p><strong>Situation 1 :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>1. Problème :</strong> Non-respect du droit à la participation de l'enfant</li>";
    corrections += "<li><strong>2. Avantages :</strong> Croissance harmonieuse, ouverture d'esprit, compréhension des réalités</li>";
    corrections += "<li><strong>3. Justification :</strong> L'enfant a le droit de donner son avis sur des questions familiales, cela participe à son développement</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>Situation 2 :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>1. Problème :</strong> Non-respect du droit à la participation</li>";
    corrections += "<li><strong>2. Droits :</strong> Participation : liberté d'expression, liberté de pensée. Développement : droit à l'éducation, droit à la santé</li>";
    corrections += "<li><strong>3. Conseils :</strong> Il est important d'aller à l'école pour se former, parler calmement avec ses parents plutôt que de protester</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>Situation 3 :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>1. Problème :</strong> Exclusion des élèves suite à une bagarre</li>";
    corrections += "<li><strong>2. Droits :</strong> Liberté d'association, liberté d'opinion</li>";
    corrections += "<li><strong>3. Justification :</strong> Le respect des droits à la participation permet à l'enfant d'avoir une ouverture d'esprit et de comprendre les réalités qui l'entourent</li>";
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