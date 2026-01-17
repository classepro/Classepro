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
    const instruments = document.getElementById('instruments').value.toLowerCase();
    const mechanisms = document.getElementById('mechanisms').value.toLowerCase();
    
    const instrumentsAttendus = ['constitution', 'déclaration', 'universelle', 'convention', 'discriminations', 'raciale'];
    const mechanismsAttendus = ['conseil', 'national', 'cndhci', 'police', 'gendarmerie', 'ministère', 'femme', 'famille', 'enfant'];
    
    let scoreInstruments = 0;
    let scoreMechanisms = 0;
    
    // Vérifier les instruments
    instrumentsAttendus.forEach(terme => {
        if (instruments.includes(terme)) scoreInstruments++;
    });
    
    // Vérifier les mécanismes
    mechanismsAttendus.forEach(terme => {
        if (mechanisms.includes(terme)) scoreMechanisms++;
    });
    
    const totalScore = scoreInstruments + scoreMechanisms;
    const maxScore = 6;
    
    if (totalScore >= 5) {
        showSuccessModal(
            '🌟 Classification parfaite !',
            `Tu as bien classé ${totalScore}/${maxScore} éléments.`,
            'Tu maîtrises parfaitement la distinction entre instruments et mécanismes.'
        );
        updateProgress();
        updateProgress();
    } else if (totalScore >= 3) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as classé ${totalScore}/${maxScore} éléments correctement.`,
            'Tu progresses bien dans la compréhension des instruments et mécanismes.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as classé ${totalScore}/${maxScore} éléments correctement.`,
            'Consulte les corrections pour mieux comprendre la différence entre instruments (textes) et mécanismes (structures).'
        );
    }
}

