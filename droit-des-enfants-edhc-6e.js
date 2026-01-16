// JAVASCRIPT COMPLET AVEC MODALES AMÉLIORÉES

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
    const survie = document.getElementById('survie').value.toLowerCase();
    const protection = document.getElementById('protection').value.toLowerCase();
    
    const survieAttendus = ['soigné', 'malade', 'acte de naissance', 'manger', 'faim'];
    const protectionAttendus = ['frappé', 'insulté', 'travailler', 'dangereuses', 'enlèvements', 'protégé'];
    
    let scoreSurvie = 0;
    let scoreProtection = 0;
    
    // Vérifier les droits à la survie
    survieAttendus.forEach(terme => {
        if (survie.includes(terme)) scoreSurvie++;
    });
    
    // Vérifier les droits à la protection
    protectionAttendus.forEach(terme => {
        if (protection.includes(terme)) scoreProtection++;
    });
    
    const totalScore = scoreSurvie + scoreProtection;
    const maxScore = 6; // 6 droits à classer
    
    if (totalScore >= 5) {
        showSuccessModal(
            '🌟 Classification parfaite !',
            `Tu as bien classé ${totalScore}/${maxScore} droits.`,
            'Tu maîtrises parfaitement la distinction entre survie et protection.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (totalScore >= 3) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as classé ${totalScore}/${maxScore} droits correctement.`,
            'Tu progresses bien dans la compréhension des différents types de droits.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as classé ${totalScore}/${maxScore} droits correctement.`,
            'Consulte les corrections pour mieux comprendre la différence entre droits à la survie et droits à la protection.'
        );
    }
}

function checkCasPratique() {
    const q1 = document.getElementById('q3-1').value.trim();
    const q2 = document.getElementById('q3-2').value.trim();
    const q3 = document.getElementById('q3-3').value.trim();
    
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
    if (q1.length > 10 && (q1.includes('éducation') || q1.includes('repos') || q1.includes('loisirs') || q1.includes('équité') || q1.includes('exploitation'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1 :</strong> Tu as bien identifié les droits non respectés.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Essaie de penser aux droits spécifiques (éducation, repos, équité, protection).</p>';
    }
    
    // Question 2
    if (q2.length > 20 && (q2.includes('protection') || q2.includes('exploitation') || q2.includes('travail'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonne analyse du type de violation.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Réfléchis : est-ce un problème de survie ou de protection ?</p>';
    }
    
    // Question 3
    if (q3.length > 15 && (q3.includes('parler') || q3.includes('adulte') || q3.includes('aide') || q3.includes('social'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellentes suggestions pour aider Aminata.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense aux personnes qui peuvent aider (adultes de confiance).</p>';
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
            'Relis bien la situation et réfléchis aux différents droits concernés.',
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
    if (eval1.length > 30 && (eval1.includes('survie') || eval1.includes('manger') || eval1.includes('santé') || eval1.includes('logement') || eval1.includes('nationalité'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Excellente explication des droits à la survie.</p>';
    } else if (eval1.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Bon début, tu peux développer davantage avec des exemples.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Pense à définir clairement et donner des exemples concrets.</p>';
    }
    
    // Question 2
    if (eval2.length > 40 && (eval2.includes('protection') && eval2.includes('sécurité') || eval2.includes('violence') || eval2.includes('exploitation'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Parfaite énumération et explication des droits à la protection.</p>';
    } else if (eval2.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as compris l\'idée, précise davantage chaque droit.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> N\'oublie pas d\'expliquer brièvement chaque droit cité.</p>';
    }
    
    // Question 3
    if (eval3.length > 50 && (eval3.includes('société juste') || eval3.includes('paix') || eval3.includes('développement') || eval3.includes('équité'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellents arguments pour justifier l\'importance des droits.</p>';
    } else if (eval3.length > 25) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bonne direction, développe tes arguments avec plus de détails.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense aux bénéfices pour l\'enfant, la famille et la société.</p>';
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
    
    corrections += "<p><strong>1. Droits à la survie :</strong></p>";
    corrections += "<p>Les droits à la survie sont les droits qui garantissent à l'enfant l'accès aux conditions minimales nécessaires pour vivre dignement. Exemples :</p>";
    corrections += "<ul>";
    corrections += "<li><strong>Droit à l'alimentation</strong> : Avoir une nourriture suffisante et équilibrée</li>";
    corrections += "<li><strong>Droit à la santé</strong> : Pouvoir se soigner quand on est malade</li>";
    corrections += "<li><strong>Droit au logement</strong> : Vivre dans un endroit sûr et propre</li>";
    corrections += "<li><strong>Droit à la nationalité</strong> : Avoir une identité légale</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>2. Droits à la protection (3 exemples) :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>Droit à la sécurité</strong> : Être protégé contre les dangers physiques (accidents, enlèvements)</li>";
    corrections += "<li><strong>Protection contre la violence</strong> : Ne pas subir de violences physiques, psychologiques ou sexuelles</li>";
    corrections += "<li><strong>Protection contre l'exploitation</strong> : Ne pas être forcé de travailler dans des conditions dangereuses ou qui nuisent à la santé et à l'éducation</li>";
    corrections += "<li><strong>Protection spéciale</strong> : Bénéficier d'une protection supplémentaire si on est réfugié, handicapé ou orphelin</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Importance pour une société juste :</strong></p>";
    corrections += "<p>Le respect des droits de l'enfant est essentiel pour construire une société juste parce que :</p>";
    corrections += "<ul>";
    corrections += "<li><strong>Ça réduit les inégalités</strong> : Tous les enfants ont les mêmes chances de réussir, quelles que soient leurs origines</li>";
    corrections += "<li><strong>Ça favorise la paix sociale</strong> : Des enfants épanouis deviennent des adultes équilibrés qui contribuent positivement à la société</li>";
    corrections += "<li><strong>Ça assure un développement durable</strong> : Une société qui investit dans ses enfants se donne les moyens de se développer harmonieusement</li>";
    corrections += "<li><strong>Ça prévient la violence</strong> : Un enfant respecté apprend à respecter les autres, créant un cercle vertueux de respect mutuel</li>";
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