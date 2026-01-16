// JAVASCRIPT COMPLET AVEC MODALES AMÉLIORÉES

// Variables pour suivre la progression
let progress = 0;
const totalExercises = 16;

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
            'Clique sur "VRAI" ou "FAUX" pour choisir ta réponse.'
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

function checkManifestations() {
    const checkboxes = [
        { id: 'a1-1', correct: true, label: 'La volonté d\'affirmation' },
        { id: 'a1-2', correct: false, label: 'L\'attitude docile' },
        { id: 'a1-3', correct: false, label: 'Le sommeil plus profond' },
        { id: 'a1-4', correct: true, label: 'L\'apparition des seins' },
        { id: 'a1-5', correct: false, label: 'Le souci de respecter les règles sociales' },
        { id: 'a1-6', correct: true, label: 'L\'élargissement du bassin chez la jeune fille' },
        { id: 'a1-7', correct: false, label: 'Le dégoût pour les aliments' },
        { id: 'a1-8', correct: true, label: 'L\'apparition des poils' },
        { id: 'a1-9', correct: true, label: 'Les pollutions nocturnes' },
        { id: 'a1-10', correct: true, label: 'Les menstrues' }
    ];
    
    let correctCount = 0;
    let totalCorrect = 6; // Il y a 6 bonnes réponses
    
    // Vérifier chaque case
    checkboxes.forEach(item => {
        const checkbox = document.getElementById(item.id);
        const isChecked = checkbox.checked;
        
        if (isChecked === item.correct) {
            correctCount++;
        }
    });
    
    if (correctCount === 10) { // Toutes les réponses sont correctes
        showSuccessModal(
            '🌟 Parfait !',
            'Tu as parfaitement identifié les manifestations de la puberté.',
            'Tu maîtrises bien les différents types de changements pendant cette période.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (correctCount >= 8) {
        showSuccessModal(
            '👍 Excellent travail !',
            `Tu as ${correctCount}/10 réponses correctes.`,
            'Tu as une très bonne compréhension des manifestations de la puberté.'
        );
        updateProgress();
        updateProgress();
    } else if (correctCount >= 6) {
        showSuccessModal(
            '👌 Bon travail !',
            `Tu as ${correctCount}/10 réponses correctes.`,
            'Tu progresses bien dans la compréhension de la puberté.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as ${correctCount}/10 réponses correctes.`,
            'Relis bien la partie sur les manifestations physiques, physiologiques et psychologiques de la puberté.'
        );
    }
}

function checkFilles() {
    const checkboxes = [
        { id: 'a3-1', correct: true, label: 'L\'apparition des seins' },
        { id: 'a3-2', correct: false, label: 'L\'allongement du corps' },
        { id: 'a3-3', correct: false, label: 'L\'élargissement des épaules' },
        { id: 'a3-4', correct: false, label: 'La voix devient grave' },
        { id: 'a3-5', correct: true, label: 'Les règles ou menstrues' },
        { id: 'a3-6', correct: true, label: 'L\'élargissement du bassin' },
        { id: 'a3-7', correct: false, label: 'Les pollutions nocturnes' }
    ];
    
    let correctCount = 0;
    let totalCorrect = 3; // Il y a 3 bonnes réponses spécifiques aux filles
    
    // Vérifier chaque case
    checkboxes.forEach(item => {
        const checkbox = document.getElementById(item.id);
        const isChecked = checkbox.checked;
        
        if (isChecked === item.correct) {
            correctCount++;
        }
    });
    
    if (correctCount === 7) { // Toutes les réponses sont correctes
        showSuccessModal(
            '🌟 Parfait !',
            'Tu as parfaitement identifié les manifestations spécifiques à la jeune fille.',
            'Tu fais bien la différence entre les changements chez la fille et chez le garçon.'
        );
        updateProgress();
        updateProgress();
    } else if (correctCount >= 5) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as ${correctCount}/7 réponses correctes.`,
            'Tu as une bonne compréhension des différences entre filles et garçons pendant la puberté.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as ${correctCount}/7 réponses correctes.`,
            'Relis bien la partie sur les manifestations spécifiques à la jeune fille.'
        );
    }
}

