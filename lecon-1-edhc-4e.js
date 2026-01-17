// JAVASCRIPT COMPLET - Fonctionnalités identiques au deuxième fichier

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
            'Clique sur "Participe à la promotion" ou "Ne participe pas" pour choisir ta réponse.'
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
        const correctAnswerText = correctAnswer === 'oui' ? 'PARTICIPE à la promotion' : 'NE PARTICIPE PAS à la promotion';
        const userAnswerText = selectedValue === 'oui' ? 'PARTICIPE à la promotion' : 'NE PARTICIPE PAS à la promotion';
        
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

function checkPersonnesRessources() {
    const personnes = [
        { id: 'personne1', correct: true, nom: 'Le juge des enfants' },
        { id: 'personne2', correct: false, nom: 'Le chef de classe' },
        { id: 'personne3', correct: true, nom: 'Les experts de l\'UNICEF' },
        { id: 'personne4', correct: false, nom: 'L\'horloger' },
        { id: 'personne5', correct: false, nom: 'La sage-femme' }
    ];
    
    let score = 0;
    let maxScore = personnes.length;
    let feedback = '';
    
    personnes.forEach(personne => {
        const checkbox = document.getElementById(personne.id);
        const isChecked = checkbox.checked;
        
        if (isChecked === personne.correct) {
            score++;
            feedback += `<p>✓ <strong>${personne.nom}</strong> : Correct</p>`;
        } else {
            if (personne.correct) {
                feedback += `<p>✗ <strong>${personne.nom}</strong> : Devrait être cochée (c'est une personne ressource)</p>`;
            } else {
                feedback += `<p>✗ <strong>${personne.nom}</strong> : Ne devrait pas être cochée (ce n'est pas une personne ressource spécifique)</p>`;
            }
        }
    });
    
    const percentage = Math.round((score / maxScore) * 100);
    
    if (percentage >= 80) {
        showSuccessModal(
            '🌟 Parfait !',
            `Tu as identifié ${score}/${maxScore} personnes ressources correctement.`,
            feedback
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (percentage >= 60) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as identifié ${score}/${maxScore} personnes ressources correctement.`,
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as identifié ${score}/${maxScore} personnes ressources correctement.`,
            feedback
        );
    }
}

