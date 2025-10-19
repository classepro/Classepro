// Configuration Groq pour la version gratuite
const GROQ_API_KEY = "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";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

// 🔐 LIMITATION GRATUITE - 3 QUESTIONS MAX
const QUESTIONS_GRATUITES_MAX = 3;
const STORAGE_KEY = "classepro_gratuit_usage";

// Variables pour gérer les limites d'API
let apiErrorCount = 0;
let lastApiCall = 0;
const API_COOLDOWN = 2000;

// Type de tâche sélectionné
let currentTaskType = "cours";

// Prompts optimisés pour la version gratuite (fonctionnalités réduites)
const TASK_PROMPTS = {
  cours: `Rédige un cours complet mais concis sur : "{sujet}".
Structure : Introduction, 2-3 points principaux avec exemples, Conclusion.
Langage clair et pédagogique, adapté pour un lycéen.
Utilise des balises HTML sémantiques sans symboles Markdown.`,

  explication: `Explique le sujet : "{sujet}" pour un élève de lycée.
Utilise des phrases simples et courtes.
Illustre par un exemple concret.
Structure en 2-3 sections maximum.
Utilise des balises HTML sémantiques sans symboles Markdown.`,

  exercices: `Crée 2-3 exercices sur : "{sujet}".
Chaque exercice avec réponse détaillée et explication.
Format structuré avec énoncés clairs.
Utilise des balises HTML sémantiques sans symboles Markdown.`,

  resume: `Résume le texte ou le sujet : "{sujet}".
Structure : Points clés essentiels.
Texte clair, concis, adapté pour révision rapide.
Utilise des balises HTML sémantiques sans symboles Markdown.`,

  qcm: `Crée un QCM de 3 questions sur : "{sujet}".
3 options (A, B, C) par question.
Indique la bonne réponse et explique brièvement.
Format interactif et pédagogique.
Utilise des balises HTML sémantiques sans symboles Markdown.`
};

// Éléments DOM
const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const taskSelector = document.getElementById("taskSelector");
const forfaitInfo = document.getElementById("forfaitInfo");
const quotaCounter = document.getElementById("quotaCounter");
const forfaitName = document.getElementById("forfaitName");

// Historique des messages avec prompt système adapté
let messageHistory = [
  {
    role: "system",
    content: `Tu es "Professeur ClassePro" version gratuite. Tu aides les élèves à découvrir les fonctionnalités de l'IA pédagogique.

LIMITATIONS DE LA VERSION GRATUITE:
- Tu ne peux répondre qu'à ${QUESTIONS_GRATUITES_MAX} questions maximum par utilisateur
- Tes réponses doivent être concises mais pédagogiques
- Tu proposes des contenus découverte pour donner envie de passer à la version payante

TON RÔLE:
Tu es patient, clair et encourageant.
Tu expliques que la version complète offre plus de fonctionnalités.
Tu ne frustres pas l'utilisateur mais tu valorises l'upgrade.

MÉTHODE PÉDAGOGIQUE:
Tu présentes des contenus de qualité mais concis.
Tu ne développes pas autant que dans la version payante.
Tu utilises le gras HTML <strong> pour les termes importants.
Tu structures en paragraphes clairs sans symboles Markdown.

RÈGLES DE MISE EN FORME:
Pas de **texte** pour le gras - utilise <strong>texte</strong>
Pas de ###, ##, # pour les titres
Pas de -- ou --- pour les séparateurs
Langage simple et adapté aux élèves

Sois bienveillant et professionnel.`
  }
];

// 🔐 FONCTIONS DE GESTION DU QUOTA GRATUIT

function getUsageData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Première utilisation
  const initialData = {
    questionsPosees: 0,
    datePremiereUtilisation: new Date().toISOString(),
    limiteAtteinte: false
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
}

function sauvegarderUsage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function verifierQuotaGratuit() {
  const usage = getUsageData();
  const questionsRestantes = QUESTIONS_GRATUITES_MAX - usage.questionsPosees;
  
  if (usage.limiteAtteinte || questionsRestantes <= 0) {
    return { 
      ok: false, 
      message: getMessageLimiteAtteinte(),
      questionsRestantes: 0
    };
  }

  return { 
    ok: true, 
    message: "Autorisé",
    questionsRestantes: questionsRestantes
  };
}

function incrementerQuestion() {
  const usage = getUsageData();
  usage.questionsPosees++;
  
  // Marquer comme limite atteinte si c'est la dernière question
  if (usage.questionsPosees >= QUESTIONS_GRATUITES_MAX) {
    usage.limiteAtteinte = true;
  }
  
  sauvegarderUsage(usage);
  return QUESTIONS_GRATUITES_MAX - usage.questionsPosees;
}

