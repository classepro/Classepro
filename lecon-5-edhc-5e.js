// JAVASCRIPT COMPLET AVEC MODALES AMÉLIORÉES ET CORRECTION DES ONGLETS

// Variables pour suivre la progression
let progress = 0;
const totalExercises = 11;

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

// Fonction pour changer d'onglet - CORRIGÉE
function switchTab(tabName) {
    console.log('Changement d\'onglet vers:', tabName); // Debug
    
    // Masquer tous les contenus d'onglet
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
        console.log('Masquage de l\'onglet:', tab.id); // Debug
    });
    
    // Désactiver tous les onglets
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Activer l'onglet sélectionné
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add('active');
        console.log('Activation de l\'onglet:', tabName); // Debug
        
        // Activer le bouton d'onglet correspondant
        document.querySelectorAll('.tab').forEach(tab => {
            if (tab.getAttribute('data-tab') === tabName) {
                tab.classList.add('active');
            }
        });
        
        // Animer le contenu de l'onglet
        targetTab.style.animation = 'none';
        setTimeout(() => {
            targetTab.style.animation = 'fadeInUp 0.5s ease-out';
        }, 10);
    } else {
        console.error('Onglet non trouvé:', tabName); // Debug
    }
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
            'Clique sur l\'une des options pour choisir ta réponse.'
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
        const answerLabels = {
            'a': 'a) Celui qui vit en ville',
            'b': 'b) Le voisin de quartier',
            'c': 'c) Un membre d\'un État',
            'd': 'd) Un résident d\'un État'
        };
        
        const correctAnswerText = answerLabels[correctAnswer];
        const userAnswerText = answerLabels[selectedValue];
        
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

function checkDroitsCitoyen() {
    const reponse = document.getElementById('q2-1').value.trim().toLowerCase();
    
    // Nettoyer la réponse
    const reponseNettoyee = reponse.replace(/\s/g, ''); // Enlever les espaces
    
    // Vérifier différentes formes de réponses possibles
    const reponsesCorrectes = ['2,3,5', '2,5,3', '3,2,5', '3,5,2', '5,2,3', '5,3,2', '235', '253', '325', '352', '523', '532'];
    
    let estCorrect = false;
    for (const correcte of reponsesCorrectes) {
        if (reponseNettoyee === correcte) {
            estCorrect = true;
            break;
        }
    }
    
    // Vérifier aussi les réponses avec "et" ou autres séparateurs
    if (!estCorrect) {
        const nombres = reponseNettoyee.match(/\d/g);
        if (nombres) {
            const nombresTries = nombres.sort().join('');
            if (nombresTries === '235') {
                estCorrect = true;
            }
        }
    }
    
    if (estCorrect) {
        showSuccessModal(
            '🌟 Parfait !',
            'Tu as bien identifié les droits du citoyen.',
            'Les droits à la santé, au transport et à l\'éducation sont effectivement des droits reconnus aux citoyens.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            'Ta réponse n\'est pas tout à fait correcte.',
            'Relis bien la liste et pense aux droits que l\'État doit garantir à ses citoyens.',
            'Réponse correcte : 2, 3, 5 (droit à la santé, droit au transport, droit à l\'éducation)'
        );
    }
}

