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
function checkDefinition() {
    const radios = document.getElementsByName('a1');
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
            'Choisis la définition correcte de l\'abstinence sexuelle.'
        );
        return;
    }
    
    if (selectedValue === 'b') {
        // Bonne réponse
        showSuccessModal(
            '🎉 Excellente réponse !',
            'Tu as bien compris la définition de l\'abstinence sexuelle.',
            'L\'abstinence sexuelle est effectivement le fait de ne pas avoir de rapports sexuels.'
        );
        updateProgress();
        
        // Colorer la bonne réponse
        radios.forEach(radio => {
            if (radio.value === 'b') {
                radio.parentElement.style.color = 'var(--success)';
                radio.parentElement.style.fontWeight = 'bold';
            }
        });
    } else {
        // Mauvaise réponse
        const correctAnswerText = 'b) le fait de ne pas avoir de rapports sexuels';
        let userAnswerText = '';
        
        switch(selectedValue) {
            case 'a': userAnswerText = 'a) le fait d\'avoir des rapports sexuels avec un seul partenaire'; break;
            case 'c': userAnswerText = 'c) le fait de ne pas parler des relations sexuelles'; break;
            case 'd': userAnswerText = 'd) le fait de lutter contre les viols'; break;
        }
        
        showErrorModal(
            'Presque !',
            `Ta réponse : <strong>${userAnswerText}</strong>`,
            `Relis bien la définition de l'abstinence sexuelle dans la leçon.`,
            `Réponse correcte : ${correctAnswerText}`
        );
        
        // Colorer les réponses
        radios.forEach(radio => {
            if (radio.value === 'b') {
                radio.parentElement.style.color = 'var(--success)';
                radio.parentElement.style.fontWeight = 'bold';
            } else if (radio.checked) {
                radio.parentElement.style.color = 'var(--warning)';
            }
        });
    }
}

function checkOrdering() {
    const steps = {
        'stepA': { value: document.getElementById('stepA').value, correct: '3', label: 'Prendre conseils auprès des autres' },
        'stepB': { value: document.getElementById('stepB').value, correct: '1', label: 'Identifier le problème' },
        'stepC': { value: document.getElementById('stepC').value, correct: '5', label: 'Appliquer la décision et assumer ses conséquences' },
        'stepD': { value: document.getElementById('stepD').value, correct: '4', label: 'Prendre la décision' },
        'stepE': { value: document.getElementById('stepE').value, correct: '2', label: 'Analyser le problème' }
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
            'Tu as parfaitement ordonné les étapes de prise de décision.',
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
            'Relis bien les 5 étapes de prise de décision dans la leçon.'
        );
    }
}

