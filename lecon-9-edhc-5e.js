// JAVASCRIPT COMPLET AVEC FONCTIONNALITÉS INTERACTIVES

// Variables pour suivre la progression
let progress = 0;
const totalExercises = 15;
let draggedStep = null;
let orderedSteps = [];

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
            'Clique sur "AGR" ou "Non AGR" pour choisir ta réponse.'
        );
        return;
    }
    
    if (selectedValue === correctAnswer) {
        // Bonne réponse
        showSuccessModal(
            '🎉 Excellente réponse !',
            'Félicitations, tu as bien identifié cette activité.',
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
        const correctAnswerText = correctAnswer === 'oui' ? 'AGR' : 'Non AGR';
        const userAnswerText = selectedValue === 'oui' ? 'AGR' : 'Non AGR';
        
        showErrorModal(
            'Presque !',
            `Ta réponse : <strong>${userAnswerText}</strong>`,
            `Réfléchis bien aux caractéristiques d'une AGR : peu d'investissement, peu de qualifications, gains rapides.`,
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

// Fonctions pour le drag and drop
function dragStart(event) {
    draggedStep = event.target;
    event.dataTransfer.setData('text/plain', event.target.dataset.step);
    event.target.style.opacity = '0.5';
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const stepLetter = event.dataTransfer.getData('text/plain');
    
    if (orderedSteps.includes(stepLetter)) {
        showErrorModal(
            'Étape déjà ajoutée',
            'Cette étape est déjà dans la liste.',
            'Chaque étape ne doit apparaître qu\'une seule fois.'
        );
        draggedStep.style.opacity = '1';
        return;
    }
    
    orderedSteps.push(stepLetter);
    updateOrderedStepsDisplay();
    
    draggedStep.style.opacity = '1';
    draggedStep = null;
}

function updateOrderedStepsDisplay() {
    const dropZone = document.getElementById('orderedSteps');
    dropZone.innerHTML = '';
    
    orderedSteps.forEach((stepLetter, index) => {
        let stepText = '';
        switch(stepLetter) {
            case 'a': stepText = 'L\'identification du site et des besoins'; break;
            case 'b': stepText = 'La détermination des sources de financement'; break;
            case 'c': stepText = 'L\'estimation du capital'; break;
            case 'd': stepText = 'L\'identification du type d\'activité'; break;
        }
        
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-box';
        stepDiv.innerHTML = `<p><strong>${index + 1}. ${stepText}</strong></p>`;
        dropZone.appendChild(stepDiv);
    });
}

function checkOrder() {
    const correctOrder = ['d', 'a', 'c', 'b'];
    
    if (orderedSteps.length !== 4) {
        showErrorModal(
            'Liste incomplète',
            `Tu as classé ${orderedSteps.length}/4 étapes.`,
            'Tu dois classer les 4 étapes dans le bon ordre.'
        );
        return;
    }
    
    let correctCount = 0;
    for (let i = 0; i < 4; i++) {
        if (orderedSteps[i] === correctOrder[i]) {
            correctCount++;
        }
    }
    
    if (correctCount === 4) {
        showSuccessModal(
            '🌟 Ordre parfait !',
            'Tu as parfaitement classé les étapes de création d\'une AGR.',
            'Tu maîtrises bien la méthode I-D-E-E !'
        );
        updateProgress();
        updateProgress(); // Double progression pour cet exercice
    } else if (correctCount >= 2) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as correctement classé ${correctCount}/4 étapes.`,
            'Tu progresses bien, continue à t\'entraîner !'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as correctement classé ${correctCount}/4 étapes.`,
            'N\'oublie pas l\'ordre I-D-E-E : Identifier, Déterminer, Estimer, Envisager.'
        );
    }
}

function resetOrder() {
    orderedSteps = [];
    document.getElementById('orderedSteps').innerHTML = '';
    document.querySelectorAll('.step-box[draggable="true"]').forEach(box => {
        box.style.opacity = '1';
    });
}

function checkAdvantages() {
    const advantages = [
        { id: 'avantage-a', correct: true },
        { id: 'avantage-b', correct: false },
        { id: 'avantage-c', correct: false },
        { id: 'avantage-d', correct: true },
        { id: 'avantage-e', correct: true }
    ];
    
    let correctCount = 0;
    let feedback = '';
    
    advantages.forEach(adv => {
        const checkbox = document.getElementById(adv.id);
        const checkboxFaux = document.getElementById(adv.id + '-faux');
        
        if (adv.correct) {
            if (checkbox.checked && !checkboxFaux.checked) {
                correctCount++;
                feedback += `<p>✓ <strong>${adv.id.split('-')[1]})</strong> : Correct !</p>`;
            } else {
                feedback += `<p>✗ <strong>${adv.id.split('-')[1]})</strong> : C'est un avantage des AGR.</p>`;
            }
        } else {
            if (!checkbox.checked && checkboxFaux.checked) {
                correctCount++;
                feedback += `<p>✓ <strong>${adv.id.split('-')[1]})</strong> : Correct, ce n'est pas un avantage direct des AGR.</p>`;
            } else {
                feedback += `<p>✗ <strong>${adv.id.split('-')[1]})</strong> : Ce n'est pas un avantage des AGR.</p>`;
            }
        }
    });
    
    if (correctCount === 5) {
        showSuccessModal(
            '💡 Parfait !',
            'Tu as identifié tous les avantages des AGR.',
            feedback
        );
        updateProgress();
        updateProgress();
    } else if (correctCount >= 3) {
        showSuccessModal(
            '🔍 Bien joué !',
            `Tu as identifié ${correctCount}/5 avantages correctement.`,
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '🧠 À revoir',
            `Tu as identifié ${correctCount}/5 avantages correctement.`,
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
    const answers = {
        'eval1-1': document.getElementById('eval1-1').value.trim(),
        'eval1-2': document.getElementById('eval1-2').value.trim(),
        'eval1-3': document.getElementById('eval1-3').value.trim(),
        'eval2-1': document.getElementById('eval2-1').value.trim(),
        'eval2-2': document.getElementById('eval2-2').value.trim(),
        'eval2-3': document.getElementById('eval2-3').value.trim(),
        'eval3-1': document.getElementById('eval3-1').value.trim(),
        'eval3-2': document.getElementById('eval3-2').value.trim(),
        'eval3-3': document.getElementById('eval3-3').value.trim()
    };
    
    // Vérifier si toutes les réponses sont remplies
    let allFilled = true;
    for (const key in answers) {
        if (!answers[key]) {
            allFilled = false;
            break;
        }
    }
    
    if (!allFilled) {
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
    let maxScore = 27; // 9 questions × 3 points chacune
    let feedback = '<h4>Corrections détaillées :</h4>';
    
    // Correction de la situation 1
    feedback += '<h5>Situation 1 :</h5>';
    
    // Question 1.1
    if (answers['eval1-1'].toLowerCase().includes('refus') || answers['eval1-1'].toLowerCase().includes('participer') || answers['eval1-1'].toLowerCase().includes('élevage')) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1.1 :</strong> Bonne identification du problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.1 :</strong> Le problème est le refus de s\'initier à une AGR (élevage de lapins).</p>';
    }
    
    // Question 1.2
    const agrs = answers['eval1-2'].toLowerCase();
    const agrCount = (agrs.includes('cabine') ? 1 : 0) + (agrs.includes('fruit') ? 1 : 0) + (agrs.includes('élevage') ? 1 : 0) + (agrs.includes('poulet') ? 1 : 0) + (agrs.includes('alloco') ? 1 : 0) + (agrs.includes('garba') ? 1 : 0);
    if (agrCount >= 3) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1.2 :</strong> Bonne énumération d\'AGR.</p>';
    } else if (agrCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.2 :</strong> Tu as cité quelques AGR, mais tu peux en trouver d\'autres.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.2 :</strong> Exemples d\'AGR : vente de fruits, gérance de cabine téléphonique, élevage de poulets, etc.</p>';
    }
    
    // Question 1.3
    if (answers['eval1-3'].length > 50 && (answers['eval1-3'].includes('insertion') || answers['eval1-3'].includes('avantage') || answers['eval1-3'].includes('compétence') || answers['eval1-3'].includes('chômage'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1.3 :</strong> Excellente justification avec les avantages des AGR.</p>';
    } else if (answers['eval1-3'].length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.3 :</strong> Bon début, développe davantage avec les avantages des AGR.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.3 :</strong> Il faut mentionner que les AGR aident à l\'insertion professionnelle, réduisent la pauvreté, créent des emplois, etc.</p>';
    }
    
    // Correction de la situation 2
    feedback += '<h5>Situation 2 :</h5>';
    
    // Question 2.1
    if (answers['eval2-1'].toLowerCase().includes('fatigant') || answers['eval2-1'].toLowerCase().includes('lavage') || answers['eval2-1'].toLowerCase().includes('emploi')) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2.1 :</strong> Bonne identification du problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.1 :</strong> Le problème est le refus de créer un lavage-auto parce que l\'activité semble fatigante.</p>';
    }
    
    // Question 2.2
    const constraints = answers['eval2-2'].toLowerCase();
    const constraintCount = (constraints.includes('site') ? 1 : 0) + (constraints.includes('lieu') ? 1 : 0) + (constraints.includes('capital') ? 1 : 0) + (constraints.includes('argent') ? 1 : 0) + (constraints.includes('démarche') ? 1 : 0) + (constraints.includes('autorisation') ? 1 : 0);
    if (constraintCount >= 3) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2.2 :</strong> Bonne énumération des contraintes.</p>';
    } else if (constraintCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.2 :</strong> Tu as cité quelques contraintes, mais il y en a d\'autres.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.2 :</strong> Exemples de contraintes : trouver un bon emplacement, estimer correctement le budget, faire des démarches administratives.</p>';
    }
    
    // Question 2.3
    if (answers['eval2-3'].length > 50 && (answers['eval2-3'].includes('autonom') || answers['eval2-3'].includes('indépend') || answers['eval2-3'].includes('propre') || answers['eval2-3'].includes('avenir'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2.3 :</strong> Excellente justification pour conseiller le lavage-auto.</p>';
    } else if (answers['eval2-3'].length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.3 :</strong> Bon début, développe davantage les avantages d\'être son propre patron.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.3 :</strong> Il faut mentionner l\'autonomie, la possibilité de développer son activité, l\'acquisition de compétences, etc.</p>';
    }
    
    // Correction de la situation 3
    feedback += '<h5>Situation 3 :</h5>';
    
    // Question 3.1
    if (answers['eval3-1'].toLowerCase().includes('dévaloris') || answers['eval3-1'].toLowerCase().includes('oppos') || answers['eval3-1'].toLowerCase().includes('alloco')) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3.1 :</strong> Bonne identification du problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3.1 :</strong> Le problème est l\'opposition du père au projet de vente d\'alloco.</p>';
    }
    
    // Question 3.2
    const steps = answers['eval3-2'].toLowerCase();
    const stepCount = (steps.includes('identification') ? 1 : 0) + (steps.includes('type') ? 1 : 0) + (steps.includes('site') ? 1 : 0) + (steps.includes('besoin') ? 1 : 0) + (steps.includes('estimation') ? 1 : 0) + (steps.includes('capital') ? 1 : 0) + (steps.includes('financement') ? 1 : 0);
    if (stepCount >= 2) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3.2 :</strong> Bonne citation d\'étapes de création.</p>';
    } else if (stepCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3.2 :</strong> Tu as cité une étape, mais il en faut deux.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3.2 :</strong> Exemples d\'étapes : identification du type d\'activité, identification du site, estimation du capital, détermination des sources de financement.</p>';
    }
    
    // Question 3.3
    if (answers['eval3-3'].length > 50 && (answers['eval3-3'].includes('aide') || answers['eval3-3'].includes('famille') || answers['eval3-3'].includes('charg') || answers['eval3-3'].includes('respect'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3.3 :</strong> Excellente justification de l\'intervention.</p>';
    } else if (answers['eval3-3'].length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3.3 :</strong> Bon début, développe davantage les avantages de l\'AGR pour la famille.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3.3 :</strong> Il faut mentionner que l\'AGR aidera financièrement la famille, que c\'est un travail honorable, qu\'elle donne de la considération sociale, etc.</p>';
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
    let corrections = "<h4>Corrections complètes :</h4>";
    
    corrections += "<h5>Situation 1 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong> Le refus de s'initier à l'élevage de lapins, une activité génératrice de revenus.</p>";
    corrections += "<p><strong>2. Trois AGR :</strong> la gérance de cabine téléphonique, la vente de fruits, l'élevage de poulets.</p>";
    corrections += "<p><strong>3. Justification :</strong> L'initiation aux AGR permet une insertion rapide dans le monde professionnel et offre de nombreux avantages : réduction de la pauvreté, création d'emplois, acquisition de compétences, considération sociale.</p>";
    
    corrections += "<h5>Situation 2 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong> Le refus de créer un lavage-auto parce que l'activité semble fatigante.</p>";
    corrections += "<p><strong>2. Trois contraintes :</strong> trouver un bon emplacement, estimer correctement le budget nécessaire, faire des démarches administratives.</p>";
    corrections += "<p><strong>3. Justification :</strong> Créer son propre lavage-auto permet d'être autonome, d'acquérir des compétences, de développer son activité progressivement, et d'éviter la dépendance à un employeur.</p>";
    
    corrections += "<h5>Situation 3 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong> L'opposition du père au projet de vente d'alloco.</p>";
    corrections += "<p><strong>2. Deux étapes :</strong> identification du type d'activité, identification du site et des besoins.</p>";
    corrections += "<p><strong>3. Justification :</strong> Il faut intervenir pour expliquer que cette AGR aidera financièrement la famille, que c'est un travail honorable, qu'elle donnera de la considération sociale à la mère et qu'elle contribuera au développement de la famille.</p>";
    
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