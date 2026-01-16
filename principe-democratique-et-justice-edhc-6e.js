// JAVASCRIPT COMPLET - Mêmes fonctions que les fichiers précédents

// Variables pour suivre la progression
let progress = 0;
const totalExercises = 8;

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
            'Clique sur la réponse que tu penses correcte.'
        );
        return;
    }
    
    if (selectedValue === correctAnswer) {
        // Bonne réponse
        showSuccessModal(
            '🎉 Excellente réponse !',
            'Félicitations, tu as bien compris la définition de la démocratie.',
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
        const correctAnswerText = {
            'a': 'a) Le roi détient tous les pouvoirs',
            'b': 'b) Le pouvoir appartient au peuple qui l\'exerce à travers ses représentants',
            'c': 'c) Le pouvoir est exercé par les plus forts'
        }[correctAnswer];
        
        const userAnswerText = {
            'a': 'a) Le roi détient tous les pouvoirs',
            'b': 'b) Le pouvoir appartient au peuple qui l\'exerce à travers ses représentants',
            'c': 'c) Le pouvoir est exercé par les plus forts'
        }[selectedValue];
        
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

function checkVraiFaux() {
    const answers = {
        'q2a': 'F',
        'q2b': 'V',
        'q2c': 'V',
        'q2d': 'F',
        'q2e': 'F'
    };
    
    let score = 0;
    const totalQuestions = 5;
    let feedback = '';
    
    // Vérifier chaque question
    for (const [question, correctAnswer] of Object.entries(answers)) {
        const radios = document.getElementsByName(question);
        let selectedValue = '';
        
        for (const radio of radios) {
            if (radio.checked) {
                selectedValue = radio.value;
                break;
            }
        }
        
        if (selectedValue === correctAnswer) {
            score++;
            feedback += `<p>✓ <strong>${question.substring(2)} :</strong> Bonne réponse !</p>`;
        } else if (selectedValue) {
            feedback += `<p>✗ <strong>${question.substring(2)} :</strong> Réponse incorrecte.</p>`;
        } else {
            feedback += `<p>? <strong>${question.substring(2)} :</strong> Pas de réponse.</p>`;
        }
    }
    
    if (score === totalQuestions) {
        showSuccessModal(
            '🌟 Parfait !',
            `Tu as ${score}/${totalQuestions} réponses correctes.`,
            feedback + '<p>Tu maîtrises parfaitement les principes démocratiques !</p>'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (score >= 3) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as ${score}/${totalQuestions} réponses correctes.`,
            feedback + '<p>Continue à étudier pour perfectionner tes connaissances.</p>'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as ${score}/${totalQuestions} réponses correctes.`,
            feedback + '<p>Consulte les corrections pour mieux comprendre les principes démocratiques.</p>'
        );
    }
}

function checkDefinition() {
    const def1 = document.getElementById('def1').value.trim().toLowerCase();
    const def2 = document.getElementById('def2').value.trim().toLowerCase();
    const def3 = document.getElementById('def3').value.trim().toLowerCase();
    const def4 = document.getElementById('def4').value.trim().toLowerCase();
    
    const correctAnswers = {
        'def1': 'un système politique',
        'def2': 'le droit de participer',
        'def3': 'aux décisions',
        'def4': 'à travers les élections'
    };
    
    let score = 0;
    const totalParts = 4;
    
    // Vérifier chaque partie
    if (def1.includes('système politique') || def1.includes('systeme politique')) score++;
    if (def2.includes('droit de participer') || def2.includes('droit de participer')) score++;
    if (def3.includes('décisions') || def3.includes('decisions')) score++;
    if (def4.includes('élections') || def4.includes('elections')) score++;
    
    if (score === totalParts) {
        showSuccessModal(
            '🌟 Définition parfaite !',
            'Tu as parfaitement reconstitué la définition de la démocratie.',
            'Tu comprends très bien ce qu\'est la démocratie.'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as ${score}/${totalParts} parties correctes.`,
            'Tu progresses bien dans la compréhension de la démocratie.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as ${score}/${totalParts} parties correctes.`,
            'Consulte les corrections pour mieux comprendre la définition complète de la démocratie.'
        );
    }
}

function checkImportance() {
    const answers = {
        'q4a': 'V',
        'q4b': 'F',
        'q4c': 'V',
        'q4d': 'V',
        'q4e': 'F'
    };
    
    let score = 0;
    const totalQuestions = 5;
    let feedback = '';
    
    // Vérifier chaque question
    for (const [question, correctAnswer] of Object.entries(answers)) {
        const radios = document.getElementsByName(question);
        let selectedValue = '';
        
        for (const radio of radios) {
            if (radio.checked) {
                selectedValue = radio.value;
                break;
            }
        }
        
        if (selectedValue === correctAnswer) {
            score++;
            feedback += `<p>✓ <strong>${question.substring(2)} :</strong> Bonne réponse !</p>`;
        } else if (selectedValue) {
            feedback += `<p>✗ <strong>${question.substring(2)} :</strong> Réponse incorrecte.</p>`;
        } else {
            feedback += `<p>? <strong>${question.substring(2)} :</strong> Pas de réponse.</p>`;
        }
    }
    
    if (score === totalQuestions) {
        showSuccessModal(
            '🌟 Excellent !',
            `Tu as ${score}/${totalQuestions} réponses correctes.`,
            feedback + '<p>Tu comprends parfaitement l\'importance de la démocratie !</p>'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 3) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as ${score}/${totalQuestions} réponses correctes.`,
            feedback + '<p>Continue à étudier pour mieux comprendre l\'importance des principes démocratiques.</p>'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as ${score}/${totalQuestions} réponses correctes.`,
            feedback + '<p>Consulte les corrections pour mieux comprendre pourquoi la démocratie est importante.</p>'
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
    const eval4 = document.getElementById('eval4').value.trim();
    const eval5 = document.getElementById('eval5').value.trim();
    const eval6 = document.getElementById('eval6').value.trim();
    
    if (!eval1 || !eval2 || !eval3 || !eval4 || !eval5 || !eval6) {
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
    let maxScore = 12;
    let feedback = '';
    
    // Question 1 (situation 1)
    if (eval1.length > 15 && (eval1.includes('opposition') || eval1.includes('élection') || eval1.includes('refus') || eval1.includes('assemblée'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1 (situation 1) :</strong> Bonne identification du problème.</p>';
    } else if (eval1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 (situation 1) :</strong> Bon début, précise le problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 (situation 1) :</strong> Le problème est l\'opposition à la tenue d\'élections démocratiques.</p>';
    }
    
    // Question 2 (conséquences)
    if (eval2.length > 20 && (eval2.includes('paix') || eval2.includes('justice') || eval2.includes('développement') || eval2.includes('conflict'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonne identification des conséquences.</p>';
    } else if (eval2.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Bonne direction, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense aux conséquences : perturbation de la paix, injustice sociale, non-développement.</p>';
    }
    
    // Question 3 (justification situation 1)
    if (eval3.length > 40 && (eval3.includes('démocratie') || eval3.includes('principe') || eval3.includes('choisir') || eval3.includes('représentant') || eval3.includes('paix'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification.</p>';
    } else if (eval3.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bonne base, développe avec des arguments démocratiques.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Explique que les élections sont un principe démocratique essentiel.</p>';
    }
    
    // Question 4 (situation 2)
    if (eval4.length > 15 && (eval4.includes('intimidation') || eval4.includes('tricher') || eval4.includes('non-respect') || eval4.includes('démocratique'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 4 :</strong> Bonne identification du problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 4 :</strong> Le problème est le non-respect des principes démocratiques par intimidation.</p>';
    }
    
    // Question 5 (principes)
    if (eval5.length > 20 && (eval5.includes('souveraineté') || eval5.includes('égalité') || eval5.includes('transparence') || eval5.includes('élection'))) {
        score += 1.5;
        feedback += '<p>✓ <strong>Question 5 :</strong> Bonne citation des principes.</p>';
    } else if (eval5.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 5 :</strong> Tu as compris l\'idée, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 5 :</strong> Pense aux principes : souveraineté du peuple, égalité, transparence, élections libres.</p>';
    }
    
    // Question 6 (justification situation 2)
    if (eval6.length > 40 && (eval6.includes('valeur') || eval6.includes('tolérance') || eval6.includes('respect') || eval6.includes('différence') || eval6.includes('acceptation'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 6 :</strong> Excellente justification.</p>';
    } else if (eval6.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 6 :</strong> Bonne base, développe avec les valeurs démocratiques.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 6 :</strong> Explique que la démocratie favorise des valeurs comme la tolérance, le respect, l\'acceptation de la différence.</p>';
    }
    
    const percentage = Math.round((score / maxScore) * 100);
    let message = '';
    let modalTitle = '';
    let modalMessage = '';
    
    if (percentage >= 80) {
        modalTitle = '🏆 Excellent travail !';
        modalMessage = `Tu as obtenu ${score.toFixed(1)}/${maxScore} points (${percentage}%).`;
        message = `🎉 Excellent travail ! ${score.toFixed(1)}/${maxScore} points (${percentage}%)`;
        createConfetti();
    } else if (percentage >= 60) {
        modalTitle = '👍 Bon travail !';
        modalMessage = `Tu as obtenu ${score.toFixed(1)}/${maxScore} points (${percentage}%).`;
        message = `👍 Bon travail ! ${score.toFixed(1)}/${maxScore} points (${percentage}%)`;
    } else if (percentage >= 40) {
        modalTitle = '✅ Assez bien !';
        modalMessage = `Tu as obtenu ${score.toFixed(1)}/${maxScore} points (${percentage}%).`;
        message = `✅ Assez bien ! ${score.toFixed(1)}/${maxScore} points (${percentage}%)`;
    } else {
        modalTitle = '📚 À revoir !';
        modalMessage = `Tu as obtenu ${score.toFixed(1)}/${maxScore} points (${percentage}%).`;
        message = `📚 À revoir ! ${score.toFixed(1)}/${maxScore} points (${percentage}%)`;
    }
    
    showSuccessModal(
        modalTitle,
        modalMessage,
        feedback
    );
    
    scoreDisplay.innerHTML = `<strong>${message}</strong>`;
    
    // Générer les corrections détaillées
    let corrections = "<h4>Corrections suggérées :</h4>";
    
    corrections += "<p><strong>Situation 1 - Les élections de la coopérative :</strong></p>";
    corrections += "<p><strong>1. Problème identifié :</strong> Une incitation à s'opposer à la tenue de l'Assemblée Générale élective, ce qui va à l'encontre des principes démocratiques.</p>";
    corrections += "<p><strong>2. Conséquences de cette attitude :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>La perturbation de la paix et de la justice sociale au sein de la coopérative</li>";
    corrections += "<li>Le non-développement de la coopérative car sans élections libres, les meilleurs dirigeants ne seront pas choisis</li>";
    corrections += "<li>La création de tensions et de divisions parmi les membres</li>";
    corrections += "<li>La perte de crédibilité et de légitimité du bureau</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification du refus :</strong> Je refuse de m'opposer aux élections car elles sont un des principes fondamentaux de la démocratie qui permet aux membres de choisir librement leurs représentants. Le respect des principes démocratiques garantit la paix, la justice sociale et le bon fonctionnement de la coopérative. Sans élections libres, la coopérative perd sa légitimité et son efficacité.</p>";
    
    corrections += "<p><strong>Situation 2 - L'intimidation électorale :</strong></p>";
    corrections += "<p><strong>1. Problème identifié :</strong> Le non-respect des principes démocratiques par l'intimidation des électeurs et la tentative de truquer les élections.</p>";
    corrections += "<p><strong>2. Deux principes démocratiques :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>La transparence dans la gestion des affaires publiques :</strong> Les élections doivent être honnêtes et claires</li>";
    corrections += "<li><strong>Les élections libres :</strong> Chacun doit pouvoir voter librement, sans pression ni intimidation</li>";
    corrections += "<li><strong>L'égalité des citoyens :</strong> Tous les candidats et électeurs ont les mêmes droits</li>";
    corrections += "<li><strong>La souveraineté du peuple :</strong> Ce sont les électeurs qui décident, pas les intimidateurs</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification :</strong> La démocratie favorise l'apprentissage des valeurs collectives et individuelles telles que la tolérance, la coopération, le respect, le compromis social et l'acceptation de la différence. Accepter l'intimidation irait à l'encontre de toutes ces valeurs. Je refuse donc cette proposition car je veux respecter les principes démocratiques qui sont essentiels pour une élection juste et pour préserver la paix dans l'établissement.</p>";
    
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