function checkInstitutions() {
    const institutionsTexte = document.getElementById('institutions').value.toLowerCase();
    
    // Institutions correctes à mentionner
    const institutionsCorrectes = ['unicef', 'pam', 'cnr', 'fonds des nations unies', 'programme alimentaire', 'réseau d\'information'];
    
    let score = 0;
    let institutionsTrouvees = [];
    
    institutionsCorrectes.forEach(institution => {
        if (institutionsTexte.includes(institution)) {
            score++;
            institutionsTrouvees.push(institution);
        }
    });
    
    const maxScore = 3; // 3 institutions à trouver
    const percentage = Math.round((score / maxScore) * 100);
    
    if (score >= 3) {
        showSuccessModal(
            '🎯 Excellent !',
            `Tu as trouvé les 3 institutions principales qui œuvrent pour la promotion des droits de l'enfant.`,
            `Institutions correctement identifiées : UNICEF, PAM, CNR`
        );
        updateProgress();
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '👍 Bien joué !',
            `Tu as trouvé ${score} des 3 institutions principales.`,
            `Tu as identifié : ${institutionsTrouvees.join(', ')}`
        );
        updateProgress();
    } else {
        showErrorModal(
            '🔍 À approfondir',
            `Tu as trouvé ${score} des 3 institutions principales.`,
            `Les institutions à identifier étaient : UNICEF (Fonds des Nations Unies pour l'enfance), PAM (Programme Alimentaire Mondial), CNR (Réseau d'Information des droits de l'Enfant)`
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
    // Récupérer les réponses
    const eval1_1 = document.getElementById('eval1-1').value.trim();
    const eval1_2 = document.getElementById('eval1-2').value.trim();
    const eval1_3 = document.getElementById('eval1-3').value.trim();
    const eval2_1 = document.getElementById('eval2-1').value.trim();
    const eval2_2 = document.getElementById('eval2-2').value.trim();
    const eval2_3 = document.getElementById('eval2-3').value.trim();
    
    // Vérifier que toutes les réponses sont remplies
    if (!eval1_1 || !eval1_2 || !eval1_3 || !eval2_1 || !eval2_2 || !eval2_3) {
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
    let maxScore = 12; // 6 questions × 2 points chacune
    let feedback = '<h4>Corrections détaillées :</h4>';
    
    // Évaluation de la situation 1
    feedback += '<h5>Situation 1 :</h5>';
    
    // Question 1.1
    if (eval1_1.length > 10 && (eval1_1.includes('violence') || eval1_1.includes('coups') || eval1_1.includes('battu') || eval1_1.includes('sévices'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1.1 :</strong> Bonne identification du problème (violences corporelles sur un enfant).</p>';
    } else if (eval1_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.1 :</strong> Tu as compris qu\'il y a un problème, mais précise qu\'il s\'agit de violences sur un enfant.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.1 :</strong> Le problème est que l\'enfant subit des violences corporelles de la part de son tuteur.</p>';
    }
    
    // Question 1.2
    if (eval1_2.length > 10 && (eval1_2.includes('UNICEF') || eval1_2.includes('Save') || eval1_2.includes('ONG') || eval1_2.includes('CNR'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1.2 :</strong> Bonne énumération des structures de promotion.</p>';
    } else if (eval1_2.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.2 :</strong> Tu as cité des structures, mais pense aux organisations spécialisées comme l\'UNICEF ou Save the Children.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.2 :</strong> Exemples de structures : UNICEF, Save the Children, ONG de défense des droits de l\'enfant.</p>';
    }
    
    // Question 1.3
    if (eval1_3.length > 20 && (eval1_3.includes('droit') || eval1_3.includes('protéger') || eval1_3.includes('violation') || eval1_3.includes('danger'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1.3 :</strong> Excellente justification du refus de garder le secret.</p>';
    } else if (eval1_3.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.3 :</strong> Bonne direction, développe davantage en parlant de la protection due à l\'enfant.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.3 :</strong> Il faut refuser car les enfants ont droit à la protection. Garder le silence, c\'est laisser continuer la violence.</p>';
    }
    
    // Évaluation de la situation 2
    feedback += '<h5>Situation 2 :</h5>';
    
    // Question 2.1
    if (eval2_1.length > 10 && (eval2_1.includes('autorité') || eval2_1.includes('parent') || eval2_1.includes('réduit') || eval2_1.includes('mécontent'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2.1 :</strong> Bonne identification du problème (mécontentement du père).</p>';
    } else if (eval2_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.1 :</strong> Tu as saisi l\'idée, précise que le père pense que la promotion réduit son autorité.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.1 :</strong> Le problème est que le père pense que promouvoir les droits de l\'enfant réduit l\'autorité parentale.</p>';
    }
    
    // Question 2.2
    if (eval2_2.length > 30 && (eval2_2.includes('enfant') && eval2_2.includes('famille') || eval2_2.includes('communauté'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2.2 :</strong> Bonne distinction des actions pour l\'enfant et pour la famille/communauté.</p>';
    } else if (eval2_2.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.2 :</strong> Tu as cité des actions, mais précise lesquelles sont pour l\'enfant et lesquelles sont pour la communauté.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.2 :</strong> Pour l\'enfant : épanouissement, reconnaissance juridique. Pour la famille/communauté : cohésion sociale, préservation de la paix.</p>';
    }
    
    // Question 2.3
    if (eval2_3.length > 40 && (eval2_3.includes('important') || eval2_3.includes('bien-fondé') || eval2_3.includes('protège') || eval2_3.includes('équilibre'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2.3 :</strong> Excellente justification en faveur de la promotion.</p>';
    } else if (eval2_3.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.3 :</strong> Bon début d\'argumentation, développe davantage les bénéfices de la promotion.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.3 :</strong> La promotion protège l\'enfant, favorise son épanouissement, et ne réduit pas l\'autorité parentale mais l\'exerce dans le respect.</p>';
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
    let corrections = "<h4>Corrections complètes :</h4>";
    
    corrections += "<h5>Situation 1 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong> Sévices corporels (violences) exercés sur un enfant par son tuteur.</p>";
    corrections += "<p><strong>2. Structures de promotion :</strong> UNICEF, Save the Children, ONG de défense des droits de l'enfant.</p>";
    corrections += "<p><strong>3. Refus de garder le secret :</strong> Parce que les enfants ont des droits qu'il faut respecter et promouvoir. Ne rien dire, c'est violer le droit à la protection de l'enfant et laisser continuer la violence.</p>";
    
    corrections += "<h5>Situation 2 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong> Mécontentement du père qui pense que la promotion des droits de l'enfant réduit l'autorité parentale.</p>";
    corrections += "<p><strong>2. Actions importantes :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>Pour l'enfant :</strong> Épanouissement de sa personnalité, reconnaissance juridique</li>";
    corrections += "<li><strong>Pour la famille/communauté :</strong> Cohésion sociale, préservation de la paix</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification :</strong> La promotion des droits de l'enfant :</p>";
    corrections += "<ul>";
    corrections += "<li>Protège l'enfant contre toutes formes de violence</li>";
    corrections += "<li>Favorise son épanouissement personnel</li>";
    corrections += "<li>Assure sa reconnaissance juridique</li>";
    corrections += "<li>Ne réduit pas l'autorité parentale mais l'exerce dans le respect de l'enfant</li>";
    corrections += "<li>Contribue à une société plus juste et harmonieuse</li>";
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