function checkClassification() {
    // Définir les réponses correctes
    const correctAnswers = {
        'c1': { ind: true, fam: false, soc: false }, // Porter des tenues décentes = individuel
        'c2': { ind: false, fam: true, soc: false }, // Respecter les parents = familial
        'c3': { ind: false, fam: false, soc: true }, // Visiter les lieux éducatifs = social
        'c4': { ind: false, fam: true, soc: false }, // Se confier aux parents = familial
        'c5': { ind: true, fam: false, soc: false }, // Respecter son corps = individuel
        'c6': { ind: true, fam: false, soc: false }, // S'occuper sainement = individuel
        'c7': { ind: false, fam: false, soc: true }  // Avoir de bonnes fréquentations = social
    };
    
    let score = 0;
    let maxScore = 7; // 7 comportements à classer
    
    // Vérifier chaque comportement
    for (let i = 1; i <= maxScore; i++) {
        const ind = document.getElementById(`c${i}-ind`).checked;
        const fam = document.getElementById(`c${i}-fam`).checked;
        const soc = document.getElementById(`c${i}-soc`).checked;
        const correct = correctAnswers[`c${i}`];
        
        if (ind === correct.ind && fam === correct.fam && soc === correct.soc) {
            score++;
        }
    }
    
    if (score === maxScore) {
        showSuccessModal(
            '🌟 Classification parfaite !',
            `Tu as bien classé ${score}/${maxScore} comportements.`,
            'Tu maîtrises parfaitement la distinction entre comportements individuels, familiaux et sociaux.'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 5) {
        showSuccessModal(
            '👍 Excellent travail !',
            `Tu as classé ${score}/${maxScore} comportements correctement.`,
            'Tu as une très bonne compréhension des différents types de comportements favorisant l\'abstinence.'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 3) {
        showSuccessModal(
            '👌 Bon travail !',
            `Tu as classé ${score}/${maxScore} comportements correctement.`,
            'Tu progresses bien dans la compréhension des comportements favorisant l\'abstinence.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as classé ${score}/${maxScore} comportements correctement.`,
            'Relis bien la partie sur les comportements et attitudes favorisant l\'abstinence sexuelle.'
        );
    }
}

function checkDefinitionChoice() {
    const d1 = document.getElementById('d1').checked;
    const d2 = document.getElementById('d2').checked;
    const d3 = document.getElementById('d3').checked;
    
    // La bonne réponse est uniquement la première case cochée
    if (d1 && !d2 && !d3) {
        showSuccessModal(
            '💡 Définition correcte !',
            'Tu as bien compris la définition précise de l\'abstinence sexuelle.',
            'L\'abstinence sexuelle est effectivement une pratique temporaire et volontaire.'
        );
        updateProgress();
        updateProgress();
    } else if (d2 || d3) {
        showErrorModal(
            '📝 À préciser',
            'Tu as choisi une définition incorrecte.',
            'L\'abstinence sexuelle n\'est pas d\'avoir des rapports avec un seul partenaire, ni de refuser pour toujours. C\'est se priver volontairement pendant un moment.',
            'Réponse correcte : se priver volontairement de rapports sexuels pendant un moment'
        );
    } else if (!d1 && !d2 && !d3) {
        showErrorModal(
            'Réponse manquante',
            'Tu dois cocher une réponse avant de vérifier.',
            'Choisis la définition correcte de l\'abstinence sexuelle.'
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
    const eval3_2a = document.getElementById('eval3-2a').value.trim();
    const eval3_2b = document.getElementById('eval3-2b').value.trim();
    const eval3_3 = document.getElementById('eval3-3').value.trim();
    
    // Vérifier si toutes les questions sont remplies
    if (!eval1_1 || !eval1_2 || !eval1_3 || !eval2_1 || !eval2_2 || !eval2_3 || !eval3_1 || !eval3_2a || !eval3_2b || !eval3_3) {
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
    let maxScore = 20; // 10 questions × 2 points chacune
    let feedback = '';
    
    // Évaluation question par question
    // Situation principale
    if (eval1_1.length > 10 && (eval1_1.includes('incitation') || eval1_1.includes('rapport') || eval1_1.includes('sexuel') || eval1_1.includes('précoce') || eval1_1.includes('moquerie'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation principale - Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Situation principale - Question 1 :</strong> Tu as compris l\'idée, tu peux préciser davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation principale - Question 1 :</strong> Le problème est lié à l\'incitation aux rapports sexuels précoces et à la moquerie.</p>';
    }
    
    // Question 1.2
    const consequences1 = ['VIH', 'SIDA', 'IST', 'infection', 'grossesse', 'précoce', 'maladie', 'santé'];
    let consequencesTrouvees1 = 0;
    consequences1.forEach(consequence => {
        if (eval1_2.toLowerCase().includes(consequence)) consequencesTrouvees1++;
    });
    
    if (consequencesTrouvees1 >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Situation principale - Question 2 :</strong> Excellente énumération de conséquences.</p>';
    } else if (consequencesTrouvees1 >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Situation principale - Question 2 :</strong> Tu as cité une conséquence, il en fallait deux.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation principale - Question 2 :</strong> Pense aux risques d\'infection au VIH/SIDA et aux grossesses précoces.</p>';
    }
    
    // Question 1.3
    if (eval1_3.length > 30 && (eval1_3.includes('jeune') || eval1_3.includes('âge') || eval1_3.includes('santé') || eval1_3.includes('épanouie') || eval1_3.includes('avenir') || eval1_3.includes('développement'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation principale - Question 3 :</strong> Excellente justification de ton refus.</p>';
    } else if (eval1_3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Situation principale - Question 3 :</strong> Bon début de justification, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation principale - Question 3 :</strong> Pense à expliquer que tu es trop jeune, que tu veux préserver ta santé et ton avenir.</p>';
    }
    
    // Situation 1
    if (eval2_1.length > 10 && (eval2_1.includes('proposition') || eval2_1.includes('rapport') || eval2_1.includes('sexuel') || eval2_1.includes('scolaire') || eval2_1.includes('aide') || eval2_1.includes('devoir'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval2_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 1 :</strong> Tu as compris l\'idée, précise le problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 1 :</strong> Le problème est la proposition de rapports sexuels en échange d\'aide scolaire.</p>';
    }
    
    // Question 2.2
    const comportements = ['tenue', 'décent', 'respecter', 'corps', 'occuper', 'sainement', 'confier', 'parent', 'fréquentation', 'bonne', 'visiter', 'éducatif'];
    let comportementsTrouves = 0;
    comportements.forEach(comportement => {
        if (eval2_2.toLowerCase().includes(comportement)) comportementsTrouves++;
    });
    
    if (comportementsTrouves >= 3) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 2 :</strong> Parfaite énumération des comportements.</p>';
    } else if (comportementsTrouves >= 2) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 2 :</strong> Tu as cité deux comportements, il en fallait trois.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 2 :</strong> Pense aux comportements individuels, familiaux et sociaux favorisant l\'abstinence.</p>';
    }
    
    // Question 2.3
    if (eval2_3.length > 30 && (eval2_3.includes('pratiquer') || eval2_3.includes('abstinence') || eval2_3.includes('préserver') || eval2_3.includes('santé') || eval2_3.includes('favoriser') || eval2_3.includes('épanouissement'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 3 :</strong> Excellente justification de ta décision.</p>';
    } else if (eval2_3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 3 :</strong> Bonne justification, tu peux développer davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 3 :</strong> Explique que l\'abstinence permet de préserver la santé et de favoriser l\'épanouissement.</p>';
    }
    
    // Situation 2
    if (eval3_1.length > 10 && (eval3_1.includes('rapport') || eval3_1.includes('sexuel') || eval3_1.includes('fille') || eval3_1.includes('mauvaise') || eval3_1.includes('fréquentation') || eval3_1.includes('volonté'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval3_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 1 :</strong> Tu as compris l\'idée, précise le problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 1 :</strong> Le problème est la volonté d\'avoir des rapports sexuels avec une fille de mauvaises fréquentations.</p>';
    }
    
    // Question 3.2a (individuel)
    const individuel = ['tenue', 'décent', 'respecter', 'corps', 'occuper', 'sainement'];
    let individuelTrouves = 0;
    individuel.forEach(item => {
        if (eval3_2a.toLowerCase().includes(item)) individuelTrouves++;
    });
    
    if (individuelTrouves >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 2a (individuel) :</strong> Excellente énumération.</p>';
    } else if (individuelTrouves >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 2a (individuel) :</strong> Tu as cité un comportement, il en fallait deux.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 2a (individuel) :</strong> Pense aux comportements individuels comme porter des tenues décentes ou respecter son corps.</p>';
    }
    
    // Question 3.2b (social)
    const social = ['fréquentation', 'bonne', 'visiter', 'éducatif', 'lieu'];
    let socialTrouves = 0;
    social.forEach(item => {
        if (eval3_2b.toLowerCase().includes(item)) socialTrouves++;
    });
    
    if (socialTrouves >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 2b (social) :</strong> Excellente énumération.</p>';
    } else if (socialTrouves >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 2b (social) :</strong> Tu as cité un comportement, il en fallait deux.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 2b (social) :</strong> Pense aux comportements sociaux comme avoir de bonnes fréquentations ou visiter des lieux éducatifs.</p>';
    }
    
    // Question 3.3
    if (eval3_3.length > 30 && (eval3_3.includes('refuser') || eval3_3.includes('accompagner') || eval3_3.includes('pratiquer') || eval3_3.includes('abstinence') || eval3_3.includes('préserver') || eval3_3.includes('santé') || eval3_3.includes('réussite') || eval3_3.includes('épanouissement'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 3 :</strong> Excellente justification de ton refus.</p>';
    } else if (eval3_3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 3 :</strong> Bonne justification, tu peux développer davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 3 :</strong> Explique que l\'abstinence permet de préserver la santé, réussir à l\'école et s\'épanouir.</p>';
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
    
    corrections += "<p><strong>Situation d'évaluation principale :</strong></p>";
    corrections += "<p>1. <strong>Identification du problème :</strong> L'incitation au rapport sexuel précoce et la moquerie à propos de l'abstinence.</p>";
    corrections += "<p>2. <strong>Deux conséquences possibles :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Des risques d'infection au VIH/SIDA</li>";
    corrections += "<li>Des risques de grossesses précoces</li>";
    corrections += "<li>Des infections sexuellement transmissibles (IST)</li>";
    corrections += "<li>Des traumatismes psychologiques</li>";
    corrections += "</ul>";
    corrections += "<p>3. <strong>Justification du refus :</strong> Je refuse car je suis beaucoup trop jeune pour avoir des rapports sexuels. Je dois éviter les rapports sexuels afin de rester en bonne santé, d'être épanoui(e), et d'avoir un avenir prometteur pour le développement du pays.</p>";
    
    corrections += "<p><strong>Situation d'évaluation 1 :</strong></p>";
    corrections += "<p>1. <strong>Identification du problème :</strong> La proposition de rapports sexuels en milieu scolaire en échange d'aide aux devoirs.</p>";
    corrections += "<p>2. <strong>Trois comportements et attitudes favorisant l'abstinence :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Respecter son corps</li>";
    corrections += "<li>Se confier aux parents</li>";
    corrections += "<li>Avoir de bonnes fréquentations</li>";
    corrections += "<li>Porter des tenues décentes</li>";
    corrections += "<li>S'occuper sainement</li>";
    corrections += "<li>Visiter les lieux éducatifs</li>";
    corrections += "</ul>";
    corrections += "<p>3. <strong>Justification de la décision :</strong> Il est bien de pratiquer l'abstinence afin de préserver la santé de l'adolescent et favoriser son épanouissement individuel et social. Cela permet aussi de se concentrer sur les études et de réussir à l'école.</p>";
    
    corrections += "<p><strong>Situation d'évaluation 2 :</strong></p>";
    corrections += "<p>1. <strong>Identification du problème :</strong> La volonté d'avoir des rapports sexuels avec une fille de mauvaises fréquentations et l'invitation à participer.</p>";
    corrections += "<p>2. <strong>Attitudes et comportements favorisant l'abstinence :</strong></p>";
    corrections += "<p><strong>Au niveau individuel :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Porter des tenues décentes</li>";
    corrections += "<li>Respecter son corps</li>";
    corrections += "<li>S'occuper sainement</li>";
    corrections += "</ul>";
    corrections += "<p><strong>Au niveau social :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Avoir de bonnes fréquentations</li>";
    corrections += "<li>Visiter les lieux éducatifs</li>";
    corrections += "</ul>";
    corrections += "<p>3. <strong>Justification du refus :</strong> Je refuse d'accompagner mon camarade car il faut pratiquer l'abstinence sexuelle qui permet : la préservation de la santé, la réussite scolaire, l'épanouissement. De plus, il est important d'avoir de bonnes fréquentations et de respecter son corps.</p>";
    
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