// JAVASCRIPT COMPLET - Même code que le fichier précédent adapté

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
    const salubre = document.getElementById('salubre').value.toLowerCase();
    const insalubre = document.getElementById('insalubre').value.toLowerCase();
    
    const salubreAttendus = ['balayer', 'poubelles', 'curer', 'caniveaux'];
    const insalubreAttendus = ['caniveaux', 'ordures', 'stagner', 'eaux', 'usées', 'besoins', 'nature'];
    
    let scoreSalubre = 0;
    let scoreInsalubre = 0;
    
    // Vérifier les pratiques salubres
    salubreAttendus.forEach(terme => {
        if (salubre.includes(terme)) scoreSalubre++;
    });
    
    // Vérifier les pratiques insalubres
    insalubreAttendus.forEach(terme => {
        if (insalubre.includes(terme)) scoreInsalubre++;
    });
    
    const totalScore = scoreSalubre + scoreInsalubre;
    const maxScore = 6; // 6 pratiques à classer
    
    if (totalScore >= 5) {
        showSuccessModal(
            '🌟 Classification parfaite !',
            `Tu as bien classé ${totalScore}/${maxScore} pratiques.`,
            'Tu maîtrises parfaitement la distinction entre pratiques salubres et insalubres.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (totalScore >= 3) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as classé ${totalScore}/${maxScore} pratiques correctement.`,
            'Tu progresses bien dans la compréhension des bonnes et mauvaises pratiques.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as classé ${totalScore}/${maxScore} pratiques correctement.`,
            'Consulte les corrections pour mieux comprendre la différence entre pratiques salubres et insalubres.'
        );
    }
}

