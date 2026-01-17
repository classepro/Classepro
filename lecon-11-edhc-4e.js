// JavaScript pour la leçon 11 : Comportements Responsables de l'Adolescent(e)

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

// Fonction pour vérifier la classification des manifestations
function checkClassification() {
    const physiques = document.getElementById('physiques').value.trim().toLowerCase();
    const physiologiques = document.getElementById('physiologiques').value.trim().toLowerCase();
    const psychologiques = document.getElementById('psychologiques').value.trim().toLowerCase();
    
    // Réponses attendues
    const attenduesPhysiques = ['2', '7', 'deux', 'sept', 'développement', 'hanche', 'poils'];
    const attenduesPhysio = ['3', '6', 'trois', 'six', 'pollution', 'nocturne', 'menstrues'];
    const attenduesPsycho = ['1', '4', '5', 'un', 'quatre', 'cinq', 'crise', 'identité', 'compagnie', 'autorité'];
    
    let score = 0;
    let feedback = '<p><strong>Corrections :</strong></p>';
    
    // Vérifier physiques
    let scorePhysiques = 0;
    attenduesPhysiques.forEach(terme => {
        if (physiques.includes(terme)) scorePhysiques++;
    });
    
    if (scorePhysiques >= 2) {
        score++;
        feedback += '<p>✓ <strong>Manifestations physiques</strong> : Correct ! (2. développement hanche, 7. apparition poils)</p>';
    } else {
        feedback += '<p>✗ <strong>Manifestations physiques</strong> : Réponses attendues : 2 et 7</p>';
    }
    
    // Vérifier physiologiques
    let scorePhysio = 0;
    attenduesPhysio.forEach(terme => {
        if (physiologiques.includes(terme)) scorePhysio++;
    });
    
    if (scorePhysio >= 2) {
        score++;
        feedback += '<p>✓ <strong>Manifestations physiologiques</strong> : Correct ! (3. pollution nocturne, 6. menstrues)</p>';
    } else {
        feedback += '<p>✗ <strong>Manifestations physiologiques</strong> : Réponses attendues : 3 et 6</p>';
    }
    
    // Vérifier psychologiques
    let scorePsycho = 0;
    attenduesPsycho.forEach(terme => {
        if (psychologiques.includes(terme)) scorePsycho++;
    });
    
    if (scorePsycho >= 3) {
        score++;
        feedback += '<p>✓ <strong>Manifestations psychologiques</strong> : Correct ! (1. crise identité, 4. compagnie pairs, 5. échapper autorité)</p>';
    } else {
        feedback += '<p>✗ <strong>Manifestations psychologiques</strong> : Réponses attendues : 1, 4 et 5</p>';
    }
    
    const percentage = Math.round((score / 3) * 100);
    
    if (percentage === 100) {
        showSuccessModal(
            '🎯 Classification parfaite !',
            `Tu as ${score}/3 catégories correctes.`,
            feedback
        );
        updateProgress();
        updateProgress();
    } else if (percentage >= 66) {
        showSuccessModal(
            '👍 Bon classement !',
            `Tu as ${score}/3 catégories correctes.`,
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as ${score}/3 catégories correctes.`,
            feedback
        );
    }
}

// Fonction pour vérifier les comportements responsables
function checkComportements() {
    const checkboxes = [
        document.getElementById('q2-1'), // études
        document.getElementById('q2-2'), // opposition parents
        document.getElementById('q2-3'), // partenaires multiples
        document.getElementById('q2-4'), // respect professeurs
        document.getElementById('q2-5'), // refus alcool
        document.getElementById('q2-6')  // habillement décent
    ];
    
    const correctAnswers = [true, false, false, true, true, true];
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
                feedback += `<p>${isChecked === shouldBeChecked ? '✓' : '✗'} <strong>Se consacrer aux études</strong> : ${shouldBeChecked ? 'Responsable - prépare l\'avenir' : 'Devrait être coché'}</p>`;
                break;
            case 1:
                feedback += `<p>${isChecked === shouldBeChecked ? '✓' : '✗'} <strong>S'opposer aux parents</strong> : ${!shouldBeChecked ? 'Non responsable - dialogue préférable' : 'Ne devrait pas être coché'}</p>`;
                break;
            case 2:
                feedback += `<p>${isChecked === shouldBeChecked ? '✓' : '✗'} <strong>Partenaire multiples</strong> : ${!shouldBeChecked ? 'Risque IST et souffrance' : 'Ne devrait pas être coché'}</p>`;
                break;
            case 3:
                feedback += `<p>${isChecked === shouldBeChecked ? '✓' : '✗'} <strong>Respect professeurs</strong> : ${shouldBeChecked ? 'Responsable - favorise apprentissage' : 'Devrait être coché'}</p>`;
                break;
            case 4:
                feedback += `<p>${isChecked === shouldBeChecked ? '✓' : '✗'} <strong>Refuser alcool</strong> : ${shouldBeChecked ? 'Responsable - protège la santé' : 'Devrait être coché'}</p>`;
                break;
            case 5:
                feedback += `<p>${isChecked === shouldBeChecked ? '✓' : '✗'} <strong>Habillement décent</strong> : ${shouldBeChecked ? 'Responsable - respect de soi' : 'Devrait être coché'}</p>`;
                break;
        }
    });
    
    const percentage = Math.round((score / 6) * 100);
    
    if (percentage === 100) {
        showSuccessModal(
            '🌟 Excellente compréhension !',
            `Tu as ${score}/6 réponses correctes.`,
            feedback
        );
        updateProgress();
    } else if (percentage >= 66) {
        showSuccessModal(
            '👍 Bonne compréhension !',
            `Tu as ${score}/6 réponses correctes.`,
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À travailler',
            `Tu as ${score}/6 réponses correctes.`,
            feedback
        );
    }
}

