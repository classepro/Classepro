// JAVASCRIPT COMPLET AVEC MODALES AMÉLIORÉES

// Variables pour suivre la progression
let progress = 0;
const totalExercises = 9;

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

// Activité 1 : Définition des droits de l'homme
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
            'Choisis l\'option a, b ou c qui correspond selon toi à la bonne définition.'
        );
        return;
    }
    
    if (selectedValue === correctAnswer) {
        // Bonne réponse
        showSuccessModal(
            '✅ Définition parfaite !',
            'Excellente réponse ! Tu as bien compris ce que sont les droits de l\'homme.',
            'Les droits de l\'homme sont effectivement des droits et libertés que l\'État reconnaît à tout être humain.'
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
        let correctText = '';
        switch(correctAnswer) {
            case 'a': correctText = 'a) L\'ensemble de toutes les choses que l\'homme veut faire'; break;
            case 'b': correctText = 'b) Un ensemble de droits et de libertés que l\'État reconnaît à tout homme'; break;
            case 'c': correctText = 'c) Un ensemble d\'obligations reconnues à tout homme'; break;
        }
        
        showErrorModal(
            'Presque !',
            'Réfléchis bien à la définition complète des droits de l\'homme.',
            'Les droits de l\'homme ne sont pas des envies personnelles ni des obligations, mais des protections légales.',
            `Réponse correcte : ${correctText}`
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

// Activité 2 : Correspondance dates-instruments
function checkMatching() {
    const q2_1 = document.getElementById('q2-1').value;
    const q2_2 = document.getElementById('q2-2').value;
    const q2_3 = document.getElementById('q2-3').value;
    
    if (!q2_1 || !q2_2 || !q2_3) {
        showErrorModal(
            'Réponses incomplètes',
            'Tu dois sélectionner une date pour chaque instrument.',
            'N\'oublie pas de choisir une option dans chaque liste déroulante.'
        );
        return;
    }
    
    const answers = {
        'q2-1': 'c', // DUDH = 1948
        'q2-2': 'b', // DDHC = 1789
        'q2-3': 'a'  // Habeas Corpus = 1679
    };
    
    let correct = 0;
    
    // Vérifier chaque réponse
    if (q2_1 === answers['q2-1']) correct++;
    if (q2_2 === answers['q2-2']) correct++;
    if (q2_3 === answers['q2-3']) correct++;
    
    // Appliquer les styles
    const selects = ['q2-1', 'q2-2', 'q2-3'];
    selects.forEach(id => {
        const select = document.getElementById(id);
        if (select.value === answers[id]) {
            select.style.backgroundColor = '#e6f7ff';
            select.style.border = '2px solid var(--success)';
            select.style.color = 'var(--success)';
        } else {
            select.style.backgroundColor = '#ffeaea';
            select.style.border = '2px solid var(--warning)';
            // Afficher la bonne réponse
            const correctOption = select.querySelector(`option[value="${answers[id]}"]`);
            if (correctOption) {
                select.value = answers[id];
            }
        }
    });
    
    if (correct === 3) {
        showSuccessModal(
            '📅 Correspondances parfaites !',
            'Félicitations ! Tu maîtrises parfaitement les dates clés des droits de l\'homme.',
            'Tu as bien associé chaque instrument à sa date historique.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (correct >= 1) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as ${correct}/3 bonnes réponses.`,
            'Continue à réviser les dates historiques pour les maîtriser parfaitement.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            'Les dates n\'étaient pas bien associées.',
            'Rappelle-toi : Habeas Corpus (1679), DDHC (1789), DUDH (1948).'
        );
    }
}

// Activité 3 : Classification des droits
function checkClassification() {
    const civils = document.getElementById('civils').value.toLowerCase();
    const economiques = document.getElementById('economiques').value.toLowerCase();
    const solidarite = document.getElementById('solidarite').value.toLowerCase();
    
    // Liste des attendus par catégorie
    const civilsAttendus = ['syndical', 'liberté'];
    const economiquesAttendus = ['éducation', 'santé'];
    const solidariteAttendus = ['paix', 'développement'];
    
    let scoreCivils = 0;
    let scoreEconomiques = 0;
    let scoreSolidarite = 0;
    
    // Vérifier les droits civils et politiques
    civilsAttendus.forEach(terme => {
        if (civils.includes(terme)) scoreCivils++;
    });
    
    // Vérifier les droits économiques et socio-culturels
    economiquesAttendus.forEach(terme => {
        if (economiques.includes(terme)) scoreEconomiques++;
    });
    
    // Vérifier les droits de solidarité
    solidariteAttendus.forEach(terme => {
        if (solidarite.includes(terme)) scoreSolidarite++;
    });
    
    const totalScore = scoreCivils + scoreEconomiques + scoreSolidarite;
    const maxScore = 6; // 6 droits à classer
    
    if (totalScore === maxScore) {
        showSuccessModal(
            '🏆 Classification parfaite !',
            'Excellent ! Tu maîtrises parfaitement les trois familles de droits.',
            'Tu as bien distingué les droits civils/politiques, économiques/sociaux et de solidarité.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (totalScore >= 4) {
        showSuccessModal(
            '👍 Bon classement !',
            `Tu as classé ${totalScore}/${maxScore} droits correctement.`,
            'Tu progresses bien dans la compréhension des différentes catégories de droits.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '🔍 À approfondir',
            `Tu as classé ${totalScore}/${maxScore} droits correctement.`,
            'Révise les caractéristiques des trois familles de droits pour mieux les distinguer.'
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
            'Prends le temps de bien réfléchir et de développer tes réponses.'
        );
        return;
    }
    
    const resultsDiv = document.getElementById('evalResults');
    const scoreDisplay = document.getElementById('evalScore');
    const correctionsDiv = document.getElementById('evalCorrections');
    
    let score = 0;
    let maxScore = 9;
    let feedback = '';
    
    // Question 1 : Identification du problème
    if (eval1.length > 20 && (eval1.includes('grève') || eval1.includes('protestation') || eval1.includes('manifestation') || eval1.includes('conflit'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Tu as compris l\'idée, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est l\'intention d\'organiser une grève de protestation.</p>';
    }
    
    // Question 2 : Conséquences de la grève
    const consequencesAttendues = ['perturbation', 'cours', 'casses', 'violence', 'arrestation', 'interruption'];
    let consequencesFound = 0;
    
    consequencesAttendues.forEach(terme => {
        if (eval2.toLowerCase().includes(terme)) consequencesFound++;
    });
    
    if (consequencesFound >= 2 && eval2.length > 30) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Excellente énumération des conséquences.</p>';
    } else if (consequencesFound >= 1 && eval2.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as cité des conséquences, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense aux conséquences sur les cours, les infrastructures, la sécurité.</p>';
    }
    
    // Question 3 : Justification pour la négociation
    const justificationAttendues = ['paix', 'dialogue', 'harmonie', 'violence', 'négocier', 'discuter'];
    let justificationFound = 0;
    
    justificationAttendues.forEach(terme => {
        if (eval3.toLowerCase().includes(terme)) justificationFound++;
    });
    
    if (justificationFound >= 2 && eval3.length > 40) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification pour la négociation.</p>';
    } else if (justificationFound >= 1 && eval3.length > 25) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bon début d\'argumentation, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense aux avantages du dialogue pour préserver la paix et éviter la violence.</p>';
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
    
    corrections += "<p><strong>1. Identification du problème :</strong></p>";
    corrections += "<p>Le problème posé est l'intention d'organiser une grève de protestation contre les mauvaises conditions d'étude. Les élèves veulent manifester leur mécontentement face aux problèmes de l'établissement.</p>";
    
    corrections += "<p><strong>2. Conséquences possibles de la grève :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Perturbation des cours et retard dans le programme</li>";
    corrections += "<li>Risques de dégradation des infrastructures de l'établissement</li>";
    corrections += "<li>Possibilité d'arrestation des grévistes en cas de débordement</li>";
    corrections += "<li>Tensions entre élèves et administration</li>";
    corrections += "<li>Risques de violences si la manifestation dégénère</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Justification pour la négociation :</strong></p>";
    corrections += "<p>Je suis favorable à la négociation parce que :</p>";
    corrections += "<ul>";
    corrections += "<li>Elle favorise un climat de paix et de dialogue</li>";
    corrections += "<li>Elle évite l'interruption des cours et préserve le droit à l'éducation</li>";
    corrections += "<li>Elle permet de trouver des solutions constructives sans violence</li>";
    corrections += "<li>Elle préserve l'harmonie sociale au sein de l'établissement</li>";
    corrections += "<li>Elle respecte le droit à la liberté d'expression tout en évitant les conflits</li>";
    corrections += "</ul>";
    corrections += "<p>La négociation est un moyen pacifique de résoudre les conflits qui respecte à la fois les droits des élèves et les besoins de l'établissement.</p>";
    
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