function checkCasPratique() {
    const q1 = document.getElementById('q3-1').value.trim().toLowerCase();
    const q2 = document.getElementById('q3-2').value.trim();
    const q3 = document.getElementById('q3-3').value;
    
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
    if (q1.includes('handicap') || q1.includes('handicapé') || q1.includes('handicapée') || q1.includes('handicap-phobie')) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1 :</strong> Tu as bien identifié le type de discrimination.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Pense au critère spécifique (handicap).</p>';
    }
    
    // Question 2
    if (q2.length > 20 && (q2.includes('loi') || q2.includes('interdit') || q2.includes('sanction') || q2.includes('plainte') || q2.includes('police'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2 :</strong> Excellents arguments légaux.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense aux conséquences légales (loi, plainte, sanctions).</p>';
    }
    
    // Question 3
    if (q3 === 'tous') {
        score += 2;
        feedback += '<p>✓ <strong>Question 3 :</strong> Exact, la victime peut saisir plusieurs mécanismes.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Réfléchis : une victime peut-elle saisir plusieurs mécanismes ?</p>';
    }
    
    if (score >= 5) {
        showSuccessModal(
            '💡 Très bon raisonnement !',
            'Tu as bien analysé la situation et proposé des solutions appropriées.',
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
            'Relis bien la situation et réfléchis aux différents aspects légaux.',
            feedback
        );
    }
}

function checkImportance() {
    const imp1 = document.getElementById('imp1').checked;
    const imp2 = document.getElementById('imp2').checked;
    const imp3 = document.getElementById('imp3').checked;
    const imp4 = document.getElementById('imp4').checked;
    const imp5 = document.getElementById('imp5').checked;
    
    let score = 0;
    const correctAnswers = [false, true, true, false, true];
    const userAnswers = [imp1, imp2, imp3, imp4, imp5];
    
    for (let i = 0; i < correctAnswers.length; i++) {
        if (userAnswers[i] === correctAnswers[i]) {
            score++;
        }
    }
    
    if (score === 5) {
        showSuccessModal(
            '🎯 Parfait !',
            'Tu as parfaitement compris l\'importance des instruments et mécanismes.',
            '5/5 réponses correctes'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 3) {
        showSuccessModal(
            '👍 Bien compris !',
            `Tu as ${score}/5 réponses correctes.`,
            'Tu as saisi l\'essentiel de l\'importance des instruments et mécanismes.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📖 À revoir',
            `Tu as ${score}/5 réponses correctes.`,
            'Relis la partie sur l\'importance des instruments et mécanismes.'
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
    const eval1_1 = document.getElementById('eval1-1').value.trim().toLowerCase();
    const eval1_2 = document.getElementById('eval1-2').value.trim();
    const eval1_3 = document.getElementById('eval1-3').value.trim();
    const eval2_1 = document.getElementById('eval2-1').value.trim().toLowerCase();
    const eval2_2 = document.getElementById('eval2-2').value.trim();
    const eval2_3 = document.getElementById('eval2-3').value.trim();
    
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
    let maxScore = 18;
    let feedback = '';
    
    // Évaluation 1 - Question 1
    if (eval1_1.includes('sexe') || eval1_1.includes('femme') || eval1_1.includes('genre') || eval1_1.includes('fille')) {
        score += 2;
        feedback += '<p>✓ <strong>Évaluation 1 - Q1 :</strong> Bonne identification (discrimination basée sur le sexe).</p>';
    } else if (eval1_1.includes('discrimination')) {
        score += 1;
        feedback += '<p>↔ <strong>Évaluation 1 - Q1 :</strong> Bon, précise le type (sexe/femme).</p>';
    } else {
        feedback += '<p>✗ <strong>Évaluation 1 - Q1 :</strong> Le problème est le refus d\'une fille comme déléguée (discrimination sexiste).</p>';
    }
    
    // Évaluation 1 - Question 2
    if (eval1_2.length > 10 && (eval1_2.includes('CNDHCI') || eval1_2.includes('Conseil National') || eval1_2.includes('Ministère') || eval1_2.includes('Femme') || eval1_2.includes('police') || eval1_2.includes('tribunal'))) {
        score += 2;
        feedback += '<p>✓ <strong>Évaluation 1 - Q2 :</strong> Bonne énumération de mécanismes.</p>';
    } else if (eval1_2.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Évaluation 1 - Q2 :</strong> Tu as compris l\'idée, cite des exemples concrets.</p>';
    } else {
        feedback += '<p>✗ <strong>Évaluation 1 - Q2 :</strong> Pense au CNDHCI, au Ministère de la Femme, à la police.</p>';
    }
    
    // Évaluation 1 - Question 3
    if (eval1_3.length > 30 && (eval1_3.includes('refuser') || eval1_3.includes('pas participer') || eval1_3.includes('contre')) && (eval1_3.includes('égalité') || eval1_3.includes('droit') || eval1_3.includes('juste') || eval1_3.includes('discrimination'))) {
        score += 2;
        feedback += '<p>✓ <strong>Évaluation 1 - Q3 :</strong> Excellente position et justification.</p>';
    } else if (eval1_3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Évaluation 1 - Q3 :</strong> Bonne direction, développe tes arguments.</p>';
    } else {
        feedback += '<p>✗ <strong>Évaluation 1 - Q3 :</strong> Justifie ton refus par l\'égalité homme-femme et la lutte contre les discriminations.</p>';
    }
    
    // Évaluation 2 - Question 1
    if (eval2_1.includes('couleur') || eval2_1.includes('albinos') || eval2_1.includes('peau') || eval2_1.includes('marginal') || eval2_1.includes('exclu')) {
        score += 2;
        feedback += '<p>✓ <strong>Évaluation 2 - Q1 :</strong> Bonne identification (discrimination basée sur la couleur de peau).</p>';
    } else if (eval2_1.includes('discrimination')) {
        score += 1;
        feedback += '<p>↔ <strong>Évaluation 2 - Q1 :</strong> Bon, précise le critère (couleur de peau/albinisme).</p>';
    } else {
        feedback += '<p>✗ <strong>Évaluation 2 - Q1 :</strong> Le problème est le rejet d\'un camarade albinos (discrimination raciale).</p>';
    }
    
    // Évaluation 2 - Question 2
    if (eval2_2.length > 20 && (eval2_2.includes('Déclaration Universelle') || eval2_2.includes('Constitution') || eval2_2.includes('convention') || eval2_2.includes('raciale') || eval2_2.includes('loi'))) {
        score += 2;
        feedback += '<p>✓ <strong>Évaluation 2 - Q2 :</strong> Bonne énumération d\'instruments.</p>';
    } else if (eval2_2.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Évaluation 2 - Q2 :</strong> Tu as compris l\'idée, cite des instruments précis.</p>';
    } else {
        feedback += '<p>✗ <strong>Évaluation 2 - Q2 :</strong> Pense à la Constitution, à la Déclaration Universelle, aux conventions.</p>';
    }
    
    // Évaluation 2 - Question 3
    if (eval2_3.length > 30 && (eval2_3.includes('droit') || eval2_3.includes('respect') || eval2_3.includes('égal') || eval2_3.includes('discrimination') || eval2_3.includes('aide'))) {
        score += 2;
        feedback += '<p>✓ <strong>Évaluation 2 - Q3 :</strong> Excellente justification.</p>';
    } else if (eval2_3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Évaluation 2 - Q3 :</strong> Bonne base, développe tes arguments.</p>';
    } else {
        feedback += '<p>✗ <strong>Évaluation 2 - Q3 :</strong> Justifie par le respect des droits, la lutte contre les discriminations, la solidarité.</p>';
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
    
    corrections += "<h5>Situation d'évaluation 1 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong> Discrimination basée sur le sexe (refus d'une fille comme déléguée).</p>";
    corrections += "<p><strong>2. Mécanismes de recours :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Conseil National des Droits de l'Homme (CNDHCI)</li>";
    corrections += "<li>Ministère de la Femme, de la Famille et de l'Enfant</li>";
    corrections += "<li>Police/gendarmerie (plainte)</li>";
    corrections += "<li>Direction de l'établissement</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Position et justification :</strong></p>";
    corrections += "<p>Je refuse de participer car :</p>";
    corrections += "<ul>";
    corrections += "<li>L'homme et la femme sont égaux en droit</li>";
    corrections += "<li>Tous peuvent exercer les mêmes fonctions</li>";
    corrections += "<li>C'est une discrimination interdite par la loi</li>";
    corrections += "<li>Je veux contribuer à une société plus juste</li>";
    corrections += "</ul>";
    
    corrections += "<h5>Situation d'évaluation 2 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong> Discrimination basée sur la couleur de peau (rejet d'un camarade albinos).</p>";
    corrections += "<p><strong>2. Instruments de lutte :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Déclaration Universelle des Droits de l'Homme (interdit les discriminations raciales)</li>";
    corrections += "<li>Constitution ivoirienne (garantit l'égalité)</li>";
    corrections += "<li>Convention sur l'élimination des discriminations raciales</li>";
    corrections += "<li>Lois nationales contre les discriminations</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification de l'aide :</strong></p>";
    corrections += "<p>J'accepte d'aider car :</p>";
    corrections += "<ul>";
    corrections += "<li>Je respecte le droit à la différence</li>";
    corrections += "<li>Je veux lutter contre les discriminations</li>";
    corrections += "<li>Je veux préserver son droit à l'éducation</li>";
    corrections += "<li>C'est mon devoir de citoyen de défendre les droits des autres</li>";
    corrections += "</ul>";
    
    correctionsDiv.innerHTML = corrections;
    resultsDiv.style.display = 'block';
    
    // Mettre à jour la progression
    if (percentage >= 60) {
        updateProgress();
        updateProgress();
        updateProgress();
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