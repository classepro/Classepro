// JavaScript pour la leçon 4 - Comportements Responsables

// Variables pour suivre la progression
let progress = 0;
const totalExercises = 8;

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
        modalDetails.innerHTML += `<p style="margin-top: 10px; font-weight: bold; color: var(--success);">${correctAnswer}</p>`;
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
function checkSymboles() {
    const checkboxes = document.querySelectorAll('input[name="symboles"]:checked');
    
    if (checkboxes.length === 0) {
        showErrorModal(
            'Réponse manquante',
            'Tu dois sélectionner au moins un symbole.',
            'Relis la liste et coche les vrais symboles de la République.'
        );
        return;
    }
    
    const selectedValues = Array.from(checkboxes).map(cb => parseInt(cb.value));
    const correctValues = [2, 4, 5, 7, 8]; // Les 5 symboles corrects
    
    // Calculer le score
    let correctCount = 0;
    let incorrectCount = 0;
    
    selectedValues.forEach(value => {
        if (correctValues.includes(value)) {
            correctCount++;
        } else {
            incorrectCount++;
        }
    });
    
    // Vérifier aussi les symboles manquants
    const missingSymbols = correctValues.filter(value => !selectedValues.includes(value));
    
    if (correctCount === 5 && incorrectCount === 0) {
        showSuccessModal(
            '🎉 Parfait !',
            'Tu as identifié tous les symboles de la République.',
            'Excellent travail ! Tu maîtrises parfaitement cette notion.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (correctCount >= 3 && incorrectCount === 0) {
        showSuccessModal(
            '👍 Très bien !',
            `Tu as identifié ${correctCount}/5 symboles correctement.`,
            missingSymbols.length > 0 ? `Il te manque : ${getSymbolNames(missingSymbols)}` : ''
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as ${correctCount} bonne(s) réponse(s) et ${incorrectCount} erreur(s).`,
            `Les symboles de la République sont : ${getSymbolNames(correctValues)}`
        );
    }
}

function getSymbolNames(values) {
    const names = {
        1: 'La Constitution',
        2: 'L\'Hymne national',
        3: 'L\'éléphant',
        4: 'Le Drapeau national',
        5: 'Les Armoiries',
        6: 'La Basilique Notre Dame de la Paix',
        7: 'Le portrait officiel du Président',
        8: 'La devise nationale'
    };
    
    return values.map(v => names[v]).join(', ');
}

function checkAssociations() {
    const liaisons = document.getElementById('liaisons').value.trim().toLowerCase();
    
    if (!liaisons) {
        showErrorModal(
            'Réponse manquante',
            'Tu dois écrire tes associations.',
            'Format attendu : 1a-1c, 2b-2d'
        );
        return;
    }
    
    // Nettoyer et normaliser la réponse
    const cleaned = liaisons.replace(/\s/g, ''); // Supprimer les espaces
    const expected = '1a-1c,2b-2d';
    
    if (cleaned === expected || cleaned === '1a1c2b2d' || cleaned === '1a,1c,2b,2d') {
        showSuccessModal(
            '🌟 Excellente association !',
            'Tu as parfaitement relié les institutions à leurs rôles.',
            'Le Président exerce le pouvoir exécutif, le Parlement le pouvoir législatif.'
        );
        updateProgress();
        updateProgress();
    } else if (cleaned.includes('1a') && cleaned.includes('1c') && cleaned.includes('2b') && cleaned.includes('2d')) {
        showSuccessModal(
            '✅ Bon travail !',
            'Tu as identifié les bonnes associations.',
            'Vérifie juste l\'ordre ou la ponctuation pour être parfait.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '🔍 Presque !',
            'Quelques erreurs dans tes associations.',
            'Rappel : Le Président (1) : a et c. Le Parlement (2) : b et d.'
        );
    }
}

function checkComportements() {
    const checkboxes = document.querySelectorAll('input[name="comportements"]:checked');
    
    if (checkboxes.length === 0) {
        showErrorModal(
            'Réponse manquante',
            'Tu dois cocher au moins un comportement.',
            'Relis chaque proposition et coche celles qui représentent des attitudes responsables.'
        );
        return;
    }
    
    const selectedValues = Array.from(checkboxes).map(cb => parseInt(cb.value));
    const correctValues = [1, 4, 6]; // Comportements responsables
    
    let score = 0;
    let feedback = '<p><strong>Analyse :</strong></p>';
    
    // Vérifier chaque comportement
    [1, 2, 3, 4, 5, 6].forEach(value => {
        const isSelected = selectedValues.includes(value);
        const isCorrect = correctValues.includes(value);
        
        if (isSelected && isCorrect) {
            score++;
            feedback += `<p>✓ <strong>${getComportementName(value)}</strong> : Bon choix !</p>`;
        } else if (isSelected && !isCorrect) {
            feedback += `<p>✗ <strong>${getComportementName(value)}</strong> : Ce n'est pas un comportement responsable.</p>`;
        } else if (!isSelected && isCorrect) {
            feedback += `<p>❓ <strong>${getComportementName(value)}</strong> : Tu as oublié ce comportement responsable.</p>`;
        }
    });
    
    if (score === 3 && selectedValues.length === 3) {
        showSuccessModal(
            '💡 Parfaitement compris !',
            'Tu as identifié tous les comportements responsables.',
            feedback
        );
        updateProgress();
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '👍 Bien compris !',
            `Tu as ${score}/3 comportements corrects.`,
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '🧠 À revoir',
            'Relis bien la leçon sur les comportements responsables.',
            feedback
        );
    }
}

