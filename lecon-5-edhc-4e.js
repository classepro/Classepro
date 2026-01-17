// JavaScript pour la leçon 5 - L'Impôt et les Responsabilités Fiscales

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
function checkDefinition() {
    const radios = document.getElementsByName('def_impot');
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
            'Tu dois sélectionner une définition avant de vérifier.',
            'Relis les trois propositions et choisis celle qui te semble correcte.'
        );
        return;
    }
    
    if (selectedValue === 'b') {
        // Bonne réponse
        showSuccessModal(
            '🎉 Excellente réponse !',
            'Tu as parfaitement compris la définition de l\'impôt.',
            'L\'impôt est bien une somme que chaque citoyen paie selon ce qu\'il gagne ou possède.'
        );
        updateProgress();
        
        // Colorer la bonne réponse
        radios.forEach(radio => {
            if (radio.value === 'b') {
                radio.parentElement.style.color = 'var(--success)';
                radio.parentElement.style.fontWeight = 'bold';
            }
        });
    } else {
        // Mauvaise réponse
        const correctAnswerText = 'b. Une somme d\'argent que le citoyen paie à l\'État selon ce qu\'il gagne ou possède';
        
        showErrorModal(
            'Presque !',
            `Ta réponse n'est pas tout à fait exacte.`,
            `L'impôt n'est pas réservé aux fonctionnaires (a), ni seulement aux riches (c).`,
            `Réponse correcte : ${correctAnswerText}`
        );
        
        // Colorer les réponses
        radios.forEach(radio => {
            if (radio.value === 'b') {
                radio.parentElement.style.color = 'var(--success)';
                radio.parentElement.style.fontWeight = 'bold';
            } else if (radio.checked) {
                radio.parentElement.style.color = 'var(--warning)';
            }
        });
    }
}

