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
function checkDefinition() {
    const word1 = document.getElementById('word1').value.trim().toLowerCase();
    const word2 = document.getElementById('word2').value.trim().toLowerCase();
    const word3 = document.getElementById('word3').value.trim().toLowerCase();
    
    const correct1 = 'des éléments naturels';
    const correct2 = 'artificiels';
    const correct3 = 'notre milieu';
    
    let score = 0;
    let feedback = '';
    
    // Vérifier mot 1
    if (word1.includes('éléments naturels') || word1.includes('elements naturels')) {
        score++;
        document.getElementById('word1').style.borderColor = 'var(--success)';
        document.getElementById('word1').style.backgroundColor = 'rgba(75, 181, 67, 0.1)';
        feedback += '<p>✓ <strong>Mot 1 :</strong> Correct !</p>';
    } else {
        document.getElementById('word1').style.borderColor = 'var(--warning)';
        document.getElementById('word1').style.backgroundColor = 'rgba(255, 152, 0, 0.1)';
        feedback += '<p>✗ <strong>Mot 1 :</strong> Devrait être : "des éléments naturels"</p>';
    }
    
    // Vérifier mot 2
    if (word2 === 'artificiels') {
        score++;
        document.getElementById('word2').style.borderColor = 'var(--success)';
        document.getElementById('word2').style.backgroundColor = 'rgba(75, 181, 67, 0.1)';
        feedback += '<p>✓ <strong>Mot 2 :</strong> Correct !</p>';
    } else {
        document.getElementById('word2').style.borderColor = 'var(--warning)';
        document.getElementById('word2').style.backgroundColor = 'rgba(255, 152, 0, 0.1)';
        feedback += '<p>✗ <strong>Mot 2 :</strong> Devrait être : "artificiels"</p>';
    }
    
    // Vérifier mot 3
    if (word3 === 'notre milieu' || word3.includes('notre milieu')) {
        score++;
        document.getElementById('word3').style.borderColor = 'var(--success)';
        document.getElementById('word3').style.backgroundColor = 'rgba(75, 181, 67, 0.1)';
        feedback += '<p>✓ <strong>Mot 3 :</strong> Correct !</p>';
    } else {
        document.getElementById('word3').style.borderColor = 'var(--warning)';
        document.getElementById('word3').style.backgroundColor = 'rgba(255, 152, 0, 0.1)';
        feedback += '<p>✗ <strong>Mot 3 :</strong> Devrait être : "notre milieu"</p>';
    }
    
    if (score === 3) {
        showSuccessModal(
            '🌟 Définition parfaite !',
            'Tu as complété correctement les 3 mots.',
            feedback + '<p>L\'environnement, c\'est l\'ensemble des éléments naturels et artificiels qui constituent notre milieu.</p>'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as trouvé ${score}/3 mots correctement.`,
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as trouvé ${score}/3 mots correctement.`,
            feedback + '<p>La définition complète est : "L\'environnement, c\'est l\'ensemble des éléments naturels et artificiels qui constituent notre milieu."</p>'
        );
    }
}

