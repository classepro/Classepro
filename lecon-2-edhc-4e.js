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
function checkDefinition() {
    const radios = document.getElementsByName('q1-1');
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
            'Clique sur la proposition qui te semble correcte.'
        );
        return;
    }
    
    if (selectedValue === 'option2') {
        // Bonne réponse
        showSuccessModal(
            '🎉 Excellente réponse !',
            'Tu as bien compris la définition d\'un enfant-soldat.',
            'Un enfant-soldat est effectivement un membre de groupes armés âgé de moins de 16 ans.'
        );
        updateProgress();
        
        // Colorer la bonne réponse
        radios.forEach(radio => {
            if (radio.value === 'option2') {
                radio.parentElement.style.color = 'var(--success)';
                radio.parentElement.style.fontWeight = 'bold';
            }
        });
    } else {
        // Mauvaise réponse
        showErrorModal(
            'Presque !',
            'Attention, ce n\'est pas la bonne définition.',
            'Rappelle-toi : un enfant-soldat est un membre de groupes armés âgé de moins de 16 ans.',
            'Tout combattant âgé de moins de 16 ans'
        );
        
        // Colorer les réponses
        radios.forEach(radio => {
            if (radio.value === 'option2') {
                radio.parentElement.style.color = 'var(--success)';
                radio.parentElement.style.fontWeight = 'bold';
            } else if (radio.checked) {
                radio.parentElement.style.color = 'var(--warning)';
            }
        });
    }
}

function checkCauses() {
    const checkboxes = [
        document.getElementById('q2-1'),
        document.getElementById('q2-2'),
        document.getElementById('q2-3'),
        document.getElementById('q2-4'),
        document.getElementById('q2-5')
    ];
    
    // Réponses correctes : 1, 2, 4 (selon l'exercice original)
    const correctAnswers = [true, true, false, true, false];
    let score = 0;
    let totalChecked = 0;
    
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            totalChecked++;
            if (correctAnswers[index]) {
                score++;
                checkbox.parentElement.style.color = 'var(--success)';
                checkbox.parentElement.style.fontWeight = 'bold';
            } else {
                checkbox.parentElement.style.color = 'var(--warning)';
            }
        } else {
            if (correctAnswers[index]) {
                checkbox.parentElement.style.color = 'var(--success)';
                checkbox.parentElement.style.fontWeight = 'bold';
            }
        }
    });
    
    if (totalChecked === 0) {
        showErrorModal(
            'Réponse manquante',
            'Tu dois cocher au moins une réponse.',
            'Relis bien les propositions et choisis celles qui te semblent correctes.'
        );
        return;
    }
    
    const totalCorrect = correctAnswers.filter(v => v).length;
    
    if (score === totalCorrect && totalChecked === totalCorrect) {
        showSuccessModal(
            '🌟 Parfait !',
            `Tu as identifié toutes les causes correctement (${score}/${totalCorrect}).`,
            'Tu maîtrises bien les raisons du recrutement des enfants-soldats.'
        );
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as identifié ${score}/${totalCorrect} causes correctement.`,
            'Continue à réviser pour mieux distinguer les causes du recrutement.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as identifié ${score}/${totalCorrect} causes correctement.`,
            'Consulte la leçon pour mieux comprendre les différentes causes du recrutement.'
        );
    }
}

function checkVraiFaux() {
    const questions = ['q3-a', 'q3-b', 'q3-c', 'q3-d'];
    const correctAnswers = ['vrai', 'faux', 'vrai', 'vrai'];
    let score = 0;
    let answered = 0;
    
    questions.forEach((questionName, index) => {
        const radios = document.getElementsByName(questionName);
        let selectedValue = '';
        
        for (const radio of radios) {
            if (radio.checked) {
                selectedValue = radio.value;
                answered++;
                
                if (selectedValue === correctAnswers[index]) {
                    score++;
                    radio.parentElement.style.color = 'var(--success)';
                    radio.parentElement.style.fontWeight = 'bold';
                } else {
                    radio.parentElement.style.color = 'var(--warning)';
                }
                break;
            }
        }
        
        // Colorer la bonne réponse même si non sélectionnée
        if (!selectedValue) {
            radios.forEach(radio => {
                if (radio.value === correctAnswers[index]) {
                    radio.parentElement.style.color = 'var(--success)';
                    radio.parentElement.style.fontWeight = 'bold';
                }
            });
        }
    });
    
    if (answered < questions.length) {
        showErrorModal(
            'Réponses incomplètes',
            `Tu as répondu à ${answered}/${questions.length} questions.`,
            'Réponds à toutes les questions avant de vérifier.'
        );
        return;
    }
    
    if (score === questions.length) {
        showSuccessModal(
            '💡 Excellent !',
            `Tu as répondu correctement à toutes les questions (${score}/${questions.length}).`,
            'Tu connais bien les actions qui favorisent la réinsertion des enfants-soldats.'
        );
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '🔍 Bien !',
            `Tu as répondu correctement à ${score}/${questions.length} questions.`,
            'Tu progresses dans la compréhension de la réinsertion.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '🧠 À approfondir',
            `Tu as répondu correctement à ${score}/${questions.length} questions.`,
            'Relis bien la section sur la réinsertion des enfants-soldats.'
        );
    }
}

