// constitution-de-la-ci-edhc-6e.js

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
        const correctAnswerText = {
            'a': 'a) La vie de l\'État et de l\'administration d\'une nation',
            'b': 'b) Les associations et clubs au sein d\'un État',
            'c': 'c) Les us et coutumes d\'un pays'
        }[correctAnswer];
        
        const userAnswerText = {
            'a': 'a) La vie de l\'État et de l\'administration d\'une nation',
            'b': 'b) Les associations et clubs au sein d\'un État',
            'c': 'c) Les us et coutumes d\'un pays'
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

function checkCompletion() {
    const comp1 = document.getElementById('comp1').value.trim().toLowerCase();
    const comp2 = document.getElementById('comp2').value.trim().toLowerCase();
    const comp3 = document.getElementById('comp3').value.trim().toLowerCase();
    const comp4 = document.getElementById('comp4').value.trim().toLowerCase();
    
    const correctOrder = ['préambule', 'titres', 'chapitres', 'articles'];
    const userOrder = [comp1, comp2, comp3, comp4];
    
    let score = 0;
    
    // Vérifier chaque réponse
    if (comp1 === 'préambule') score++;
    if (comp2 === 'titres') score++;
    if (comp3 === 'chapitres') score++;
    if (comp4 === 'articles') score++;
    
    if (score === 4) {
        showSuccessModal(
            '🌟 Parfait !',
            'Tu as parfaitement complété la phrase.',
            'Tu maîtrises bien les composantes de la Constitution.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (score >= 2) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as ${score}/4 réponses correctes.`,
            'Tu progresses bien dans la compréhension de la structure de la Constitution.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as ${score}/4 réponses correctes.`,
            'Consulte les corrections pour mieux comprendre l\'organisation de la Constitution.'
        );
    }
}

function checkRoles() {
    const correctAnswers = ['a', 'b', 'e', 'f'];
    const userAnswers = [];
    
    if (document.getElementById('role1').checked) userAnswers.push('a');
    if (document.getElementById('role2').checked) userAnswers.push('b');
    if (document.getElementById('role3').checked) userAnswers.push('c');
    if (document.getElementById('role4').checked) userAnswers.push('d');
    if (document.getElementById('role5').checked) userAnswers.push('e');
    if (document.getElementById('role6').checked) userAnswers.push('f');
    
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    
    // Compter les bonnes réponses sélectionnées
    userAnswers.forEach(answer => {
        if (correctAnswers.includes(answer)) {
            correctCount++;
        } else {
            incorrectCount++;
        }
    });
    
    // Compter les bonnes réponses non sélectionnées
    const missingCorrect = correctAnswers.filter(a => !userAnswers.includes(a)).length;
    
    score = correctCount - incorrectCount;
    const maxScore = 4; // 4 bonnes réponses au total
    
    if (score === 4 && incorrectCount === 0) {
        showSuccessModal(
            '🌟 Excellente analyse !',
            'Tu as parfaitement identifié tous les rôles de la Constitution.',
            'Tu comprends très bien les différentes fonctions de la Constitution.'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as identifié ${correctCount}/${maxScore} rôles correctement.`,
            'Continue à étudier pour mieux comprendre tous les rôles de la Constitution.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as ${correctCount}/${maxScore} rôles correctement identifiés.`,
            'Consulte les corrections pour mieux comprendre les différents rôles de la Constitution.'
        );
    }
}

function checkValues() {
    const correctAnswers = ['2', '3', '4'];
    const userAnswers = [];
    
    if (document.getElementById('val1').checked) userAnswers.push('1');
    if (document.getElementById('val2').checked) userAnswers.push('2');
    if (document.getElementById('val3').checked) userAnswers.push('3');
    if (document.getElementById('val4').checked) userAnswers.push('4');
    if (document.getElementById('val5').checked) userAnswers.push('5');
    
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    
    // Compter les bonnes réponses sélectionnées
    userAnswers.forEach(answer => {
        if (correctAnswers.includes(answer)) {
            correctCount++;
        } else {
            incorrectCount++;
        }
    });
    
    // Compter les bonnes réponses non sélectionnées
    const missingCorrect = correctAnswers.filter(a => !userAnswers.includes(a)).length;
    
    score = correctCount - incorrectCount;
    const maxScore = 3; // 3 bonnes réponses au total
    
    if (score === 3 && incorrectCount === 0) {
        showSuccessModal(
            '🌟 Parfait !',
            'Tu as parfaitement identifié toutes les valeurs importantes.',
            'Tu comprends très bien pourquoi le respect de la Constitution est essentiel.'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 1) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as identifié ${correctCount}/${maxScore} valeurs correctement.`,
            'Continue à étudier pour mieux comprendre l\'importance du respect de la Constitution.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as ${correctCount}/${maxScore} valeurs correctement identifiées.`,
            'Consulte les corrections pour mieux comprendre l\'importance du respect de la Constitution.'
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
    if (eval1.length > 15 && (eval1.includes('non-respect') || eval1.includes('constitution') || eval1.includes('perturber') || eval1.includes('conférence'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1 (situation 1) :</strong> Bonne identification du problème.</p>';
    } else if (eval1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 (situation 1) :</strong> Bon début, précise le problème de non-respect.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 (situation 1) :</strong> Le problème est le non-respect de la Constitution.</p>';
    }
    
    // Question 2 (composantes)
    if (eval2.length > 10 && (eval2.includes('préambule') || eval2.includes('titre') || eval2.includes('chapitre') || eval2.includes('article'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonne énumération des composantes.</p>';
    } else if (eval2.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Bonne direction, cite des composantes précises.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense aux composantes : préambule, titres, chapitres, articles.</p>';
    }
    
    // Question 3 (justification situation 1)
    if (eval3.length > 40 && (eval3.includes('paix') || eval3.includes('stabilité') || eval3.includes('développement') || eval3.includes('respect'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification.</p>';
    } else if (eval3.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bonne base, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Explique que le respect de la Constitution garantit la paix et le développement.</p>';
    }
    
    // Question 4 (situation 2)
    if (eval4.length > 15 && (eval4.includes('méconnaissance') || eval4.includes('intérêt') || eval4.includes('importance') || eval4.includes('utilité'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 4 :</strong> Bonne identification du problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 4 :</strong> Le problème est la méconnaissance de l\'importance de la Constitution.</p>';
    }
    
    // Question 5 (rôles)
    if (eval5.length > 20 && (eval5.includes('organiser') || eval5.includes('droit') || eval5.includes('devoir') || eval5.includes('pouvoir'))) {
        score += 1.5;
        feedback += '<p>✓ <strong>Question 5 :</strong> Bonne citation des rôles.</p>';
    } else if (eval5.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 5 :</strong> Tu as compris l\'idée, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 5 :</strong> Pense aux rôles : organiser l\'État, énoncer les droits et devoirs, etc.</p>';
    }
    
    // Question 6 (justification situation 2)
    if (eval6.length > 40 && (eval6.includes('fondamentale') || eval6.includes('organise') || eval6.includes('garantit') || eval6.includes('paix'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 6 :</strong> Excellente justification du rôle de la Constitution.</p>';
    } else if (eval6.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 6 :</strong> Bonne direction, développe avec des arguments solides.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 6 :</strong> Explique que la Constitution est la loi fondamentale qui organise la vie du pays.</p>';
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
    
    corrections += "<p><strong>Situation 1 - La conférence perturbée :</strong></p>";
    corrections += "<p><strong>1. Problème identifié :</strong> Le non-respect de la Constitution ivoirienne et la volonté de perturber une conférence sur ce sujet important.</p>";
    corrections += "<p><strong>2. Deux composantes de la Constitution :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>Préambule :</strong> Introduction qui présente les valeurs et principes fondamentaux</li>";
    corrections += "<li><strong>Titres (16) :</strong> Grandes parties thématiques de la Constitution</li>";
    corrections += "<li><strong>Chapitres (48) :</strong> Sous-parties des titres</li>";
    corrections += "<li><strong>Articles (184) :</strong> Règles précises et numérotées</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification :</strong> Je refuse de participer à la perturbation car le respect de la Constitution est essentiel pour garantir la stabilité politique, contribuer à l'épanouissement social et économique des citoyens, et assurer la prospérité et la paix du pays. Perturber la conférence serait contraire à l'esprit de respect des lois qui fonde notre État de droit.</p>";
    
    corrections += "<p><strong>Situation 2 - Convaincre le père :</strong></p>";
    corrections += "<p><strong>1. Problème identifié :</strong> La méconnaissance de l'importance de la Constitution.</p>";
    corrections += "<p><strong>2. Deux rôles de la Constitution :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>Organiser la vie de l'État :</strong> Définir comment fonctionnent les institutions</li>";
    corrections += "<li><strong>Énoncer les droits et devoirs des citoyens :</strong> Garantir nos libertés fondamentales</li>";
    corrections += "<li><strong>Préciser le principe de gouvernement :</strong> Définir le type de régime politique</li>";
    corrections += "<li><strong>Définir les rapports entre les pouvoirs :</strong> Organiser les relations entre exécutif, législatif et judiciaire</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification :</strong> La Constitution est la loi fondamentale qui organise la vie de l'État. Sans elle, il n'y aurait pas de règles claires pour gouverner le pays, les droits des citoyens ne seraient pas garantis, et le risque de conflits et d'abus de pouvoir serait grand. La Constitution est donc essentielle pour préserver la paix, assurer la justice et permettre le développement de notre pays.</p>";
    
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