function getMessageLimiteAtteinte() {
  return `
<div class="limit-message">
  <strong>🚫 Limite d'essai atteinte</strong><br><br>
  Vous avez utilisé vos ${QUESTIONS_GRATUITES_MAX} questions gratuites. L'IA pédagogique ClassePro vous a convaincu ?<br><br>
  <strong>💎 Passez à la version complète pour :</strong><br>
  • Accès illimité à toutes les fonctionnalités<br>
  • Dissertations, corrections avancées, maths complètes<br>
  • Fiches de révision détaillées<br>
  • Support prioritaire<br><br>
  <button onclick="redirigerVersVersionComplete()" class="upgrade-btn">
     🚀 Découvrir les forfaits payants
  </button>
</div>`;
}

// 🔗 FONCTION POUR REDIRIGER VERS LA PAGE D'ACHAT DE FORFAIT
function redirigerVersVersionComplete() {
  window.location.href = 'classepro-ia.html';
}

function mettreAJourAffichageQuota() {
  const quota = verifierQuotaGratuit();
  
  if (!quota.ok) {
    quotaCounter.textContent = "0 question restante";
    quotaCounter.classList.add('quota-danger');
    forfaitName.textContent = "Essai terminé";
    forfaitInfo.classList.add('no-forfait');
    desactiverInterface();
    
    // Ajouter le message de limite si ce n'est pas déjà fait
    const existingLimitMessage = document.querySelector('.limit-message');
    if (!existingLimitMessage) {
      setTimeout(() => {
        addMessage(getMessageLimiteAtteinte(), "bot");
      }, 500);
    }
    return;
  }

  const questionsRestantes = quota.questionsRestantes;
  quotaCounter.textContent = `${questionsRestantes} question(s) restante(s)`;
  
  // Appliquer les styles selon le nombre de questions restantes
  quotaCounter.classList.remove('quota-warning', 'quota-danger');
  forfaitInfo.classList.remove('no-forfait');
  
  if (questionsRestantes === 1) {
    quotaCounter.classList.add('quota-danger');
  } else if (questionsRestantes <= 2) {
    quotaCounter.classList.add('quota-warning');
  }
}

function desactiverInterface() {
  messageInput.disabled = true;
  messageInput.placeholder = "Limite d'essai atteinte - Passez à la version complète";
  sendBtn.disabled = true;
  sendBtn.style.opacity = "0.5";
  
  // Désactiver les boutons de tâches
  document.querySelectorAll('.task-btn').forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = "0.5";
  });
}

// Initialiser le scroll vers le bas
scrollToBottom();

// Gestion de la sélection du type de tâche
taskSelector.addEventListener("click", (e) => {
  if (e.target.classList.contains("task-btn")) {
    // Vérifier le quota avant de changer de tâche
    const quota = verifierQuotaGratuit();
    if (!quota.ok) return;
    
    document.querySelectorAll(".task-btn").forEach(btn => {
      btn.classList.remove("active");
    });
    
    e.target.classList.add("active");
    currentTaskType = e.target.dataset.type;
    updatePlaceholder();
  }
});

// Fonction pour mettre à jour le placeholder
function updatePlaceholder() {
  const placeholders = {
    cours: "Sujet du cours (ex: Révolution française)...",
    explication: "Concept à expliquer (ex: Photosynthèse)...",
    exercices: "Thème des exercices (ex: Equations)...",
    resume: "Texte ou sujet à résumer...",
    qcm: "Thème du QCM (ex: Grammaire)..."
  };
  
  messageInput.placeholder = placeholders[currentTaskType] || "Posez votre question...";
}

// Initialiser le placeholder
updatePlaceholder();

