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
    const colors = ['#e63946', '#3D3B8E', '#6883BA', '#4BB543', '#FF9800'];
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

// Activité 1 : Définition du DIH
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
            'Choisis l\'option 1, 2 ou 3 qui correspond selon toi à la bonne définition du DIH.'
        );
        return;
    }
    
    if (selectedValue === correctAnswer) {
        // Bonne réponse
        showSuccessModal(
            '✅ Définition correcte !',
            'Excellente réponse ! Tu as bien compris ce qu\'est le Droit International Humanitaire.',
            'Le DIH vise effectivement à limiter les moyens utilisés pendant les conflits armés tout en protégeant les personnes sans défense.'
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
            case 'a': correctText = '1) des droits de l\'homme qui s\'appliquent en temps de paix'; break;
            case 'b': correctText = '2) des règles qui visent à protéger les combattants pendant la guerre'; break;
            case 'c': correctText = '3) des règles qui visent à limiter les moyens utilisés en temps de conflits armés'; break;
        }
        
        showErrorModal(
            'Presque !',
            'Réfléchis bien au but principal du Droit International Humanitaire.',
            'Le DIH ne protège pas seulement les combattants, il limite aussi les moyens de guerre et protège surtout ceux qui ne combattent pas.',
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

// Activité 2 : Règles du DIH (cases à cocher)
function checkCheckbox() {
    const checkboxes = [
        document.getElementById('q2-a'),
        document.getElementById('q2-b'),
        document.getElementById('q2-c'),
        document.getElementById('q2-d')
    ];
    
    // Vérifier si au moins une case est cochée
    let atLeastOneChecked = false;
    checkboxes.forEach(cb => {
        if (cb.checked) atLeastOneChecked = true;
    });
    
    if (!atLeastOneChecked) {
        showErrorModal(
            'Aucune sélection',
            'Tu dois cocher au moins une case avant de vérifier.',
            'Lis bien chaque proposition et coche celles qui te semblent être des règles du DIH.'
        );
        return;
    }
    
    // Réponses correctes : a et d
    const correctAnswers = {
        'a': true,  // Ne jamais s'attaquer aux femmes, enfants, personnes âgées
        'b': false, // Ne pas venir en aide aux blessés (FAUX - c'est obligatoire)
        'c': false, // Tuer tous les ennemis capturés (FAUX - interdit)
        'd': true   // Ne pas utiliser d'armes chimiques
    };
    
    let score = 0;
    let totalCorrect = 0;
    let feedback = '';
    
    // Compter les bonnes réponses attendues
    for (const key in correctAnswers) {
        if (correctAnswers[key]) totalCorrect++;
    }
    
    // Vérifier chaque case
    checkboxes.forEach(cb => {
        const value = cb.value;
        const isCorrect = correctAnswers[value];
        const isChecked = cb.checked;
        
        if (isChecked && isCorrect) {
            score++;
            cb.parentElement.style.color = 'var(--success)';
            cb.parentElement.style.fontWeight = 'bold';
            feedback += `<p>✓ <strong>${cb.nextElementSibling.textContent}</strong> : Bonne réponse, c'est bien une règle du DIH.</p>`;
        } else if (isChecked && !isCorrect) {
            cb.parentElement.style.color = 'var(--warning)';
            feedback += `<p>✗ <strong>${cb.nextElementSibling.textContent}</strong> : Ce n'est pas une règle du DIH. Le DIH exige au contraire d'aider les blessés et interdit de tuer les prisonniers.</p>`;
        } else if (!isChecked && isCorrect) {
            cb.parentElement.style.color = 'var(--warning)';
            feedback += `<p>⚠️ <strong>${cb.nextElementSibling.textContent}</strong> : Tu as oublié cette règle importante du DIH.</p>`;
        }
    });
    
    if (score === totalCorrect) {
        showSuccessModal(
            '🏆 Règles parfaitement identifiées !',
            'Félicitations ! Tu connais bien les principales règles du Droit International Humanitaire.',
            feedback
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (score >= 1) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as identifié ${score}/${totalCorrect} règles correctement.`,
            feedback + '<p>Continue à étudier les règles du DIH pour les maîtriser parfaitement.</p>'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            'Les règles du DIH n\'étaient pas bien identifiées.',
            feedback + '<p>Révise les règles du DIH qui protègent les civils et interdisent les armes cruelles.</p>'
        );
    }
}

// Activité 3 : Correspondance dates-textes
function checkMatching() {
    const q3_1 = document.getElementById('q3-1').value;
    const q3_2 = document.getElementById('q3-2').value;
    const q3_3 = document.getElementById('q3-3').value;
    const q3_4 = document.getElementById('q3-4').value;
    
    if (!q3_1 || !q3_2 || !q3_3 || !q3_4) {
        showErrorModal(
            'Réponses incomplètes',
            'Tu dois sélectionner une date pour chaque texte.',
            'N\'oublie pas de choisir une option dans chaque liste déroulante.'
        );
        return;
    }
    
    const answers = {
        'q3-1': 'b', // Guerres civiles = 1949
        'q3-2': 'a', // Comité International = 1863
        'q3-3': 'd', // Protection victimes = 1977
        'q3-4': 'c'  // Conflits internationaux = 1864
    };
    
    let correct = 0;
    
    // Vérifier chaque réponse
    if (q3_1 === answers['q3-1']) correct++;
    if (q3_2 === answers['q3-2']) correct++;
    if (q3_3 === answers['q3-3']) correct++;
    if (q3_4 === answers['q3-4']) correct++;
    
    // Appliquer les styles
    const selects = ['q3-1', 'q3-2', 'q3-3', 'q3-4'];
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
                // On ne change pas automatiquement la valeur pour laisser l'élève voir son erreur
            }
        }
    });
    
    if (correct === 4) {
        showSuccessModal(
            '📅 Correspondances historiques parfaites !',
            'Excellent ! Tu maîtrises parfaitement les dates clés du développement du DIH.',
            'Tu as bien associé chaque événement historique à sa date correcte.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (correct >= 2) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as ${correct}/4 bonnes réponses.`,
            'Continue à réviser les dates historiques pour les maîtriser parfaitement.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            'Les dates n\'étaient pas bien associées.',
            'Rappelle-toi l\'ordre chronologique : 1863 (Comité), 1864 (Convention), 1949 (4 Conventions), 1977 (Protocoles).'
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
    const problemKeywords = ['pillage', 'provisions', 'déplacés', 'camp', 'voler', 'prendre'];
    let problemFound = false;
    
    problemKeywords.forEach(keyword => {
        if (eval1.toLowerCase().includes(keyword)) problemFound = true;
    });
    
    if (problemFound && eval1.length > 15) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Tu as compris l\'idée, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est le pillage des provisions des déplacés qui ont fui les combats.</p>';
    }
    
    // Question 2 : Importance du DIH
    const dihKeywords = ['protège', 'victimes', 'réduit', 'souffrances', 'atrocités', 'guerre', 'dignité', 'humanité'];
    let dihFound = 0;
    
    dihKeywords.forEach(keyword => {
        if (eval2.toLowerCase().includes(keyword)) dihFound++;
    });
    
    if (dihFound >= 2 && eval2.length > 30) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Excellente explication de l\'importance du DIH.</p>';
    } else if (dihFound >= 1 && eval2.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as compris l\'importance, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense à expliquer comment le DIH protège les victimes et réduit les souffrances.</p>';
    }
    
    // Question 3 : Justification du refus
    const justificationKeywords = ['dignité', 'humaine', 'respect', 'protéger', 'vulnérables', 'aide', 'humanitaire', 'illégal'];
    let justificationFound = 0;
    
    justificationKeywords.forEach(keyword => {
        if (eval3.toLowerCase().includes(keyword)) justificationFound++;
    });
    
    if (justificationFound >= 2 && eval3.length > 40) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification pour refuser de participer au pillage.</p>';
    } else if (justificationFound >= 1 && eval3.length > 25) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bon début d\'argumentation, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense à expliquer l\'importance de respecter la dignité humaine et les victimes de guerre.</p>';
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
    corrections += "<p>Le problème posé est le pillage des provisions stockées dans le camp de déplacés. Ces personnes ont fui les zones de guerre et sont déjà vulnérables. Leur voler leurs provisions aggrave leur situation et viole les principes humanitaires.</p>";
    
    corrections += "<p><strong>2. Importance du Droit International Humanitaire :</strong></p>";
    corrections += "<p>Le DIH est important parce qu'il :</p>";
    corrections += "<ul>";
    corrections += "<li><strong>Protège toutes les victimes</strong> des conflits armés (civils, blessés, prisonniers)</li>";
    corrections += "<li><strong>Réduit les atrocités et les souffrances</strong> causées par la guerre en imposant des limites</li>";
    corrections += "<li><strong>Permet de punir les auteurs de crimes de guerre</strong> grâce aux sanctions prévues</li>";
    corrections += "<li><strong>Contribue à protéger et valoriser l'être humain</strong> même en temps de conflit</li>";
    corrections += "<li><strong>Facilite l'assistance humanitaire</strong> aux populations affectées</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Justification pour refuser de participer au pillage :</strong></p>";
    corrections += "<p>Je refuse de participer au pillage parce que :</p>";
    corrections += "<ul>";
    corrections += "<li><strong>C'est contraire à la dignité humaine</strong> : Les déplacés sont déjà victimes de la guerre, les voler aggrave leur souffrance</li>";
    corrections += "<li><strong>C'est illégal et immoral</strong> : Voler est un délit, surtout quand il s'agit de personnes vulnérables</li>";
    corrections += "<li><strong>C'est contraire à l'esprit du DIH</strong> : Le DIH vise justement à protéger les victimes de conflits, pas à les victimiser davantage</li>";
    corrections += "<li><strong>Ces provisions peuvent sauver des vies</strong> : Dans un camp de déplacés, la nourriture et les médicaments sont essentiels à la survie</li>";
    corrections += "<li><strong>Je dois montrer l'exemple</strong> : En refusant, je montre à mes camarades que certaines actions sont inacceptables</li>";
    corrections += "</ul>";
    corrections += "<p>Au lieu de piller, je pourrais proposer à mes camarades d'organiser une collecte pour aider les déplacés, ou de devenir bénévole avec une organisation humanitaire.</p>";
    
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