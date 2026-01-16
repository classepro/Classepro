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
            'Clique sur "Comportement à risque" ou "Comportement sécuritaire" pour choisir ta réponse.'
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
        const correctAnswerText = correctAnswer === 'oui' ? 'COMPORTEMENT À RISQUE' : 'COMPORTEMENT SÉCURITAIRE';
        const userAnswerText = selectedValue === 'oui' ? 'COMPORTEMENT À RISQUE' : 'COMPORTEMENT SÉCURITAIRE';
        
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

function checkIST() {
    const answers = {
        'q2-1': 'oui',
        'q2-2': 'oui',
        'q2-3': 'non',
        'q2-4': 'oui',
        'q2-5': 'non'
    };
    
    let correctCount = 0;
    let totalQuestions = 5;
    
    for (const question in answers) {
        const radios = document.getElementsByName(question);
        let selectedValue = '';
        
        for (const radio of radios) {
            if (radio.checked) {
                selectedValue = radio.value;
                break;
            }
        }
        
        if (selectedValue === answers[question]) {
            correctCount++;
            // Colorer en vert
            radios.forEach(radio => {
                if (radio.value === answers[question]) {
                    radio.parentElement.parentElement.style.backgroundColor = 'rgba(75, 181, 67, 0.1)';
                }
            });
        } else if (selectedValue) {
            // Colorer en orange (mauvaise réponse)
            radios.forEach(radio => {
                if (radio.checked) {
                    radio.parentElement.parentElement.style.backgroundColor = 'rgba(255, 152, 0, 0.1)';
                }
            });
            // Colorer en vert la bonne réponse
            radios.forEach(radio => {
                if (radio.value === answers[question]) {
                    radio.parentElement.parentElement.style.backgroundColor = 'rgba(75, 181, 67, 0.1)';
                }
            });
        }
    }
    
    if (correctCount === totalQuestions) {
        showSuccessModal(
            '🌟 Parfait !',
            `Tu as ${correctCount}/${totalQuestions} bonnes réponses.`,
            'Tu maîtrises parfaitement la reconnaissance des IST.'
        );
        updateProgress();
        updateProgress();
    } else if (correctCount >= 3) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as ${correctCount}/${totalQuestions} bonnes réponses.`,
            'Tu progresses bien dans la reconnaissance des IST.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as ${correctCount}/${totalQuestions} bonnes réponses.`,
            'Consulte les corrections pour mieux reconnaître les IST.'
        );
    }
}

