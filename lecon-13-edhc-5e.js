// JAVASCRIPT COMPLET AVEC MODALES AMÉLIORÉES

// Variables pour suivre la progression
let progress = 0;
const totalExercises = 14;

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
function checkEquipements() {
    const eq1 = document.getElementById('eq1').checked;
    const eq2 = document.getElementById('eq2').checked;
    const eq3 = document.getElementById('eq3').checked;
    const eq4 = document.getElementById('eq4').checked;
    const eq5 = document.getElementById('eq5').checked;
    const eq6 = document.getElementById('eq6').checked;
    
    let score = 0;
    if (eq1) score++;
    if (eq2) score++;
    if (eq3) score++;
    if (!eq4) score++;
    if (eq5) score++;
    if (!eq6) score++;
    
    const totalScore = score;
    const maxScore = 6;
    
    if (totalScore >= 5) {
        showSuccessModal(
            '🌟 Identification parfaite !',
            `Tu as bien identifié ${totalScore}/${maxScore} équipements.`,
            'Tu maîtrises parfaitement la distinction entre équipements publics et privés.'
        );
        updateProgress();
    } else if (totalScore >= 4) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as identifié ${totalScore}/${maxScore} équipements correctement.`,
            'Tu progresses bien dans la compréhension des équipements publics.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as identifié ${totalScore}/${maxScore} équipements correctement.`,
            'Rappelle-toi : un équipement public est accessible à tous et financé collectivement.'
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

function checkRegles() {
    const r1 = document.getElementById('r1').checked;
    const r2 = document.getElementById('r2').checked;
    const r3 = document.getElementById('r3').checked;
    const r4 = document.getElementById('r4').checked;
    const r5 = document.getElementById('r5').checked;
    
    let score = 0;
    if (r1) score++;
    if (r2) score++;
    if (!r3) score++;
    if (r4) score++;
    if (!r5) score++;
    
    const totalScore = score;
    const maxScore = 5;
    
    if (totalScore >= 4) {
        showSuccessModal(
            '🌟 Excellent !',
            `Tu as bien identifié ${totalScore}/${maxScore} règles.`,
            'Tu maîtrises parfaitement les règles d\'hygiène publique.'
        );
        updateProgress();
    } else if (totalScore >= 3) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as identifié ${totalScore}/${maxScore} règles correctement.`,
            'Tu progresses bien dans la compréhension des règles d\'hygiène.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as identifié ${totalScore}/${maxScore} règles correctement.`,
            'Rappelle-toi : les règles d\'hygiène publique visent à maintenir les équipements collectifs en bon état.'
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
    if (q1.length > 10 && (q1.includes('hygiène') || q1.includes('pratique') || q1.includes('toilettes') || q1.includes('propre'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1 :</strong> Tu as bien identifié le problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Essaie de préciser le type de problème (hygiène, mauvaises pratiques).</p>';
    }
    
    // Question 2
    if (q2.length > 20 && (q2.includes('santé') || q2.includes('propre') || q2.includes('maladie') || q2.includes('odeur'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonne énumération des avantages.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense aux bénéfices pour la santé et l\'environnement.</p>';
    }
    
    // Question 3
    if (q3.length > 25 && (q3.includes('refuse') || q3.includes('non') || q3.includes('contraire') || q3.includes('règles'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente décision et justification.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Ta décision doit être claire et bien justifiée.</p>';
    }
    
    if (score >= 5) {
        showSuccessModal(
            '💡 Très bon raisonnement !',
            'Tu as bien analysé la situation et pris une décision responsable.',
            feedback
        );
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
            'Relis bien la situation et réfléchis aux conséquences des actions.',
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
    const eval1_1 = document.getElementById('eval1-1').value.trim();
    const eval1_2 = document.getElementById('eval1-2').value.trim();
    const eval1_3 = document.getElementById('eval1-3').value.trim();
    const eval2_1 = document.getElementById('eval2-1').value.trim();
    const eval2_2 = document.getElementById('eval2-2').value.trim();
    const eval2_3 = document.getElementById('eval2-3').value.trim();
    
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
    let maxScore = 18;
    let feedback = '';
    
    // Situation 1 - Question 1
    if (eval1_1.length > 15 && (eval1_1.includes('protestation') || eval1_1.includes('club') || eval1_1.includes('assainissement') || eval1_1.includes('corvée'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 1 :</strong> Tu as vu le problème, précise-le davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 1 :</strong> Identifie clairement le conflit autour du club santé.</p>';
    }
    
    // Situation 1 - Question 2
    const reglesCount = (eval1_2.match(/utiliser|maintenir|entretenir|tondre|signaler/gi) || []).length;
    if (reglesCount >= 3) {
        score += 3;
        feedback += '<p>✓ <strong>Situation 1 - Question 2 :</strong> Excellente énumération des règles.</p>';
    } else if (reglesCount >= 2) {
        score += 2;
        feedback += '<p>↔ <strong>Situation 1 - Question 2 :</strong> Bonnes règles, tu peux en ajouter d\'autres.</p>';
    } else if (reglesCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 2 :</strong> Tu as commencé, complète avec d\'autres règles.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 2 :</strong> Pense aux règles vues dans la leçon.</p>';
    }
    
    // Situation 1 - Question 3
    if (eval1_3.length > 50 && (eval1_3.includes('important') || eval1_3.includes('nécessaire') || eval1_3.includes('santé') || eval1_3.includes('environnement'))) {
        score += 3;
        feedback += '<p>✓ <strong>Situation 1 - Question 3 :</strong> Excellente justification de ton refus.</p>';
    } else if (eval1_3.length > 25) {
        score += 2;
        feedback += '<p>↔ <strong>Situation 1 - Question 3 :</strong> Bonne justification, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 3 :</strong> Justifie ton choix avec des arguments solides.</p>';
    }
    
    // Situation 2 - Question 1
    if (eval2_1.length > 15 && (eval2_1.includes('insalubrité') || eval2_1.includes('saleté') || eval2_1.includes('papiers') || eval2_1.includes('nettoyage'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval2_1.length > 5) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 1 :</strong> Tu as vu le problème, précise-le.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 1 :</strong> Identifie clairement le problème d\'insalubrité.</p>';
    }
    
    // Situation 2 - Question 2
    const consequencesCount = (eval2_2.match(/maladie|conflit|santé|propre|environnement/gi) || []).length;
    if (consequencesCount >= 2) {
        score += 3;
        feedback += '<p>✓ <strong>Situation 2 - Question 2 :</strong> Excellente énumération des conséquences.</p>';
    } else if (consequencesCount >= 1) {
        score += 2;
        feedback += '<p>↔ <strong>Situation 2 - Question 2 :</strong> Bonne conséquence, ajoutes-en une autre.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 2 :</strong> Pense aux impacts sur la santé et les relations sociales.</p>';
    }
    
    // Situation 2 - Question 3
    if (eval2_3.length > 50 && (eval2_3.includes('participer') || eval2_3.includes('responsabilité') || eval2_3.includes('collectif') || eval2_3.includes('exemple'))) {
        score += 3;
        feedback += '<p>✓ <strong>Situation 2 - Question 3 :</strong> Excellente décision et justification.</p>';
    } else if (eval2_3.length > 25) {
        score += 2;
        feedback += '<p>↔ <strong>Situation 2 - Question 3 :</strong> Bonne décision, justifie-la davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 3 :</strong> Exprime clairement ta décision et tes raisons.</p>';
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
    
    corrections += "<h5>Situation d'évaluation 1 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong></p>";
    corrections += "<p>Un projet d'entrave aux actions d'assainissement de ton collège. Certains élèves voient le club santé et environnement comme une corvée plutôt que comme une opportunité d'apprentissage et d'engagement citoyen.</p>";
    
    corrections += "<p><strong>2. Trois règles d'hygiène publique :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Utiliser de façon adéquate les équipements publics</li>";
    corrections += "<li>Tondre régulièrement la pelouse des espaces verts</li>";
    corrections += "<li>Maintenir propres les équipements utilisés</li>";
    corrections += "<li>Signaler les problèmes d'entretien aux autorités</li>";
    corrections += "<li>Participer aux activités de salubrité collective</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Justification du refus de participer à la protestation :</strong></p>";
    corrections += "<p>Il est nécessaire de participer à l'assainissement de son établissement pour :</p>";
    corrections += "<ul>";
    corrections += "<li>Avoir un cadre de vie sain et agréable</li>";
    corrections += "<li>Assurer la santé des élèves et des personnels</li>";
    corrections += "<li>Préserver la paix et la quiétude sociale</li>";
    corrections += "<li>Développer le sens des responsabilités et la citoyenneté</li>";
    corrections += "<li>Économiser l'argent public (moins de réparations)</li>";
    corrections += "</ul>";
    
    corrections += "<h5>Situation d'évaluation 2 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong></p>";
    corrections += "<p>L'insalubrité de l'établissement et le refus de certains élèves de participer aux activités de nettoyage, les considérant comme des corvées plutôt que comme des responsabilités citoyennes.</p>";
    
    corrections += "<p><strong>2. Deux conséquences du non-respect des règles d'hygiène :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Conflits de voisinage et tensions sociales</li>";
    corrections += "<li>Risque de contracter des maladies (diarrhée, infections)</li>";
    corrections += "<li>Environnement désagréable et mauvaises odeurs</li>";
    corrections += "<li>Détérioration des équipements scolaires</li>";
    corrections += "<li>Image négative de l'établissement</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Décision et justification :</strong></p>";
    corrections += "<p><strong>Décision :</strong> Je décide de participer au nettoyage et d'encourager mes amis à faire de même.</p>";
    corrections += "<p><strong>Justification :</strong> Parce que :</p>";
    corrections += "<ul>";
    corrections += "<li>C'est notre responsabilité collective de maintenir notre école propre</li>";
    corrections += "<li>Un environnement propre favorise de meilleures conditions d'apprentissage</li>";
    corrections += "<li>Participer à ces activités développe le sens civique et la solidarité</li>";
    corrections += "<li>Nous montrons l'exemple aux plus jeunes</li>";
    corrections += "<li>Nous contribuons à préserver notre santé et celle des autres</li>";
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