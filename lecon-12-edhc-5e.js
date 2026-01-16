// JAVASCRIPT COMPLET pour la leçon 12 - Alcool et Drogues

// Variables pour suivre la progression
let progress = 0;
const totalExercises = 15;

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

// Vérification des questions radio
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
            'Clique sur la réponse de ton choix.'
        );
        return;
    }
    
    if (selectedValue === correctAnswer) {
        showSuccessModal(
            '🎉 Bonne réponse !',
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
        const correctText = getAnswerText(questionName, correctAnswer);
        const userText = getAnswerText(questionName, selectedValue);
        
        showErrorModal(
            'Presque !',
            `Ta réponse : <strong>${userText}</strong>`,
            `Ne te décourage pas ! Chaque erreur est une occasion d'apprendre.`,
            `Réponse correcte : ${correctText}`
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

function getAnswerText(questionName, value) {
    // Pour les questions de définition
    if (questionName.includes('def')) {
        if (value === 'a') return 'a) Une substance pour faire pousser les plantes';
        if (value === 'b') return questionName === 'q1-def' ? 'b) Un liquide pour réparer les chaussures' : 'b) Une substance toxique qui...';
        if (value === 'c') return 'c) Un liquide obtenu après fermentation...';
    }
    // Pour Vrai/Faux
    return value === 'vrai' ? 'VRAI' : 'FAUX';
}

// Vérification des causes (cases à cocher)
function checkCauses() {
    const correctAnswers = ['mauvaises-frequentations', 'insouciance', 'pauvrete', 'faire-comme-les-autres'];
    const userAnswers = [];
    let score = 0;
    
    // Récupérer les réponses de l'utilisateur
    document.querySelectorAll('input[name="cause"]:checked').forEach(checkbox => {
        userAnswers.push(checkbox.value);
    });
    
    // Vérifier chaque réponse correcte
    correctAnswers.forEach(answer => {
        if (userAnswers.includes(answer)) {
            score++;
        }
    });
    
    // Vérifier qu'il n'y a pas de mauvaises réponses cochées
    const wrongSelected = userAnswers.filter(ans => !correctAnswers.includes(ans)).length;
    
    if (score === 4 && wrongSelected === 0) {
        showSuccessModal(
            '🌟 Parfait !',
            'Tu as identifié toutes les causes de consommation.',
            'Tu maîtrises bien cette partie du cours.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (score >= 3 && wrongSelected === 0) {
        showSuccessModal(
            '👍 Très bien !',
            `Tu as identifié ${score}/4 causes correctement.`,
            'Tu as bien compris l\'essentiel.'
        );
        updateProgress();
    } else {
        let message = `Tu as identifié ${score}/4 causes correctement.`;
        if (wrongSelected > 0) {
            message += ` Et tu as coché ${wrongSelected} réponse(s) qui n'est (ne sont) pas une cause.`;
        }
        
        showErrorModal(
            '📚 À revoir',
            message,
            'Relis bien la partie sur les causes de consommation.'
        );
    }
}

// Vérification du texte à trous
function checkFillText() {
    const rep1 = document.getElementById('fill1').value.trim().toLowerCase();
    const rep2 = document.getElementById('fill2').value.trim().toLowerCase();
    const rep3 = document.getElementById('fill3').value.trim().toLowerCase();
    
    const correct1 = 'accidents';
    const correct2 = 'braquages';
    const correct3 = 'insécurité';
    
    let score = 0;
    if (rep1 === correct1) score++;
    if (rep2 === correct2) score++;
    if (rep3 === correct3) score++;
    
    if (score === 3) {
        showSuccessModal(
            '🎯 Excellent !',
            'Tu as parfaitement complété le texte.',
            'Tu as bien retenu les conséquences de la consommation.'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '👍 Bien joué !',
            `Tu as trouvé ${score}/3 bonnes réponses.`,
            'Continue à t\'entraîner, tu progresses bien.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '🧠 À travailler',
            `Tu as trouvé ${score}/3 bonnes réponses.`,
            'Relis la partie sur les conséquences de la consommation.'
        );
    }
}

// Vérification de la classification
function checkClassification() {
    const causesText = document.getElementById('causes-text').value.toLowerCase();
    const consequencesText = document.getElementById('consequences-text').value.toLowerCase();
    
    // Les bonnes réponses
    const causesAttendues = ['mauvaises fréquentations', 'pour se donner de l\'assurance', 'fréquentations', 'assurance'];
    const consequencesAttendues = ['actes de vandalisme', 'viols et les vols', 'vandalisme', 'viols', 'vols'];
    
    let scoreCauses = 0;
    let scoreConsequences = 0;
    
    // Vérifier les causes
    causesAttendues.forEach(terme => {
        if (causesText.includes(terme)) scoreCauses++;
    });
    
    // Vérifier les conséquences
    consequencesAttendues.forEach(terme => {
        if (consequencesText.includes(terme)) scoreConsequences++;
    });
    
    const totalScore = (scoreCauses >= 1 ? 1 : 0) + (scoreConsequences >= 1 ? 1 : 0);
    
    if (totalScore === 2) {
        showSuccessModal(
            '✅ Classification correcte !',
            'Tu as bien distingué les causes des conséquences.',
            'C\'est une compétence importante pour analyser les situations.'
        );
        updateProgress();
        updateProgress();
    } else if (totalScore === 1) {
        showSuccessModal(
            '↔ Presque !',
            'Tu as bien classé une catégorie, mais l\'autre est à revoir.',
            'Relis bien la différence entre causes et conséquences.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📖 À réviser',
            'Tu as mélangé les causes et les conséquences.',
            'Souviens-toi : les causes expliquent POURQUOI on consomme, les conséquences sont ce qui arrive APRÈS.'
        );
    }
}

// Vérification des évaluations
function checkEval1() {
    const q1 = document.getElementById('eval1-q1').value.trim();
    const q2 = document.getElementById('eval1-q2').value.trim();
    const q3 = document.getElementById('eval1-q3').value.trim();
    
    if (!q1 || !q2 || !q3) {
        showErrorModal(
            'Réponses incomplètes',
            'Tu dois répondre à toutes les questions avant de vérifier.',
            'Prends le temps de bien réfléchir à chaque question.'
        );
        return;
    }
    
    let score = 0;
    let feedback = '';
    
    // Question 1
    if (q1.length > 10 && (q1.includes('proposition') || q1.includes('consommer') || q1.includes('alcool') || q1.includes('invitation'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 1 :</strong> Bonne identification du problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est l\'invitation à consommer de l\'alcool.</p>';
    }
    
    // Question 2
    if (q2.length > 20 && (q2.includes('refus') || q2.includes('exemple') || q2.includes('fréquentation') || q2.includes('éviter'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonnes mesures de prévention.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense au refus, à éviter les mauvais exemples, à ne pas fréquenter les lieux à risque.</p>';
    }
    
    // Question 3
    if (q3.length > 25 && (q3.includes('santé') || q3.includes('danger') || q3.includes('sécurité') || q3.includes('avenir'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification du refus.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense à justifier par la protection de ta santé, ta sécurité, ton avenir.</p>';
    }
    
    if (score === 3) {
        showSuccessModal(
            '💡 Excellent raisonnement !',
            'Tu as parfaitement analysé cette situation.',
            feedback
        );
    } else if (score >= 2) {
        showSuccessModal(
            '🔍 Bonne analyse !',
            'Tu as bien compris la situation, tu peux encore améliorer certaines réponses.',
            feedback
        );
    } else {
        showErrorModal(
            '🧠 À approfondir',
            'Relis bien la situation et les mesures de prévention.',
            feedback
        );
    }
}

function checkEval2() {
    const q1 = document.getElementById('eval2-q1').value.trim();
    const q2 = document.getElementById('eval2-q2').value.trim();
    const q3 = document.getElementById('eval2-q3').value.trim();
    
    if (!q1 || !q2 || !q3) {
        showErrorModal(
            'Réponses incomplètes',
            'Tu dois répondre à toutes les questions avant de vérifier.',
            'Prends le temps de bien réfléchir à chaque question.'
        );
        return;
    }
    
    let score = 0;
    let feedback = '';
    
    // Question 1
    if (q1.length > 10 && (q1.includes('invitation') || q1.includes('consommer') || q1.includes('alcool') || q1.includes('proposition'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 1 :</strong> Bonne identification du problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est l\'invitation à consommer de l\'alcool.</p>';
    }
    
    // Question 2
    if (q2.length > 20 && (q2.includes('accident') || q2.includes('vandalisme') || q2.includes('violence') || q2.includes('santé'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonnes conséquences citées.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense aux accidents, actes de vandalisme, problèmes de santé.</p>';
    }
    
    // Question 3
    if (q3.length > 25 && (q3.includes('santé') || q3.includes('danger') || q3.includes('sécurité') || q3.includes('sociale'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Justifie par la protection de ta santé et la sécurité sociale.</p>';
    }
    
    if (score === 3) {
        showSuccessModal(
            '💡 Parfait !',
            'Tu maîtrises parfaitement cette situation.',
            feedback
        );
    } else if (score >= 2) {
        showSuccessModal(
            '🔍 Bien !',
            'Tu as bien compris, continue à préciser tes réponses.',
            feedback
        );
    } else {
        showErrorModal(
            '🧠 À revoir',
            'Relis bien les conséquences de l\'alcool.',
            feedback
        );
    }
}

function checkEval3() {
    const q1 = document.getElementById('eval3-q1').value.trim();
    const q2 = document.getElementById('eval3-q2').value.trim();
    const q3 = document.getElementById('eval3-q3').value.trim();
    
    if (!q1 || !q2 || !q3) {
        showErrorModal(
            'Réponses incomplètes',
            'Tu dois répondre à toutes les questions avant de vérifier.',
            'Prends le temps de bien réfléchir à chaque question.'
        );
        return;
    }
    
    let score = 0;
    let feedback = '';
    
    // Question 1
    if (q1.length > 10 && (q1.includes('invitation') || q1.includes('consommer') || q1.includes('drogue') || q1.includes('proposition'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 1 :</strong> Bonne identification du problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est l\'invitation à consommer de la drogue.</p>';
    }
    
    // Question 2
    if (q2.length > 20 && (q2.includes('refus') || q2.includes('exemple') || q2.includes('fréquentation') || q2.includes('éviter') || q2.includes('lieu'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonnes mesures de prévention.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense au refus, à éviter les mauvais exemples, à ne pas fréquenter les lieux de trafic.</p>';
    }
    
    // Question 3
    if (q3.length > 25 && (q3.includes('santé') || q3.includes('danger') || q3.includes('dépendance') || q3.includes('illégal'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Justifie par la dangerosité pour la santé, le risque de dépendance, l\'illégalité.</p>';
    }
    
    if (score === 3) {
        showSuccessModal(
            '💡 Très bien raisonné !',
            'Tu as parfaitement analysé cette situation dangereuse.',
            feedback
        );
    } else if (score >= 2) {
        showSuccessModal(
            '🔍 Bonne analyse !',
            'Tu as bien compris la situation.',
            feedback
        );
    } else {
        showErrorModal(
            '🧠 À travailler',
            'Relis bien les mesures de prévention contre la drogue.',
            feedback
        );
    }
}

// Soumission de toutes les évaluations
function submitAllEvaluations() {
    // Vérifier que toutes les évaluations ont été faites
    let totalScore = 0;
    let maxScore = 9; // 3 questions × 3 évaluations
    
    // Évaluation 1
    const q1_1 = document.getElementById('eval1-q1').value.trim();
    const q1_2 = document.getElementById('eval1-q2').value.trim();
    const q1_3 = document.getElementById('eval1-q3').value.trim();
    
    if (q1_1 && q1_1.length > 10) totalScore += 1;
    if (q1_2 && q1_2.length > 20) totalScore += 1;
    if (q1_3 && q1_3.length > 25) totalScore += 1;
    
    // Évaluation 2
    const q2_1 = document.getElementById('eval2-q1').value.trim();
    const q2_2 = document.getElementById('eval2-q2').value.trim();
    const q2_3 = document.getElementById('eval2-q3').value.trim();
    
    if (q2_1 && q2_1.length > 10) totalScore += 1;
    if (q2_2 && q2_2.length > 20) totalScore += 1;
    if (q2_3 && q2_3.length > 25) totalScore += 1;
    
    // Évaluation 3
    const q3_1 = document.getElementById('eval3-q1').value.trim();
    const q3_2 = document.getElementById('eval3-q2').value.trim();
    const q3_3 = document.getElementById('eval3-q3').value.trim();
    
    if (q3_1 && q3_1.length > 10) totalScore += 1;
    if (q3_2 && q3_2.length > 20) totalScore += 1;
    if (q3_3 && q3_3.length > 25) totalScore += 1;
    
    const percentage = Math.round((totalScore / maxScore) * 100);
    const resultsDiv = document.getElementById('evalResults');
    const scoreDisplay = document.getElementById('evalScore');
    const correctionsDiv = document.getElementById('evalCorrections');
    
    let message = '';
    let modalTitle = '';
    let modalMessage = '';
    
    if (percentage >= 80) {
        modalTitle = '🏆 Félicitations !';
        modalMessage = `Tu as obtenu ${totalScore}/${maxScore} points (${percentage}%).`;
        message = `🎉 Excellent travail ! ${totalScore}/${maxScore} points (${percentage}%)`;
        createConfetti();
    } else if (percentage >= 60) {
        modalTitle = '👍 Bon travail !';
        modalMessage = `Tu as obtenu ${totalScore}/${maxScore} points (${percentage}%).`;
        message = `👍 Bon travail ! ${totalScore}/${maxScore} points (${percentage}%)`;
    } else if (percentage >= 40) {
        modalTitle = '✅ Assez bien !';
        modalMessage = `Tu as obtenu ${totalScore}/${maxScore} points (${percentage}%).`;
        message = `✅ Assez bien ! ${totalScore}/${maxScore} points (${percentage}%)`;
    } else {
        modalTitle = '📚 À revoir !';
        modalMessage = `Tu as obtenu ${totalScore}/${maxScore} points (${percentage}%).`;
        message = `📚 À revoir ! ${totalScore}/${maxScore} points (${percentage}%)`;
    }
    
    showSuccessModal(
        modalTitle,
        modalMessage,
        'Tu as terminé l\'évaluation. Consulte les corrections ci-dessous pour améliorer tes réponses.'
    );
    
    scoreDisplay.innerHTML = `<strong>${message}</strong>`;
    
    // Générer les corrections détaillées
    let corrections = "<h4>Corrections suggérées :</h4>";
    
    corrections += "<p><strong>Situation 1 (fête de l'igname) :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>1. Problème :</strong> L'invitation à consommer de l'alcool par ton cousin</li>";
    corrections += "<li><strong>2. Mesures de prévention :</strong> Refuser fermement, éviter les mauvais exemples, ne pas fréquenter les personnes qui consomment</li>";
    corrections += "<li><strong>3. Justification :</strong> Pour préserver sa santé, éviter les accidents, respecter la loi (interdit aux mineurs), assurer sa sécurité et son avenir</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>Situation 2 (fête de fin d'année) :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>1. Problème :</strong> L'invitation à consommer de l'alcool par des amis</li>";
    corrections += "<li><strong>2. Conséquences :</strong> Accidents (route, domestiques), actes de vandalisme, violence, problèmes de santé, dépendance</li>";
    corrections += "<li><strong>3. Justification :</strong> Pour protéger sa santé physique et mentale, éviter les comportements dangereux, préserver la sécurité sociale</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>Situation 3 (kermesse scolaire) :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>1. Problème :</strong> L'invitation à consommer de la drogue par des camarades</li>";
    corrections += "<li><strong>2. Mesures de prévention :</strong> Refuser catégoriquement, ne pas fréquenter les lieux de trafic, en parler à un adulte, développer des activités saines</li>";
    corrections += "<li><strong>3. Justification :</strong> La drogue est illégale, extrêmement dangereuse pour la santé, crée une dépendance forte, détruit l'avenir</li>";
    corrections += "</ul>";
    
    correctionsDiv.innerHTML = corrections;
    resultsDiv.style.display = 'block';
    
    // Faire défiler vers les résultats
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
    
    // Mettre à jour la progression
    if (percentage >= 60) {
        for (let i = 0; i < 5; i++) updateProgress(); // Avancement significatif
    }
}

// Afficher toutes les corrections
function showAllAnswers() {
    const answersDiv = document.getElementById('allAnswers');
    if (answersDiv.style.display === 'block') {
        answersDiv.style.display = 'none';
    } else {
        answersDiv.style.display = 'block';
        answersDiv.scrollIntoView({ behavior: 'smooth' });
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