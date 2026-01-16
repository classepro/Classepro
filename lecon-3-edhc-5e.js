// JAVASCRIPT COMPLET AVEC MODALES AMÉLIORÉES

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

function checkClassification() {
    const consequencesH = document.getElementById('consequencesH').value.toLowerCase();
    const consequencesM = document.getElementById('consequencesM').value.toLowerCase();
    
    const humainesAttendues = ['mutilés', 'familles', 'séparées', 'populations', 'déplacées', 'morts'];
    const materiellesAttendues = ['terres', 'cultivables', 'détruites', 'destructions', 'maisons'];
    
    let scoreH = 0;
    let scoreM = 0;
    
    // Vérifier les conséquences humaines
    humainesAttendues.forEach(terme => {
        if (consequencesH.includes(terme)) scoreH++;
    });
    
    // Vérifier les conséquences matérielles
    materiellesAttendues.forEach(terme => {
        if (consequencesM.includes(terme)) scoreM++;
    });
    
    const totalScore = scoreH + scoreM;
    const maxScore = 6; // 6 conséquences à classer
    
    if (totalScore >= 5) {
        showSuccessModal(
            '🌟 Classification parfaite !',
            `Tu as bien classé ${totalScore}/${maxScore} conséquences.`,
            'Tu maîtrises parfaitement la distinction entre conséquences humaines et matérielles.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (totalScore >= 3) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as classé ${totalScore}/${maxScore} conséquences correctement.`,
            'Tu progresses bien dans la compréhension des différents types de conséquences.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as classé ${totalScore}/${maxScore} conséquences correctement.`,
            'Consulte les corrections pour mieux comprendre la différence entre conséquences humaines et matérielles.'
        );
    }
}

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