function checkMaladies() {
    const maladiesChecked = [];
    
    // Vérifier quelles maladies sont cochées
    if (document.getElementById('maladie1').checked) maladiesChecked.push('bilharziose');
    if (document.getElementById('maladie2').checked) maladiesChecked.push('carie');
    if (document.getElementById('maladie3').checked) maladiesChecked.push('paludisme');
    if (document.getElementById('maladie4').checked) maladiesChecked.push('diabete');
    if (document.getElementById('maladie5').checked) maladiesChecked.push('typhoide');
    
    if (maladiesChecked.length === 0) {
        showErrorModal(
            'Réponse manquante',
            'Tu dois cocher au moins une maladie avant de vérifier.',
            'Relis bien la question et coche les cases correspondantes.'
        );
        return;
    }
    
    // Les bonnes réponses : bilharziose, paludisme, typhoïde
    const bonnesReponses = ['bilharziose', 'paludisme', 'typhoide'];
    let score = 0;
    
    // Compter les bonnes réponses
    maladiesChecked.forEach(maladie => {
        if (bonnesReponses.includes(maladie)) score++;
    });
    
    // Compter les mauvaises réponses
    const mauvaisesReponses = maladiesChecked.length - score;
    
    if (score === 3 && mauvaisesReponses === 0) {
        showSuccessModal(
            '🎯 Parfait !',
            'Tu as identifié correctement les 3 maladies liées à l\'insalubrité.',
            'Excellent travail de mémorisation !'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (score >= 2) {
        showSuccessModal(
            '👍 Très bien !',
            `Tu as identifié ${score}/3 maladies liées à l'insalubrité.`,
            'Continue à réviser pour identifier toutes les maladies correctement.'
        );
        updateProgress();
    } else {
        const details = `Tu as coché ${score} bonne(s) réponse(s) sur ${maladiesChecked.length} choix.<br>Les maladies liées à l'insalubrité sont : Bilharziose, Paludisme et Fièvre typhoïde.`;
        showErrorModal(
            '🩺 À revoir',
            'Tu as fait quelques erreurs dans l\'identification des maladies.',
            details
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
    let maxScore = 18; // 6 questions × 3 points
    let feedback = '';
    
    // Question 1.1
    if (eval1.length > 10 && (eval1.includes('problème') || eval1.includes('conseil') || eval1.includes('laisser tomber') || eval1.includes('campagne'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1.1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.1 :</strong> Bon début, tu peux être plus précis.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.1 :</strong> Pense à formuler clairement le problème.</p>';
    }
    
    // Question 1.2
    if (eval2.length > 20 && (eval2.includes('maladies') || eval2.includes('économies') || eval2.includes('productivité') || eval2.includes('qualité'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1.2 :</strong> Excellente énumération des conséquences.</p>';
    } else if (eval2.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.2 :</strong> Tu as compris, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.2 :</strong> Pense aux conséquences sur la santé, l\'économie, la qualité de vie.</p>';
    }
    
    // Question 1.3
    if (eval3.length > 30 && (eval3.includes('responsabilité') || eval3.includes('collective') || eval3.includes('santé') || eval3.includes('environnement'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1.3 :</strong> Excellente justification de ton refus.</p>';
    } else if (eval3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.3 :</strong> Bonne direction, argumente davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.3 :</strong> Pense à expliquer pourquoi c\'est important de participer.</p>';
    }
    
    // Question 2.1
    if (eval4.length > 10 && (eval4.includes('problème') || eval4.includes('insalubre') || eval4.includes('hygiène') || eval4.includes('propreté'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2.1 :</strong> Bonne identification du problème.</p>';
    } else if (eval4.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.1 :</strong> Bon début, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.1 :</strong> Pense à décrire le problème d\'insalubrité.</p>';
    }
    
    // Question 2.2
    if (eval5.length > 15 && (eval5.includes('ordures') || eval5.includes('déchets') || eval5.includes('toilettes') || eval5.includes('eaux'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2.2 :</strong> Parfaite énumération des pratiques insalubres.</p>';
    } else if (eval5.length > 8) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.2 :</strong> Tu as compris, cite des exemples concrets.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.2 :</strong> Pense aux mauvaises pratiques vues dans la leçon.</p>';
    }
    
    // Question 2.3
    if (eval6.length > 40 && (eval6.includes('maladies') || eval6.includes('santé') || eval6.includes('prévention') || eval6.includes('conséquences'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2.3 :</strong> Excellente justification de la sensibilisation.</p>';
    } else if (eval6.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.3 :</strong> Bon raisonnement, développe tes arguments.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.3 :</strong> Pense aux risques pour la santé et aux bénéfices de la sensibilisation.</p>';
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
    
    corrections += "<p><strong>Situation 1 : Campagne de salubrité</strong></p>";
    corrections += "<p><strong>1. Problème posé :</strong></p>";
    corrections += "<p>Incitation à ne pas participer à une campagne de salubrité sous prétexte que c'est l'affaire de la mairie uniquement.</p>";
    
    corrections += "<p><strong>2. Trois conséquences :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Augmentation des risques de maladies dans le quartier</li>";
    corrections += "<li>Baisse de la qualité de vie des habitants</li>";
    corrections += "<li>Réduction de la productivité des personnes malades</li>";
    corrections += "<li>Augmentation des dépenses de santé pour les familles</li>";
    corrections += "<li>Dégradation continue de l'environnement</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Justification du refus :</strong></p>";
    corrections += "<p>L'entretien du cadre de vie est une responsabilité collective. Participer aux campagnes de salubrité permet de :</p>";
    corrections += "<ul>";
    corrections += "<li>Vivre dans un environnement sain et agréable</li>";
    corrections += "<li>Préserver la santé de tous les habitants</li>";
    corrections += "<li>Réaliser des économies en évitant les maladies</li>";
    corrections += "<li>Renforcer la cohésion sociale dans le quartier</li>";
    corrections += "<li>Montrer l'exemple et sensibiliser les autres</li>";
    corrections += "</ul>";
    
    corrections += "<hr style='margin: 20px 0;'>";
    
    corrections += "<p><strong>Situation 2 : Visite chez le camarade malade</strong></p>";
    corrections += "<p><strong>1. Problème posé :</strong></p>";
    corrections += "<p>Le manque d'hygiène et d'entretien du cadre de vie dans le quartier (toilettes sales, déchets accumulés, présence de mouches).</p>";
    
    corrections += "<p><strong>2. Deux pratiques insalubres :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Les toilettes sales qui dégagent de mauvaises odeurs</li>";
    corrections += "<li>Les alentours de la maison qui servent de dépotoir</li>";
    corrections += "<li>Les déchets jetés n'importe où</li>";
    corrections += "<li>L'absence de poubelles ou de système de collecte</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Justification de la sensibilisation :</strong></p>";
    corrections += "<p>Il est important de sensibiliser parce que :</p>";
    corrections += "<ul>";
    corrections += "<li>Un cadre de vie insalubre expose aux maladies (paludisme, choléra, typhoïde)</li>";
    corrections += "<li>Ces maladies entraînent des dépenses qui réduisent les ressources familiales</li>";
    corrections += "<li>Elles réduisent la capacité de travail et d'étude des personnes affectées</li>";
    corrections += "<li>La sensibilisation peut changer les comportements et améliorer la santé de tous</li>";
    corrections += "<li>C'est un investissement pour l'avenir de la communauté</li>";
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