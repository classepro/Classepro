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

function checkRelier() {
    const rep1 = document.getElementById('rel1').value;
    const rep2 = document.getElementById('rel2').value;
    const rep3 = document.getElementById('rel3').value;
    
    if (!rep1 || !rep2 || !rep3) {
        showErrorModal(
            'Réponses incomplètes',
            'Tu dois choisir une réponse pour chaque numéro.',
            'Sélectionne une lettre (a, b ou c) pour chaque élément.'
        );
        return;
    }
    
    let score = 0;
    if (rep1 === 'c') score++;
    if (rep2 === 'b') score++;
    if (rep3 === 'a') score++;
    
    if (score === 3) {
        showSuccessModal(
            '🌟 Parfait !',
            `Tu as fait ${score}/3 bonnes associations.`,
            'Tu maîtrises parfaitement la signification des marques de circulation.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (score >= 2) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as fait ${score}/3 bonnes associations.`,
            'Tu es sur la bonne voie pour maîtriser la signalisation routière.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as fait ${score}/3 bonnes associations.`,
            'Consulte les corrections pour mieux comprendre la signification des différentes marques sur la route.'
        );
    }
}

function checkCasPratique() {
    const q1 = document.getElementById('q3-1').value.trim();
    const q2 = document.getElementById('q3-2').value.trim();
    const q3 = document.getElementById('q3-3').value.trim();
    
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
    if (q1.length > 10 && (q1.toLowerCase().includes('accident') || q1.includes('risque') || q1.includes('danger') || q1.includes('traverser') || q1.includes('passage'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1 :</strong> Tu as bien identifié le problème de sécurité.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Pense aux risques d\'accident quand on traverse mal.</p>';
    }
    
    // Question 2
    if (q2.length > 20 && (q2.includes('passage') || q2.includes('piéton') || q2.includes('regarder') || q2.includes('feu') || q2.includes('courir'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2 :</strong> Excellente énumération des règles importantes.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense aux règles pour traverser en sécurité.</p>';
    }
    
    // Question 3
    if (q3.length > 30 && (q3.includes('sécurité') || q3.includes('danger') || q3.includes('accident') || q3.includes('vie') || q3.includes('risque'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 3 :</strong> Très bonne justification mettant en avant la sécurité.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Développe davantage en expliquant les risques concrets.</p>';
    }
    
    if (score >= 5) {
        showSuccessModal(
            '💡 Très bon raisonnement !',
            'Tu as bien analysé la situation et proposé des solutions de sécurité.',
            feedback
        );
        updateProgress();
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
            'Relis bien la situation et réfléchis aux risques pour la sécurité.',
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
    // Partie 1 : Questions ouvertes
    const eval1 = document.getElementById('eval1').value.trim();
    const eval2 = document.getElementById('eval2').value.trim();
    const eval3 = document.getElementById('eval3').value.trim();
    
    // Partie 2 : Tableau
    const tabValeurs = [];
    for (let i = 1; i <= 4; i++) {
        tabValeurs.push({
            type: document.getElementById(`tab${i}-1`).value.trim().toLowerCase(),
            forme: document.getElementById(`tab${i}-2`).value.trim().toLowerCase(),
            signification: document.getElementById(`tab${i}-3`).value.trim().toLowerCase()
        });
    }
    
    // Vérifier si tout est rempli
    if (!eval1 || !eval2 || !eval3 || tabValeurs.some(v => !v.type || !v.forme || !v.signification)) {
        showErrorModal(
            'Évaluation incomplète',
            'Tu dois répondre à toutes les questions avant de soumettre.',
            'N\'oublie pas de remplir complètement le tableau également.'
        );
        return;
    }
    
    const resultsDiv = document.getElementById('evalResults');
    const scoreDisplay = document.getElementById('evalScore');
    const correctionsDiv = document.getElementById('evalCorrections');
    
    let score = 0;
    let maxScore = 20; // 20 points au total
    let feedback = '';
    
    // Évaluation partie 1 (9 points)
    // Question 1
    if (eval1.length > 15 && (eval1.includes('méconnaissance') || eval1.includes('code') || eval1.includes('règles') || eval1.includes('feu') || eval1.includes('rouge'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Excellente identification du problème.</p>';
    } else if (eval1.length > 8) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Bonne direction, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est la méconnaissance des règles de circulation.</p>';
    }
    
    // Question 2
    const couleursAttendues = ['rouge', 'orange', 'vert'];
    let hasRouge = eval2.includes('rouge') || eval2.includes('Rouge');
    let hasOrange = eval2.includes('orange') || eval2.includes('Orange');
    let hasVert = eval2.includes('vert') || eval2.includes('Vert');
    
    if (hasRouge && hasOrange && hasVert && eval2.length > 40) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Parfaite énumération et explication des couleurs.</p>';
    } else if ((hasRouge || hasOrange || hasVert) && eval2.length > 20) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as cité certaines couleurs, complète avec les autres.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> N\'oublie pas les 3 couleurs : rouge, orange, vert.</p>';
    }
    
    // Question 3
    if (eval3.length > 50 && (eval3.includes('sécurité') || eval3.includes('règles') || eval3.includes('respect') || eval3.includes('accident') || eval3.includes('danger'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification mettant en avant la sécurité.</p>';
    } else if (eval3.length > 25) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bonne base, développe davantage les arguments de sécurité.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense à justifier par l\'importance du respect des règles pour éviter les accidents.</p>';
    }
    
    // Évaluation partie 2 : Tableau (11 points)
    const reponsesAttendues = [
        { type: 'danger', formes: ['triangle', 'triangulaire', 'triangle rouge'], signification: ['avertir', 'danger', 'attention'] },
        { type: 'interdiction', formes: ['rond', 'ronde', 'rond rouge', 'cercle'], signification: ['interdire', 'interdiction', 'interdit', 'defense'] },
        { type: 'obligation', formes: ['rond bleu', 'rond', 'ronde bleue'], signification: ['obliger', 'obligation', 'imposer', 'obligatoire'] },
        { type: 'indication', formes: ['carré', 'rectangle', 'carré/rectangle'], signification: ['informer', 'information', 'indiquer', 'localisation'] }
    ];
    
    let scoreTableau = 0;
    let feedbackTableau = '<p><strong>Correction du tableau :</strong></p><ul>';
    
    tabValeurs.forEach((rep, index) => {
        let trouve = false;
        for (const attendu of reponsesAttendues) {
            if (rep.type.includes(attendu.type) || attendu.type.includes(rep.type)) {
                // Vérifier la forme
                let formeCorrecte = attendu.formes.some(f => rep.forme.includes(f) || f.includes(rep.forme));
                // Vérifier la signification
                let significationCorrecte = attendu.signification.some(s => rep.signification.includes(s) || s.includes(rep.signification));
                
                if (formeCorrecte && significationCorrecte) {
                    scoreTableau += 2;
                    score += 2;
                    feedbackTableau += `<li><strong>Ligne ${index+1} :</strong> ✓ Correct - ${attendu.type.charAt(0).toUpperCase() + attendu.type.slice(1)}</li>`;
                    trouve = true;
                    break;
                } else if (formeCorrecte || significationCorrecte) {
                    scoreTableau += 1;
                    score += 1;
                    feedbackTableau += `<li><strong>Ligne ${index+1} :</strong> ↔ Partiellement correct</li>`;
                    trouve = true;
                    break;
                }
            }
        }
        if (!trouve) {
            feedbackTableau += `<li><strong>Ligne ${index+1} :</strong> ✗ À revoir</li>`;
        }
    });
    
    feedbackTableau += '</ul>';
    feedback += feedbackTableau;
    
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
    
    corrections += "<p><strong>Partie 1 - Situation d'évaluation :</strong></p>";
    corrections += "<p><strong>1. Problème posé :</strong> La méconnaissance du code de la route par le frère cadet qui ne comprend pas pourquoi il faut s'arrêter au feu rouge.</p>";
    
    corrections += "<p><strong>2. Couleurs des feux et significations :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong style='color: #ff3333;'>🔴 ROUGE</strong> : Arrêt absolu. Interdiction de passer pour les véhicules, autorisation de traverser pour les piétons (quand le bonhomme est vert).</li>";
    corrections += "<li><strong style='color: #ff9900;'>🟠 ORANGE</strong> : Préparation à l'arrêt. Il faut s'arrêter (sauf si on est trop près du feu). Les piétons ne doivent pas commencer à traverser.</li>";
    corrections += "<li><strong style='color: #33cc33;'>🟢 VERT</strong> : Passage autorisé pour les véhicules. Les piétons doivent s'arrêter (sauf s'il y a un feu piéton vert).</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Justification de l'arrêt :</strong> Le père a bien fait de s'arrêter parce que :</p>";
    corrections += "<ul>";
    corrections += "<li>Le respect des feux tricolores est obligatoire par la loi</li>";
    corrections += "<li>Passer au rouge pourrait provoquer un accident grave avec d'autres véhicules ou des piétons</li>";
    corrections += "<li>Même si la route semble libre, un piéton ou un véhicule pourrait surgir</li>";
    corrections += "<li>Le non-respect du feu rouge est passible d'une amende et de points sur le permis</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>Partie 2 - Tableau des panneaux :</strong></p>";
    corrections += "<table style='width: 100%; margin: 1rem 0;'>";
    corrections += "<thead><tr><th>Type de panneau</th><th>Forme et couleur</th><th>Signification</th></tr></thead>";
    corrections += "<tbody>";
    corrections += "<tr><td><strong>Danger</strong></td><td>Triangle rouge</td><td>Avertit d'un danger sur la route</td></tr>";
    corrections += "<tr><td><strong>Interdiction</strong></td><td>Rond rouge</td><td>Interdit quelque chose</td></tr>";
    corrections += "<tr><td><strong>Obligation</strong></td><td>Rond bleu</td><td>Oblige à faire quelque chose</td></tr>";
    corrections += "<tr><td><strong>Indication/Localisation</strong></td><td>Carré ou rectangle</td><td>Donne une information utile</td></tr>";
    corrections += "</tbody></table>";
    
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