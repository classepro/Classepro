// JAVASCRIPT COMPLET AVEC MODALES AMÉLIORÉES

// Variables pour suivre la progression
let progress = 0;
const totalExercises = 14;

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

// Fonctions pour les exercices interactifs avec modales améliorées
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
    const checkboxes = [
        { id: 'a2-a', correct: true, label: 'La pisciculture' },
        { id: 'a2-b', correct: true, label: 'L\'aviculture' },
        { id: 'a2-c', correct: false, label: 'La production de chocolat' },
        { id: 'a2-d', correct: true, label: 'La culture de l\'anacarde' },
        { id: 'a2-e', correct: false, label: 'La vente de banane' },
        { id: 'a2-f', correct: false, label: 'Le transport' }
    ];
    
    let correctCount = 0;
    let totalCorrect = 3; // Il y a 3 bonnes réponses
    
    // Vérifier chaque case
    checkboxes.forEach(item => {
        const checkbox = document.getElementById(item.id);
        const isChecked = checkbox.checked;
        
        if (isChecked === item.correct) {
            correctCount++;
        }
    });
    
    if (correctCount === 6) { // Toutes les réponses sont correctes
        showSuccessModal(
            '🌟 Parfait !',
            'Tu as parfaitement identifié les activités du secteur primaire.',
            'Tu maîtrises bien la distinction entre les différents secteurs économiques.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (correctCount >= 4) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as ${correctCount}/6 réponses correctes.`,
            'Tu progresses bien dans la compréhension du secteur primaire.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as ${correctCount}/6 réponses correctes.`,
            'Relis bien la définition du secteur primaire et les exemples d\'activités.'
        );
    }
}

function checkCompletion() {
    const mot1 = document.getElementById('mot1').value.trim().toLowerCase();
    const mot2 = document.getElementById('mot2').value.trim().toLowerCase();
    const mot3 = document.getElementById('mot3').value.trim().toLowerCase();
    
    const correct1 = 'secteur primaire';
    const correct2 = 'production';
    const correct3 = 'végétales';
    
    let score = 0;
    let feedback = '';
    
    if (mot1 === correct1 || mot1 === 'primaire') {
        score++;
        feedback += '<p>✓ <strong>Premier mot :</strong> Correct !</p>';
    } else {
        feedback += '<p>✗ <strong>Premier mot :</strong> Pense au secteur dont on parle dans cette leçon.</p>';
    }
    
    if (mot2 === correct2) {
        score++;
        feedback += '<p>✓ <strong>Deuxième mot :</strong> Correct !</p>';
    } else {
        feedback += '<p>✗ <strong>Deuxième mot :</strong> C\'est l\'action de créer, de fabriquer.</p>';
    }
    
    if (mot3 === correct3) {
        score++;
        feedback += '<p>✓ <strong>Troisième mot :</strong> Correct !</p>';
    } else {
        feedback += '<p>✗ <strong>Troisième mot :</strong> Opposé d\'animales.</p>';
    }
    
    if (score === 3) {
        showSuccessModal(
            '💡 Définition maîtrisée !',
            'Tu as parfaitement complété la définition du secteur primaire.',
            feedback
        );
        updateProgress();
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '🔍 Presque parfait !',
            'Tu as bien complété la définition.',
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '🧠 À revoir',
            'Relis bien la définition du secteur primaire.',
            feedback
        );
    }
}