// Fonction pour vérifier les Vrai/Faux sur les risques
function checkRisques() {
    const answers = {
        'q3-1': 'vrai',
        'q3-2': 'faux',
        'q3-3': 'vrai',
        'q3-4': 'faux',
        'q3-5': 'vrai',
        'q3-6': 'vrai',
        'q3-7': 'faux'
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
    feedback += '<p>1. VRAI - Les mauvaises fréquentations sont un risque majeur à l\'adolescence</p>';
    feedback += '<p>2. FAUX - La pauvreté peut toucher à tout âge, pas spécifique à l\'adolescence</p>';
    feedback += '<p>3. VRAI - L\'expérimentation dangereuse est caractéristique de cette période</p>';
    feedback += '<p>4. FAUX - La perte de mémoire n\'est pas un risque typique de l\'adolescence</p>';
    feedback += '<p>5. VRAI - Le désintérêt pour les études est fréquent chez les adolescents</p>';
    feedback += '<p>6. VRAI - Défier l\'autorité fait partie des comportements caractéristiques</p>';
    feedback += '<p>7. FAUX - Les accidents de circulation concernent tous les âges</p>';
    
    const percentage = Math.round((score / total) * 100);
    
    if (percentage >= 85) {
        showSuccessModal(
            '🏆 Excellent !',
            `Tu as obtenu ${score}/${total} bonnes réponses (${percentage}%).`,
            feedback
        );
        updateProgress();
        updateProgress();
    } else if (percentage >= 70) {
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
    if (eval1_1.length > 20 && (eval1_1.includes('exhortation') || eval1_1.includes('comportements') || eval1_1.includes('non responsables') || eval1_1.includes('adopter'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1.1 :</strong> Bonne identification du problème.</p>';
    } else if (eval1_1.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.1 :</strong> Tu as compris, précise davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.1 :</strong> Le problème est l\'exhortation à adopter des comportements non responsables.</p>';
    }
    
    // Question 1.2
    const manifestations = ['pollution', 'nocturne', 'menstrues', 'hanche', 'bassin', 'épaules', 'autorité', 'parents', 'poils', 'croissance'];
    let manifestationCount = 0;
    manifestations.forEach(manifestation => {
        if (eval1_2.toLowerCase().includes(manifestation)) manifestationCount++;
    });
    
    if (manifestationCount >= 3) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1.2 :</strong> Excellente énumération des manifestations.</p>';
    } else if (manifestationCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.2 :</strong> Tu connais certaines manifestations, cherche les autres.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.2 :</strong> Les manifestations incluent : pollution nocturne, menstrues, développement physique...</p>';
    }
    
    // Question 1.3
    if (eval1_3.length > 50 && (eval1_3.includes('conséquences') || eval1_3.includes('santé') || eval1_3.includes('IST') || eval1_3.includes('VIH') || eval1_3.includes('futur'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1.3 :</strong> Excellente justification avec des arguments solides.</p>';
    } else if (eval1_3.length > 25) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1.3 :</strong> Bonne direction, développe davantage tes arguments.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1.3 :</strong> Pense aux conséquences sur la santé et l\'avenir.</p>';
    }
    
    // Question 2.1
    if (eval2_1.length > 20 && (eval2_1.includes('menace') || eval2_1.includes('abandon') || eval2_1.includes('relation') || eval2_1.includes('intimes') || eval2_1.includes('refus'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2.1 :</strong> Bonne identification du problème.</p>';
    } else if (eval2_1.length > 10) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.1 :</strong> Tu as compris l\'essentiel.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.1 :</strong> Le problème est la menace d\'abandon en cas de refus de relations intimes.</p>';
    }
    
    // Question 2.2
    const comportements = ['fréquentations', 'habillement', 'décent', 'alcool', 'tabac', 'respect', 'aînés', 'conseils', 'parents', 'sexuels', 'responsables'];
    let comportementCount = 0;
    comportements.forEach(comportement => {
        if (eval2_2.toLowerCase().includes(comportement)) comportementCount++;
    });
    
    if (comportementCount >= 3) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2.2 :</strong> Parfaite énumération des comportements responsables.</p>';
    } else if (comportementCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.2 :</strong> Tu connais certains comportements, cherche les autres.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.2 :</strong> Les comportements responsables incluent : bonnes fréquentations, tenue décente, abstinence...</p>';
    }
    
    // Question 2.3
    if (eval2_3.length > 50 && (eval2_3.includes('transition') || eval2_3.includes('études') || eval2_3.includes('relations') || eval2_3.includes('parents') || eval2_3.includes('intégration') || eval2_3.includes('harmonieuse'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2.3 :</strong> Excellente justification avec des arguments convaincants.</p>';
    } else if (eval2_3.length > 25) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2.3 :</strong> Bonne réflexion, développe davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2.3 :</strong> Pense aux bénéfices des comportements responsables.</p>';
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
    corrections += "<p><strong>1. Problème posé :</strong> Exhortation à l'adoption de comportements non responsables (consommation d'alcool, tabac, démonstrations publiques).</p>";
    corrections += "<p><strong>2. Manifestations de l'adolescence :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>La pollution nocturne (garçons)</li>";
    corrections += "<li>L'apparition des menstrues (filles)</li>";
    corrections += "<li>L'élargissement des épaules (garçons) et du bassin (filles)</li>";
    corrections += "<li>L'apparition des poils sur le corps</li>";
    corrections += "<li>Le refus de l'autorité des parents</li>";
    corrections += "<li>La recherche de la compagnie des pairs</li>";
    corrections += "</ul>";
    corrections += "<p><strong>3. Justification du refus :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>La consommation d'alcool et de tabac ainsi que l'attrait pour les relations publiques constituent des dangers liés aux transformations de l'adolescence</li>";
    corrections += "<li>Ces comportements ont des conséquences graves : dégradation de la santé, risques d'IST et VIH/SIDA</li>";
    corrections += "<li>Ils peuvent affecter de manière irréversible la vie future</li>";
    corrections += "<li>Nécessité de les éviter pour préserver sa santé et préparer un avenir radieux</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>Situation 2 :</strong></p>";
    corrections += "<p><strong>4. Problème posé :</strong> Menace d'abandon de la relation en cas de refus d'avoir des relations intimes.</p>";
    corrections += "<p><strong>5. Comportements responsables en adolescence :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Avoir de bonnes fréquentations</li>";
    corrections += "<li>S'habiller de manière décente</li>";
    corrections += "<li>S'abstenir de consommer alcool et tabac</li>";
    corrections += "<li>Avoir du respect pour les aînés</li>";
    corrections += "<li>Écouter les conseils des parents</li>";
    corrections += "<li>Adopter des comportements sexuels responsables (abstinence ou protection)</li>";
    corrections += "</ul>";
    corrections += "<p><strong>6. Justification du refus :</strong> En période d'adolescence, il faut adopter des comportements responsables pour :</p>";
    corrections += "<ul>";
    corrections += "<li>Vivre sainement cette période de transition</li>";
    corrections += "<li>Réussir ses études et préparer son avenir</li>";
    corrections += "<li>Avoir de bonnes relations avec ses parents et les adultes</li>";
    corrections += "<li>S'insérer de manière harmonieuse dans son milieu</li>";
    corrections += "<li>Protéger sa santé physique et mentale</li>";
    corrections += "<li>Construire une estime de soi solide</li>";
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