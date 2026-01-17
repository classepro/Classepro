// JavaScript pour la leçon 8 : L'Entreprise et l'Insertion dans la Vie Active

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

// Fonction pour vérifier la définition
function checkDefinition() {
    const q1 = document.getElementById('q1-1').value.trim().toLowerCase();
    const q2 = document.getElementById('q1-2').value.trim().toLowerCase();
    const q3 = document.getElementById('q1-3').value.trim().toLowerCase();
    const q4 = document.getElementById('q1-4').value.trim().toLowerCase();
    
    const correct1 = ['unité économique ou organisation', 'unité économique', 'organisation', '3'];
    const correct2 = ['juridiquement', '4'];
    const correct3 = ['produire des biens destinés à des clients', 'produire des biens', '1'];
    const correct4 = ['des services', '2'];
    
    let score = 0;
    
    if (correct1.some(c => q1.includes(c))) score++;
    if (correct2.some(c => q2.includes(c))) score++;
    if (correct3.some(c => q3.includes(c))) score++;
    if (correct4.some(c => q4.includes(c))) score++;
    
    if (score === 4) {
        showSuccessModal(
            '🎉 Parfait !',
            'Tu as parfaitement complété la définition de l\'entreprise.',
            'Tu maîtrises bien cette notion fondamentale.'
        );
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as correctement complété ${score}/4 parties de la définition.`,
            'Continue à réviser pour maîtriser parfaitement la définition.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as correctement complété ${score}/4 parties.`,
            'La définition complète est : "L\'entreprise est une unité économique ou organisation, juridiquement autonome, pour produire des biens destinés à des clients ou fournir des services pour des usagers."'
        );
    }
}

// Fonction pour vérifier les Vrai/Faux
function checkTrueFalse() {
    const answers = {
        'q2-1': 'faux',
        'q2-2': 'vrai',
        'q2-3': 'faux',
        'q2-4': 'vrai',
        'q2-5': 'faux'
    };
    
    let score = 0;
    let total = Object.keys(answers).length;
    let feedback = '<p><strong>Réponses corrigées :</strong></p>';
    
    for (const [question, correctAnswer] of Object.entries(answers)) {
        const radios = document.getElementsByName(question);
        let userAnswer = '';
        
        for (const radio of radios) {
            if (radio.checked) {
                userAnswer = radio.value;
                break;
            }
        }
        
        if (userAnswer === correctAnswer) {
            score++;
            feedback += `<p>✓ Question ${question.split('-')[1]} : Correct</p>`;
        } else if (userAnswer) {
            feedback += `<p>✗ Question ${question.split('-')[1]} : Tu as répondu "${userAnswer}", la bonne réponse était "${correctAnswer}"</p>`;
        } else {
            feedback += `<p>? Question ${question.split('-')[1]} : Pas de réponse</p>`;
        }
    }
    
    const percentage = Math.round((score / total) * 100);
    
    if (percentage >= 80) {
        showSuccessModal(
            '🌟 Excellent !',
            `Tu as obtenu ${score}/${total} bonnes réponses (${percentage}%).`,
            feedback
        );
        updateProgress();
        updateProgress();
    } else if (percentage >= 60) {
        showSuccessModal(
            '👍 Bien !',
            `Tu as obtenu ${score}/${total} bonnes réponses (${percentage}%).`,
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À travailler',
            `Tu as obtenu ${score}/${total} bonnes réponses (${percentage}%).`,
            feedback
        );
    }
}

// Fonction pour vérifier la classification
function checkClassification() {
    const grande = document.getElementById('grande').value.toLowerCase();
    const micro = document.getElementById('micro').value.toLowerCase();
    
    const grandeAttendus = ['cie', 'compagnie ivoirienne', 'orange'];
    const microAttendus = ['boutique', 'atelier', 'couture', 'vendeuse', 'beignets'];
    
    let scoreGrande = 0;
    let scoreMicro = 0;
    
    // Vérifier les grandes entreprises
    grandeAttendus.forEach(terme => {
        if (grande.includes(terme)) scoreGrande++;
    });
    
    // Vérifier les micro-entreprises
    microAttendus.forEach(terme => {
        if (micro.includes(terme)) scoreMicro++;
    });
    
    const totalScore = scoreGrande + scoreMicro;
    const maxScore = 5; // 5 entreprises à classer
    
    if (totalScore >= 4) {
        showSuccessModal(
            '🎯 Classification parfaite !',
            `Tu as bien classé ${totalScore}/${maxScore} entreprises.`,
            'Tu maîtrises parfaitement la distinction entre les types d\'entreprises.'
        );
        updateProgress();
    } else if (totalScore >= 2) {
        showSuccessModal(
            '👍 Bon classement !',
            `Tu as classé ${totalScore}/${maxScore} entreprises correctement.`,
            'Tu progresses bien dans la compréhension des différents types d\'entreprises.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as classé ${totalScore}/${maxScore} entreprises correctement.`,
            'Consulte les corrections pour mieux comprendre la classification des entreprises.'
        );
    }
}