function checkStructures() {
    const checkboxes = document.querySelectorAll('input[name="structures"]:checked');
    
    if (checkboxes.length === 0) {
        showErrorModal(
            'Réponse manquante',
            'Tu dois sélectionner au moins une structure.',
            'Relis la liste et coche les structures qui collectent vraiment l\'impôt.'
        );
        return;
    }
    
    const selectedValues = Array.from(checkboxes).map(cb => parseInt(cb.value));
    const correctValues = [2, 4]; // DGD et DGI
    
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
    
    // Vérifier aussi les structures manquantes
    const missingStructures = correctValues.filter(value => !selectedValues.includes(value));
    
    if (correctCount === 2 && incorrectCount === 0) {
        showSuccessModal(
            '🌟 Parfait !',
            'Tu as identifié toutes les structures de recouvrement.',
            'Exactement ! La DGD aux frontières et la DGI à l\'intérieur.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (correctCount >= 1 && incorrectCount === 0) {
        showSuccessModal(
            '👍 Très bien !',
            `Tu as identifié ${correctCount}/2 structures correctement.`,
            missingStructures.length > 0 ? `Il te manque : ${getStructureName(missingStructures[0])}` : ''
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as ${correctCount} bonne(s) réponse(s) et ${incorrectCount} erreur(s).`,
            `Les structures de recouvrement sont : ${getStructureNames(correctValues)}`
        );
    }
}

function getStructureName(value) {
    const names = {
        1: 'Le tribunal de Première Instance',
        2: 'La Direction Générale des Douanes (DGD)',
        3: 'La Radiotélévision Ivoirienne (RTI)',
        4: 'La Direction Générale des Impôts (DGI)',
        5: 'Le Port Autonome d\'Abidjan'
    };
    return names[value] || `Structure ${value}`;
}

function getStructureNames(values) {
    return values.map(v => getStructureName(v)).join(', ');
}

function checkClassification() {
    const revenu = document.getElementById('revenu').value.toLowerCase();
    const consommation = document.getElementById('consommation').value.toLowerCase();
    const capital = document.getElementById('capital').value.toLowerCase();
    
    const revenuAttendus = ['salaires', 'revenu', 'igr', 'bénéfices'];
    const consommationAttendus = ['tva', 'consommation', 'prestations', 'services', 'essence', 'spécifique'];
    const capitalAttendus = ['foncière', 'capital', 'vignette', 'automobile', 'patente', 'commerciale'];
    
    let scoreRevenu = 0;
    let scoreConsommation = 0;
    let scoreCapital = 0;
    
    // Vérifier les impôts sur le revenu
    revenuAttendus.forEach(terme => {
        if (revenu.includes(terme)) scoreRevenu++;
    });
    
    // Vérifier les impôts sur la consommation
    consommationAttendus.forEach(terme => {
        if (consommation.includes(terme)) scoreConsommation++;
    });
    
    // Vérifier les impôts sur le capital
    capitalAttendus.forEach(terme => {
        if (capital.includes(terme)) scoreCapital++;
    });
    
    const totalScore = scoreRevenu + scoreConsommation + scoreCapital;
    const maxScore = 8; // 8 impôts à classer
    
    if (totalScore >= 7) {
        showSuccessModal(
            '🌟 Classification parfaite !',
            `Tu as bien classé ${totalScore}/${maxScore} impôts.`,
            'Tu maîtrises parfaitement la distinction entre les trois types d\'impôt.'
        );
        updateProgress();
        updateProgress(); // Double progression
    } else if (totalScore >= 5) {
        showSuccessModal(
            '👍 Bon travail !',
            `Tu as classé ${totalScore}/${maxScore} impôts correctement.`,
            'Tu progresses bien dans la compréhension des différents types d\'impôt.'
        );
        updateProgress();
    } else {
        showErrorModal(
            '📚 À revoir',
            `Tu as classé ${totalScore}/${maxScore} impôts correctement.`,
            'Consulte les corrections pour mieux comprendre la distinction entre impôt sur le revenu, sur la consommation et sur le capital.'
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
    if (eval1.length > 15 && (eval1.toLowerCase().includes('refus') || eval1.includes('payer') || eval1.includes('impôt') || eval1.includes('délit'))) {
        score += 3;
        feedback += '<p>✓ <strong>Question 1 :</strong> Excellente identification du problème.</p>';
    } else if (eval1.length > 8) {
        score += 1;
        feedback += '<p>↔ <strong>Question 1 :</strong> Bon début, précise qu\'il s\'agit d\'un refus de payer l\'impôt.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 1 :</strong> Le problème est le refus de payer l\'impôt par l\'oncle.</p>';
    }
    
    // Question 2
    const consequences = eval2.toLowerCase();
    let consequenceCount = 0;
    const expectedConsequences = ['fermeture', 'fermé', 'arrestation', 'prison', 'amende', 'sanction', 'saisie', 'contrôle', 'dgi', 'justice'];
    
    expectedConsequences.forEach(term => {
        if (consequences.includes(term)) consequenceCount++;
    });
    
    if (consequenceCount >= 3 && eval2.length > 30) {
        score += 3;
        feedback += '<p>✓ <strong>Question 2 :</strong> Bonne énumération des conséquences.</p>';
    } else if (consequenceCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 2 :</strong> Tu as identifié certaines conséquences, cherche-en d\'autres.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 2 :</strong> Pense aux conséquences légales, financières et pour son commerce.</p>';
    }
    
    // Question 3
    const reasons = eval3.toLowerCase();
    let reasonCount = 0;
    const expectedReasons = ['devoir', 'citoyen', 'responsable', 'légal', 'obligation', 'développement', 'service', 'public', 'solidarité', 'contribution'];
    
    expectedReasons.forEach(term => {
        if (reasons.includes(term)) reasonCount++;
    });
    
    if (reasonCount >= 3 && eval3.length > 40) {
        score += 3;
        feedback += '<p>✓ <strong>Question 3 :</strong> Excellentes justifications pour ton désaccord.</p>';
    } else if (reasonCount >= 1) {
        score += 1;
        feedback += '<p>↔ <strong>Question 3 :</strong> Bonnes raisons, développe-les davantage.</p>';
    } else {
        feedback += '<p>✗ <strong>Question 3 :</strong> Pense au devoir civique, à l\'importance de l\'impôt, aux conséquences.</p>';
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
    corrections += "<p>Le jeune oncle refuse de payer l'impôt sous prétexte que son commerce ne rapporte pas assez. Il considère l'impôt comme une charge facultative plutôt que comme un devoir civique. Son attitude montre une méconnaissance des obligations fiscales et de l'importance de la contribution citoyenne.</p>";
    
    corrections += "<p><strong>2. Trois conséquences possibles :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>Conséquence légale :</strong> Poursuites judiciaires, amendes, voire emprisonnement pour fraude fiscale</li>";
    corrections += "<li><strong>Conséquence financière :</strong> Fermeture administrative de son commerce, saisie de ses biens pour recouvrer la dette fiscale</li>";
    corrections += "<li><strong>Conséquence sociale :</strong> Perte de crédibilité, difficultés pour obtenir des prêts ou d'autres autorisations</li>";
    corrections += "<li><strong>Conséquence économique :</strong> Contribue au manque de ressources publiques pour les services essentiels</li>";
    corrections += "<li><strong>Conséquence éducative :</strong> Donne un mauvais exemple aux jeunes sur les responsabilités civiques</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>3. Raisons de désapprouver :</strong></p>";
    corrections += "<ul>";
    corrections += "<li><strong>Devoir civique :</strong> Payer l'impôt est une obligation légale et un devoir de tout citoyen, quelle que soit sa situation</li>";
    corrections += "<li><strong>Solidarité nationale :</strong> L'impôt permet la redistribution et finance les services dont nous bénéficions tous (écoles, routes, santé)</li>";
    corrections += "<li><strong>Responsabilité collective :</strong> Si chacun se comportait ainsi, il n'y aurait plus de services publics fonctionnels</li>";
    corrections += "<li><strong>Justice sociale :</strong> Chacun doit contribuer selon ses moyens au fonctionnement de la société</li>";
    corrections += "<li><strong>Développement national :</strong> Les impôts financent les investissements pour l'avenir du pays</li>";
    corrections += "<li><strong>Respect de la loi :</strong> Refuser de payer l'impôt est un délit puni par la loi</li>";
    corrections += "</ul>";
    
    corrections += "<p><strong>Alternative constructive :</strong> Au lieu de refuser de payer, l'oncle pourrait :</p>";
    corrections += "<ul>";
    corrections += "<li>Demander un échelonnement de paiement au service des impôts</li>";
    corrections += "<li>Chercher à optimiser son commerce pour dégager plus de bénéfices</li>";
    corrections += "<li>Se renseigner sur les exonérations ou réductions possibles</li>";
    corrections += "<li>Consulter un conseiller fiscal pour mieux gérer ses obligations</li>";
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