// Gestion de l'envoi du message
sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.ctrlKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Fonction pour envoyer un message
async function sendMessage() {
  const userMessage = messageInput.value.trim();
  if (userMessage) {
    // 🔐 VÉRIFICATION DU QUOTA AVANT ENVOI
    const quota = verifierQuotaGratuit();
    if (!quota.ok) {
      addMessage(quota.message, "bot");
      return;
    }

    // Formater le message avec le prompt de la tâche sélectionnée
    const taskPrompt = TASK_PROMPTS[currentTaskType].replace("{sujet}", userMessage);
    const finalMessage = `[Tâche: ${currentTaskType}] ${taskPrompt}`;
    
    addMessage(userMessage, "user");
    messageInput.value = "";
    resetTextareaHeight();

    // Ajouter le message formaté à l'historique
    messageHistory.push({ role: "user", content: finalMessage });

    // Vérifier le cooldown de l'API
    const now = Date.now();
    if (now - lastApiCall < API_COOLDOWN) {
      const waitTime = API_COOLDOWN - (now - lastApiCall);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    // Afficher l'indicateur de frappe
    const typingIndicator = addTypingIndicator();

    try {
      // Appeler l'API Groq
      lastApiCall = Date.now();
      const response = await callGroqAPI(finalMessage);
      
      // Supprimer l'indicateur de frappe
      if (typingIndicator && typingIndicator.parentNode) {
        typingIndicator.parentNode.remove();
      }
      
      if (response) {
        // Ajouter la réponse à l'historique et l'afficher
        messageHistory.push({ role: "assistant", content: response });
        addMessage(response, "bot");
        apiErrorCount = 0;
        
        // 🔄 INCRÉMENTER LE COMPTEUR DE QUESTIONS
        const nouvellesQuestionsRestantes = incrementerQuestion();
        mettreAJourAffichageQuota();
        
        // Ajouter un message d'incitation si c'est la dernière question
        if (nouvellesQuestionsRestantes === 0) {
          setTimeout(() => {
            addMessage(getMessageLimiteAtteinte(), "bot");
          }, 1000);
        }
        
      } else {
        throw new Error("Aucune réponse de l'API Groq");
      }
    } catch (error) {
      console.error("Erreur:", error);
      apiErrorCount++;
      
      if (typingIndicator && typingIndicator.parentNode) {
        typingIndicator.parentNode.remove();
      }
      
      handleGenericError(userMessage);
    }
  }
}

// Fonction pour appeler l'API Groq
async function callGroqAPI(userPrompt) {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messageHistory,
        temperature: 0.7,
        max_tokens: 2048 // Réduit pour la version gratuite
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API Groq: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
    
  } catch (error) {
    console.error("Erreur lors de l'appel à Groq :", error);
    throw error;
  }
}

// Fonction pour gérer les erreurs génériques
function handleGenericError(originalMessage) {
  const errorMsg = document.createElement("div");
  errorMsg.classList.add("message", "bot");
  errorMsg.innerHTML = `
    <div class="bot-message-content">
      <div style="background: #ffe6e6; border: 1px solid #ffcccc; color: #cc0000; padding: 10px; border-radius: 8px; margin: 10px 0;">
        <strong>Problème de connexion</strong><br>
        Impossible de contacter le service pour le moment.<br><br>
        <button class="retry-btn" onclick="retryLastMessage()" style="background: linear-gradient(135deg, #3D3B8E, #FF7E5F); color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; margin-top: 10px; font-weight: bold;">Réessayer</button>
      </div>
    </div>
  `;
  chatMessages.appendChild(errorMsg);
  scrollToBottom();
}

// Fonction pour réessayer le dernier message
window.retryLastMessage = function() {
  const lastMessage = chatMessages.lastChild;
  if (lastMessage && lastMessage.querySelector('.error-message')) {
    lastMessage.remove();
  }
  
  const lastUserMessage = messageHistory[messageHistory.length - 1];
  if (lastUserMessage && lastUserMessage.role === 'user') {
    sendMessageToAPI(lastUserMessage.content);
  }
};

// Fonction pour envoyer un message à l'API
async function sendMessageToAPI(message) {
  const typingIndicator = addTypingIndicator();
  
  try {
    lastApiCall = Date.now();
    const response = await callGroqAPI(message);
    
    if (typingIndicator && typingIndicator.parentNode) {
      typingIndicator.parentNode.remove();
    }
    
    if (response) {
      messageHistory.push({ role: "assistant", content: response });
      addMessage(response, "bot");
      apiErrorCount = 0;
    } else {
      throw new Error("Aucune réponse de l'API Groq");
    }
  } catch (error) {
    console.error("Erreur lors de la nouvelle tentative:", error);
    if (typingIndicator && typingIndicator.parentNode) {
      typingIndicator.parentNode.remove();
    }
    handleGenericError(message);
  }
}

