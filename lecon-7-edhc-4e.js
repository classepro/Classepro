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
            'Clique sur l\'option de ton choix.'
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
        let correctText = '';
        if (correctAnswer === 'a') correctText = 'a) Les moyens dont dispose une famille pour les besoins de ses membres';
        else if (correctAnswer === 'b') correctText = 'b) Les moyens dont dispose une famille pour les besoins de ses membres';
        else if (correctAnswer === 'c') correctText = 'c) Les revenus de la famille seulement';
        else if (correctAnswer === 'vrai') correctText = 'VRAI';
        else if (correctAnswer === 'faux') correctText = 'FAUX';
        
        showErrorModal(
            'Presque !',
            `Réfléchis encore un peu.`,
            `Chaque erreur est une occasion d'apprendre.`,
            `${correctText}`
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

function checkNeeds() {
    const needs = [
        {id: 'need1', value: 'sante', correct: true},
        {id: 'need2', value: 'voyage', correct: false},
        {id: 'need3', value: 'logement', correct: true},
        {id: 'need4', value: 'education', correct: true},
        {id: 'need5', value: 'loisirs', correct: false}
    ];
    
    let correctCount = 0;
    let totalCorrect = 3; // Il y a 3 besoins prioritaires
    
    needs.forEach(need => {
        const checkbox = document.getElementById(need.id);
        const isChecked = checkbox.checked;
        
        if ((need.correct && isChecked) || (!need.correct && !isChecked)) {
            correctCount++;
        }
    });
    
    if (correctCount === 5) {
        showSuccessModal(
            '🌟 Parfait !',
            `Tu as parfaitement identifié les besoins prioritaires (${correctCount}/5).`,
            'Tu as bien compris la différence entre besoins essentiels et secondaires.'
        );
        updateProgress();
        updateProgress();
    } else if (correctCount >= 3) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as identifié ${correctCount}/5 besoins correctement.`,
            'Continue à t\'entraîner pour ne faire aucune erreur.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as identifié ${correctCount}/5 besoins correctement.`,
            'Rappelle-toi : les besoins prioritaires sont ceux sans lesquels on ne peut pas vivre dignement (nourriture, santé, logement, éducation).'
        );
    }
}

