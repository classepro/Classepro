// JavaScript pour la leçon 6 - La Société Civile et le Bien-Être des Populations

// Variables pour suivre la progression
let progress = 0;
const totalExercises = 12;

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
function checkOrganisations() {
    const checkboxes = document.querySelectorAll('input[name="organisations"]:checked');
    
    if (checkboxes.length === 0) {
        showErrorModal(
            'Réponse manquante',
            'Tu dois sélectionner au moins une organisation.',
            'Relis la liste et coche celles qui font partie de la société civile.'
        );
        return;
    }
    
    const selectedValues = Array.from(checkboxes).map(cb => cb.value);
    const correctValues = ['a', 'b', 'c']; // Organisations confessionnelles, syndicales, chambre des rois
    
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
    
    // Vérifier aussi les organisations manquantes
    const missingOrgs = correctValues.filter(value => !selectedValues.includes(value));
    
    if (correctCount === 3 && incorrectCount === 0) {
        showSuccessModal(
            '🎉 Parfait !',
            'Tu as identifié toutes les organisations de la société civile.',
            'Excellente compréhension de ce qu\'est la société civile !'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (correctCount >= 2 && incorrectCount === 0) {
        showSuccessModal(
            '👍 Très bien !',
            `Tu as identifié ${correctCount}/3 organisations correctement.`,
            missingOrgs.length > 0 ? `Il te manque : ${getOrganisationNames(missingOrgs)}` : ''
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as ${correctCount} bonne(s) réponse(s) et ${incorrectCount} erreur(s).`,
            `Les organisations de la société civile sont : ${getOrganisationNames(correctValues)}. L'ONU est une organisation internationale, pas une organisation de la société civile.`
        );
    }
}

function getOrganisationNames(values) {
    const names = {
        'a': 'Les organisations confessionnelles',
        'b': 'Les organisations syndicales',
        'c': 'La chambre des rois et chefs traditionnels',
        'd': 'L\'Organisation des Nations Unies'
    };
    
    return values.map(v => names[v]).join(', ');
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
    const correctValues = [1, 3, 5, 6]; // Comportements responsables
    
    let score = 0;
    let feedback = '<p><strong>Analyse :</strong></p>';
    
    // Vérifier chaque comportement
    [1, 2, 3, 4, 5, 6].forEach(value => {
        const isSelected = selectedValues.includes(value);
        const isCorrect = correctValues.includes(value);
        
        if (isSelected && isCorrect) {
            score++;
            feedback += `<p>✓ <strong>${getComportementName(value)}</strong> : Bon choix ! C'est un comportement responsable.</p>`;
        } else if (isSelected && !isCorrect) {
            feedback += `<p>✗ <strong>${getComportementName(value)}</strong> : Ce n'est pas un comportement responsable.</p>`;
        } else if (!isSelected && isCorrect) {
            feedback += `<p>❓ <strong>${getComportementName(value)}</strong> : Tu as oublié ce comportement responsable.</p>`;
        }
    });
    
    if (score === 4 && selectedValues.length === 4) {
        showSuccessModal(
            '💡 Parfaitement compris !',
            'Tu as identifié tous les comportements responsables.',
            feedback
        );
        updateProgress();
        updateProgress();
    } else if (score >= 3) {
        showSuccessModal(
            '👍 Bien compris !',
            `Tu as ${score}/4 comportements corrects.`,
            feedback
        );
        updateProgress();
    } else {
        showErrorModal(
            '🧠 À revoir',
            'Relis bien la leçon sur les comportements responsables face à la société civile.',
            feedback
        );
    }
}

function getComportementName(value) {
    const names = {
        1: 'Respect de la liberté d\'association',
        2: 'S\'ingérer dans le fonctionnement des organisations',
        3: 'Respecter la libre expression',
        4: 'S\'opposer aux actions d\'assistance aux populations',
        5: 'Soutenir les initiatives utiles à la communauté',
        6: 'Participer aux activités bénévoles'
    };
    return names[value] || `Comportement ${value}`;
}

function checkVraiFaux(questionName, correctAnswer) {
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
            'Félicitations, tu as bien compris cette affirmation.',
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
            `Réfléchis bien à l'affirmation. La société civile a-t-elle ce rôle en démocratie ?`,
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

function checkClassification() {
    const principes = document.getElementById('principes').value.toLowerCase();
    const regles = document.getElementById('regles').value.toLowerCase();
    
    const principesAttendus = ['bénévoles', 'apolitiques'];
    const reglesAttendus = ['disponibles', 'service public', 'disponibilité'];
    
    let scorePrincipes = 0;
    let scoreRegles = 0;
    
    // Vérifier les principes
    principesAttendus.forEach(terme => {
        if (principes.includes(terme)) scorePrincipes++;
    });
    
    // Vérifier les règles
    reglesAttendus.forEach(terme => {
        if (regles.includes(terme)) scoreRegles++;
    });
    
    const totalScore = scorePrincipes + scoreRegles;
    const maxScore = 4; // 4 éléments à classer
    
    if (totalScore >= 3) {
        showSuccessModal(
            '🌟 Classification correcte !',
            `Tu as bien classé ${totalScore}/${maxScore} éléments.`,
            'Tu as compris la différence entre principes (ce que la société civile EST) et règles (ce que les membres DOIVENT FAIRE).'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as classé ${totalScore}/${maxScore} éléments correctement.`,
            'Rappel : Les principes sont "Bénévoles" et "Apolitiques". Les règles sont "Être disponibles" et "Avoir le sens du service public".'
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
    // Récupérer les réponses des deux situations
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
            'Tu dois répondre à toutes les questions des deux situations avant de soumettre.',
            'Prends le temps de développer tes réponses pour chaque situation.'
        );
        return;
    }
    
    const resultsDiv = document.getElementById('evalResults');
    const scoreDisplay = document.getElementById('evalScore');
    const correctionsDiv = document.getElementById('evalCorrections');
    
    let score = 0;
    let maxScore = 18; // 6 questions × 3 points chacune
    let feedback = '<h4>Analyse de tes réponses :</h4>';
    
    // Évaluation Situation 1
    feedback += '<h5>Situation 1 : Marche contre la cherté de la vie</h5>';
    
    // Question 1.1
    if (eval1_1.length > 15 && (eval1_1.toLowerCase().includes('empêch') || eval1_1.includes('barricade') || eval1_1.includes('oppos') || eval1_1.includes('manif') || eval1_1.includes('droit'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Excellente identification du problème.</p>';
    } else if (eval1_1.length > 8) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Bon début, précise qu\'il s\'agit d\'empêcher une manifestation légitime.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est l\'empêchement d\'une marche pacifique de la société civile.</p>';
    }
    
    // Question 1.2
    const comp1_2 = eval1_2.toLowerCase();
    let compCount1_2 = 0;
    const expectedComposantes = ['ong', 'syndicat', 'religieuse', 'mutuelle', 'professionnelle', 'confessionnelle', 'association'];
    
    expectedComposantes.forEach(term => {
        if (comp1_2.includes(term)) compCount1_2++;
    });
    
    if (compCount1_2 >= 3) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonne énumération des composantes.</p>';
    } else if (compCount1_2 >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as cité certaines composantes, cherche à en mentionner trois différentes.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense aux ONG, syndicats, associations religieuses, mutuelles, associations professionnelles.</p>';
    }
    
    // Question 1.3
    const justif1_3 = eval1_3.toLowerCase();
    let justifCount1_3 = 0;
    const expectedJustifications = ['droit', 'liberté', 'expression', 'manifestation', 'pacifique', 'démocratie', 'rôle', 'important', 'population', 'opinion', 'intérêt', 'état', 'reconnaît'];
    
    expectedJustifications.forEach(term => {
        if (justif1_3.includes(term)) justifCount1_3++;
    });
    
    if (justifCount1_3 >= 3 && eval1_3.length > 40) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification de ton refus.</p>';
    } else if (justifCount1_3 >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bonnes raisons, développe-les davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense au droit de manifester, au rôle de la société civile, à la démocratie.</p>';
    }
    
    // Évaluation Situation 2
    feedback += '<h5>Situation 2 : Travaux d\'électrification</h5>';
    
    // Question 2.1
    if (eval2_1.length > 15 && (eval2_1.toLowerCase().includes('entrav') || eval2_1.includes('empêch') || eval2_1.includes('travaux') || eval2_1.includes('électrification') || eval2_1.includes('oppos') || eval2_1.includes('projet'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Excellente identification du problème.</p>';
    } else if (eval2_1.length > 8) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Bon début, précise qu\'il s\'agit d\'entraver un projet d\'électrification.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est l\'entrave aux travaux d\'électrification de la commune.</p>';
    }
    
    // Question 2.2
    const comp2_2 = eval2_2.toLowerCase();
    let compCount2_2 = 0;
    const expectedComportements = ['respect', 'tolérance', 'honnêteté', 'solidarité', 'dialogue', 'écoute', 'compréhension', 'coopération'];
    
    expectedComportements.forEach(term => {
        if (comp2_2.includes(term)) compCount2_2++;
    });
    
    if (compCount2_2 >= 3) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonne énumération des comportements responsables.</p>';
    } else if (compCount2_2 >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as cité certains comportements, cherche à en mentionner trois différents.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense au respect, à la tolérance, à l\'honnêteté, à la solidarité.</p>';
    }
    
    // Question 2.3
    const justif2_3 = eval2_3.toLowerCase();
    let justifCount2_3 = 0;
    const expectedJustifications2 = ['développement', 'communauté', 'bien-être', 'progrès', 'modernisation', 'dialogue', 'solution', 'alternative', 'négociation', 'paix', 'cohésion', 'harmonie', 'épanouissement'];
    
    expectedJustifications2.forEach(term => {
        if (justif2_3.includes(term)) justifCount2_3++;
    });
    
    if (justifCount2_3 >= 3 && eval2_3.length > 40) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellente justification de ton refus.</p>';
    } else if (justifCount2_3 >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bonnes raisons, développe-les davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense au développement de la commune, au dialogue, aux solutions alternatives.</p>';
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
    
    corrections += "<h5>Situation 1 : Marche contre la cherté de la vie</h5>";
    
    corrections += "<p><strong>1. Problème identifié :</strong></p>";
    corrections += "<p>Des jeunes empêchent une organisation de la société civile d'exercer son droit de manifester pacifiquement. Ils dressent des barricades pour s'opposer à une marche légitime organisée pour dénoncer la cherté de la vie, ce qui constitue une entrave à la liberté d'expression et de manifestation.</p>";
    
    corrections += "<p><strong>2. Trois composantes de la société civile :</strong></p>";
    corrections += "<ul>";
    corrections += "<li>Les ONG (Organisations Non Gouvernementales)</li>";
    corrections += "<li>Les syndicats (organisations de défense des travailleurs)</li>";
    corrections += "<li>Les associations religieuses (organisations confessionnelles)</li>";
    corrections += "<li>Les mutuelles de développement (groupes d'entraide)</li>";
    corrections += "<li>Les associations professionnelles (regroupements par métier)</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Justification du refus :</strong></p>";
    corrections += "<p>Je refuse de participer à ce projet parce que :</p>";
    corrections += "<ul>";
    corrections += "<li>La société civile a le droit de manifester pacifiquement (liberté d'expression garantie par la Constitution)</li>";
    corrections += "<li>Son rôle est important en démocratie : elle permet à la population de faire connaître son opinion</li>";
    corrections += "<li>S'opposer par la violence ou l'intimidation à une manifestation légitime est illégal et contraire aux valeurs démocratiques</li>";
    corrections += "<li>Si on n'est pas d'accord avec la manifestation, on peut exprimer son désaccord par le dialogue, pas par la force</li>";
    corrections += "<li>La société civile contribue à la défense des intérêts de la population, y compris contre la cherté de la vie</li>";
    corrections += "</ul>";
    
    corrections += "<h5>Situation 2 : Travaux d'électrification</h5>";
    
    corrections += "<p><strong>1. Problème identifié :</strong></p>";
    corrections += "<p>Des personnes veulent empêcher les travaux d'électrification de la commune menés par une ONG, au prétexte que cela pourrait nuire aux activités traditionnelles de fumage du poisson. Il s'agit d'une opposition à un projet de développement communautaire.</p>";
    
    corrections += "<p><strong>2. Trois comportements responsables :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>Respect</strong> : Respecter le droit de l'ONG de mener des actions de développement</li>";
    corrections += "<li><strong>Tolérance</strong> : Accepter que le progrès et la modernisation puissent modifier certaines pratiques traditionnelles</li>";
    corrections += "<li><strong>Honnêteté</strong> : Reconnaître que l'électrification bénéficiera à toute la communauté, pas seulement à quelques-uns</li>";
    corrections += "<li><strong>Solidarité</strong> : S'unir pour trouver des solutions qui concilient développement et préservation des activités traditionnelles</li>";
    corrections += "<li><strong>Dialogue</strong> : Discuter avec l'ONG pour trouver des solutions alternatives plutôt que de tout bloquer</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Justification du refus :</strong></p>";
    corrections += "<p>Je refuse de participer à ce projet parce que :</p>";
    corrections += "<ul>";
    corrections += "<li>L'électrification est un progrès important pour le développement de la commune</li>";
    corrections += "<li>Plutôt que de bloquer les travaux, il faut dialoguer avec l'ONG pour trouver des solutions (par exemple, aider les fumoirs à s'adapter)</li>";
    corrections += "<li>Le bien-être de toute la communauté prime sur les intérêts particuliers de quelques-uns</li>";
    corrections += "<li>L'adoption de comportements responsables (dialogue, recherche de compromis) favorise la paix sociale et le développement</li>";
    corrections += "<li>La société civile œuvre pour le bien-être des populations, il faut soutenir ses actions positives</li>";
    corrections += "<li>Bloquer un projet d'électrification priverait la commune d'un progrès essentiel pour son développement</li>";
    corrections += "</ul>";
    
    corrections += "<div class='tip-box'>";
    corrections += "<p><strong>Conclusion :</strong> Dans les deux situations, adopter des comportements responsables (respect, dialogue, recherche de solutions) est préférable à l'affrontement. La société civile joue un rôle essentiel en démocratie et mérite le respect, même quand on n'est pas d'accord avec certaines de ses actions.</p>";
    corrections += "</div>";
    
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