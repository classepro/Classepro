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

// Fonction pour vérifier l'exercice 1 (checkboxes)
function checkCheckboxesEx1() {
    const a = document.getElementById('ex1-a').checked;
    const b = document.getElementById('ex1-b').checked;
    const c = document.getElementById('ex1-c').checked;
    const d = document.getElementById('ex1-d').checked;
    
    const correctB = true;
    const correctD = true;
    const correctA = false;
    const correctC = false;
    
    if (b === correctB && d === correctD && a === correctA && c === correctC) {
        showSuccessModal(
            '🎉 Excellente réponse !',
            'Tu as correctement identifié les principes de démocratie qui régissent les associations et clubs.',
            'Bravo ! Tu as compris que les critères d\'éligibilité et la séparation des pouvoirs sont essentiels dans une association démocratique.'
        );
        updateProgress();
    } else {
        let feedback = '<p><strong>Correction :</strong></p>';
        feedback += '<p>Les principes corrects sont :</p>';
        feedback += '<ul>';
        feedback += '<li><strong>b) L\'existence de critères d\'éligibilité</strong> ✓</li>';
        feedback += '<li><strong>d) Le principe de la séparation des pouvoirs</strong> ✓</li>';
        feedback += '</ul>';
        feedback += '<p><strong>Explications :</strong></p>';
        feedback += '<ul>';
        feedback += '<li>Les critères d\'éligibilité garantissent que les dirigeants ont les qualités nécessaires</li>';
        feedback += '<li>La séparation des pouvoirs empêche les abus et garantit un contrôle mutuel</li>';
        feedback += '<li>Les élections primaires et la commission électorale indépendante sont plus typiques des élections politiques nationales</li>';
        feedback += '</ul>';
        
        showErrorModal(
            'Presque !',
            'Quelques erreurs dans tes choix.',
            feedback
        );
    }
}

// Fonction pour vérifier l'exercice 2 (organes)
function checkCheckboxesEx2() {
    const ex1 = document.getElementById('ex2-1').checked;
    const ex2 = document.getElementById('ex2-2').checked;
    const ex3 = document.getElementById('ex2-3').checked;
    const ex4 = document.getElementById('ex2-4').checked;
    const ex5 = document.getElementById('ex2-5').checked;
    
    const correct1 = true;  // Bureau Exécutif
    const correct2 = false; // La comptabilité (fonction, pas organe)
    const correct3 = true;  // Secrétariat Général (fait partie du BE)
    const correct4 = true;  // Commissariat aux comptes
    const correct5 = false; // Comité des sages
    
    if (ex1 === correct1 && ex2 === correct2 && ex3 === correct3 && ex4 === correct4 && ex5 === correct5) {
        showSuccessModal(
            '🌟 Parfait !',
            'Tu as correctement identifié tous les organes des associations et clubs.',
            'Excellent travail ! Tu maîtrises bien la structure des associations démocratiques.'
        );
        updateProgress();
    } else {
        let feedback = '<p><strong>Correction :</strong></p>';
        feedback += '<p>Les organes corrects sont :</p>';
        feedback += '<ul>';
        feedback += '<li><strong>1) Le Bureau Exécutif</strong> ✓</li>';
        feedback += '<li><strong>3) Le Secrétariat Général</strong> ✓ (fait partie du Bureau Exécutif)</li>';
        feedback += '<li><strong>4) Le Commissariat aux comptes</strong> ✓</li>';
        feedback += '</ul>';
        feedback += '<p><strong>Explications :</strong></p>';
        feedback += '<ul>';
        feedback += '<li>Le Bureau Exécutif est l\'organe de direction de l\'association</li>';
        feedback += '<li>Le Secrétariat Général est une fonction au sein du Bureau Exécutif</li>';
        feedback += '<li>Le Commissariat aux comptes est l\'organe de contrôle financier</li>';
        feedback += '<li>La comptabilité est une fonction, pas un organe</li>';
        feedback += '<li>Le Comité des sages n\'est pas un organe standard des associations scolaires</li>';
        feedback += '</ul>';
        
        showErrorModal(
            'Quelques erreurs',
            'Revois la structure des associations.',
            feedback
        );
    }
}