// Fonction pour afficher toutes les réponses
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
    const eval4 = document.getElementById('eval4').value.trim();
    const eval5 = document.getElementById('eval5').value.trim();
    const eval6 = document.getElementById('eval6').value.trim();
    
    const allEvals = [eval1, eval2, eval3, eval4, eval5, eval6];
    if (allEvals.some(eval => !eval)) {
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
    let maxScore = 18; // 3 points par question
    let feedback = '';
    
    // Question 1
    if (eval1.length > 20 && (eval1.includes('incitation') || eval1.includes('refus') || eval1.includes('problème'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Tu as compris, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est le refus de l\'offre par le frère.</p>';
    }
    
    // Question 2
    if (eval2.length > 30 && (eval2.includes('chômeur') || eval2.includes('pauvre') || eval2.includes('oisiveté'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Excellente énumération des conséquences.</p>';
    } else if (eval2.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Bon début, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense aux conséquences sociales et économiques.</p>';
    }
    
    // Question 3
    if (eval3.length > 50 && (eval3.includes('bienfaits') || eval3.includes('compétences') || eval3.includes('valeurs') || eval3.includes('insertion'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification avec des arguments solides.</p>';
    } else if (eval3.length > 25) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bonne direction, développe tes arguments.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense aux avantages de l\'apprentissage d\'un métier.</p>';
    }
    
    // Question 4
    if (eval4.length > 20 && (eval4.includes('insuffisance') || eval4.includes('moyens') || eval4.includes('financiers'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 4 :</strong> Bonne identification du problème.</p>';
    } else if (eval4.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 4 :</strong> Tu as compris l\'essentiel.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 4 :</strong> Le problème est le manque de moyens financiers.</p>';
    }
    
    // Question 5
    if (eval5.length > 30 && (eval5.includes('peu d\'investissement') || eval5.includes('peu de qualifications') || eval5.includes('besoins du milieu'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 5 :</strong> Parfaite description des caractéristiques.</p>';
    } else if (eval5.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 5 :</strong> Bon début, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 5 :</strong> Pense aux AGR qui nécessitent peu de moyens.</p>';
    }
    
    // Question 6
    if (eval6.length > 50 && (eval6.includes('lutte contre chômage') || eval6.includes('autonomie') || eval6.includes('développement'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 6 :</strong> Excellente justification avec des arguments convaincants.</p>';
    } else if (eval6.length > 25) {
        score += 1;
        feedback += '<p>↔ <strong>Question 6 :</strong> Bonne réflexion, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 6 :</strong> Pense aux avantages de créer une entreprise.</p>';
    }
    
    const percentage = Math.round((score / maxScore) * 100);
    let message = '';
    let modalTitle = '';
    let modalMessage = '';
    
    if (percentage >= 80) {
        modalTitle = '🏆 Excellent travail !';
        modalMessage = `Tu as obtenu ${score}/${maxScore} points (${percentage}%).`;
        message = `🎉 Excellent ! ${score}/${maxScore} points (${percentage}%)`;
        createConfetti();
    } else if (percentage >= 60) {
        modalTitle = '👍 Très bon travail !';
        modalMessage = `Tu as obtenu ${score}/${maxScore} points (${percentage}%).`;
        message = `👍 Très bien ! ${score}/${maxScore} points (${percentage}%)`;
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
    
    corrections += "<p><strong>Situation 1 :</strong></p>";
    corrections += "<p><strong>1. Problème posé :</strong> Incitation au refus de l'offre de l'oncle par le frère aîné.</p>";
    corrections += "<p><strong>2. Conséquences du refus :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Il demeure chômeur et financièrement dépendant des autres</li>";
    corrections += "<li>Il reste pauvre et sans considération sociale</li>";
    corrections += "<li>Il s'expose à l'oisiveté et à la délinquance</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification :</strong> L'apprentissage d'un métier permet :</p>";
    corrections += "<ul>";
    corrections += "<li>L'acquisition de compétences professionnelles</li>";
    corrections += "<li>L'acquisition de valeurs (responsabilité, discipline)</li>";
    corrections += "<li>L'insertion dans la vie active</li>";
    corrections += "<li>L'autonomie financière et l'épanouissement</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>Situation 2 :</strong></p>";
    corrections += "<p><strong>4. Problème posé :</strong> L'insuffisance de moyens financiers pour la création d'entreprise.</p>";
    corrections += "<p><strong>5. Caractéristiques des AGR :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Nécessitent peu d'investissement</li>";
    corrections += "<li>Nécessitent peu de qualifications particulières</li>";
    corrections += "<li>Se développent selon les besoins du milieu</li>";
    corrections += "<li>Peuvent démarrer avec peu de moyens</li>";
    corrections += "</ul>";
    corrections += "<p><strong>6. Justification du refus :</strong> La création d'entreprise permet :</p>";
    corrections += "<ul>";
    corrections += "<li>La lutte contre le chômage et la pauvreté</li>";
    corrections += "<li>L'autonomie financière et la considération sociale</li>";
    corrections += "<li>La contribution au développement du pays</li>";
    corrections += "<li>L'épanouissement personnel et professionnel</li>";
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