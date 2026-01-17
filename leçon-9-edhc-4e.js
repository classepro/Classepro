// Variables pour suivre la progression
let progress = 0;
const totalExercises = 15;

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
function checkClassification() {
    const colonneKrou = document.getElementById('colonneKrou').value.toLowerCase();
    const colonneKwa = document.getElementById('colonneKwa').value.toLowerCase();
    
    const peuplesKrou = ['wê', 'dida', 'kroumen'];
    const peuplesKwa = ['n\'zima', 'nzima', 'baoulé', 'baoule', 'agni'];
    
    let scoreKrou = 0;
    let scoreKwa = 0;
    
    // Vérifier les peuples Krou
    peuplesKrou.forEach(peuple => {
        if (colonneKrou.includes(peuple)) scoreKrou++;
    });
    
    // Vérifier les peuples Kwa
    peuplesKwa.forEach(peuple => {
        if (colonneKwa.includes(peuple)) scoreKwa++;
    });
    
    const totalScore = scoreKrou + scoreKwa;
    const maxScore = 6; // 6 peuples à classer
    
    if (totalScore === 6) {
        showSuccessModal(
            '🌟 Classification parfaite !',
            `Tu as bien classé ${totalScore}/${maxScore} peuples.`,
            'Tu maîtrises parfaitement la distinction entre peuples Kwa et Krou.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (totalScore >= 4) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as classé ${totalScore}/${maxScore} peuples correctement.`,
            'Tu progresses bien dans la connaissance des groupes ethniques.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as classé ${totalScore}/${maxScore} peuples correctement.`,
            'Rappelle-toi :<br>' +
            '- Krou : Wê, Dida, Kroumen (Ouest)<br>' +
            '- Kwa : N\'Zima, Baoulé, Agni (Sud/Centre/Est)'
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
            'Clique sur l\'option de ton choix.'
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
        let correctText = '';
        if (correctAnswer === 'a') correctText = 'a) Un pacte de non-agression signé entre les ancêtres de différents peuples';
        else if (correctAnswer === 'vrai') correctText = 'VRAI';
        else if (correctAnswer === 'faux') correctText = 'FAUX';
        
        showErrorModal(
            'Presque !',
            `Réfléchis encore un peu.`,
            `Chaque erreur est une occasion d'apprendre.`,
            `${correctText}`
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

function checkAlliances() {
    const q4a = document.getElementById('q4-a').value.trim().toLowerCase();
    const q4b = document.getElementById('q4-b').value.trim().toLowerCase();
    
    const alliancesKwa = ['agni/baoulé', 'agni/ano', 'agni/akyé', 'm\'batto/ebrié', 'm\'batto/abbey', 'agni baoulé', 'agni ano', 'agni akyé', 'm\'batto ebrié', 'm\'batto abbey'];
    const alliancesKrou = ['bété/bakoué', 'bété bakoué', 'godié/dida', 'godié dida', 'godié/dida/niaboua/kroumen/bakwé'];
    
    let score = 0;
    let feedback = '';
    
    // Vérifier alliances Kwa
    let kwaCorrect = false;
    alliancesKwa.forEach(alliance => {
        if (q4a.includes(alliance)) {
            kwaCorrect = true;
            score += 2;
        }
    });
    
    if (kwaCorrect) {
        feedback += '<p>✓ <strong>Alliances Kwa :</strong> Correct !</p>';
    } else {
        feedback += '<p>✗ <strong>Alliances Kwa :</strong> Exemples : Agni/Baoulé, Agni/Ano, Agni/Akyé, M\'batto/Ebrié, M\'batto/Abbey</p>';
    }
    
    // Vérifier alliances Krou
    let krouCorrect = false;
    alliancesKrou.forEach(alliance => {
        if (q4b.includes(alliance)) {
            krouCorrect = true;
            score += 2;
        }
    });
    
    if (krouCorrect) {
        feedback += '<p>✓ <strong>Alliances Krou :</strong> Correct !</p>';
    } else {
        feedback += '<p>✗ <strong>Alliances Krou :</strong> Exemples : Bété/Bakoué, Godié/Dida/Niaboua/Kroumen/Bakwé</p>';
    }
    
    if (score === 4) {
        showSuccessModal(
            '💡 Parfait !',
            'Tu connais bien les différentes alliances.',
            feedback
        );
        updateProgress();
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '🔍 Bon travail !',
            'Tu as trouvé certaines alliances, continue à apprendre les autres.',
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '🧠 À approfondir',
            'Relis la partie sur les types d\'alliances.',
            feedback
        );
    }
}

function checkCasPratique() {
    const q1 = document.getElementById('q5-1').value.trim();
    const q2 = document.getElementById('q5-2').value.trim();
    const q3 = document.getElementById('q5-3').value.trim();
    
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
    if (q1.length > 15 && (q1.includes('sollicitation') || q1.includes('réconciliation') || q1.includes('allié') || q1.includes('camarade') || q1.includes('dispute'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 1 :</strong> Tu as bien identifié le problème.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est la sollicitation pour réconcilier un allié avec son camarade suite à une dispute.</p>';
    }
    
    // Question 2
    const alliancesAttendues = ['dida/abbey', 'dida/abidji', 'dida/abouré', 'dida/akyé'];
    let alliancesTrouvees = 0;
    
    alliancesAttendues.forEach(alliance => {
        if (q2.toLowerCase().includes(alliance)) alliancesTrouvees++;
    });
    
    if (alliancesTrouvees >= 2) {
        score += 2;
        feedback += '<p>✓ <strong>Question 2 :</strong> Tu as bien cité des alliances Kwa-Krou.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Exemples d\'alliances Kwa-Krou : Dida/Abbey, Dida/Abidji, Dida/Abouré, Dida/Akyé</p>';
    }
    
    // Question 3
    if (q3.length > 30 && (q3.includes('médiation') || q3.includes('devoir') || q3.includes('soutien') || q3.includes('assistance') || q3.includes('paix') || q3.includes('réconciliation'))) {
        score += 2;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification avec des arguments solides.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense à justifier avec : devoir de médiation, obligation de soutien à l\'allié, promotion de la paix.</p>';
    }
    
    if (score >= 5) {
        showSuccessModal(
            '💡 Très bon raisonnement !',
            'Tu as bien analysé la situation et justifié tes réponses.',
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
            'Relis bien la situation et réfléchis aux obligations créées par les alliances.',
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
    if (eval1.length > 20 && (eval1.includes('conflit communautaire') || eval1.includes('représailles') || eval1.includes('violence') || eval1.includes('dispute'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Excellente identification du problème.</p>';
    } else if (eval1.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Bon début, précise qu\'il s\'agit d\'un conflit communautaire avec risque de violence.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est un conflit communautaire avec invitation à des actions de représailles violentes.</p>';
    }
    
    // Question 2
    const avantagesAttendus = ['prévention conflits', 'règlement conflits', 'valeurs', 'honnêteté', 'solidarité', 'non-violence', 'respect', 'paix', 'médiation'];
    let avantagesTrouves = 0;
    let explicationOk = false;
    
    avantagesAttendus.forEach(avantage => {
        if (eval2.toLowerCase().includes(avantage)) avantagesTrouves++;
    });
    
    // Vérifier si une explication est donnée
    if (eval2.length > 60 && (eval2.includes('parce que') || eval2.includes('car') || eval2.includes('permet') || eval2.includes('favorise'))) {
        explicationOk = true;
    }
    
    if (avantagesTrouves >= 3 && explicationOk) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Parfaite énumération et explication des avantages.</p>';
    } else if (avantagesTrouves >= 2) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as compris l\'idée, précise davantage chaque avantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Les avantages sont : prévention/règlement des conflits, transmission de valeurs (honnêteté, solidarité...), préservation de la paix par la médiation.</p>';
    }
    
    // Question 3
    if (eval3.length > 50 && (eval3.includes('non-violence') || eval3.includes('dialogue') || eval3.includes('médiation') || eval3.includes('valeurs') || eval3.includes('alliés') || eval3.includes('frères'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification avec des arguments solides.</p>';
    } else if (eval3.length > 25) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bonne direction, développe tes arguments avec plus de détails.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense à justifier avec : 1) Les alliances privilégient la non-violence, 2) La violence aggrave les conflits, 3) Notre devoir est de promouvoir la paix.</p>';
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
    
    corrections += "<p><strong>1. Problème posé :</strong></p>";
    corrections += "<p>Conflit communautaire avec invitation à participer à des actions de représailles violentes. Certains jeunes veulent répondre à la violence par plus de violence au lieu de chercher des solutions pacifiques.</p>";
    
    corrections += "<p><strong>2. Trois avantages des alliances interethniques :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>Mécanismes de prévention et de règlement des conflits</strong> : Elles créent des obligations de régler les différends par le dialogue plutôt que par la violence</li>";
    corrections += "<li><strong>Transmission de valeurs positives</strong> : Elles véhiculent l'honnêteté, la solidarité, la non-violence, le respect de la parole et des engagements</li>";
    corrections += "<li><strong>Préservation de la paix</strong> : Elles permettent la médiation entre alliés et avec des tiers, créant des ponts entre communautés</li>";
    corrections += "<li><strong>Renforcement de la cohésion sociale</strong> : Elles créent des liens forts entre différents peuples, favorisant l'unité nationale</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Justification du refus :</strong></p>";
    corrections += "<p>Je refuse de m'associer à des actions de représailles parce que :</p>";
    corrections += "<ul>";
    corrections += "<li><strong>Les alliances interethniques privilégient la non-violence</strong> : Le pacte de non-agression est fondamental, la violence va à l'encontre de l'esprit des alliances</li>";
    corrections += "<li><strong>La violence aggrave les conflits</strong> : Les représailles créent un cycle de violence sans fin, alors que le dialogue peut apporter une solution durable</li>";
    corrections += "<li><strong>Mon devoir est de promouvoir la paix</strong> : En tant que futur citoyen, je dois contribuer à la cohésion sociale plutôt qu'à la division</li>";
    corrections += "<li><strong>Nous sommes tous frères</strong> : Les alliances nous rappellent que malgré nos différences, nous faisons partie d'une même nation et devons nous respecter</li>";
    corrections += "<li><strong>Il existe des alternatives</strong> : La médiation, le dialogue communautaire, l'intervention des autorités traditionnelles sont des solutions plus efficaces</li>";
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
        
        // Fermer le menu en cliquant sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                document.querySelectorAll('.menu-toggle span').forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
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