function checkOrdering() {
    const steps = {
        'step1': { value: document.getElementById('step1').value, correct: '3', label: 'Prospection du marché' },
        'step2': { value: document.getElementById('step2').value, correct: '5', label: 'Estimation du capital' },
        'step3': { value: document.getElementById('step3').value, correct: '1', label: 'Identification du projet' },
        'step4': { value: document.getElementById('step4').value, correct: '2', label: 'Connaissance ou maîtrise de l\'activité' },
        'step5': { value: document.getElementById('step5').value, correct: '4', label: 'Choix du site' }
    };
    
    let score = 0;
    let feedback = '';
    
    // Vérifier chaque étape
    for (const [key, step] of Object.entries(steps)) {
        if (step.value === step.correct) {
            score++;
            feedback += `<p>✓ <strong>${step.label}</strong> : Bon ordre (${step.correct})</p>`;
        } else if (step.value === '') {
            feedback += `<p>✗ <strong>${step.label}</strong> : Tu n'as pas choisi d'ordre</p>`;
        } else {
            feedback += `<p>✗ <strong>${step.label}</strong> : Mauvais ordre (tu as mis ${step.value}, il fallait ${step.correct})</p>`;
        }
    }
    
    if (score === 5) {
        showSuccessModal(
            '🎯 Ordre parfait !',
            'Tu as parfaitement ordonné les étapes de création d\'une activité.',
            feedback
        );
        updateProgress();
        updateProgress();
    } else if (score >= 3) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as ${score}/5 étapes dans le bon ordre.`,
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '📝 À revoir',
            `Tu as ${score}/5 étapes dans le bon ordre.`,
            'Relis bien les 5 étapes de création d\'une activité du secteur primaire.'
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
    
    // Vérifier si toutes les questions sont remplies
    if (!eval1_1 || !eval1_2 || !eval1_3 || !eval2_1 || !eval2_2 || !eval2_3) {
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
    let maxScore = 12; // 6 questions × 2 points chacune
    let feedback = '';
    
    // Évaluation question par question
    // Question 1.1
    if (eval1_1.length > 10 && (eval1_1.includes('exhortation') || eval1_1.includes('intéresser') || eval1_1.includes('secteur primaire') || eval1_1.includes('études') || eval1_1.includes('agriculteur'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1.1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.1 :</strong> Tu as compris l\'idée, tu peux préciser davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.1 :</strong> Le problème est lié à l\'attitude des camarades face aux activités du secteur primaire.</p>';
    }
    
    // Question 1.2
    const avantages = ['autonome', 'considération', 'charges', 'chômage', 'pauvreté', 'développement', 'paix', 'qualité de vie'];
    let avantagesTrouves = 0;
    avantages.forEach(avantage => {
        if (eval1_2.toLowerCase().includes(avantage)) avantagesTrouves++;
    });
    
    if (avantagesTrouves >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1.2 :</strong> Excellente énumération d\'avantages.</p>';
    } else if (avantagesTrouves >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.2 :</strong> Tu as cité un avantage, il en fallait deux.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.2 :</strong> Pense aux avantages individuels, communautaires ou pour l\'État.</p>';
    }
    
    // Question 1.3
    if (eval1_3.length > 30 && (eval1_3.includes('opportunité') || eval1_3.includes('emploi') || eval1_3.includes('développement') || eval1_3.includes('avenir') || eval1_3.includes('important'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1.3 :</strong> Excellente justification de ton intérêt.</p>';
    } else if (eval1_3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.3 :</strong> Bon début de justification, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.3 :</strong> Pense à expliquer pourquoi ces activités sont importantes pour toi et pour le pays.</p>';
    }
    
    // Question 2.1
    if (eval2_1.length > 10 && (eval2_1.includes('financement') || eval2_1.includes('projet') || eval2_1.includes('formation') || eval2_1.includes('argent') || eval2_1.includes('oncle'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2.1 :</strong> Bonne identification du problème.</p>';
    } else if (eval2_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.1 :</strong> Tu as compris l\'idée, précise le problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.1 :</strong> Le problème est lié au financement du projet de formation.</p>';
    }
    
    // Question 2.2
    const etapes = ['identification', 'connaissance', 'maîtrise', 'prospection', 'marché', 'choix', 'site', 'estimation', 'capital'];
    let etapesTrouvees = 0;
    etapes.forEach(etape => {
        if (eval2_2.toLowerCase().includes(etape)) etapesTrouvees++;
    });
    
    if (etapesTrouvees >= 3) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2.2 :</strong> Parfaite énumération des étapes.</p>';
    } else if (etapesTrouvees >= 2) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.2 :</strong> Tu as cité deux étapes, il en fallait trois.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.2 :</strong> Pense aux 5 étapes de création d\'une activité.</p>';
    }
    
    // Question 2.3
    if (eval2_3.length > 30 && (eval2_3.includes('accompagner') || eval2_3.includes('aide') || eval2_3.includes('soutien') || eval2_3.includes('ami') || eval2_3.includes('important') || eval2_3.includes('projet'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2.3 :</strong> Excellente justification de ta décision.</p>';
    } else if (eval2_3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.3 :</strong> Bonne justification, tu peux développer davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.3 :</strong> Explique pourquoi c\'est important d\'aider ton ami dans son projet.</p>';
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
    
    corrections += "<p><strong>Situation d'évaluation 1 :</strong></p>";
    corrections += "<p>1. <strong>Identification du problème :</strong> L'exhortation à s'intéresser aux activités du secteur primaire et le refus de certains camarades qui estiment ne pas faire des études pour devenir agriculteurs ou éleveurs.</p>";
    corrections += "<p>2. <strong>Deux avantages des activités du secteur primaire :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Faire face aux charges de sa famille</li>";
    corrections += "<li>Lutter contre la pauvreté</li>";
    corrections += "<li>Favoriser le développement</li>";
    corrections += "<li>Préserver la paix</li>";
    corrections += "<li>Réduire le chômage</li>";
    corrections += "</ul>";
    corrections += "<p>3. <strong>Justification de l'intérêt :</strong> Les activités du secteur primaire offrent beaucoup d'opportunités d'emplois et participent ainsi à la réduction du taux de chômage. Elles luttent contre la pauvreté et favorisent également le bien-être individuel et social.</p>";
    
    corrections += "<p><strong>Situation d'évaluation 2 :</strong></p>";
    corrections += "<p>1. <strong>Identification du problème :</strong> Le financement d'une activité du secteur primaire (la formation en élevage d'escargot et d'agouti).</p>";
    corrections += "<p>2. <strong>Trois étapes de la création des activités du secteur primaire :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Identification du projet</li>";
    corrections += "<li>Connaissance ou maîtrise de l'activité</li>";
    corrections += "<li>Prospection du marché</li>";
    corrections += "<li>Choix du site</li>";
    corrections += "<li>Estimation du capital</li>";
    corrections += "</ul>";
    corrections += "<p>3. <strong>Justification de la décision :</strong> Les activités du secteur primaire permettent : d'être autonome, faire face aux charges de sa famille, de réduire le chômage, de favoriser le développement. Accompagner son ami montre de la solidarité et permet de soutenir un projet utile.</p>";
    
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