// Fonction pour vérifier l'exercice 3 (relier)
function checkRelierEx3() {
    const rep1 = document.getElementById('ex3-1').value.trim().toLowerCase();
    const rep2 = document.getElementById('ex3-2').value.trim().toLowerCase();
    const rep3 = document.getElementById('ex3-3').value.trim().toLowerCase();
    
    if (!rep1 || !rep2 || !rep3) {
        showErrorModal(
            'Réponses incomplètes',
            'Tu dois remplir toutes les cases avant de vérifier.',
            'Écris la lettre correspondante dans chaque case.'
        );
        return;
    }
    
    const correct1 = 'c';
    const correct2 = 'a';
    const correct3 = 'b';
    
    let score = 0;
    let feedback = '<p><strong>Corrections :</strong></p>';
    
    if (rep1 === correct1) {
        score++;
        feedback += '<p>✓ <strong>1) L\'Assemblée Générale → c)</strong> C\'est la réunion de tous les membres</p>';
    } else {
        feedback += '<p>✗ <strong>1) L\'Assemblée Générale</strong> : La bonne réponse est <strong>c)</strong> C\'est la réunion de tous les membres</p>';
    }
    
    if (rep2 === correct2) {
        score++;
        feedback += '<p>✓ <strong>2) Le Bureau Exécutif → a)</strong> Il est composé d\'au moins trois (03) membres</p>';
    } else {
        feedback += '<p>✗ <strong>2) Le Bureau Exécutif</strong> : La bonne réponse est <strong>a)</strong> Il est composé d\'au moins trois (03) membres</p>';
    }
    
    if (rep3 === correct3) {
        score++;
        feedback += '<p>✓ <strong>3) Le Commissariat aux comptes → b)</strong> Il est chargé du contrôle de la gestion financière</p>';
    } else {
        feedback += '<p>✗ <strong>3) Le Commissariat aux comptes</strong> : La bonne réponse est <strong>b)</strong> Il est chargé du contrôle de la gestion financière</p>';
    }
    
    if (score === 3) {
        showSuccessModal(
            '💡 Parfaitement relié !',
            'Tu as correctement associé tous les organes à leur rôle.',
            feedback
        );
        updateProgress();
    } else if (score >= 1) {
        showSuccessModal(
            '🔍 Presque !',
            `Tu as correctement associé ${score}/3 organes à leur rôle.`,
            feedback
        );
    } else {
        showErrorModal(
            'À revoir',
            'Les associations ne sont pas correctement reliées à leurs rôles.',
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
    let feedback = '';
    
    // Évaluation Situation 1, Question 1
    if (eval1_1.length > 20 && (eval1_1.includes('violation') || eval1_1.includes('principe') || eval1_1.includes('démocratique') || eval1_1.includes('séparation') || eval1_1.includes('pouvoirs'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1_1.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 1 :</strong> Bonne direction, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 1 :</strong> Pense au principe de séparation des pouvoirs qui est violé.</p>';
    }
    
    // Évaluation Situation 1, Question 2
    const principlesCount = (eval1_2.match(/libre choix|critères d'éligibilité|vote|campagne électorale|séparation des pouvoirs|prise de décision|réunions d'information/gi) || []).length;
    if (principlesCount >= 3) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 2 :</strong> Bonne énumération des principes.</p>';
    } else if (principlesCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 2 :</strong> Tu cites quelques principes, mais tu peux en ajouter d\'autres.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 2 :</strong> Consulte la liste des principes démocratiques dans la leçon.</p>';
    }
    
    // Évaluation Situation 1, Question 3
    if (eval1_3.length > 40 && (eval1_3.includes('transparence') || eval1_3.includes('contrôle') || eval1_3.includes('démocratie') || eval1_3.includes('conforme') || eval1_3.includes('risque'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 1 - Question 3 :</strong> Excellente justification de ton refus.</p>';
    } else if (eval1_3.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 1 - Question 3 :</strong> Bonne base, développe davantage les conséquences.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 1 - Question 3 :</strong> Pense aux conséquences d\'une telle proposition sur le fonctionnement démocratique.</p>';
    }
    
    // Évaluation Situation 2, Question 1
    if (eval2_1.length > 20 && (eval2_1.includes('opposition') || eval2_1.includes('assemblée') || eval2_1.includes('générale') || eval2_1.includes('transparence') || eval2_1.includes('mauvaise gestion'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (eval2_1.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 1 :</strong> Tu as compris le problème, précise-le davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 1 :</strong> Le problème est lié à l\'opposition à l\'AG et à la peur de la transparence.</p>';
    }
    
    // Évaluation Situation 2, Question 2
    const consequencesCount = (eval2_2.match(/mésentente|conflit|cohésion|trouble|dissolution|sanction|confiance/gi) || []).length;
    if (consequencesCount >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 2 :</strong> Bonne énumération des conséquences.</p>';
    } else if (consequencesCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 2 :</strong> Tu cites une conséquence, ajoutes-en une autre.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 2 :</strong> Pense aux conséquences sur la cohésion et la confiance.</p>';
    }
    
    // Évaluation Situation 2, Question 3
    if (eval2_3.length > 40 && (eval2_3.includes('démocratie') || eval2_3.includes('transparence') || eval2_3.includes('responsabilité') || eval2_3.includes('culture démocratique') || eval2_3.includes('principe'))) {
        score += 2;
        feedback += '<p>✓ <strong>Situation 2 - Question 3 :</strong> Excellente justification basée sur les principes démocratiques.</p>';
    } else if (eval2_3.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Situation 2 - Question 3 :</strong> Bonne base, fais référence aux principes vus en cours.</p>';
    } else {
        feedback += '<p>✗ <strong>Situation 2 - Question 3 :</strong> Justifie ton refus en t\'appuyant sur l\'importance de la démocratie.</p>';
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
    
    corrections += "<p><strong>Situation d'évaluation 1 :</strong></p>";
    corrections += "<p><strong>1. Problème posé :</strong> La proposition de violation d'un principe démocratique (principe de la séparation des pouvoirs).</p>";
    corrections += "<p><strong>2. Trois principes de démocratie :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Le libre choix des dirigeants</li>";
    corrections += "<li>La définition de critères d'éligibilité</li>";
    corrections += "<li>La prise de décisions par consensus ou par vote</li>";
    corrections += "<li>La tenue de réunions d'information</li>";
    corrections += "<li>L'organisation de la campagne électorale</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification du refus :</strong> Cette proposition n'est pas conforme aux principes de démocratie dans la gestion d'un club ou d'une association. Elle peut entraîner :</p>";
    corrections += "<ul>";
    corrections += "<li>La perturbation du fonctionnement de l'association</li>";
    corrections += "<li>Des risques de conflits</li>";
    corrections += "<li>Des risques de violation des textes de l'association</li>";
    corrections += "<li>Des sanctions de l'Assemblée Générale (AG)</li>";
    corrections += "<li>Une perte de confiance des membres</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>Situation d'évaluation 2 :</strong></p>";
    corrections += "<p><strong>1. Problème posé :</strong> Une invitation à soutenir une opposition à l'assemblée générale ordinaire d'une association, motivée par la peur de révéler une mauvaise gestion.</p>";
    corrections += "<p><strong>2. Deux conséquences :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>La mésentente entre les membres</li>";
    corrections += "<li>Des troubles de cohésion sociale au sein de l'association</li>";
    corrections += "<li>La perte de confiance des membres</li>";
    corrections += "<li>Le risque de dissolution de l'association</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification du refus :</strong> Le respect des principes et règles de démocratie dans la gestion des associations et des clubs est un moyen de promotion de la culture démocratique. Il favorise une gestion transparente et développe le sens des responsabilités. Soutenir cette proposition serait :</p>";
    corrections += "<ul>";
    corrections += "<li>Aller à l'encontre des principes démocratiques</li>";
    corrections += "<li>Trahir la confiance des membres</li>";
    corrections += "<li>Risquer des sanctions</li>";
    corrections += "<li>Contribuer à une mauvaise gestion</li>";
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