// JAVASCRIPT COMPLET - Mêmes fonctions que le fichier exemple

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
    const individuelles = document.getElementById('individuelles').value.toLowerCase();
    const sociales = document.getElementById('sociales').value.toLowerCase();
    
    const individuellesAttendus = ['honnêteté', 'dignité', 'politesse', 'courtoisie'];
    const socialesAttendus = ['solidarité', 'respect', 'tolérance', 'hospitalité'];
    
    let scoreIndividuelles = 0;
    let scoreSociales = 0;
    
    // Vérifier les valeurs individuelles
    individuellesAttendus.forEach(terme => {
        if (individuelles.includes(terme)) scoreIndividuelles++;
    });
    
    // Vérifier les valeurs sociales
    socialesAttendus.forEach(terme => {
        if (sociales.includes(terme)) scoreSociales++;
    });
    
    const totalScore = scoreIndividuelles + scoreSociales;
    const maxScore = 8; // 8 valeurs à classer
    
    if (totalScore >= 7) {
        showSuccessModal(
            '🌟 Classification parfaite !',
            `Tu as bien classé ${totalScore}/${maxScore} valeurs.`,
            'Tu maîtrises parfaitement la distinction entre valeurs individuelles et sociales.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (totalScore >= 5) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as classé ${totalScore}/${maxScore} valeurs correctement.`,
            'Tu progresses bien dans la compréhension des différents types de valeurs.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as classé ${totalScore}/${maxScore} valeurs correctement.`,
            'Consulte les corrections pour mieux comprendre la différence entre valeurs individuelles et valeurs sociales.'
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
    if (q1.length > 10 && (q1.includes('refus') || q1.includes('participer') || q1.includes('service') || q1.includes('balayer') || q1.includes('règle'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1 :</strong> Tu as bien identifié le problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Pense au refus de participer et au sentiment de supériorité.</p>';
    }
    
    // Question 2
    if (q2.length > 15 && (q2.includes('solidarité') || q2.includes('respect') || q2.includes('égalité'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonne identification des valeurs non respectées.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense aux valeurs sociales : solidarité, respect, égalité.</p>';
    }
    
    // Question 3
    if (q3.length > 20 && (q3.includes('ensemble') || q3.includes('participer') || q3.includes('règle') || q3.includes('exemple'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellentes suggestions pour parler à Kouamé.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense à expliquer l\'importance de participer ensemble et de montrer l\'exemple.</p>';
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
            'Relis bien la situation et réfléchis aux valeurs concernées.',
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
    const eval2a = document.getElementById('eval2a').value.trim();
    const eval2b = document.getElementById('eval2b').value.trim();
    const eval3 = document.getElementById('eval3').value.trim();
    const eval4 = document.getElementById('eval4').value.trim();
    const eval5 = document.getElementById('eval5').value.trim();
    const eval6 = document.getElementById('eval6').value.trim();
    
    if (!eval1 || !eval2a || !eval2b || !eval3 || !eval4 || !eval5 || !eval6) {
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
    if (eval1.length > 20 && (eval1.includes('vol') || eval1.includes('prendre') || eval1.includes('cueillir') || eval1.includes('propriété') || eval1.includes('voisin'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1 (situation 1) :</strong> Bonne identification du problème.</p>';
    } else if (eval1.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 (situation 1) :</strong> Bon début, précise que c\'est prendre sans permission.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 (situation 1) :</strong> Le problème est de vouloir prendre les fruits du voisin sans permission.</p>';
    }
    
    // Question 2a (valeur individuelle)
    if (eval2a.toLowerCase().includes('honnêteté')) {
        score += 1;
        feedback += '<p>✓ <strong>Question 2a :</strong> Exact, l\'honnêteté est la valeur individuelle concernée.</p>';
    } else if (eval2a.length > 5) {
        score += 0.5;
        feedback += '<p>↔ <strong>Question 2a :</strong> Presque, la valeur individuelle principale est l\'honnêteté.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2a :</strong> La valeur individuelle concernée est l\'honnêteté.</p>';
    }
    
    // Question 2b (valeur sociale)
    if (eval2b.toLowerCase().includes('respect')) {
        score += 1;
        feedback += '<p>✓ <strong>Question 2b :</strong> Exact, le respect de la propriété d\'autrui est concerné.</p>';
    } else if (eval2b.length > 5) {
        score += 0.5;
        feedback += '<p>↔ <strong>Question 2b :</strong> Presque, le respect est la valeur sociale concernée.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2b :</strong> La valeur sociale concernée est le respect (de la propriété).</p>';
    }
    
    // Question 3 (justification)
    if (eval3.length > 40 && (eval3.includes('règle') || eval3.includes('principe') || eval3.includes('respect') || eval3.includes('propriété') || eval3.includes('vol'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification.</p>';
    } else if (eval3.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bonne direction, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense à expliquer que prendre sans permission est contraire aux règles de vie.</p>';
    }
    
    // Question 4 (situation 2)
    if (eval4.length > 15 && (eval4.includes('paiement') || eval4.includes('inscription') || eval4.includes('frais') || eval4.includes('expul'))) {
        score += 1;
        feedback += '<p>✓ <strong>Question 4 :</strong> Bonne identification du problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 4 :</strong> Le problème est le non-paiement des frais d\'inscription.</p>';
    }
    
    // Question 5 (articles)
    if (eval5.length > 30 && (eval5.includes('article 1') || eval5.includes('inscription') || eval5.includes('droit'))) {
        score += 1.5;
        feedback += '<p>✓ <strong>Question 5 :</strong> Bonne citation des articles.</p>';
    } else if (eval5.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 5 :</strong> Tu as compris l\'idée, cite les articles plus précisément.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 5 :</strong> Pense à citer l\'article 1 sur l\'inscription.</p>';
    }
    
    // Question 6 (explication)
    if (eval6.length > 40 && (eval6.includes('règlement') || eval6.includes('obligatoire') || eval6.includes('inscription') || eval6.includes('égalité'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 6 :</strong> Excellente explication.</p>';
    } else if (eval6.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 6 :</strong> Bonne base, développe avec le règlement intérieur.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 6 :</strong> Explique que sans inscription payée, on n\'est pas officiellement élève.</p>';
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
    
    corrections += "<p><strong>Situation 1 - Les mangues du voisin :</strong></p>";
    corrections += "<p><strong>1. Problème identifié :</strong> Vouloir prendre les fruits du voisin sans sa permission (vol).</p>";
    corrections += "<p><strong>2. Valeurs concernées :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>Valeur individuelle :</strong> L'honnêteté (ne pas voler, ne pas mentir)</li>";
    corrections += "<li><strong>Valeur sociale :</strong> Le respect (respecter la propriété d'autrui)</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification du refus :</strong> Je refuse parce que prendre les fruits sans permission est contraire aux principes de vie en communauté. C'est du vol, ce qui va à l'encontre de l'honnêteté et du respect d'autrui. De plus, si le voisin nous surprend, cela pourrait créer des conflits dans le quartier.</p>";
    
    corrections += "<p><strong>Situation 2 - L'élève non inscrit :</strong></p>";
    corrections += "<p><strong>1. Problème identifié :</strong> Non-paiement des frais d'inscription.</p>";
    corrections += "<p><strong>2. Articles du règlement intérieur :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>Article 1 :</strong> \"Est considéré comme élève de l'établissement celui qui s'est acquitté de son droit d'inscription.\"</li>";
    corrections += "<li><strong>Article 7 :</strong> \"Tout travail de classe non fait sera sanctionné par la note zéro.\" (ou autre article pertinent)</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Explication à donner :</strong> \"Mon ami, selon le règlement intérieur de l'école (article 1), pour être officiellement élève, il faut avoir payé les frais d'inscription. Ce n'est pas une punition, mais une règle qui s'applique à tous pour assurer le bon fonctionnement de l'école. Tu dois régulariser ta situation auprès de l'administration pour pouvoir revenir en classe.\"</p>";
    
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