function getComportementName(value) {
    const names = {
        1: 'Se recueillir devant le drapeau',
        2: 'S\'arrêter de marcher quand on voit le drapeau',
        3: 'Taquiner son voisin au salut aux couleurs',
        4: 'Aimer son pays',
        5: 'Refuser de participer pour des raisons politiques',
        6: 'Respecter un député même si on n\'a pas voté pour lui'
    };
    return names[value] || `Comportement ${value}`;
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
            'Prends le temps de développer tes réponses.'
        );
        return;
    }
    
    const resultsDiv = document.getElementById('evalResults');
    const scoreDisplay = document.getElementById('evalScore');
    const correctionsDiv = document.getElementById('evalCorrections');
    
    let score = 0;
    let maxScore = 9;
    let feedback = '';
    
    // Question 1
    if (eval1.length > 20 && (eval1.toLowerCase().includes('non-respect') || eval1.includes('institution') || eval1.includes('symbole') || eval1.includes('boycott'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Excellente identification du problème.</p>';
    } else if (eval1.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Bon début, précise que c\'est un problème de non-respect des institutions.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est le non-respect des institutions/répresentants.</p>';
    }
    
    // Question 2
    const consequences = eval2.toLowerCase();
    let consequenceCount = 0;
    const expectedConsequences = ['arrestation', 'trouble', 'violence', 'division', 'sanction', 'cohésion', 'ordre', 'républicain'];
    
    expectedConsequences.forEach(term => {
        if (consequences.includes(term)) consequenceCount++;
    });
    
    if (consequenceCount >= 3) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonne énumération des conséquences.</p>';
    } else if (consequenceCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as identifié certaines conséquences, cherche-en d\'autres.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense aux conséquences légales, sociales et politiques.</p>';
    }
    
    // Question 3
    const reasons = eval3.toLowerCase();
    let reasonCount = 0;
    const expectedReasons = ['respect', 'institution', 'paix', 'cohésion', 'démocratie', 'loi', 'citoyen', 'responsable'];
    
    expectedReasons.forEach(term => {
        if (reasons.includes(term)) reasonCount++;
    });
    
    if (reasonCount >= 3 && eval3.length > 30) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellentes justifications pour ton refus.</p>';
    } else if (reasonCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bonnes raisons, développe-les davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense au respect des institutions et à la paix sociale.</p>';
    }
    
    const percentage = Math.round((score / maxScore) * 100);
    let message = '';
    let modalTitle = '';
    let modalMessage = '';
    
    if (percentage >= 80) {
        modalTitle = '🏆 Excellent travail !';
        modalMessage = `Tu as obtenu ${score}/${maxScore} points (${percentage}%).`;
        message = `🎉 Excellent ! ${score}/${maxScore} points (${percentage}%)`;
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
    
    corrections += "<p><strong>1. Problème identifié :</strong></p>";
    corrections += "<p>Le non-respect des personnalités qui incarnent une Institution de la République. Il s'agit d'un projet de perturbation d'une cérémonie officielle pour des raisons purement politiques, sans considération pour le respect dû aux institutions démocratiques.</p>";
    
    corrections += "<p><strong>2. Trois conséquences possibles :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>Conséquence légale :</strong> Arrestation des manifestants pour trouble à l'ordre public</li>";
    corrections += "<li><strong>Conséquence sociale :</strong> Mise en danger de la cohésion sociale et montée des tensions politiques</li>";
    corrections += "<li><strong>Conséquence politique :</strong> Affaiblissement de l'autorité des institutions et de l'ordre républicain</li>";
    corrections += "<li><strong>Conséquence éducative :</strong> Mauvaise éducation civique des jeunes participants</li>";
    corrections += "<li><strong>Conséquence personnelle :</strong> Casier judiciaire pour les participants, difficultés futures</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Raisons de refuser de participer :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>Respect des institutions :</strong> Les Institutions de la République doivent être respectées, ainsi que les personnalités qui les incarnent, quelles que soient nos opinions politiques</li>";
    corrections += "<li><strong>Responsabilité citoyenne :</strong> En démocratie, on exprime son désaccord par des moyens pacifiques et constructifs, pas par le sabotage</li>";
    corrections += "<li><strong>Préservation de la paix :</strong> De telles actions risquent de créer des tensions et de nuire à la paix sociale</li>";
    corrections += "<li><strong>Respect de la loi :</strong> Perturber une cérémonie officielle est illégal et peut mener à des sanctions</li>";
    corrections += "<li><strong>Éducation civique :</strong> Un bon citoyen éduque ses pairs au respect des institutions, pas à leur mépris</li>";
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