function checkClassificationRegles() {
    // Définir les réponses correctes
    const correctAnswers = {
        'a': { ind: false, fam: false, com: true }, // Éviter les mauvaises fréquentations = communautaire
        'b': { ind: true, fam: false, com: false }, // Porter des vêtements décents = individuelle
        'c': { ind: false, fam: true, com: false }, // Se confier aux parents = familiale
        'd': { ind: true, fam: false, com: false }, // S'abstenir de tout rapport sexuel = individuelle
        'e': { ind: false, fam: true, com: false }, // Respecter les parents = familiale
        'f': { ind: false, fam: false, com: true }  // Pratiquer des jeux sains = communautaire
    };
    
    let score = 0;
    let maxScore = 6; // 6 règles à classer
    
    // Vérifier chaque règle
    for (const [rule, correct] of Object.entries(correctAnswers)) {
        const ind = document.getElementById(`r4-${rule}-ind`).checked;
        const fam = document.getElementById(`r4-${rule}-fam`).checked;
        const com = document.getElementById(`r4-${rule}-com`).checked;
        
        if (ind === correct.ind && fam === correct.fam && com === correct.com) {
            score++;
        }
    }
    
    if (score === maxScore) {
        showSuccessModal(
            '🎯 Classification parfaite !',
            `Tu as bien classé ${score}/${maxScore} règles de bonne conduite.`,
            'Tu maîtrises parfaitement la distinction entre vie individuelle, familiale et communautaire.'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 4) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as classé ${score}/${maxScore} règles correctement.`,
            'Tu progresses bien dans la compréhension des différents types de règles de conduite.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📝 À revoir',
            `Tu as classé ${score}/${maxScore} règles correctement.`,
            'Relis bien la partie sur les règles de vie individuelle, familiale et communautaire.'
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
    const eval3_1 = document.getElementById('eval3-1').value.trim();
    const eval3_2 = document.getElementById('eval3-2').value.trim();
    const eval3_3 = document.getElementById('eval3-3').value.trim();
    
    // Vérifier si toutes les questions sont remplies
    if (!eval1_1 || !eval1_2 || !eval1_3 || !eval2_1 || !eval2_2 || !eval2_3 || !eval3_1 || !eval3_2 || !eval3_3) {
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
    let maxScore = 18; // 9 questions × 2 points chacune
    let feedback = '';
    
    // Évaluation question par question
    // Situation 1
    if (eval1_1.length > 10 && (eval1_1.includes('braver') || eval1_1.includes('instruction') || eval1_1.includes('proviseur') || eval1_1.includes('désobéir'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 1 :</strong> Tu as compris l\'idée, tu peux préciser davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 1 :</strong> Le problème est lié au refus de respecter les instructions du proviseur.</p>';
    }
    
    // Question 1.2
    const consequences1 = ['alcool', 'drogue', 'sexuel', 'accident', 'blessure', 'retard', 'absence', 'problème', 'danger'];
    let consequencesTrouvees1 = 0;
    consequences1.forEach(consequence => {
        if (eval1_2.toLowerCase().includes(consequence)) consequencesTrouvees1++;
    });
    
    if (consequencesTrouvees1 >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 2 :</strong> Excellente énumération de conséquences.</p>';
    } else if (consequencesTrouvees1 >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 2 :</strong> Tu as cité une conséquence, il en fallait deux.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 2 :</strong> Pense aux risques d\'accident, de consommation, de relations précoces.</p>';
    }
    
    // Question 1.3
    if (eval1_3.length > 30 && (eval1_3.includes('responsable') || eval1_3.includes('respect') || eval1_3.includes('règles') || eval1_3.includes('comportement') || eval1_3.includes('épanouissement'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 3 :</strong> Excellente justification de ton refus.</p>';
    } else if (eval1_3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 3 :</strong> Bon début de justification, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 3 :</strong> Pense à expliquer l\'importance d\'avoir des comportements responsables.</p>';
    }
    
    // Situation 2
    if (eval2_1.length > 10 && (eval2_1.includes('hygiène') || eval2_1.includes('corporelle') || eval2_1.includes('propre') || eval2_1.includes('laver'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval2_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 1 :</strong> Tu as compris l\'idée, précise le problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 1 :</strong> Le problème est lié au manque d\'hygiène corporelle.</p>';
    }
    
    // Question 2.2
    const reglesIndividuelles = ['laver', 'douche', 'propre', 'vêtement', 'décent', 'abstenir', 'sexuel', 'alcool', 'tabac', 'drogue'];
    let reglesTrouvees = 0;
    reglesIndividuelles.forEach(regle => {
        if (eval2_2.toLowerCase().includes(regle)) reglesTrouvees++;
    });
    
    if (reglesTrouvees >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 2 :</strong> Parfaite énumération des règles individuelles.</p>';
    } else if (reglesTrouvees >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 2 :</strong> Tu as cité une règle, il en fallait deux.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 2 :</strong> Pense aux règles d\'hygiène et de comportement individuel.</p>';
    }
    
    // Question 2.3
    if (eval2_3.length > 30 && (eval2_3.includes('comprendre') || eval2_3.includes('importance') || eval2_3.includes('hygiène') || eval2_3.includes('maladie') || eval2_3.includes('infection') || eval2_3.includes('aide'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 3 :</strong> Excellente justification de ta décision.</p>';
    } else if (eval2_3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 3 :</strong> Bonne justification, tu peux développer davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 3 :</strong> Explique pourquoi c\'est important de comprendre l\'importance de l\'hygiène.</p>';
    }
    
    // Situation 3
    if (eval3_1.length > 10 && (eval3_1.includes('interdiction') || eval3_1.includes('sexuel') || eval3_1.includes('rapport') || eval3_1.includes('relation') || eval3_1.includes('mariage'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 3 - Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval3_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 3 - Question 1 :</strong> Tu as compris l\'idée, précise le problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 3 - Question 1 :</strong> Le problème est lié à l\'interdiction des rapports sexuels avant le mariage.</p>';
    }
    
    // Question 3.2
    const consequencesSexuelles = ['grossesse', 'précoce', 'IST', 'infection', 'maladie', 'sida', 'VIH', 'abandon', 'scolaire', 'traumatisme'];
    let consequencesTrouvees3 = 0;
    consequencesSexuelles.forEach(consequence => {
        if (eval3_2.toLowerCase().includes(consequence)) consequencesTrouvees3++;
    });
    
    if (consequencesTrouvees3 >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 3 - Question 2 :</strong> Excellente énumération des conséquences.</p>';
    } else if (consequencesTrouvees3 >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 3 - Question 2 :</strong> Tu as cité une conséquence, il en fallait deux.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 3 - Question 2 :</strong> Pense aux grossesses précoces et aux infections sexuellement transmissibles.</p>';
    }
    
    // Question 3.3
    if (eval3_3.length > 30 && (eval3_3.includes('accompagner') || eval3_3.includes('aide') || eval3_3.includes('soutien') || eval3_3.includes('comprendre') || eval3_3.includes('autorité') || eval3_3.includes('parent') || eval3_3.includes('éviter'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 3 - Question 3 :</strong> Excellente justification de ta décision.</p>';
    } else if (eval3_3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 3 - Question 3 :</strong> Bonne justification, tu peux développer davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 3 - Question 3 :</strong> Explique pourquoi c\'est important d\'aider ton amie à comprendre la position de ses parents.</p>';
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
    corrections += "<p>1. <strong>Identification du problème :</strong> L'intention de braver les instructions du proviseur (ne pas rentrer tôt à la maison comme demandé).</p>";
    corrections += "<p>2. <strong>Deux conséquences possibles :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Des rapports sexuels précoces</li>";
    corrections += "<li>La consommation d'alcool, de tabac ou de drogues</li>";
    corrections += "<li>Des accidents ou blessures</li>";
    corrections += "<li>Des retards ou absences scolaires</li>";
    corrections += "<li>Des problèmes avec la famille</li>";
    corrections += "</ul>";
    corrections += "<p>3. <strong>Justification du refus :</strong> Je refuse de les suivre car nous devons avoir des comportements responsables pour notre épanouissement. Respecter les consignes des adultes nous protège des dangers et nous aide à grandir sainement.</p>";
    
    corrections += "<p><strong>Situation d'évaluation 2 :</strong></p>";
    corrections += "<p>1. <strong>Identification du problème :</strong> Le manque d'hygiène corporelle et le refus d'accepter les remarques des parents.</p>";
    corrections += "<p>2. <strong>Deux règles de bonne conduite individuelles :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Se laver régulièrement</li>";
    corrections += "<li>Laver ses sous-vêtements</li>";
    corrections += "<li>Porter des vêtements propres et décents</li>";
    corrections += "<li>S'abstenir de tout rapport sexuel</li>";
    corrections += "</ul>";
    corrections += "<p>3. <strong>Justification de la décision :</strong> J'accepte de l'accompagner pour l'aider à comprendre le bien-fondé de l'hygiène corporelle. Ainsi, il pourra éviter les maladies, les infections et améliorer son bien-être. Le professeur pourra l'aider à comprendre l'importance de l'hygiène pendant la puberté.</p>";
    
    corrections += "<p><strong>Situation d'évaluation 3 :</strong></p>";
    corrections += "<p>1. <strong>Identification du problème :</strong> L'interdiction d'avoir des rapports sexuels avant le mariage et la frustration qui en résulte.</p>";
    corrections += "<p>2. <strong>Deux conséquences des rapports sexuels précoces :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Grossesse précoce</li>";
    corrections += "<li>Infections sexuellement transmissibles (IST)</li>";
    corrections += "<li>Traumatismes psychologiques</li>";
    corrections += "<li>Abandon scolaire</li>";
    corrections += "</ul>";
    corrections += "<p>3. <strong>Justification de la décision :</strong> J'accepte de l'accompagner car il ne faut pas rejeter l'autorité des parents. L'assistante sociale pourra l'aider à comprendre les risques des rapports sexuels précoces et l'importance d'attendre le bon moment. Éviter d'avoir des rapports sexuels précoces protège la santé et l'avenir.</p>";
    
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