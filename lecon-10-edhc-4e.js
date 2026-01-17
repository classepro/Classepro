// JavaScript pour la leçon 10 : Comportements Responsables

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

// Fonction pour vérifier les associations
function checkAssociations() {
    const q1 = document.getElementById('q1-1').value.trim().toLowerCase();
    const q2 = document.getElementById('q1-2').value.trim().toLowerCase();
    const q3 = document.getElementById('q1-3').value.trim().toLowerCase();
    
    // Réponses attendues
    const correct1 = ['a,b,c,e', 'a, b, c, e', 'a b c e', 'abc e', 'a,b,c,e'];
    const correct2 = ['a,b,c', 'a, b, c', 'a b c', 'abc'];
    const correct3 = ['a,b,c', 'a, b, c', 'a b c', 'abc'];
    
    let score = 0;
    let feedback = '<p><strong>Corrections :</strong></p>';
    
    // Vérifier question 1
    if (correct1.some(c => q1.replace(/\s/g, '') === c.replace(/\s/g, ''))) {
        score++;
        feedback += '<p>✓ <strong>Grossesses à risque</strong> : Correct ! a, b, c, e</p>';
    } else {
        feedback += '<p>✗ <strong>Grossesses à risque</strong> : Réponse attendue : a, b, c, e</p>';
    }
    
    // Vérifier question 2
    if (correct2.some(c => q2.replace(/\s/g, '') === c.replace(/\s/g, ''))) {
        score++;
        feedback += '<p>✓ <strong>IST</strong> : Correct ! a, b, c</p>';
    } else {
        feedback += '<p>✗ <strong>IST</strong> : Réponse attendue : a, b, c</p>';
    }
    
    // Vérifier question 3
    if (correct3.some(c => q3.replace(/\s/g, '') === c.replace(/\s/g, ''))) {
        score++;
        feedback += '<p>✓ <strong>VIH/SIDA</strong> : Correct ! a, b, c</p>';
    } else {
        feedback += '<p>✗ <strong>VIH/SIDA</strong> : Réponse attendue : a, b, c</p>';
    }
    
    const percentage = Math.round((score / 3) * 100);
    
    if (percentage === 100) {
        showSuccessModal(
            '🌟 Parfait !',
            `Tu as ${score}/3 associations correctes.`,
            feedback
        );
        updateProgress();
        updateProgress();
    } else if (percentage >= 66) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as ${score}/3 associations correctes.`,
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as ${score}/3 associations correctes.`,
            feedback
        );
    }
}

// Fonction pour vérifier les moyens de prévention
function checkPrevention() {
    const checkboxes = [
        document.getElementById('q2-1'),
        document.getElementById('q2-2'),
        document.getElementById('q2-3'),
        document.getElementById('q2-4'),
        document.getElementById('q2-5')
    ];
    
    const correctAnswers = [true, true, true, false, false];
    let score = 0;
    let feedback = '<p><strong>Explications :</strong></p>';
    
    checkboxes.forEach((checkbox, index) => {
        const isChecked = checkbox.checked;
        const shouldBeChecked = correctAnswers[index];
        
        if (isChecked === shouldBeChecked) {
            score++;
        }
        
        // Ajouter des explications
        switch(index) {
            case 0:
                feedback += `<p>${isChecked === shouldBeChecked ? '✓' : '✗'} <strong>Abstinence sexuelle</strong> : ${shouldBeChecked ? 'Protège à 100%' : 'Devrait être coché'}</p>`;
                break;
            case 1:
                feedback += `<p>${isChecked === shouldBeChecked ? '✓' : '✗'} <strong>Préservatif</strong> : ${shouldBeChecked ? 'Protège très bien si bien utilisé' : 'Devrait être coché'}</p>`;
                break;
            case 2:
                feedback += `<p>${isChecked === shouldBeChecked ? '✓' : '✗'} <strong>Seringues à usage unique</strong> : ${shouldBeChecked ? 'Évite transmission par le sang' : 'Devrait être coché'}</p>`;
                break;
            case 3:
                feedback += `<p>${isChecked === shouldBeChecked ? '✓' : '✗'} <strong>Espacement des rapports</strong> : ${!shouldBeChecked ? 'Ne protège pas des IST' : 'Ne devrait pas être coché'}</p>`;
                break;
            case 4:
                feedback += `<p>${isChecked === shouldBeChecked ? '✓' : '✗'} <strong>Contraceptifs</strong> : ${!shouldBeChecked ? 'Protègent seulement des grossesses' : 'Ne devrait pas être coché'}</p>`;
                break;
        }
    });
    
    const percentage = Math.round((score / 5) * 100);
    
    if (percentage === 100) {
        showSuccessModal(
            '🎯 Excellente compréhension !',
            `Tu as ${score}/5 réponses correctes.`,
            feedback
        );
        updateProgress();
    } else if (percentage >= 60) {
        showSuccessModal(
            '👍 Bonne compréhension !',
            `Tu as ${score}/5 réponses correctes.`,
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À travailler',
            `Tu as ${score}/5 réponses correctes.`,
            feedback
        );
    }
}