function checkPratiques() {
    const pratiques = [
        {id: 'practice1', value: 'feux', correct: true},
        {id: 'practice2', value: 'braconnage', correct: true},
        {id: 'practice3', value: 'pluies', correct: false},
        {id: 'practice4', value: 'peche-chimique', correct: true},
        {id: 'practice5', value: 'deboisement', correct: true},
        {id: 'practice6', value: 'aquaculture', correct: false}
    ];
    
    let correctCount = 0;
    let totalCorrect = 4; // Il y a 4 pratiques dégradantes
    
    pratiques.forEach(pratique => {
        const checkbox = document.getElementById(pratique.id);
        const isChecked = checkbox.checked;
        
        if ((pratique.correct && isChecked) || (!pratique.correct && !isChecked)) {
            correctCount++;
        }
    });
    
    if (correctCount === 6) {
        showSuccessModal(
            '🌟 Parfait !',
            `Tu as parfaitement identifié les pratiques dégradantes (${correctCount}/6).`,
            'Tu as bien compris ce qui nuit à l\'environnement.'
        );
        updateProgress();
        updateProgress();
    } else if (correctCount >= 4) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as identifié ${correctCount}/6 pratiques correctement.`,
            'Rappelle-toi : les pluies diluviennes sont naturelles, l\'aquaculture peut être contrôlée.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as identifié ${correctCount}/6 pratiques correctement.`,
            'Les pratiques dégradantes sont : feux de brousse, braconnage, pêche chimique, déboisement.<br>' +
            'Les pluies diluviennes sont naturelles, l\'aquaculture peut être écologique.'
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
            'Clique sur V ou F selon ton choix.'
        );
        return;
    }
    
    if (selectedValue === correctAnswer) {
        // Bonne réponse
        showSuccessModal(
            '🎉 Excellente réponse !',
            'Félicitations, tu as bien compris cette conséquence.',
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
        let correctText = correctAnswer === 'V' ? 'VRAI' : 'FAUX';
        let userText = selectedValue === 'V' ? 'VRAI' : 'FAUX';
        
        showErrorModal(
            'Presque !',
            `Ta réponse : <strong>${userText}</strong>`,
            `Réfléchis aux liens entre environnement et cette affirmation.`,
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

function checkMesures() {
    const colonneFloreFaune = document.getElementById('colonneFloreFaune').value.toLowerCase();
    const colonneAirEau = document.getElementById('colonneAirEau').value.toLowerCase();
    
    const mesuresFloreFaune = ['feux de brousse', 'pare-feux', 'exploitation du bois', 'règlementation', 'techniques culturales', 'modernisation'];
    const mesuresAirEau = ['épuration', 'eaux usées', 'règlementation contre', 'engins pollueurs'];
    
    let scoreFlore = 0;
    let scoreAirEau = 0;
    
    // Vérifier mesures flore/faune
    mesuresFloreFaune.forEach(terme => {
        if (colonneFloreFaune.includes(terme)) scoreFlore++;
    });
    
    // Vérifier mesures air/eau
    mesuresAirEau.forEach(terme => {
        if (colonneAirEau.includes(terme)) scoreAirEau++;
    });
    
    const totalScore = scoreFlore + scoreAirEau;
    const maxScore = 5; // 5 mesures à classer
    
    if (totalScore >= 4) {
        showSuccessModal(
            '🌟 Classification parfaite !',
            `Tu as bien classé les mesures de protection (${totalScore}/${maxScore}).`,
            'Tu maîtrises parfaitement les différentes approches de protection environnementale.'
        );
        updateProgress();
        updateProgress();
    } else if (totalScore >= 3) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as classé ${totalScore}/${maxScore} mesures correctement.`,
            'Continue à t\'entraîner pour ne faire aucune erreur.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as classé ${totalScore}/${maxScore} mesures correctement.`,
            'Rappelle-toi :<br>' +
            '- <strong>Flore/faune</strong> : Pare-feux, réglementation bois/chasse, techniques culturales<br>' +
            '- <strong>Air/eau</strong> : Épuration des eaux, contrôle des pollueurs'
        );
    }
}

function checkCasPratique() {
    const q1 = document.getElementById('q5-1').value.trim();
    const q2 = document.getElementById('q5-2').value.trim();
    const q3 = document.getElementById('q5-3').value.trim();
    
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
    if (q1.length > 10 && (q1.includes('produits chimiques') || q1.includes('pêche chimique') || q1.includes('pratique dangereuse') || q1.includes('dégradation'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1 :</strong> Tu as bien identifié le problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est l\'utilisation de produits chimiques pour la pêche, une pratique qui dégrade l\'environnement.</p>';
    }
    
    // Question 2
    const consequencesAttendues = ['réchauffement climatique', 'disparition espèces', 'réduction eaux', 'aridité sols', 'baisse productivité', 'maladies'];
    let consequencesTrouvees = 0;
    
    consequencesAttendues.forEach(consequence => {
        if (q2.toLowerCase().includes(consequence)) consequencesTrouvees++;
    });
    
    if (consequencesTrouvees >= 3) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2 :</strong> Tu as bien cité des conséquences graves.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Exemples : réchauffement climatique, disparition des espèces, réduction des ressources en eau, aridité des sols, baisse des productions agricoles.</p>';
    }
    
    // Question 3
    if (q3.length > 30 && (q3.includes('dangereux') || q3.includes('santé') || q3.includes('interdit') || q3.includes('durable') || q3.includes('conseiller') || q3.includes('alternatives'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification avec des arguments solides.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense à justifier avec : danger pour l\'environnement, risque pour la santé, interdiction légale, devoir de conseiller des alternatives durables.</p>';
    }
    
    if (score >= 5) {
        showSuccessModal(
            '💡 Très bon raisonnement !',
            'Tu as bien analysé la situation et justifié tes réponses.',
            feedback
        );
        updateProgress();
        updateProgress();
    } else if (score >= 3) {
        showSuccessModal(
            '🔍 Bon début de réflexion !',
            'Tu as compris l\'essentiel, continue à approfondir ton analyse.',
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '🧠 À approfondir',
            'Relis bien la situation et réfléchis aux dangers de la pêche chimique.',
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
    const eval1 = document.getElementById('eval1').value.trim();
    const eval2 = document.getElementById('eval2').value.trim();
    const eval3 = document.getElementById('eval3').value.trim();
    
    if (!eval1 || !eval2 || !eval3) {
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
    let maxScore = 9;
    let feedback = '';
    
    // Question 1
    if (eval1.length > 20 && (eval1.includes('feu') || eval1.includes('forêt') || eval1.includes('parcelle') || eval1.includes('brûler') || eval1.includes('dégradation'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Excellente identification du problème.</p>';
    } else if (eval1.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Bon début, précise qu\'il s\'agit d\'un projet de mise à feu d\'une forêt.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est le projet de mettre le feu à une parcelle de forêt pour créer une plantation, une pratique destructrice pour l\'environnement.</p>';
    }
    
    // Question 2
    const consequencesAttendues = ['réchauffement climatique', 'disparition espèces', 'réduction eaux', 'aridité sols', 'baisse productivité', 'perturbations climat'];
    let consequencesTrouvees = 0;
    let explicationOk = false;
    
    consequencesAttendues.forEach(consequence => {
        if (eval2.toLowerCase().includes(consequence)) consequencesTrouvees++;
    });
    
    // Vérifier si une explication est donnée
    if (eval2.length > 80 && (eval2.includes('parce que') || eval2.includes('car') || eval2.includes('entraîne') || eval2.includes('provoque'))) {
        explicationOk = true;
    }
    
    if (consequencesTrouvees >= 3 && explicationOk) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Parfaite énumération et explication des conséquences.</p>';
    } else if (consequencesTrouvees >= 2) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as compris l\'idée, précise davantage chaque conséquence.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Exemples : réchauffement climatique (hausse des températures), disparition des espèces (animaux et plantes qui meurent), aridité des sols (terre qui devient stérile).</p>';
    }
    
    // Question 3
    if (eval3.length > 60 && (eval3.includes('feu de brousse') || eval3.includes('dangereux') || eval3.includes('mesures alternatives') || eval3.includes('durable') || eval3.includes('équilibre') || eval3.includes('écosystème'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification avec des arguments solides.</p>';
    } else if (eval3.length > 30) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bonne direction, développe tes arguments avec plus de détails.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense à justifier avec : 1) Les feux de brousse détruisent l\'écosystème, 2) Il existe des méthodes alternatives (défrichement manuel), 3) Nous devons préserver les forêts pour l\'avenir.</p>';
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
    
    corrections += "<p><strong>1. Problème posé :</strong></p>";
    corrections += "<p>Projet de mettre le feu à une parcelle de forêt pour créer une plantation communautaire. Cette pratique de feu de brousse est destructrice pour l'environnement et contraire aux principes de développement durable.</p>";
    
    corrections += "<p><strong>2. Trois conséquences graves de la dégradation :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>Réchauffement climatique</strong> : Les feux libèrent du CO2 qui augmente l'effet de serre, faisant monter les températures</li>";
    corrections += "<li><strong>Disparition des espèces animales et végétales</strong> : Le feu tue les animaux et détruit leur habitat, réduisant la biodiversité</li>";
    corrections += "<li><strong>Aridité des sols</strong> : Le feu détruit la matière organique du sol, le rendant stérile et moins productif</li>";
    corrections += "<li><strong>Réduction des ressources en eau</strong> : Sans forêt, moins de pluie et les nappes phréatiques s'assèchent</li>";
    corrections += "<li><strong>Baisse de la productivité agricole</strong> : Des sols pauvres donnent de mauvaises récoltes</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Justification du refus :</strong></p>";
    corrections += "<p>Je refuse cette proposition car :</p>";
    corrections += "<ul>";
    corrections += "<li><strong>Les feux de brousse sont destructeurs</strong> : Ils détruisent tout l'écosystème forestier, tuent les animaux, appauvrissent les sols</li>";
    corrections += "<li><strong>Il existe des alternatives durables</strong> : On peut défricher manuellement, utiliser des techniques agroforestières qui préservent certains arbres</li>";
    corrections += "<li><strong>Nous devons penser à l'avenir</strong> : Une forêt brûlée met des décennies à se régénérer, privant les générations futures de ses bienfaits</li>";
    corrections += "<li><strong>Les feux aggravent le changement climatique</strong> : Ils libèrent du carbone et réduisent la capacité de la forêt à absorber le CO2</li>";
    corrections += "<li><strong>C'est souvent interdit par la loi</strong> : De nombreuses régions réglementent strictement les feux de brousse</li>";
    corrections += "</ul>";
    corrections += "<p>Je propose plutôt : un défrichement sélectif, la conservation des arbres utiles, des techniques agricoles durables.</p>";
    
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