function checkVraiFaux() {
    const q1 = document.querySelector('input[name="q3-1"]:checked');
    const q2 = document.querySelector('input[name="q3-2"]:checked');
    const q3 = document.querySelector('input[name="q3-3"]:checked');
    
    if (!q1 || !q2 || !q3) {
        showErrorModal(
            'Réponses incomplètes',
            'Tu dois répondre à toutes les questions avant de vérifier.',
            'Pense à sélectionner V ou F pour chaque affirmation.'
        );
        return;
    }
    
    const reponses = {
        'q1': q1.value,
        'q2': q2.value,
        'q3': q3.value
    };
    
    const correctes = {
        'q1': 'V',
        'q2': 'F',
        'q3': 'V'
    };
    
    let score = 0;
    let feedback = '';
    
    // Question 1
    if (reponses.q1 === correctes.q1) {
        score++;
        feedback += '<p>✓ <strong>Question a :</strong> Correct ! Les devoirs favorisent effectivement la justice et l\'équité.</p>';
    } else {
        feedback += '<p>✗ <strong>Question a :</strong> Les devoirs des citoyens créent un cadre juste pour tous.</p>';
    }
    
    // Question 2
    if (reponses.q2 === correctes.q2) {
        score++;
        feedback += '<p>✓ <strong>Question b :</strong> Correct ! Les devoirs maintiennent l\'ordre, pas le désordre.</p>';
    } else {
        feedback += '<p>✗ <strong>Question b :</strong> Les devoirs organisent la société, ils ne créent pas de désordre.</p>';
    }
    
    // Question 3
    if (reponses.q3 === correctes.q3) {
        score++;
        feedback += '<p>✓ <strong>Question c :</strong> Correct ! Quand chacun remplit ses devoirs, tous peuvent exercer leurs libertés.</p>';
    } else {
        feedback += '<p>✗ <strong>Question c :</strong> Les devoirs protègent les libertés individuelles en empêchant les abus.</p>';
    }
    
    if (score === 3) {
        showSuccessModal(
            '💯 Parfait !',
            `Tu as obtenu ${score}/3 bonnes réponses.`,
            feedback
        );
        updateProgress();
    } else if (score >= 2) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as obtenu ${score}/3 bonnes réponses.`,
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '🧠 À approfondir',
            `Tu as obtenu ${score}/3 bonnes réponses.`,
            feedback
        );
    }
    
    // Colorer les réponses
    colorerReponseVF('q3-1', correctes.q1);
    colorerReponseVF('q3-2', correctes.q2);
    colorerReponseVF('q3-3', correctes.q3);
}

function colorerReponseVF(questionName, correctAnswer) {
    const radios = document.getElementsByName(questionName);
    radios.forEach(radio => {
        if (radio.value === correctAnswer) {
            radio.parentElement.style.color = 'var(--success)';
            radio.parentElement.style.fontWeight = 'bold';
        } else if (radio.checked && radio.value !== correctAnswer) {
            radio.parentElement.style.color = 'var(--warning)';
        }
    });
}

function checkTexteTrous() {
    const reponses = [
        document.getElementById('q4-1').value.trim().toLowerCase(),
        document.getElementById('q4-2').value.trim().toLowerCase(),
        document.getElementById('q4-3').value.trim().toLowerCase(),
        document.getElementById('q4-4').value.trim().toLowerCase()
    ];
    
    const correctes = [
        'ensemble d\'obligation',
        'l\'état',
        'la loi',
        'la défense du pays'
    ];
    
    // Formes alternatives acceptées
    const alternatives = [
        ['ensemble d\'obligation', 'ensemble d obligation', 'ensemble d\'obligations', 'ensemble d obligations'],
        ['l\'état', 'l état', 'etat', 'état'],
        ['la loi', 'loi'],
        ['la défense du pays', 'défense du pays', 'la defense du pays', 'defense du pays']
    ];
    
    let score = 0;
    let feedback = '';
    
    for (let i = 0; i < reponses.length; i++) {
        let estCorrect = false;
        
        // Vérifier la réponse exacte ou ses alternatives
        for (const alternative of alternatives[i]) {
            if (reponses[i] === alternative) {
                estCorrect = true;
                break;
            }
        }
        
        if (estCorrect) {
            score++;
            feedback += `<p>✓ <strong>Trou ${i+1} :</strong> Correct !</p>`;
            document.getElementById(`q4-${i+1}`).style.backgroundColor = 'rgba(75, 181, 67, 0.1)';
            document.getElementById(`q4-${i+1}`).style.borderColor = 'var(--success)';
        } else {
            feedback += `<p>✗ <strong>Trou ${i+1} :</strong> Réponse attendue : "${correctes[i]}"</p>`;
            document.getElementById(`q4-${i+1}`).style.backgroundColor = 'rgba(255, 152, 0, 0.1)';
            document.getElementById(`q4-${i+1}`).style.borderColor = 'var(--warning)';
        }
    }
    
    if (score === 4) {
        showSuccessModal(
            '🌟 Excellent !',
            'Tu as parfaitement complété le texte.',
            feedback
        );
        updateProgress();
        updateProgress(); // Double progression pour cet exercice
    } else if (score >= 2) {
        showSuccessModal(
            '✅ Assez bien !',
            `Tu as complété ${score}/4 trous correctement.`,
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as complété ${score}/4 trous correctement.`,
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
    // Récupérer toutes les réponses
    const reponses = {
        'eval1-1': document.getElementById('eval1-1').value.trim(),
        'eval1-2': document.getElementById('eval1-2').value.trim(),
        'eval1-3': document.getElementById('eval1-3').value.trim(),
        'eval2-1': document.getElementById('eval2-1').value.trim(),
        'eval2-2': document.getElementById('eval2-2').value.trim(),
        'eval2-3': document.getElementById('eval2-3').value.trim(),
        'eval3-1': document.getElementById('eval3-1').value.trim(),
        'eval3-2': document.getElementById('eval3-2').value.trim(),
        'eval3-3': document.getElementById('eval3-3').value.trim()
    };
    
    // Vérifier si toutes les réponses sont remplies
    let toutesRemplies = true;
    for (const key in reponses) {
        if (reponses[key] === '') {
            toutesRemplies = false;
            break;
        }
    }
    
    if (!toutesRemplies) {
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
    let maxScore = 27; // 9 questions x 3 points
    let feedback = '<h4>Corrections détaillées :</h4>';
    
    // Situation 1
    feedback += '<h5 style="color: var(--primary); margin-top: 1rem;">Situation 1 :</h5>';
    
    // Question 1.1
    if (reponses['eval1-1'].toLowerCase().includes('scolar') || reponses['eval1-1'].toLowerCase().includes('école') || reponses['eval1-1'].toLowerCase().includes('éducation')) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (reponses['eval1-1'].length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Problème identifié mais pas assez précis.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est le refus de scolarisation d\'une fille.</p>';
    }
    
    // Question 1.2
    const droitsMentionnes = ['santé', 'sécurité', 'éducation', 'information', 'transport'];
    let droitsTrouves = 0;
    for (const droit of droitsMentionnes) {
        if (reponses['eval1-2'].toLowerCase().includes(droit)) {
            droitsTrouves++;
        }
    }
    
    if (droitsTrouves >= 2) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonne énumération des droits.</p>';
    } else if (droitsTrouves >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as cité au moins un droit, mais il en fallait deux.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Exemples de droits : droit à la santé, droit à l\'éducation, droit à la sécurité.</p>';
    }
    
    // Question 1.3
    if (reponses['eval1-3'].length > 30 && (reponses['eval1-3'].toLowerCase().includes('égal') || reponses['eval1-3'].toLowerCase().includes('droit') || reponses['eval1-3'].toLowerCase().includes('justice'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification.</p>';
    } else if (reponses['eval1-3'].length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bon début de justification, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Justification attendue : tous les enfants ont droit à l\'éducation, filles comme garçons.</p>';
    }
    
    // Situation 2
    feedback += '<h5 style="color: var(--primary); margin-top: 1rem;">Situation 2 :</h5>';
    
    // Question 2.1
    if (reponses['eval2-1'].toLowerCase().includes('loi') || reponses['eval2-1'].toLowerCase().includes('interdiction') || reponses['eval2-1'].toLowerCase().includes('illégal')) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (reponses['eval2-1'].length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Problème identifié mais pas assez précis.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est la violation de la loi sur les sachets plastiques.</p>';
    }
    
    // Question 2.2
    const devoirsMentionnes = ['loi', 'impôt', 'défendre', 'respecter', 'payer'];
    let devoirsTrouves = 0;
    for (const devoir of devoirsMentionnes) {
        if (reponses['eval2-2'].toLowerCase().includes(devoir)) {
            devoirsTrouves++;
        }
    }
    
    if (devoirsTrouves >= 2) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonne énumération des devoirs.</p>';
    } else if (devoirsTrouves >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as cité au moins un devoir, mais il en fallait deux.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Exemples de devoirs : respecter les lois, payer l\'impôt, défendre son pays.</p>';
    }
    
    // Question 2.3
    if (reponses['eval2-3'].length > 30 && (reponses['eval2-3'].toLowerCase().includes('loi') || reponses['eval2-3'].toLowerCase().includes('citoyen') || reponses['eval2-3'].toLowerCase().includes('sanction'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification.</p>';
    } else if (reponses['eval2-3'].length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bon début de justification, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Justification attendue : respect des lois, éviter les sanctions, être un bon citoyen.</p>';
    }
    
    // Situation 3
    feedback += '<h5 style="color: var(--primary); margin-top: 1rem;">Situation 3 :</h5>';
    
    // Question 3.1
    if (reponses['eval3-1'].toLowerCase().includes('règlement') || reponses['eval3-1'].toLowerCase().includes('tenue') || reponses['eval3-1'].toLowerCase().includes('uniforme')) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Bonne identification du problème.</p>';
    } else if (reponses['eval3-1'].length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Problème identifié mais pas assez précis.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est le non-respect du règlement intérieur sur la tenue scolaire.</p>';
    }
    
    // Question 3.2
    devoirsTrouves = 0;
    for (const devoir of devoirsMentionnes) {
        if (reponses['eval3-2'].toLowerCase().includes(devoir)) {
            devoirsTrouves++;
        }
    }
    
    if (devoirsTrouves >= 2) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonne énumération des devoirs.</p>';
    } else if (devoirsTrouves >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as cité au moins un devoir, mais il en fallait deux.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Exemples de devoirs : respecter les lois/règlements, payer l\'impôt, défendre son pays.</p>';
    }
    
    // Question 3.3
    if (reponses['eval3-3'].length > 30 && (reponses['eval3-3'].toLowerCase().includes('règlement') || reponses['eval3-3'].toLowerCase().includes('devoir') || reponses['eval3-3'].toLowerCase().includes('respect'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification.</p>';
    } else if (reponses['eval3-3'].length > 15) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bon début de justification, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Justification attendue : expliquer l\'importance de respecter le règlement, aider à comprendre ses devoirs de citoyen.</p>';
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
    
    corrections += "<h5>Situation 1 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong> Le refus du droit à la scolarisation de la jeune fille.</p>";
    corrections += "<p><strong>2. Deux droits du citoyen :</strong> Le droit à la santé, le droit à la sécurité, le droit à l'éducation.</p>";
    corrections += "<p><strong>3. Justification :</strong> La jeune fille a autant le droit d'aller à l'école que les jeunes garçons. Les filles et les hommes sont égaux devant la loi. L'éducation est un droit fondamental.</p>";
    
    corrections += "<h5>Situation 2 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong> La violation de la loi (interdiction des sachets plastiques).</p>";
    corrections += "<p><strong>2. Deux devoirs du citoyen :</strong> Défendre son pays ; respecter les lois ; payer l'impôt.</p>";
    corrections += "<p><strong>3. Justification du refus :</strong> La volonté d'être un bon citoyen respectueux des lois ; la volonté d'éviter de s'exposer à des sanctions ; la participation à la protection de l'environnement.</p>";
    
    corrections += "<h5>Situation 3 :</h5>";
    corrections += "<p><strong>1. Problème posé :</strong> Le non-respect du règlement intérieur (tenue non réglementaire).</p>";
    corrections += "<p><strong>2. Deux devoirs du citoyen :</strong> Défendre son pays ; payer l'impôt ; respecter les lois et règlements.</p>";
    corrections += "<p><strong>3. Justification des conseils :</strong> Aider ta camarade à comprendre l'importance de respecter les règles ; lui expliquer que le respect des règlements fait partie des devoirs du citoyen ; l'aider à éviter des sanctions inutiles.</p>";
    
    correctionsDiv.innerHTML = corrections;
    resultsDiv.style.display = 'block';
    
    // Mettre à jour la progression
    if (percentage >= 60) {
        updateProgress();
        updateProgress();
        updateProgress(); // Triple progression pour l'évaluation
    }
}

// Menu mobile et initialisation - CORRIGÉE POUR LES ONGLETS
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM chargé, initialisation en cours...'); // Debug
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Gestion du menu hamburger
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
    
    // Gestion des onglets - CORRECTION PRINCIPALE
    const tabs = document.querySelectorAll('.tab');
    console.log('Nombre d\'onglets trouvés:', tabs.length); // Debug
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            console.log('Clic sur l\'onglet:', tabId); // Debug
            
            if (tabId) {
                switchTab(tabId);
            }
        });
    });
    
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
    
    console.log('Initialisation terminée'); // Debug
});