function checkActesHumanitaires() {
    const actes = ['acteA', 'acteB', 'acteC', 'acteD', 'acteE'];
    const reponses = actes.map(id => document.getElementById(id).checked);
    
    // Réponses correctes : B, C, D, E sont des actes humanitaires
    const correctes = [false, true, true, true, true];
    
    let score = 0;
    for (let i = 0; i < reponses.length; i++) {
        if (reponses[i] === correctes[i]) score++;
    }
    
    const maxScore = 5;
    
    if (score === maxScore) {
        showSuccessModal(
            '🎯 Parfait !',
            `Tu as identifié ${score}/${maxScore} actes humanitaires correctement.`,
            'Tu as parfaitement compris ce qu\'est un acte humanitaire.'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 3) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as identifié ${score}/${maxScore} actes humanitaires correctement.`,
            'Tu as bien compris l\'essentiel, continue à t\'entraîner.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📝 À revoir',
            `Tu as identifié ${score}/${maxScore} actes humanitaires correctement.`,
            'Rappelle-toi : un acte humanitaire vise à protéger la vie et la dignité des personnes en difficulté, sans distinction.'
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
            'Prends le temps de développer tes réponses pour chaque situation.'
        );
        return;
    }
    
    const resultsDiv = document.getElementById('evalResults');
    const scoreDisplay = document.getElementById('evalScore');
    const correctionsDiv = document.getElementById('evalCorrections');
    
    let score = 0;
    let maxScore = 12; // 6 questions × 2 points chacune
    let feedback = '';
    
    // Évaluation 1, Question 1
    if (eval1_1.length > 10 && (eval1_1.includes('vol') || eval1_1.includes('provisions') || eval1_1.includes('prendre') || eval1_1.includes('problème'))) {
        score += 2;
        feedback += '<p>✓ <strong>Éval 1 - Q1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Éval 1 - Q1 :</strong> Tu as compris qu\'il y a un problème, précise-le davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Éval 1 - Q1 :</strong> Le problème est le projet de vol des provisions destinées aux victimes.</p>';
    }
    
    // Évaluation 1, Question 2
    if (eval1_2.length > 20 && (eval1_2.includes('civils') || eval1_2.includes('prisonniers') || eval1_2.includes('soins') || eval1_2.includes('nourriture') || eval1_2.includes('humanitaire'))) {
        score += 2;
        feedback += '<p>✓ <strong>Éval 1 - Q2 :</strong> Bonne énumération des règles du DIH.</p>';
    } else if (eval1_2.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Éval 1 - Q2 :</strong> Tu as cité des règles, précise-les davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Éval 1 - Q2 :</strong> Exemples de règles : protéger les civils, assurer des soins aux prisonniers, ne pas bloquer l\'aide humanitaire.</p>';
    }
    
    // Évaluation 1, Question 3
    if (eval1_3.length > 30 && (eval1_3.includes('dangereux') || eval1_3.includes('dignité') || eval1_3.includes('humanité') || eval1_3.includes('solidarité') || eval1_3.includes('sanction'))) {
        score += 2;
        feedback += '<p>✓ <strong>Éval 1 - Q3 :</strong> Excellente justification de ton refus.</p>';
    } else if (eval1_3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Éval 1 - Q3 :</strong> Bon début de justification, développe tes arguments.</p>';
    } else {
        feedback += '<p>✗ <strong>Éval 1 - Q3 :</strong> Justifications possibles : comportement dangereux, manque d\'humanité, violation des règles, risques de sanctions.</p>';
    }
    
    // Évaluation 2, Question 1
    if (eval2_1.length > 10 && (eval2_1.includes('refus') || eval2_1.includes('accepter') || eval2_1.includes('réfugiés') || eval2_1.includes('empêcher'))) {
        score += 2;
        feedback += '<p>✓ <strong>Éval 2 - Q1 :</strong> Bonne identification du problème.</p>';
    } else if (eval2_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Éval 2 - Q1 :</strong> Tu as compris l\'enjeu, précise le problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Éval 2 - Q1 :</strong> Le problème est le refus des jeunes d\'accepter l\'installation des réfugiés.</p>';
    }
    
    // Évaluation 2, Question 2
    if (eval2_2.length > 30 && (eval2_2.includes('humain') && eval2_2.includes('matériel') && (eval2_2.includes('familles') || eval2_2.includes('morts') || eval2_2.includes('blessés') || eval2_2.includes('maisons') || eval2_2.includes('destruction')))) {
        score += 2;
        feedback += '<p>✓ <strong>Éval 2 - Q2 :</strong> Parfaite distinction entre conséquences humaines et matérielles.</p>';
    } else if (eval2_2.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Éval 2 - Q2 :</strong> Tu as compris les deux catégories, donne des exemples précis.</p>';
    } else {
        feedback += '<p>✗ <strong>Éval 2 - Q2 :</strong> Exemples : Humain = familles séparées, morts ; Matériel = destruction des maisons, pillage des biens.</p>';
    }
    
    // Évaluation 2, Question 3
    if (eval2_3.length > 25 && (eval2_3.includes('règles') || eval2_3.includes('protection') || eval2_3.includes('respecter') || eval2_3.includes('humanitaire'))) {
        score += 2;
        feedback += '<p>✓ <strong>Éval 2 - Q3 :</strong> Excellente justification basée sur les règles humanitaires.</p>';
    } else if (eval2_3.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Éval 2 - Q3 :</strong> Tu as raison de refuser, explique pourquoi avec des arguments solides.</p>';
    } else {
        feedback += '<p>✗ <strong>Éval 2 - Q3 :</strong> Justification : Il est important de respecter les règles de protection des victimes des conflits armés.</p>';
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
    let corrections = "<h4>Corrections détaillées :</h4>";
    
    corrections += "<p><strong>Situation d'évaluation 1 :</strong></p>";
    corrections += "<p>1. <strong>Problème posé :</strong> Le projet de vol des provisions destinées aux victimes de conflits armés.</p>";
    corrections += "<p>2. <strong>Deux règles du DIH :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Protéger les victimes (civils, blessés, prisonniers)</li>";
    corrections += "<li>Assurer des soins aux prisonniers de guerre</li>";
    corrections += "<li>Ne pas faire obstacle à la fourniture de secours humanitaires</li>";
    corrections += "<li>Donner de la nourriture, de l'eau, un abri aux personnes capturées</li>";
    corrections += "</ul>";
    corrections += "<p>3. <strong>Justification du refus :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Ce comportement met en danger la vie et la dignité des réfugiés</li>";
    corrections += "<li>C'est un acte qui manque d'humanité et de solidarité</li>";
    corrections += "<li>Ces actes peuvent être sanctionnés par la loi</li>";
    corrections += "<li>C'est une violation des règles du Droit International Humanitaire</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>Situation d'évaluation 2 :</strong></p>";
    corrections += "<p>1. <strong>Problème posé :</strong> Le refus des jeunes d'accepter les réfugiés dans leur quartier.</p>";
    corrections += "<p>2. <strong>Conséquences des conflits :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>Au plan humain :</strong> familles séparées, morts, blessés, traumatismes, orphelins</li>";
    corrections += "<li><strong>Au plan matériel :</strong> destruction des maisons, pillage des biens, terres cultivables détruites, écoles et hôpitaux bombardés</li>";
    corrections += "</ul>";
    corrections += "<p>3. <strong>Justification du refus :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Il est important de respecter les règles de protection des victimes des conflits armés</li>";
    corrections += "<li>Les réfugiés sont des victimes qui ont besoin d'aide et de protection</li>";
    corrections += "<li>Refuser de les aider serait manquer d'humanité et de solidarité</li>";
    corrections += "<li>C'est un acte humanitaire qui vise à protéger la vie et la dignité humaines</li>";
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