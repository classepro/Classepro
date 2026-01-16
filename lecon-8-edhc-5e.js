// JAVASCRIPT COMPLET - Leçon 8 EDHC 5ème
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
        if (tab.dataset.tab === tabName) {
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

// Fonction pour mettre à jour la barre de progression
function updateProgress() {
    progress = Math.min(progress + 1, totalExercises);
    const percent = Math.round((progress / totalExercises) * 100);
    document.getElementById('progressPercent').textContent = `${percent}%`;
    document.getElementById('progressFill').style.width = `${percent}%`;
}

// Fonctions pour les exercices interactifs avec modales améliorées

// Classification des véhicules
function checkClassification() {
    const colonneA = document.getElementById('colonneA').value.toLowerCase();
    const colonneB = document.getElementById('colonneB').value.toLowerCase();
    
    const attendusA = ['mobylette', 'bicyclette', 'moto-taxi', 'mototaxi'];
    const attendusB = ['car de transport', 'taxi', 'car', 'transport'];
    
    let scoreA = 0;
    let scoreB = 0;
    
    // Vérifier la colonne A (engins à deux roues)
    attendusA.forEach(terme => {
        if (colonneA.includes(terme)) scoreA++;
    });
    
    // Vérifier la colonne B (automobiles)
    attendusB.forEach(terme => {
        if (colonneB.includes(terme)) scoreB++;
    });
    
    const totalScore = scoreA + scoreB;
    const maxScore = 5; // 5 véhicules à classer
    
    if (totalScore >= 4) {
        showSuccessModal(
            '🚗 Classification excellente !',
            `Tu as bien classé ${totalScore}/${maxScore} véhicules.`,
            'Tu maîtrises parfaitement la différence entre engins à deux roues et automobiles.'
        );
        updateProgress();
    } else if (totalScore >= 3) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as classé ${totalScore}/${maxScore} véhicules correctement.`,
            'Continue à t\'entraîner pour mieux distinguer les différents types de véhicules.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as classé ${totalScore}/${maxScore} véhicules correctement.`,
            'Consulte les corrections pour mieux comprendre la classification des véhicules.'
        );
    }
}

// Vérification des questions Vrai/Faux
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
            'Félicitations, tu as bien compris cette notion de sécurité routière.',
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

// Vérification des cases à cocher (comportements responsables)
function checkCheckboxes() {
    const cb1 = document.getElementById('cb1').checked;
    const cb2 = document.getElementById('cb2').checked;
    const cb3 = document.getElementById('cb3').checked;
    const cb4 = document.getElementById('cb4').checked;
    
    let score = 0;
    let feedback = '';
    
    // Réponses correctes : cb2 et cb4 seulement
    if (!cb1 && cb2 && !cb3 && cb4) {
        score = 2;
        feedback = '<p>✓ <strong>Parfait !</strong> Tu as identifié tous les comportements responsables.</p>';
    } else {
        feedback = '<p>✗ <strong>À ajuster :</strong></p>';
        feedback += '<ul>';
        feedback += cb1 ? '<li>✗ Les écouteurs sont dangereux (tu n\'entends pas la circulation)</li>' : '<li>✓ Bien, pas d\'écouteurs</li>';
        feedback += cb2 ? '<li>✓ Le casque est obligatoire et protecteur</li>' : '<li>✗ Le casque est essentiel pour la sécurité</li>';
        feedback += cb3 ? '<li>✗ Il faut circuler sur la droite, pas la gauche</li>' : '<li>✓ Bien, circulation sur la droite</li>';
        feedback += cb4 ? '<li>✓ Signaler ses intentions est important pour la sécurité</li>' : '<li>✗ Signaler ses intentions permet aux autres de anticiper</li>';
        feedback += '</ul>';
        
        if ((cb2 && !cb1 && !cb3 && cb4) || (!cb1 && cb2 && !cb3 && !cb4) || (!cb1 && !cb2 && !cb3 && cb4)) {
            score = 1;
        }
    }
    
    if (score === 2) {
        showSuccessModal(
            '🌟 Excellent !',
            'Tu maîtrises parfaitement les comportements responsables sur les engins à deux roues.',
            feedback
        );
        updateProgress();
    } else if (score === 1) {
        showSuccessModal(
            '👍 Bien !',
            'Tu as identifié certains comportements responsables.',
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            'Relis bien la leçon sur les comportements responsables.',
            feedback
        );
    }
}