function checkDefinition() {
    const words = [
        {id: 'word1', correct: 'rationnelle'},
        {id: 'word2', correct: 'planifier'},
        {id: 'word3', correct: 'disponibles'},
        {id: 'word4', correct: 'gestion'},
        {id: 'word5', correct: 'des dépenses'}
    ];
    
    let correctCount = 0;
    let userAnswers = [];
    
    words.forEach(word => {
        const input = document.getElementById(word.id);
        const userAnswer = input.value.trim().toLowerCase();
        userAnswers.push(userAnswer);
        
        if (userAnswer === word.correct) {
            correctCount++;
            input.style.borderColor = 'var(--success)';
            input.style.backgroundColor = 'rgba(75, 181, 67, 0.1)';
        } else {
            input.style.borderColor = 'var(--warning)';
            input.style.backgroundColor = 'rgba(255, 152, 0, 0.1)';
        }
    });
    
    if (correctCount === 5) {
        showSuccessModal(
            '💡 Définition maîtrisée !',
            `Tu as complété parfaitement la définition (${correctCount}/5).`,
            'La gestion rationnelle est bien la planification des dépenses selon les ressources disponibles.'
        );
        updateProgress();
        updateProgress();
    } else if (correctCount >= 3) {
        showSuccessModal(
            '🔍 Presque parfait !',
            `Tu as complété ${correctCount}/5 mots correctement.`,
            'Relis la définition dans la leçon pour retenir les termes exacts.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '🧠 À travailler',
            `Tu as complété ${correctCount}/5 mots correctement.`,
            'La définition exacte est : "La gestion rationnelle des ressources c\'est planifier les dépenses en fonction des ressources disponibles. Cette gestion s\'appuie sur : La planification des dépenses ; L\'exécution rigoureuse du budget."'
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
    if (q1.length > 10 && (q1.includes('mauvaise gestion') || q1.includes('argent') || q1.includes('scolarité') || q1.includes('grand frère'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1 :</strong> Tu as bien identifié le problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est la mauvaise gestion de l\'argent de la scolarité par le grand frère.</p>';
    }
    
    // Question 2
    const bienfaitsAttendus = ['besoins essentiels', 'qualité de vie', 'avenir', 'bien-être', 'harmonie', 'conflits'];
    let bienfaitsTrouves = 0;
    
    bienfaitsAttendus.forEach(bienfait => {
        if (q2.toLowerCase().includes(bienfait)) bienfaitsTrouves++;
    });
    
    if (bienfaitsTrouves >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2 :</strong> Tu as cité des bienfaits pertinents.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Les bienfaits sont : assurer les besoins essentiels, améliorer la qualité de vie, garantir l\'avenir et le bien-être.</p>';
    }
    
    // Question 3
    if (q3.length > 20 && (q3.includes('pas') || q3.includes('refus') || q3.includes('mauvaise gestion') || q3.includes('équitable') || q3.includes('tous'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 3 :</strong> Bonne justification de ta décision.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense à expliquer pourquoi tu refuses (mauvaise gestion, ressources doivent profiter à tous, préjudice pour ton avenir).</p>';
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
            'Relis bien la situation et réfléchis aux conséquences de la mauvaise gestion.',
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
    if (eval1.length > 20 && (eval1.includes('mauvaise gestion') || eval1.includes('nourriture') || eval1.includes('mère') || eval1.includes('pagnes') || eval1.includes('bijoux'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Excellente identification du problème.</p>';
    } else if (eval1.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Bon début, précise que c\'est une mauvaise gestion des ressources familiales.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est la mauvaise gestion de l\'argent de la nourriture par la mère.</p>';
    }
    
    // Question 2
    const besoinsAttendus = ['nourriture', 'santé', 'logement', 'éducation', 'habilement'];
    let besoinsTrouves = 0;
    let explicationOk = false;
    
    besoinsAttendus.forEach(besoin => {
        if (eval2.toLowerCase().includes(besoin)) besoinsTrouves++;
    });
    
    // Vérifier si une explication est donnée
    if (eval2.length > 50 && (eval2.includes('parce que') || eval2.includes('car') || eval2.includes('caractère essentiel') || eval2.includes('vivre'))) {
        explicationOk = true;
    }
    
    if (besoinsTrouves >= 3 && explicationOk) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Parfaite énumération et explication des besoins prioritaires.</p>';
    } else if (besoinsTrouves >= 2) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as compris l\'idée, précise davantage pourquoi ces besoins sont prioritaires.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Les besoins prioritaires sont : nourriture, santé, logement, éducation. Ils sont prioritaires car sans eux, on ne peut pas vivre dignement.</p>';
    }
    
    // Question 3
    if (eval3.length > 40 && (eval3.includes('accompagner') || eval3.includes('aide') || eval3.includes('droit') || eval3.includes('violation') || eval3.includes('protection'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification avec des arguments solides.</p>';
    } else if (eval3.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bonne direction, développe tes arguments avec plus de détails.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense à justifier avec : 1) C\'est une violation des droits de l\'enfant, 2) L\'assistance sociale peut aider, 3) La souffrance de ta camarade nécessite une intervention.</p>';
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
    corrections += "<p>La mère utilise l'argent destiné à la nourriture de la famille pour ses dépenses personnelles (pagnes et bijoux). C'est une mauvaise gestion des ressources familiales qui prive les enfants de nourriture suffisante.</p>";
    
    corrections += "<p><strong>2. Trois besoins prioritaires d'une famille :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>La nourriture</strong> : Parce que c'est essentiel pour survivre et se développer</li>";
    corrections += "<li><strong>La santé</strong> : Parce que sans santé, on ne peut pas étudier, travailler ni vivre normalement</li>";
    corrections += "<li><strong>Le logement</strong> : Parce qu'il faut un toit pour se protéger des intempéries et vivre en sécurité</li>";
    corrections += "<li><strong>L'éducation</strong> : Parce que c'est essentiel pour préparer l'avenir et devenir autonome</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Justification pour accompagner :</strong></p>";
    corrections += "<p>Je décide d'accompagner ma camarade chez l'assistance sociale parce que :</p>";
    <ul>";
    corrections += "<li>C'est une situation grave qui nécessite une intervention extérieure</li>";
    corrections += "<li>La souffrance de ma camarade (faim constante) est inacceptable</li>";
    corrections += "<li>L'assistance sociale peut aider la famille à mieux gérer ses ressources</li>";
    corrections += "<li>C'est une violation des droits de l'enfant à une alimentation suffisante</li>";
    corrections += "<li>En tant qu'amie, je dois soutenir ma camarade dans cette difficulté</li>";
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