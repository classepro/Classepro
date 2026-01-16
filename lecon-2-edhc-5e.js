// JAVASCRIPT COMPLET AVEC MODALES AMÉLIORÉES

// Variables pour suivre la progression
let progress = 0;
const totalExercises = 10;

// Fonction pour afficher une modale de succès
function showSuccessModal(title, message, details = '', showConfetti = true) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalDetails = document.getElementById('modalDetails');
    const modalButton = document.getElementById('modalButton');
    const feedbackModal = document.getElementById('feedbackModal');
    
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
    const modalOverlay = document.getElementById('modalOverlay');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalDetails = document.getElementById('modalDetails');
    const modalButton = document.getElementById('modalButton');
    const feedbackModal = document.getElementById('feedbackModal');
    
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
    const modalOverlay = document.getElementById('modalOverlay');
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
document.addEventListener('DOMContentLoaded', function() {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
});

// Fermer la modale avec la touche Échap
document.addEventListener('keydown', function(e) {
    const modalOverlay = document.getElementById('modalOverlay');
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
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
    const activeTab = document.getElementById(tabName);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Activer le bouton d'onglet correspondant
    document.querySelectorAll('.tab').forEach(tab => {
        if (tab.textContent.includes(getTabName(tabName))) {
            tab.classList.add('active');
        }
    });
    
    // Animer le contenu de l'onglet
    if (activeTab) {
        activeTab.style.animation = 'none';
        setTimeout(() => {
            activeTab.style.animation = 'fadeInUp 0.5s ease-out';
        }, 10);
    }
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
    const progressPercent = document.getElementById('progressPercent');
    const progressFill = document.getElementById('progressFill');
    
    if (progressPercent) progressPercent.textContent = `${percent}%`;
    if (progressFill) progressFill.style.width = `${percent}%`;
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

function checkAvantages() {
    const avantage1 = document.getElementById('avantage1');
    const avantage2 = document.getElementById('avantage2');
    const avantage3 = document.getElementById('avantage3');
    const avantage4 = document.getElementById('avantage4');
    const avantage5 = document.getElementById('avantage5');
    
    if (!avantage1 || !avantage2 || !avantage3 || !avantage4 || !avantage5) return;
    
    const isAvantage1 = avantage1.checked;
    const isAvantage2 = avantage2.checked;
    const isAvantage3 = avantage3.checked;
    const isAvantage4 = avantage4.checked;
    const isAvantage5 = avantage5.checked;
    
    let score = 0;
    if (isAvantage1) score++;
    if (isAvantage2) score++;
    if (!isAvantage3) score++; // La rébellion n'est PAS un avantage
    if (isAvantage4) score++;
    if (isAvantage5) score++;
    
    const maxScore = 5;
    
    if (score === maxScore) {
        showSuccessModal(
            '🌟 Parfait !',
            `Tu as identifié tous les avantages correctement (${score}/${maxScore}).`,
            'Tu as bien compris l\'importance du respect des principes des Droits de l\'Homme.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (score >= 3) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as identifié ${score}/${maxScore} avantages correctement.`,
            'Tu progresses bien dans la compréhension des avantages du respect des principes.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as identifié ${score}/${maxScore} avantages correctement.`,
            'Relis bien la partie sur l\'importance du respect des principes des Droits de l\'Homme.'
        );
    }
}

function checkPrincipes() {
    const reponsePrincipes = document.getElementById('reponsePrincipes');
    if (!reponsePrincipes) return;
    
    const reponse = reponsePrincipes.value.toLowerCase().trim();
    
    if (!reponse) {
        showErrorModal(
            'Réponse manquante',
            'Tu dois écrire ta réponse avant de vérifier.',
            'Relis la liste et écris les principes que tu as identifiés.'
        );
        return;
    }
    
    const principesAttendus = ['universalité', 'solidarité', 'indivisibilité', 'inaliénabilité', 'interdépendance', 'égalité'];
    const reponsesDonnees = reponse.split(/[,;]/).map(r => r.trim().toLowerCase());
    
    let score = 0;
    let principesTrouves = [];
    
    reponsesDonnees.forEach(reponseDonnee => {
        if (principesAttendus.some(p => reponseDonnee.includes(p))) {
            score++;
            principesAttendus.forEach(p => {
                if (reponseDonnee.includes(p)) {
                    principesTrouves.push(p);
                }
            });
        }
    });
    
    // Vérifier aussi la ponctualité (ne doit PAS être incluse)
    if (reponse.includes('ponctualité')) {
        score--;
    }
    
    const maxScore = 6; // 6 principes à identifier
    
    if (score >= 5) {
        showSuccessModal(
            '💡 Excellent !',
            `Tu as identifié ${score}/${maxScore} principes correctement.`,
            'Tu maîtrises bien les principes fondamentaux des Droits de l\'Homme.'
        );
        updateProgress();
        updateProgress();
    } else if (score >= 3) {
        showSuccessModal(
            '🔍 Bien joué !',
            `Tu as identifié ${score}/${maxScore} principes correctement.`,
            'Continue à réviser, tu es sur la bonne voie !'
        );
        updateProgress();
    } else {
        showErrorModal(
            '🧠 À approfondir',
            `Tu as identifié ${score}/${maxScore} principes correctement.`,
            'Relis attentivement la partie sur les principes fondamentaux des Droits de l\'Homme.'
        );
    }
}

function showAllAnswers() {
    const answersDiv = document.getElementById('allAnswers');
    if (!answersDiv) return;
    
    if (answersDiv.style.display === 'block') {
        answersDiv.style.display = 'none';
    } else {
        answersDiv.style.display = 'block';
        answersDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

// Fonction pour soumettre l'évaluation
function submitEvaluation() {
    // Récupérer les réponses de la situation 1
    const eval1_1 = document.getElementById('eval1-1');
    const eval1_2 = document.getElementById('eval1-2');
    const eval1_3 = document.getElementById('eval1-3');
    
    // Récupérer les réponses de la situation 2
    const eval2_1 = document.getElementById('eval2-1');
    const eval2_2 = document.getElementById('eval2-2');
    const eval2_3 = document.getElementById('eval2-3');
    
    // Vérifier que tous les éléments existent
    if (!eval1_1 || !eval1_2 || !eval1_3 || !eval2_1 || !eval2_2 || !eval2_3) {
        showErrorModal(
            'Erreur',
            'Impossible de trouver tous les champs de réponse.',
            'Vérifie que la page est correctement chargée.'
        );
        return;
    }
    
    const eval1_1Value = eval1_1.value.trim();
    const eval1_2Value = eval1_2.value.trim();
    const eval1_3Value = eval1_3.value.trim();
    const eval2_1Value = eval2_1.value.trim();
    const eval2_2Value = eval2_2.value.trim();
    const eval2_3Value = eval2_3.value.trim();
    
    // Vérifier que toutes les réponses sont remplies
    if (!eval1_1Value || !eval1_2Value || !eval1_3Value || !eval2_1Value || !eval2_2Value || !eval2_3Value) {
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
    
    if (!resultsDiv || !scoreDisplay || !correctionsDiv) {
        showErrorModal(
            'Erreur',
            'Impossible de trouver les éléments d\'affichage des résultats.',
            'Vérifie que la page est correctement chargée.'
        );
        return;
    }
    
    let score = 0;
    let maxScore = 12; // 6 questions × 2 points chacune
    let feedback = '<h4>Corrections détaillées :</h4>';
    
    // Évaluation situation 1
    feedback += '<p><strong>Situation 1 :</strong></p>';
    
    // Question 1.1
    if (eval1_1Value.length > 10 && (eval1_1Value.includes('inaliénabilité') || eval1_1Value.includes('principe') || eval1_1Value.includes('rejette') || eval1_1Value.includes('criminels'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1.1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1_1Value.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.1 :</strong> Bonne direction, tu peux préciser davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.1 :</strong> Le problème est le rejet du principe d\'inaliénabilité qui accorde des droits aux criminels.</p>';
    }
    
    // Question 1.2
    const principesDonnes1 = eval1_2Value.toLowerCase();
    const principesAttendus1 = ['inaliénabilité', 'universalité', 'interdépendance', 'indivisibilité', 'égalité', 'solidarité'];
    let scorePrincipes1 = 0;
    
    principesAttendus1.forEach(principe => {
        if (principesDonnes1.includes(principe)) {
            scorePrincipes1++;
        }
    });
    
    if (scorePrincipes1 >= 3) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1.2 :</strong> Bonne énumération des principes.</p>';
    } else if (scorePrincipes1 >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.2 :</strong> Tu as cité quelques principes, essaie d\'en citer trois.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.2 :</strong> Exemples de principes : inaliénabilité, universalité, interdépendance, indivisibilité, égalité, solidarité.</p>';
    }
    
    // Question 1.3
    if (eval1_3Value.length > 30 && (eval1_3Value.includes('naissance') || eval1_3Value.includes('acquis') || eval1_3Value.includes('priver') || eval1_3Value.includes('tous'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1.3 :</strong> Excellente justification de ton désaccord.</p>';
    } else if (eval1_3Value.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.3 :</strong> Bon début de justification, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.3 :</strong> Les droits de l\'homme sont acquis à la naissance pour tous les êtres humains. Personne ne peut être privé de ses droits, même les criminels.</p>';
    }
    
    // Évaluation situation 2
    feedback += '<p><strong>Situation 2 :</strong></p>';
    
    // Question 2.1
    if (eval2_1Value.length > 10 && (eval2_1Value.includes('albinos') || eval2_1Value.includes('discrimination') || eval2_1Value.includes('stigmatisation') || eval2_1Value.includes('exclure'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2.1 :</strong> Bonne identification du problème.</p>';
    } else if (eval2_1Value.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.1 :</strong> Tu as compris l\'idée, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.1 :</strong> Le problème est la discrimination/stigmatisation de l\'élève parce qu\'il est albinos.</p>';
    }
    
    // Question 2.2
    const principesDonnes2 = eval2_2Value.toLowerCase();
    const principesAttendus2 = ['égalité', 'non-discrimination', 'universalité', 'inaliénabilité'];
    let scorePrincipes2 = 0;
    
    principesAttendus2.forEach(principe => {
        if (principesDonnes2.includes(principe)) {
            scorePrincipes2++;
        }
    });
    
    if (scorePrincipes2 >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2.2 :</strong> Bonne identification des principes concernés.</p>';
    } else if (scorePrincipes2 >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.2 :</strong> Tu as identifié un principe, essaie d\'en trouver un deuxième.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.2 :</strong> Les principes concernés sont principalement : l\'égalité et la non-discrimination.</p>';
    }
    
    // Question 2.3
    if (eval2_3Value.length > 30 && (eval2_3Value.includes('égal') || eval2_3Value.includes('sans distinction') || eval2_3Value.includes('race') || eval2_3Value.includes('droits'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2.3 :</strong> Excellente justification de ton soutien.</p>';
    } else if (eval2_3Value.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.3 :</strong> Bonne direction pour la justification, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.3 :</strong> Les principes d\'égalité et de non-discrimination prescrivent que les droits de l\'homme sont égaux pour tous, sans distinction de race, de couleur, d\'origine, etc.</p>';
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
    
    corrections += "<p><strong>Situation 1 :</strong></p>";
    corrections += "<p><strong>1. Problème posé :</strong> La remise en cause du principe d'inaliénabilité des droits de l'homme.</p>";
    corrections += "<p><strong>2. Trois principes des Droits de l'Homme :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>L'interdépendance</li>";
    corrections += "<li>La solidarité</li>";
    corrections += "<li>L'indivisibilité</li>";
    corrections += "<li>L'égalité et non-discrimination</li>";
    corrections += "<li>L'universalité</li>";
    corrections += "<li>L'inaliénabilité</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification du désaccord :</strong> Les droits de l'homme sont acquis à la naissance pour tous les êtres humains. Personne ne peut être privé de ses droits, même les criminels. C'est le principe d'inaliénabilité.</p>";
    
    corrections += "<p><strong>Situation 2 :</strong></p>";
    corrections += "<p><strong>1. Problème posé :</strong> La stigmatisation/discrimination de l'élève parce qu'il est albinos.</p>";
    corrections += "<p><strong>2. Deux principes concernés :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>L'égalité</li>";
    corrections += "<li>La non-discrimination</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification du soutien :</strong> Les principes d'égalité et de non-discrimination des droits de l'homme prescrivent que les droits de l'homme sont égaux. Tous les hommes peuvent les revendiquer sans distinction de race, de couleur, d'origine, d'apparence physique, etc. Ton frère a donc le même droit que les autres élèves de participer à la compétition.</p>";
    
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