// Fonction pour formater le texte avec une structure académique
function formatAcademicText(text) {
  let cleanedText = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
    .replace(/### (.*?)(\n|$)/g, '<div class="section-title">$1</div>')
    .replace(/## (.*?)(\n|$)/g, '<div class="section-title">$1</div>')
    .replace(/# (.*?)(\n|$)/g, '<div class="section-title">$1</div>')
    .replace(/---+/g, '')
    .replace(/--/g, '')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1');
  
  const paragraphs = cleanedText.split('\n\n');
  let formattedHTML = '';
  
  paragraphs.forEach(paragraph => {
    const trimmed = paragraph.trim();
    if (trimmed.length === 0) return;
    
    if (trimmed.toLowerCase().includes('exercice') || trimmed.match(/exercice\s*\d+/i)) {
      formattedHTML += `<div class="exercise">${trimmed}</div>`;
    }
    else if (trimmed.toLowerCase().includes('solution') || trimmed.toLowerCase().includes('corrigé')) {
      formattedHTML += `<div class="solution">${trimmed}</div>`;
    }
    else if (trimmed.match(/^[abcd]\)/i) || trimmed.match(/^option\s*[abcd]/i)) {
      formattedHTML += `<div class="qcm-option">${trimmed}</div>`;
    }
    else if (trimmed.toLowerCase().includes('bonne réponse') || trimmed.toLowerCase().includes('correct')) {
      formattedHTML += `<div class="correct-answer">${trimmed}</div>`;
    }
    else if (trimmed.match(/^(INTRODUCTION|Introduction|CONCLUSION|Conclusion|I\.|II\.|III\.|1\.|2\.|3\.|•|Exemple)/i)) {
      if (trimmed.toLowerCase().includes('introduction')) {
        formattedHTML += `<div class="introduction">${trimmed}</div>`;
      } else if (trimmed.toLowerCase().includes('conclusion')) {
        formattedHTML += `<div class="conclusion">${trimmed}</div>`;
      } else if (trimmed.match(/^[IVX]+\./)) {
        formattedHTML += `<div class="main-point"><div class="main-point-title">${trimmed}</div></div>`;
      } else if (trimmed.match(/^[0-9]+\./)) {
        formattedHTML += `<div class="sub-point"><span class="sub-point-title">${trimmed}</span></div>`;
      } else if (trimmed.startsWith('•')) {
        formattedHTML += `<div class="sub-point">${trimmed}</div>`;
      } else if (trimmed.toLowerCase().includes('exemple')) {
        formattedHTML += `<div class="example">${trimmed}</div>`;
      } else {
        formattedHTML += `<p>${trimmed}</p>`;
      }
    } 
    else if (trimmed.toLowerCase().includes('exemple') || trimmed.toLowerCase().includes('par exemple')) {
      formattedHTML += `<div class="example">${trimmed}</div>`;
    }
    else if (trimmed.endsWith(':') && trimmed.length < 50 && !trimmed.includes(' ')) {
      formattedHTML += `<div class="section-title">${trimmed}</div>`;
    }
    else {
      formattedHTML += `<p>${trimmed}</p>`;
    }
  });
  
  return formattedHTML;
}

// Fonction pour ajouter un indicateur de frappe
function addTypingIndicator() {
  const msg = document.createElement("div");
  msg.classList.add("message", "bot");
  
  const content = document.createElement("div");
  content.classList.add("bot-message-content");
  
  const typingIndicator = document.createElement("span");
  typingIndicator.classList.add("typing-indicator");
  typingIndicator.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
  
  content.appendChild(typingIndicator);
  msg.appendChild(content);
  chatMessages.appendChild(msg);
  scrollToBottom();
  
  return typingIndicator;
}

// Fonction pour ajuster automatiquement la hauteur du textarea
messageInput.addEventListener("input", function() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
});

// Fonction pour réinitialiser la hauteur du textarea
function resetTextareaHeight() {
  messageInput.style.height = "auto";
}

// Fonction pour ajouter un message texte
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  
  if (sender === "bot") {
    const content = document.createElement("div");
    content.classList.add("bot-message-content");
    content.innerHTML = formatAcademicText(text);
    msg.appendChild(content);
  } else {
    msg.textContent = text;
  }
  
  chatMessages.appendChild(msg);
  scrollToBottom();
}

// Fonction pour scroller vers le bas
function scrollToBottom() {
  setTimeout(() => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
    setTimeout(() => {
      const currentScroll = chatMessages.scrollTop;
      const maxScroll = chatMessages.scrollHeight - chatMessages.clientHeight;
      if (currentScroll < maxScroll - 50) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }, 150);
  }, 100);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  console.log("ClassePro IA Gratuite initialisée - 3 questions max");
  
  // Initialiser l'affichage du quota
  mettreAJourAffichageQuota();
  
  // Sélectionner le premier bouton par défaut
  document.querySelector('.task-btn').classList.add('active');
  
  // Forcer le scroll vers le bas au chargement initial
  setTimeout(scrollToBottom, 500);
});