// Fonction pour vérifier les Vrai/Faux
function checkTrueFalse() {
    const answers = {
        'q3-1': 'faux',
        'q3-2': 'vrai',
        'q3-3': 'vrai',
        'q3-4': 'faux',
        'q3-5': 'vrai'
    };
    
    let score = 0;
    let total = Object.keys(answers).length;
    let feedback = '<p><strong>Corrections détaillées :</strong></p>';
    
    for (const [question, correctAnswer] of Object.entries(answers)) {
        const radios = document.getElementsByName(question);
        let userAnswer = '';
        
        for (const radio of radios) {
            if (radio.checked) {
                userAnswer = radio.value;
                break;
            }
        }
        
        const questionNum = question.split('-')[1];
        
        if (userAnswer === correctAnswer) {
            score++;
            feedback += `<p>✓ Question ${questionNum} : Correct</p>`;
        } else if (userAnswer) {
            feedback += `<p>✗ Question ${questionNum} : Tu as répondu "${userAnswer}", la bonne réponse était "${correctAnswer}"</p>`;
        } else {
            feedback += `<p>? Question ${questionNum} : Pas de réponse</p>`;
        }
    }
    
    // Ajouter des explications
    feedback += '<p><strong>Explications :</strong></p>';
    feedback += '<p>1. Les rapports précoces sont très dangereux (grossesses, IST)</p>';
    feedback += '<p>2. Le préservatif protège à la fois des IST et des grossesses</p>';
    feedback += '<p>3. L\'abstinence est la protection la plus sûre pour les jeunes</p>';
    feedback += '<p>4. Une grossesse à l\'adolescence nuit gravement à la scolarité</p>';
    feedback += '<p>5. Les comportements responsables préservent effectivement la santé</p>';
    
    const percentage = Math.round((score / total) * 100);
    
    if (percentage >= 80) {
        showSuccessModal(
            '🏆 Excellent !',
            `Tu as obtenu ${score}/${total} bonnes réponses (${percentage}%).`,
            feedback
        );
        updateProgress();
        updateProgress();
    } else if (percentage >= 60) {
        showSuccessModal(
            '👍 Très bien !',
            `Tu as obtenu ${score}/${total} bonnes réponses (${percentage}%).`,
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as obtenu ${score}/${total} bonnes réponses (${percentage}%).`,
            feedback
        );
    }
}

// Fonction pour afficher toutes les réponses
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
    
    const allEvals = [eval1_1, eval1_2, eval1_3, eval2_1, eval2_2, eval2_3];
    if (allEvals.some(eval => !eval)) {
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
    let maxScore = 18; // 3 points par question
    let feedback = '';
    
    // Question 1.1
    if (eval1_1.length > 20 && (eval1_1.includes('menace') || eval1_1.includes('rupture') || eval1_1.includes('refus') || eval1_1.includes('rapport'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1.1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1_1.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.1 :</strong> Tu as compris, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.1 :</strong> Le problème est la menace de rupture liée au refus de rapports sexuels.</p>';
    }
    
    // Question 1.2
    const causes = ['rapports sexuels', 'non protégés', 'mauvaises fréquentations', 'méconnaissance', 'statut sérologique'];
    let causeCount = 0;
    causes.forEach(cause => {
        if (eval1_2.toLowerCase().includes(cause)) causeCount++;
    });
    
    if (causeCount >= 3) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1.2 :</strong> Excellente énumération des causes.</p>';
    } else if (causeCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.2 :</strong> Tu connais certaines causes, cherche les autres.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.2 :</strong> Les causes incluent : rapports non protégés, mauvaises fréquentations, méconnaissance...</p>';
    }
    
    // Question 1.3
    if (eval1_3.length > 50 && (eval1_3.includes('éviter') || eval1_3.includes('conséquences') || eval1_3.includes('santé') || eval1_3.includes('études'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1.3 :</strong> Excellente justification avec des arguments solides.</p>';
    } else if (eval1_3.length > 25) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.3 :</strong> Bonne direction, développe davantage tes arguments.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.3 :</strong> Pense à justifier par la protection de ta santé et de ton avenir scolaire.</p>';
    }
    
    // Question 2.1
    const risques = ['grossesse', 'IST', 'VIH', 'SIDA', 'maladie', 'infection'];
    let risqueCount = 0;
    risques.forEach(risque => {
        if (eval2_1.toLowerCase().includes(risque)) risqueCount++;
    });
    
    if (risqueCount >= 3) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2.1 :</strong> Bonne identification des risques.</p>';
    } else if (risqueCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.1 :</strong> Tu connais certains risques, cherche les autres.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.1 :</strong> Les risques incluent : grossesse non désirée, IST, VIH/SIDA...</p>';
    }
    
    // Question 2.2
    if (eval2_2.length > 30 && (eval2_2.includes('dépistage') || eval2_2.includes('médecin') || eval2_2.includes('préservatif') || eval2_2.includes('protection'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2.2 :</strong> Excellents conseils de protection.</p>';
    } else if (eval2_2.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.2 :</strong> Bon début, précise davantage les actions concrètes.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.2 :</strong> Conseille : dépistage, protection future, dialogue avec un adulte.</p>';
    }
    
    // Question 2.3
    if (eval2_3.length > 30 && (eval2_3.includes('responsable') || eval2_3.includes('abstinence') || eval2_3.includes('fidélité') || eval2_3.includes('préservatif'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2.3 :</strong> Parfaite description des comportements responsables.</p>';
    } else if (eval2_3.length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.3 :</strong> Tu as compris l\'idée, précise les comportements.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.3 :</strong> Les comportements responsables incluent : abstinence, fidélité, préservatif systématique.</p>';
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
        modalTitle = '👍 Très bon travail !';
        modalMessage = `Tu as obtenu ${score}/${maxScore} points (${percentage}%).`;
        message = `👍 Très bien ! ${score}/${maxScore} points (${percentage}%)`;
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
    corrections += "<p><strong>1. Problème posé :</strong> Menace de rupture liée au refus d'avoir des rapports sexuels précoces.</p>";
    corrections += "<p><strong>2. Causes des problèmes :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Les rapports sexuels non protégés</li>";
    corrections += "<li>Les mauvaises fréquentations</li>";
    corrections += "<li>La méconnaissance de la réalité du SIDA</li>";
    corrections += "<li>La méconnaissance du statut sérologique</li>";
    corrections += "<li>Les rapports sexuels précoces</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification de la décision :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Nécessité d'éviter les rapports sexuels précoces qui entraînent des graves conséquences (IST, VIH/SIDA, échec scolaire)</li>";
    corrections += "<li>Nécessité de vivre l'abstinence et se consacrer aux études</li>";
    corrections += "<li>Protection de sa santé physique et mentale</li>";
    corrections += "<li>Respect de ses valeurs et de son corps</li>";
    corrections += "<li>Préparation d'un avenir scolaire et professionnel réussi</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>Situation 2 :</strong></p>";
    corrections += "<p><strong>4. Risques encourus :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Grossesse non désirée</li>";
    corrections += "<li>Infection par une IST (gonorrhée, syphilis, chlamydia...)</li>";
    corrections += "<li>Infection par le VIH/SIDA</li>";
    corrections += "<li>Complications de santé immédiates ou futures</li>";
    corrections += "<li>Stress psychologique et anxiété</li>";
    corrections += "</ul>";
    corrections += "<p><strong>5. Conseils immédiats :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Faire un dépistage des IST et du VIH</li>";
    corrections += "<li>Consulter un médecin ou l'infirmier scolaire</li>";
    corrections += "<li>Utiliser systématiquement le préservatif dès maintenant</li>";
    corrections += "<li>En parler à un adulte de confiance si besoin</li>";
    corrections += "</ul>";
    corrections += "<p><strong>6. Comportements responsables à adopter :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Pratiquer l'abstinence pendant l'adolescence</li>";
    corrections += "<li>Si activité sexuelle : fidélité réciproque et préservatif systématique</li>";
    corrections += "<li>Communication honnête avec les partenaires sur la protection</li>";
    corrections += "<li>Dépistage régulier si activité sexuelle</li>";
    corrections += "<li>Choix de fréquentations qui respectent ces valeurs</li>";
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