function checkConsequences() {
    const correctAnswers = ['q3-a', 'q3-c', 'q3-d'];
    let correctCount = 0;
    let checkedCount = 0;
    
    // Compter les bonnes réponses cochées
    correctAnswers.forEach(id => {
        if (document.getElementById(id).checked) {
            correctCount++;
        }
    });
    
    // Compter toutes les cases cochées
    for (let i = 0; i < 5; i++) {
        const checkbox = document.getElementById(`q3-${String.fromCharCode(97 + i)}`);
        if (checkbox.checked) checkedCount++;
    }
    
    // Calculer le score (bonnes réponses cochées moins mauvaises réponses cochées)
    const wrongChecked = checkedCount - correctCount;
    const score = correctCount - wrongChecked;
    
    if (score >= 3) {
        showSuccessModal(
            '💡 Très bonne analyse !',
            'Tu as bien identifié les conséquences des IST et du VIH/SIDA.',
            'Continue à réfléchir aux conséquences des choix que tu fais.'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 1) {
        showSuccessModal(
            '🔍 Bon début de réflexion !',
            'Tu as compris certaines conséquences, continue à approfondir.',
            'Relis bien la leçon sur les conséquences.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '🧠 À approfondir',
            'Relis bien la section sur les conséquences des IST et du VIH/SIDA.',
            'Les conséquences peuvent être physiques (santé) ou sociales (rejet).'
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
    // Récupérer toutes les réponses
    const eval1_1 = document.getElementById('eval1-1').value.trim();
    const eval1_2 = document.getElementById('eval1-2').value.trim();
    const eval1_3 = document.getElementById('eval1-3').value.trim();
    const eval2_1 = document.getElementById('eval2-1').value.trim();
    const eval2_2 = document.getElementById('eval2-2').value.trim();
    const eval2_3 = document.getElementById('eval2-3').value.trim();
    
    // Vérifier si toutes les questions sont remplies
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
    let feedback = '';
    
    // Évaluation des réponses (simplifiée pour l'exemple)
    // En réalité, on utiliserait une analyse plus sophistiquée
    
    // Question 1.1
    if (eval1_1.length > 10 && (eval1_1.includes('participation') || eval1_1.includes('sensibilisation') || eval1_1.includes('information'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 1 :</strong> Bon début, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 1 :</strong> Le problème est le refus de participer à une activité importante de sensibilisation.</p>';
    }
    
    // Question 1.2
    const modesTransmission = ['sexuelle', 'sanguine', 'maternelle', 'mère-enfant'];
    let modesTrouves = 0;
    modesTransmission.forEach(mode => {
        if (eval1_2.toLowerCase().includes(mode)) modesTrouves++;
    });
    
    if (modesTrouves >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 2 :</strong> Excellente énumération des modes de transmission.</p>';
    } else if (modesTrouves >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 2 :</strong> Tu en as cité un, il en faut deux.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 2 :</strong> Pense aux 3 modes : sexuelle, sanguine, mère-enfant.</p>';
    }
    
    // Question 1.3
    if (eval1_3.length > 30 && (eval1_3.includes('important') || eval1_3.includes('protéger') || eval1_3.includes('santé') || eval1_3.includes('information'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 3 :</strong> Excellente justification de ton choix.</p>';
    } else if (eval1_3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 3 :</strong> Bonne direction, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 3 :</strong> Explique pourquoi cette sensibilisation est importante pour ta santé.</p>';
    }
    
    // Question 2.1
    if (eval2_1.length > 10 && (eval2_1.includes('proposition') || eval2_1.includes('échange') || eval2_1.includes('sexuel') || eval2_1.includes('chantage'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval2_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 1 :</strong> Bon début, précise le type de proposition.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 1 :</strong> Il s\'agit d\'une proposition de rapports sexuels en échange d\'aide.</p>';
    }
    
    // Question 2.2
    const consequences = ['IST', 'VIH', 'grossesse', 'stérilité', 'rejet', 'échec', 'santé'];
    let consequencesTrouvees = 0;
    consequences.forEach(cons => {
        if (eval2_2.toLowerCase().includes(cons.toLowerCase())) consequencesTrouvees++;
    });
    
    if (consequencesTrouvees >= 3) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 2 :</strong> Excellente énumération des conséquences.</p>';
    } else if (consequencesTrouvees >= 2) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 2 :</strong> Tu en as cité deux, il en faut trois.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 2 :</strong> Pense aux IST, grossesse, VIH, stérilité, rejet social...</p>';
    }
    
    // Question 2.3
    if (eval2_3.length > 40 && (eval2_3.includes('risque') || eval2_3.includes('danger') || eval2_3.includes('santé') || eval2_3.includes('respect') || eval2_3.includes('corps'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 3 :</strong> Excellente justification pour refuser.</p>';
    } else if (eval2_3.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 3 :</strong> Bonne direction, développe tes arguments.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 3 :</strong> Explique les risques pour la santé et l\'importance du respect de son corps.</p>';
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
    
    corrections += "<p><strong>Situation 1 :</strong></p>";
    corrections += "<p><strong>1. Problème posé :</strong> Le refus de participer à une activité de sensibilisation sur les IST et le VIH/SIDA, activité pourtant essentielle pour la santé.</p>";
    corrections += "<p><strong>2. Deux modes de transmission du VIH/SIDA :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Voie sexuelle (rapports sexuels non protégés)</li>";
    corrections += "<li>Voie sanguine (transfusion de sang contaminé, partage d'objets souillés)</li>";
    corrections += "<li>Voie maternelle (de la mère à l'enfant pendant la grossesse, l'accouchement ou l'allaitement)</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification du refus de se joindre à eux :</strong> Parce que l'information sur les IST et le VIH/SIDA est essentielle pour protéger sa santé. Connaître les modes de transmission et les moyens de protection permet de faire des choix éclairés et de préserver son avenir. Ignorer ces informations, c'est s'exposer inutilement à des dangers graves.</p>";
    
    corrections += "<p><strong>Situation 2 :</strong></p>";
    corrections += "<p><strong>1. Problème posé :</strong> Proposition de rapports sexuels en échange d'aide scolaire, ce qui constitue une forme de chantage et met en danger la santé de ta camarade.</p>";
    corrections += "<p><strong>2. Trois conséquences possibles :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Contraction d'IST (gonococcie, syphilis, hépatite B...)</li>";
    corrections += "<li>Risque de contamination au VIH/SIDA</li>";
    corrections += "<li>Grossesse précoce non désirée</li>";
    corrections += "<li>Stérilité future</li>";
    corrections += "<li>Stigmatisation et rejet social si infection</li>";
    corrections += "<li>Échec scolaire dû aux conséquences physiques et psychologiques</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification pour refuser :</strong> Je lui conseillerais de refuser car : (1) Sa santé n'a pas de prix et ne doit pas être échangée contre de l'aide scolaire ; (2) Elle risque des conséquences graves et durables pour sa santé ; (3) Elle mérite d'être respectée et ne doit pas accepter ce genre de chantage ; (4) Elle peut trouver de l'aide scolaire autrement (professeurs, camarades sérieux, études en groupe).</p>";
    
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