// Vérification des avantages
function checkAdvantages() {
    const av1 = document.getElementById('av1').checked;
    const av2 = document.getElementById('av2').checked;
    const av3 = document.getElementById('av3').checked;
    const av4 = document.getElementById('av4').checked;
    
    let score = 0;
    let feedback = '';
    
    // Réponses correctes : av2 et av4 seulement
    if (!av1 && av2 && !av3 && av4) {
        score = 2;
        feedback = '<p>✓ <strong>Parfait !</strong> Tu as identifié tous les avantages du respect des règles.</p>';
    } else {
        feedback = '<p>✗ <strong>À ajuster :</strong></p>';
        feedback += '<ul>';
        feedback += av1 ? '<li>✗ Le respect des règles n\'influence pas directement le prix du carburant</li>' : '<li>✓ Bien, pas de lien avec le prix du carburant</li>';
        feedback += av2 ? '<li>✓ La fluidité routière est un avantage important</li>' : '<li>✗ La fluidité routière est bien un avantage</li>';
        feedback += av3 ? '<li>✗ La préservation du bitume dépend plus de la construction que des comportements</li>' : '<li>✓ Bien, pas directement lié</li>';
        feedback += av4 ? '<li>✓ La sécurité des usagers est l\'avantage principal</li>' : '<li>✗ La sécurité est essentielle</li>';
        feedback += '</ul>';
        
        if ((av2 && !av1 && !av3 && av4) || (!av1 && av2 && !av3 && !av4) || (!av1 && !av2 && !av3 && av4)) {
            score = 1;
        }
    }
    
    if (score === 2) {
        showSuccessModal(
            '🌟 Excellent !',
            'Tu as parfaitement compris les avantages du respect des règles de circulation.',
            feedback
        );
        updateProgress();
    } else if (score === 1) {
        showSuccessModal(
            '👍 Bien !',
            'Tu as identifié certains avantages.',
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            'Relis bien la partie sur l\'importance du respect des règles.',
            feedback
        );
    }
}

// Afficher toutes les réponses
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
    const responses = {
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
    for (const key in responses) {
        if (!responses[key]) {
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
    let feedback = '<h4>Analyse de tes réponses :</h4>';
    
    // Évaluation des réponses (simplifiée pour l'exemple)
    // En réalité, on pourrait utiliser une IA ou une analyse plus poussée
    
    for (const key in responses) {
        const response = responses[key];
        if (response.length > 10) { // Réponse développée
            score += 2;
            feedback += `<p>✓ <strong>Question ${key} :</strong> Bonne réponse développée</p>`;
        } else if (response.length > 5) { // Réponse courte mais correcte
            score += 1;
            feedback += `<p>↔ <strong>Question ${key} :</strong> Réponse correcte mais peu développée</p>`;
        } else { // Réponse insuffisante
            feedback += `<p>✗ <strong>Question ${key} :</strong> Réponse trop courte ou incomplète</p>`;
        }
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
        modalTitle = '👍 Très bon travail !';
        modalMessage = `Tu as obtenu ${score}/${maxScore} points (${percentage}%).`;
        message = `👍 Très bon travail ! ${score}/${maxScore} points (${percentage}%)`;
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
    corrections += "<p><strong>1. Problème posé :</strong> Le moto-taxi n'a pas de casque pour les passagers, ce qui est dangereux et illégal.</p>";
    corrections += "<p><strong>2. 2 comportements responsables en automobile :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Porter la ceinture de sécurité</li>";
    corrections += "<li>Rester assis sur son siège pendant le trajet</li>";
    corrections += "<li>Ne pas mettre la tête ou les bras par la fenêtre</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification du refus :</strong> Monter sans casque expose à des blessures graves à la tête en cas d'accident. Le casque réduit de 70% les risques de blessures graves.</p>";
    
    corrections += "<h5>Situation d'évaluation 2 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong> Des élèves adoptent des comportements dangereux dans le bus (tête et bras par la fenêtre).</p>";
    corrections += "<p><strong>2. 2 comportements responsables sur une moto :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Porter un casque bien attaché</li>";
    corrections += "<li>Signaler ses intentions de changement de direction</li>";
    corrections += "<li>Circuler sur la droite de la route</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification de l'interpellation :</strong> Même pour quelques secondes, ce comportement est dangereux. Un objet ou un autre véhicule peut heurter la personne, causant des blessures graves.</p>";
    
    corrections += "<h5>Situation d'évaluation 3 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong> Invitation à adopter un comportement dangereux (tête par la fenêtre) pendant un voyage scolaire.</p>";
    corrections += "<p><strong>2. 3 comportements responsables en véhicule :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Porter la ceinture de sécurité</li>";
    corrections += "<li>Éviter de mettre la tête ou le bras hors du véhicule</li>";
    corrections += "<li>Rester toujours assis sur son siège</li>";
    corrections += "<li>Éviter de se bagarrer ou de jouer à bord</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification du refus :</strong> Ce comportement expose à des blessures graves, met en danger les autres usagers, et peut entraîner des sanctions de l'établissement. La sécurité prime sur le divertissement.</p>";
    
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
    // Gestion des onglets
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Gestion des boutons d'exercices
    document.querySelectorAll('.show-answer').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            const question = this.dataset.question;
            const answer = this.dataset.answer;
            
            switch(action) {
                case 'checkRadio':
                    checkRadio(question, answer);
                    break;
                case 'checkClassification':
                    checkClassification();
                    break;
                case 'checkCheckboxes':
                    checkCheckboxes();
                    break;
                case 'checkAdvantages':
                    checkAdvantages();
                    break;
                case 'showAllAnswers':
                    showAllAnswers();
                    break;
                case 'submitEvaluation':
                    submitEvaluation();
                    break;
            }
        });
    });
    
    // Menu mobile
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