function checkConsequences() {
    const checkboxes = [
        document.getElementById('q4-1'),
        document.getElementById('q4-2'),
        document.getElementById('q4-3'),
        document.getElementById('q4-4'),
        document.getElementById('q4-5')
    ];
    
    // Réponses correctes : 1, 2, 3 (conséquences) ; 4 et 5 sont des causes
    const correctAnswers = [true, true, true, false, false];
    let score = 0;
    let totalChecked = 0;
    
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            totalChecked++;
            if (correctAnswers[index]) {
                score++;
                checkbox.parentElement.style.color = 'var(--success)';
                checkbox.parentElement.style.fontWeight = 'bold';
            } else {
                checkbox.parentElement.style.color = 'var(--warning)';
            }
        } else {
            if (correctAnswers[index]) {
                checkbox.parentElement.style.color = 'var(--success)';
                checkbox.parentElement.style.fontWeight = 'bold';
            }
        }
    });
    
    if (totalChecked === 0) {
        showErrorModal(
            'Réponse manquante',
            'Tu dois cocher au moins une réponse.',
            'Relis bien les propositions et choisis celles qui décrivent des conséquences.'
        );
        return;
    }
    
    const totalCorrect = correctAnswers.filter(v => v).length;
    
    if (score === totalCorrect && totalChecked === totalCorrect) {
        showSuccessModal(
            '🎯 Parfaitement identifié !',
            `Tu as reconnu toutes les conséquences (${score}/${totalCorrect}).`,
            'Tu fais bien la différence entre causes et conséquences.'
        );
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as reconnu ${score}/${totalCorrect} conséquences.`,
            'Continue à t\'entraîner pour mieux distinguer causes et conséquences.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as reconnu ${score}/${totalCorrect} conséquences.`,
            'Relis la section sur les conséquences du recrutement des enfants-soldats.'
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
    const eval1 = {
        q1: document.getElementById('eval1-q1').value.trim(),
        q2: document.getElementById('eval1-q2').value.trim(),
        q3: document.getElementById('eval1-q3').value.trim()
    };
    
    const eval2 = {
        q1: document.getElementById('eval2-q1').value.trim(),
        q2: document.getElementById('eval2-q2').value.trim(),
        q3: document.getElementById('eval2-q3').value.trim()
    };
    
    // Vérifier si toutes les questions sont remplies
    const allQuestions = [eval1.q1, eval1.q2, eval1.q3, eval2.q1, eval2.q2, eval2.q3];
    const emptyQuestions = allQuestions.filter(q => q === '');
    
    if (emptyQuestions.length > 0) {
        showErrorModal(
            'Évaluation incomplète',
            `Tu as ${emptyQuestions.length} question(s) sans réponse.`,
            'Prends le temps de répondre à toutes les questions avant de soumettre.'
        );
        return;
    }
    
    const resultsDiv = document.getElementById('evalResults');
    const scoreDisplay = document.getElementById('evalScore');
    const correctionsDiv = document.getElementById('evalCorrections');
    
    let score = 0;
    const maxScore = 12; // 6 questions × 2 points
    let feedback = '<h4>Analyse de tes réponses :</h4>';
    
    // Évaluation Situation 1
    feedback += '<p><strong>Situation 1 :</strong></p>';
    
    // Question 1.1
    if (eval1.q1.toLowerCase().includes('réinsertion') || eval1.q1.toLowerCase().includes('réintégration')) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1.q1.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Proche, mais précise qu\'il s\'agit de la réinsertion/réintégration.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est la réinsertion des enfants-soldats.</p>';
    }
    
    // Question 1.2
    const reinsertionActions = ['jouer', 'stigmatiser', 'scolariser', 'métier', 'apprentissage', 'participer', 'travaux', 'communautaire'];
    let actionCount = 0;
    reinsertionActions.forEach(action => {
        if (eval1.q2.toLowerCase().includes(action)) actionCount++;
    });
    
    if (actionCount >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonnes actions de réinsertion citées.</p>';
    } else if (actionCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as cité une action, mais il en faut deux.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense aux actions comme jouer, éviter la stigmatisation, scolariser, etc.</p>';
    }
    
    // Question 1.3
    const goodReasons = ['paix', 'cohésion', 'sécurité', 'marginal', 'vice', 'intégrer', 'aider', 'chance'];
    let reasonCount = 0;
    goodReasons.forEach(reason => {
        if (eval1.q3.toLowerCase().includes(reason)) reasonCount++;
    });
    
    if (reasonCount >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellentes raisons pour refuser de suivre tes camarades.</p>';
    } else if (reasonCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bonne direction, développe davantage tes arguments.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense aux bénéfices de la réinsertion pour la paix sociale.</p>';
    }
    
    // Évaluation Situation 2
    feedback += '<p><strong>Situation 2 :</strong></p>';
    
    // Question 2.1
    if (eval2.q1.toLowerCase().includes('recrutement') || eval2.q1.toLowerCase().includes('recruter') || eval2.q1.toLowerCase().includes('soldat')) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1 :</strong> Problème bien identifié.</p>';
    } else if (eval2.q1.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Tu as compris, précise qu\'il s\'agit du recrutement.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est la volonté de se faire recruter comme enfant-soldat.</p>';
    }
    
    // Question 2.2
    const causes = ['sécurité', 'vengeance', 'insouciance', 'combattant', 'docilité', 'maniabilité', 'argent', 'besoin'];
    let causeCount = 0;
    causes.forEach(cause => {
        if (eval2.q2.toLowerCase().includes(cause)) causeCount++;
    });
    
    if (causeCount >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonnes causes citées.</p>';
    } else if (causeCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as cité une cause, mais il en faut deux.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense aux causes comme recherche de sécurité, désir de vengeance, insouciance, etc.</p>';
    }
    
    // Question 2.3
    const consequences = ['traumatisme', 'mutilation', 'délinquance', 'déshumanisation', 'mort', 'danger', 'risque', 'conséquence'];
    let consequenceCount = 0;
    consequences.forEach(consequence => {
        if (eval2.q3.toLowerCase().includes(consequence)) consequenceCount++;
    });
    
    if (consequenceCount >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification basée sur les conséquences.</p>';
    } else if (consequenceCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bon début, ajoute d\'autres conséquences pour renforcer ton argument.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense aux conséquences négatives d\'être enfant-soldat.</p>';
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
    let corrections = "<h4>Corrections détaillées :</h4>";
    
    corrections += "<p><strong>Situation 1 :</strong></p>";
    corrections += "<p>1. <strong>Problème posé :</strong> La réinsertion ou réintégration des enfants-soldats dans le quartier.</p>";
    corrections += "<p>2. <strong>Actions de réinsertion (exemples) :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Éviter de les stigmatiser</li>";
    corrections += "<li>Les initier à l'apprentissage de métiers</li>";
    corrections += "<li>Les scolariser</li>";
    corrections += "<li>Jouer avec eux</li>";
    corrections += "<li>Les encourager à participer aux travaux d'intérêt public</li>";
    corrections += "</ul>";
    corrections += "<p>3. <strong>Raisons de refuser de suivre tes camarades :</strong></p>";
    corrections += "<p>Il faut nécessairement les intégrer pour :</p>";
    corrections += "<ul>";
    corrections += "<li>Les empêcher de retomber dans les mêmes vices</li>";
    corrections += "<li>Ne pas les marginaliser</li>";
    corrections += "<li>Créer un climat de sécurité dans le quartier</li>";
    corrections += "<li>Favoriser la paix et la cohésion sociale</li>";
    corrections += "<li>Leur donner une seconde chance</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>Situation 2 :</strong></p>";
    corrections += "<p>1. <strong>Problème posé :</strong> La volonté de se faire recruter comme enfant-soldat.</p>";
    corrections += "<p>2. <strong>Causes du recrutement (exemples) :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Du côté recruteurs : besoin en combattants, docilité des enfants</li>";
    corrections += "<li>Du côté enfants : recherche de sécurité, désir de vengeance, insouciance</li>";
    corrections += "</ul>";
    corrections += "<p>3. <strong>Justification pour le dissuader :</strong></p>";
    corrections += "<p>Être enfant-soldat a des conséquences graves :</p>";
    corrections += "<ul>";
    corrections += "<li>Traumatismes dus aux horreurs de la guerre</li>";
    corrections += "<li>Mutilations physiques</li>";
    corrections += "<li>Délinquance</li>";
    corrections += "<li>Déshumanisation</li>";
    corrections += "<li>Mort précoce</li>";
    corrections += "<li>Perte de l'enfance et de l'éducation</li>";
    corrections += "<li>Difficultés de réinsertion sociale</li>";
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