// JAVASCRIPT COMPLET AVEC MODALES AMÉLIORÉES

// Variables pour suivre la progression
let progress = 0;
const totalExercises = 12;

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
function checkDefinition() {
    const q1 = document.getElementById('q1-1').value.trim().toLowerCase();
    const q2 = document.getElementById('q1-2').value.trim().toLowerCase();
    const q3 = document.getElementById('q1-3').value.trim().toLowerCase();
    const q4 = document.getElementById('q1-4').value.trim().toLowerCase();
    
    const correctAnswers = {
        q1: "sont constituées",
        q2: "déchets alimentaires",
        q3: "vestimentaires",
        q4: "ménages"
    };
    
    let score = 0;
    let userAnswers = [q1, q2, q3, q4];
    let correctCount = 0;
    
    // Vérifier chaque réponse
    if (q1.includes("constituées") || q1.includes("constituées")) {
        score++;
        correctCount++;
        document.getElementById('q1-1').style.borderColor = 'var(--success)';
    } else {
        document.getElementById('q1-1').style.borderColor = 'var(--warning)';
    }
    
    if (q2.includes("alimentaires")) {
        score++;
        correctCount++;
        document.getElementById('q1-2').style.borderColor = 'var(--success)';
    } else {
        document.getElementById('q1-2').style.borderColor = 'var(--warning)';
    }
    
    if (q3.includes("vestimentaires")) {
        score++;
        correctCount++;
        document.getElementById('q1-3').style.borderColor = 'var(--success)';
    } else {
        document.getElementById('q1-3').style.borderColor = 'var(--warning)';
    }
    
    if (q4.includes("ménages")) {
        score++;
        correctCount++;
        document.getElementById('q1-4').style.borderColor = 'var(--success)';
    } else {
        document.getElementById('q1-4').style.borderColor = 'var(--warning)';
    }
    
    if (correctCount === 4) {
        showSuccessModal(
            '🎉 Parfait !',
            'Tu as parfaitement complété la définition des ordures ménagères.',
            'Continue comme ça !'
        );
        updateProgress();
    } else if (correctCount >= 2) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as trouvé ${correctCount}/4 bonnes réponses.`,
            'Relis bien la définition pour mémoriser les termes exacts.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as trouvé ${correctCount}/4 bonnes réponses.`,
            'La définition complète est : "Les ordures ménagères <strong>sont constituées</strong> par des <strong>déchets alimentaires</strong> et <strong>vestimentaires</strong> produits par les <strong>ménages</strong>."'
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

function checkClassement() {
    const bonnes = document.getElementById('bonnes').value.toLowerCase();
    const mauvaises = document.getElementById('mauvaises').value.toLowerCase();
    
    const bonnesAttendues = ['poubelle avec couvercle', 'déposer', 'pré-collecte', 'composter', 'alimentaires'];
    const mauvaisesAttendues = ['brûler', 'caniveau', 'jeter', 'laisser', 'plusieurs jours'];
    
    let scoreBonnes = 0;
    let scoreMauvaises = 0;
    
    // Vérifier les bonnes pratiques
    bonnesAttendues.forEach(terme => {
        if (bonnes.includes(terme)) scoreBonnes++;
    });
    
    // Vérifier les mauvaises pratiques
    mauvaisesAttendues.forEach(terme => {
        if (mauvaises.includes(terme)) scoreMauvaises++;
    });
    
    const totalScore = scoreBonnes + scoreMauvaises;
    const maxScore = 6; // 6 pratiques à classer
    
    if (totalScore >= 5) {
        showSuccessModal(
            '🌟 Classification parfaite !',
            `Tu as bien classé ${totalScore}/${maxScore} pratiques.`,
            'Tu maîtrises parfaitement la distinction entre bonnes et mauvaises pratiques.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (totalScore >= 3) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as classé ${totalScore}/${maxScore} pratiques correctement.`,
            'Tu progresses bien dans la compréhension des bonnes pratiques de gestion.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as classé ${totalScore}/${maxScore} pratiques correctement.`,
            'Consulte les corrections pour mieux comprendre ce qu\'il faut faire et ne pas faire avec les déchets.'
        );
    }
}

function checkCasPratique() {
    const q1 = document.getElementById('q4-1').value.trim();
    const q2 = document.getElementById('q4-2').value.trim();
    const q3 = document.getElementById('q4-3').value.trim();
    
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
    if (q1.length > 10 && (q1.includes('ravin') || q1.includes('déverser') || q1.includes('proposition') || q1.includes('problème'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1 :</strong> Tu as bien identifié le problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est la proposition de jeter les ordures dans le ravin.</p>';
    }
    
    // Question 2
    if (q2.length > 20 && (q2.includes('collecter') || q2.includes('déposer') || q2.includes('pré-collecte') || q2.includes('dépotoir'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonne énumération des règles de gestion.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense aux 3 étapes : collecter, déposer sur site de pré-collecte, traiter au dépotoir.</p>';
    }
    
    // Question 3
    if (q3.length > 30 && (q3.includes('santé') || q3.includes('maladies') || q3.includes('environnement') || q3.includes('pollution') || q3.includes('dégradation'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification de ton refus.</p>';
    } else if (q3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bon début, pense aux conséquences sur la santé et l\'environnement.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense aux dangers pour la santé (maladies) et l\'environnement (pollution).</p>';
    }
    
    if (score >= 5) {
        showSuccessModal(
            '💡 Très bon raisonnement !',
            'Tu as bien analysé la situation et proposé des arguments pertinents.',
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
            'Relis bien la situation et réfléchis aux conséquences des mauvaises pratiques.',
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
    const eval4 = document.getElementById('eval4').value.trim();
    
    if (!eval1 || !eval2 || !eval3 || !eval4) {
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
    
    // Question 1
    if (eval1.length > 30 && eval1.includes('déchets') && (eval1.includes('alimentaires') || eval1.includes('vestimentaires') || eval1.includes('ménages'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Excellente définition avec exemples pertinents.</p>';
    } else if (eval1.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Bon début, précise que ce sont des déchets alimentaires ET vestimentaires des ménages.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Pense à définir clairement et donner des exemples concrets.</p>';
    }
    
    // Question 2
    if (eval2.length > 40 && (eval2.includes('fumées') || eval2.includes('toxiques') || eval2.includes('santé') || eval2.includes('pollution') || eval2.includes('air'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Parfaite explication des dangers du brûlage.</p>';
    } else if (eval2.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as compris l\'idée, précise que les fumées sont toxiques et polluent l\'air.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> N\'oublie pas que les fumées sont toxiques et dangereuses pour la santé.</p>';
    }
    
    // Question 3
    if (eval3.length > 30 && (eval3.includes('collecter') || eval3.includes('déposer') || eval3.includes('pré-collecte') || eval3.includes('poubelle') || eval3.includes('couvercle'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente présentation des règles de gestion.</p>';
    } else if (eval3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bonne direction, pense aux 3 étapes principales.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense aux règles de base : poubelle couverte, sites de pré-collecte, etc.</p>';
    }
    
    // Question 4
    if (eval4.length > 50 && (eval4.includes('maladies') || eval4.includes('endémies') || eval4.includes('prévenir') || eval4.includes('propre') || eval4.includes('cadre de vie'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 4 :</strong> Excellente explication des bénéfices pour la santé communautaire.</p>';
    } else if (eval4.length > 25) {
        score += 1;
        feedback += '<p>↔ <strong>Question 4 :</strong> Bonne approche, développe davantage les liens avec la prévention des maladies.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 4 :</strong> Pense à expliquer comment la bonne gestion réduit les maladies.</p>';
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
    
    corrections += "<p><strong>1. Définition des ordures ménagères :</strong></p>";
    corrections += "<p>Les ordures ménagères sont constituées par des déchets alimentaires et vestimentaires produits par les ménages.</p>";
    corrections += "<p><strong>Exemples :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Les emballages perdus (sachets plastiques, boîtes de conserve)</li>";
    corrections += "<li>Les papiers usés (journaux, cartons d'emballage)</li>";
    corrections += "<li>Les restes de nourriture (épluchures, restes de repas)</li>";
    corrections += "<li>Les vieux vêtements et textiles</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>2. Dangers du brûlage à l'air libre :</strong></p>";
    corrections += "<p>Brûler les ordures à l'air libre est dangereux parce que :</p>";
    corrections += "<ul>";
    corrections += "<li><strong>Les fumées sont toxiques</strong> : Elles contiennent des particules fines et des gaz dangereux qui irritent les poumons et peuvent causer des maladies respiratoires</li>";
    corrections += "<li><strong>C'est une source de pollution</strong> : Les fumées polluent l'air que nous respirons, surtout dangereux pour les enfants, personnes âgées et malades</li>";
    corrections += "<li><strong>Risque d'incendie</strong> : Le feu peut se propager à des bâtiments ou à la végétation</li>";
    corrections += "<li><strong>Dégradation de l'environnement</strong> : Les cendres polluent les sols et peuvent contaminer les nappes phréatiques</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Trois règles de gestion des ordures ménagères :</strong></p>";
    corrections += "<ol>";
    corrections += "<li><strong>Collecter proprement</strong> : Utiliser une poubelle avec couvercle, mettre les déchets dans des sacs fermés</li>";
    corrections += "<li><strong>Déposer aux sites de pré-collecte</strong> : Utiliser les bacs à ordures publics aux heures de collecte</li>";
    corrections += "<li><strong>Faire traiter au dépotoir public</strong> : Laisser les services municipaux transporter les déchets vers le centre de traitement</li>";
    corrections += "</ol>";
    
    corrections += "<p><strong>4. Contribution à la santé de la communauté :</strong></p>";
    corrections += "<p>Une bonne gestion des déchets contribue à préserver la santé de la communauté parce que :</p>";
    corrections += "<ul>";
    corrections += "<li><strong>Elle prévient les maladies</strong> : En éliminant les déchets qui attirent moustiques, rats et mouches porteurs de maladies</li>";
    corrections += "<li><strong>Elle réduit la pollution</strong> : Un air et une eau plus propres réduisent les problèmes respiratoires et digestifs</li>";
    corrections += "<li><strong>Elle prévient les accidents</strong> : Moins de risques de glissades, coupures ou incendies</li>";
    corrections += "<li><strong>Elle améliore la qualité de vie</strong> : Un cadre de vie propre et agréable réduit le stress et favorise le bien-être</li>";
    corrections += "<li><strong>Elle protège les plus vulnérables</strong> : Les enfants et personnes âgées sont moins exposés aux dangers sanitaires</li>";
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