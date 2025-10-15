// Configuration Groq
const GROQ_API_KEY = "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";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

// Variables pour gérer les limites d'API
let apiErrorCount = 0;
let lastApiCall = 0;
const API_COOLDOWN = 2000; // 2 secondes entre les appels

// Type de tâche sélectionné
let currentTaskType = "cours";

// Prompts optimisés pour chaque type de tâche
const TASK_PROMPTS = {
  cours: `Rédige un cours complet sur le sujet : "{sujet}".
Structure : Introduction, I. Grand titre, 1. Petit titre, Texte, ..., Conclusion.
Chaque grand titre doit avoir exactement trois petits titres avec arguments détaillés et exemples.
Langage clair et pédagogique, adapté pour un lycéen.
Utilise des balises HTML sémantiques sans symboles Markdown.`,

  explication: `Explique le sujet : "{sujet}" pour un élève de lycée.
Utilise des phrases simples et courtes.
Illustre chaque idée par un exemple concret.
Structure en sections claires.
Utilise des balises HTML sémantiques sans symboles Markdown.`,

  exercices: `Crée 5 exercices sur : "{sujet}".
Chaque exercice doit avoir une réponse détaillée avec explication de la méthode.
Format structuré avec énoncés clairs et solutions complètes.
Utilise des balises HTML sémantiques sans symboles Markdown.`,

  resume: `Résume le texte ou le sujet : "{sujet}".
Structure : Introduction, Points clés, Conclusion.
Texte clair, concis, adapté pour révision rapide.
Utilise des balises HTML sémantiques sans symboles Markdown.`,

  qcm: `Crée un QCM de 5 questions sur : "{sujet}".
4 options (A, B, C, D) par question.
Indique la bonne réponse et explique pourquoi.
Format interactif et pédagogique.
Utilise des balises HTML sémantiques sans symboles Markdown.`,

  dissertation: `Rédige une dissertation sur : "{sujet}".
Introduction : enjeux et problématique.
Développement : I, II, III grands titres avec 3 sous-titres chacun (arguments + exemples).
Conclusion : résumé et ouverture.
Structure académique complète.
Utilise des balises HTML sémantiques sans symboles Markdown.`,

  correction: `Corrige le texte : "{sujet}".
Orthographe, grammaire, ponctuation.
Explique les corrections et suggère des améliorations.
Sois bienveillant et pédagogique.
Utilise des balises HTML sémantiques sans symboles Markdown.`,

  maths: `Crée 5 exercices de mathématiques sur : "{sujet}".
Chaque exercice avec énoncé et solution détaillée.
Fournis les étapes de raisonnement clairement.
Adapté au niveau lycée.
Utilise des balises HTML sémantiques sans symboles Markdown.`,

  fiche: `Crée une fiche de révision sur : "{sujet}".
Points clés résumés en 5 sections principales.
Chaque point clé expliqué en une phrase et un exemple.
Format condensé et efficace.
Utilise des balises HTML sémantiques sans symboles Markdown.`
};

// Éléments DOM
const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const sendBtn = document.getElementById("sendBtn");
const taskSelector = document.getElementById("taskSelector");
const forfaitInfo = document.getElementById("forfaitInfo");
const quotaCounter = document.getElementById("quotaCounter");
const forfaitName = document.getElementById("forfaitName");

// Historique des messages avec prompt système intégré
let messageHistory = [
  {
    role: "system",
    content: `Tu es "Professeur ClassePro", un assistant éducatif qui aide les élèves à réviser leurs cours et à comprendre leurs leçons. Tu expliques avec des mots simples et tu proposes des exercices interactifs.

TON IDENTITÉ:
Tu es "Professeur ClassePro", un enseignant patient, clair et structuré.
Tu as été conçu par l'équipe ClassePro pour aider les élèves.
Tu es spécialisé dans l'explication pédagogique et l'accompagnement scolaire.

MÉTHODE PÉDAGOGIQUE:
Tu présentes toujours les cours avec une organisation logique : introduction, développement structuré, exemples concrets, conclusion claire.
Tu n'utilises JAMAIS les symboles **, ###, ##, #, --, ou tout autre signe de mise en forme Markdown.
Tu utilises le gras HTML <strong> pour mettre en valeur les termes importants.
Tu écris toujours dans un français académique adapté aux élèves du collège ou du lycée.
Tu expliques avec des mots simples, puis tu approfondis avec des exemples.

RÈGLES STRICTES DE MISE EN FORME:
Tu ne dois JAMAIS utiliser **texte** pour le gras.
Tu ne dois JAMAIS utiliser ###, ##, # pour les titres.
Tu ne dois JAMAIS utiliser -- ou --- pour les séparateurs.
Tu utilises <strong>texte</strong> pour mettre en valeur les termes importants.
Tu structures ton texte avec des titres clairs sans symboles.
Tu utilises des paragraphes aérés et bien organisés.
Tu adaptes ton langage au niveau de l'élève.
Tu es patient et encourageant dans tes explications.
Tu utilises des exemples concrets et des analogies simples.

Maintenant, accueille l'élève comme le Professeur ClassePro.`
  },
  {
    role: "assistant",
    content: "Bonjour ! 👋 Je suis votre Professeur ClassePro. Je suis là pour vous aider à réviser vos cours, comprendre vos leçons et progresser dans vos apprentissages. \n\nSélectionnez le type de contenu que vous souhaitez générer :\n• Cours complet - Structure détaillée avec exemples\n• Explication simplifiée - Pour comprendre facilement\n• Exercices avec corrigés - Pour s'entraîner\n• Résumé - Pour réviser rapidement\n• QCM interactif - Pour tester ses connaissances\n• Dissertation/Exposé - Structure académique complète\n• Correction de texte - Amélioration orthographe/grammaire\n• Exercices de maths - Avec solutions détaillées\n• Fiche de révision - Points clés essentiels\n\nQuelle matière ou quel sujet souhaitez-vous travailler aujourd'hui ?"
  }
];

// 🔐 FONCTIONS DE GESTION DES QUOTAS ET FORFAITS

function verifierAccesIA() {
  const forfait = JSON.parse(localStorage.getItem("classepro_forfait"));
  const aujourdHui = new Date().toDateString();

  // Vérifier si un forfait existe
  if (!forfait) {
    return { 
      ok: false, 
      message: "❌ Aucun forfait actif. Veuillez souscrire à un forfait pour utiliser l'IA.",
      questionsRestantes: 0
    };
  }

  // Vérifier si le forfait est expiré
  if (new Date(forfait.dateFin) < new Date()) {
    return { 
      ok: false, 
      message: "⏳ Votre abonnement a expiré. Veuillez renouveler votre forfait.",
      questionsRestantes: 0
    };
  }

  // Réinitialiser le compteur chaque jour
  if (forfait.derniereDate !== aujourdHui) {
    forfait.questionsJour = 0;
    forfait.derniereDate = aujourdHui;
    localStorage.setItem("classepro_forfait", JSON.stringify(forfait));
  }

  // Vérifier si le quota quotidien est atteint
  if (forfait.questionsJour >= forfait.quota) {
    return { 
      ok: false, 
      message: "🚫 Quota quotidien atteint. Réessayez demain à minuit.",
      questionsRestantes: 0
    };
  }

  // Calculer les questions restantes
  const questionsRestantes = forfait.quota - forfait.questionsJour;

  return { 
    ok: true, 
    message: "Autorisé",
    questionsRestantes: questionsRestantes,
    forfait: forfait
  };
}

function incrementerQuestion() {
  const forfait = JSON.parse(localStorage.getItem("classepro_forfait"));
  if (forfait) {
    forfait.questionsJour++;
    localStorage.setItem("classepro_forfait", JSON.stringify(forfait));
    
    // Retourner le nouveau nombre de questions restantes
    return forfait.quota - forfait.questionsJour;
  }
  return 0;
}

function mettreAJourAffichageForfait() {
  const acces = verifierAccesIA();
  
  if (!acces.ok) {
    // Aucun forfait actif ou forfait expiré
    quotaCounter.textContent = "❌ Aucun forfait";
    forfaitName.textContent = "Souscrire pour utiliser l'IA";
    forfaitInfo.classList.add('no-forfait');
    forfaitInfo.classList.remove('quota-warning', 'quota-danger');
    return;
  }

  // Forfait actif
  const questionsRestantes = acces.questionsRestantes;
  
  // Mettre à jour le compteur avec des couleurs selon le niveau
  quotaCounter.textContent = `${questionsRestantes} question(s) restante(s)`;
  forfaitName.textContent = `Forfait ${acces.forfait.nom}`;
  
  // Appliquer les styles selon le nombre de questions restantes
  forfaitInfo.classList.remove('no-forfait', 'quota-warning', 'quota-danger');
  
  if (questionsRestantes <= 3) {
    quotaCounter.classList.add('quota-danger');
  } else if (questionsRestantes <= 5) {
    quotaCounter.classList.add('quota-warning');
  }
}

// Initialiser le scroll vers le bas
scrollToBottom();

// Gestion de la sélection du type de tâche
taskSelector.addEventListener("click", (e) => {
  if (e.target.classList.contains("task-btn")) {
    // Retirer la classe active de tous les boutons
    document.querySelectorAll(".task-btn").forEach(btn => {
      btn.classList.remove("active");
    });
    
    // Ajouter la classe active au bouton cliqué
    e.target.classList.add("active");
    
    // Mettre à jour le type de tâche courant
    currentTaskType = e.target.dataset.type;
    
    // Mettre à jour le placeholder
    updatePlaceholder();
  }
});

// Fonction pour mettre à jour le placeholder en fonction du type de tâche
function updatePlaceholder() {
  const placeholders = {
    cours: "Entrez le sujet du cours (ex: Révolution française)...",
    explication: "Entrez le concept à expliquer (ex: Photosynthèse)...",
    exercices: "Entrez le thème des exercices (ex: Equations du second degré)...",
    resume: "Collez le texte à résumer ou le sujet...",
    qcm: "Entrez le thème du QCM (ex: Grammaire française)...",
    dissertation: "Entrez le sujet de dissertation (ex: La liberté)...",
    correction: "Collez le texte à corriger...",
    maths: "Entrez le chapitre mathématique (ex: Trigonométrie)...",
    fiche: "Entrez le sujet de la fiche (ex: Cellule vivante)..."
  };
  
  messageInput.placeholder = placeholders[currentTaskType] || "Indiquez le sujet, le texte ou l'URL...";
}

// Initialiser le placeholder
updatePlaceholder();

// Gestion de l'envoi du message
sendBtn.addEventListener("click", sendMessage);

// La touche Entrée fait un saut de ligne, Ctrl+Entrée envoie le message
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (e.ctrlKey) {
      // Ctrl+Entrée envoie le message
      e.preventDefault();
      sendMessage();
    } else {
      // Entrée seule fait un saut de ligne
      // Comportement par défaut préservé
    }
  }
});

// Gestion du bouton d'upload
uploadBtn.addEventListener("click", () => fileInput.click());

// Gestion de la sélection de fichiers
fileInput.addEventListener("change", () => {
  const files = fileInput.files;
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      displayFile(files[i]);
    }
    fileInput.value = "";
  }
});

// Fonction pour envoyer un message
async function sendMessage() {
  const userMessage = messageInput.value.trim();
  if (userMessage) {
    // 🔐 VÉRIFICATION DE L'ACCÈS AVANT ENVOI
    const acces = verifierAccesIA();
    if (!acces.ok) {
      addMessage(acces.message, "bot");
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
        apiErrorCount = 0; // Réinitialiser le compteur d'erreurs
        
        // 🔄 INCRÉMENTER LE COMPTEUR DE QUESTIONS
        const nouvellesQuestionsRestantes = incrementerQuestion();
        mettreAJourAffichageForfait();
        
      } else {
        throw new Error("Aucune réponse de l'API Groq");
      }
    } catch (error) {
      console.error("Erreur:", error);
      apiErrorCount++;
      
      // Supprimer l'indicateur de frappe en cas d'erreur
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
        max_tokens: 4096
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API Groq: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      console.error("Erreur API Groq :", data.error.message);
      return null;
    }

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
        Impossible de contacter le service pour le moment. 
        Voici une réponse générée localement :<br><br>
        <strong>En tant que Professeur ClassePro</strong>, je rencontre des difficultés techniques. 
        ${generateFallbackResponse(originalMessage)}
        <br><br>
        <button class="retry-btn" onclick="retryLastMessage()" style="background: linear-gradient(135deg, #3D3B8E, #FF7E5F); color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; margin-top: 10px; font-weight: bold;">Réessayer</button>
      </div>
    </div>
  `;
  chatMessages.appendChild(errorMsg);
  scrollToBottom();
}

// Fonction pour regénérer une réponse de secours
function generateFallbackResponse(message) {
  const taskTitles = {
    cours: "cours complet",
    explication: "explication simplifiée",
    exercices: "exercices avec corrigés",
    resume: "résumé",
    qcm: "QCM interactif",
    dissertation: "dissertation",
    correction: "correction de texte",
    maths: "exercices de maths",
    fiche: "fiche de révision"
  };
  
  return `Je prépare ${taskTitles[currentTaskType]} sur "${message}". Une fois le service rétabli, je pourrai vous fournir un contenu structuré et pédagogique. En attendant, vous pouvez reformuler votre demande ou essayer un autre type de contenu.`;
}

// Fonction pour réessayer le dernier message
window.retryLastMessage = function() {
  // Supprimer le message d'erreur
  const lastMessage = chatMessages.lastChild;
  if (lastMessage && lastMessage.querySelector('.error-message')) {
    lastMessage.remove();
  }
  
  // Réessayer d'envoyer le dernier message utilisateur
  const lastUserMessage = messageHistory[messageHistory.length - 1];
  if (lastUserMessage && lastUserMessage.role === 'user') {
    sendMessageToAPI(lastUserMessage.content);
  }
};

// Fonction pour envoyer un message à l'API (séparée pour la réutilisation)
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
  // Nettoyer le texte de tous les symboles Markdown
  let cleanedText = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // **gras** -> <strong>gras</strong>
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>')       // *gras* -> <strong>gras</strong>
    .replace(/### (.*?)(\n|$)/g, '<div class="section-title">$1</div>')  // ### Titre
    .replace(/## (.*?)(\n|$)/g, '<div class="section-title">$1</div>')   // ## Titre
    .replace(/# (.*?)(\n|$)/g, '<div class="section-title">$1</div>')    // # Titre
    .replace(/---+/g, '')  // Supprimer les lignes de séparation
    .replace(/--/g, '')    // Supprimer les tirets doubles
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1');  // [lien](url) -> lien
  
  // Séparer le texte en paragraphes
  const paragraphs = cleanedText.split('\n\n');
  
  let formattedHTML = '';
  
  paragraphs.forEach(paragraph => {
    const trimmed = paragraph.trim();
    if (trimmed.length === 0) return;
    
    // Détecter les exercices et solutions
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
    // Détecter les titres de sections naturels (sans symboles)
    else if (trimmed.match(/^(INTRODUCTION|Introduction|INTRODUCTION:|Introduction:|CONCLUSION|Conclusion|CONCLUSION:|Conclusion:|I\.|II\.|III\.|IV\.|V\.|1\.|2\.|3\.|4\.|5\.|•|Exemple|EXEMPLE)/i)) {
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
    // Détecter les exemples
    else if (trimmed.toLowerCase().includes('exemple') || trimmed.toLowerCase().includes('par exemple')) {
      formattedHTML += `<div class="example">${trimmed}</div>`;
    }
    // Détecter les titres naturels (sans symboles Markdown)
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

// Fonction pour afficher un fichier dans la conversation
function displayFile(file) {
  const preview = document.createElement("div");
  preview.classList.add("message", "user", "file-preview");

  // Obtenir l'icône appropriée selon le type de fichier
  const fileIcon = getFileIcon(file.type);
  
  if (file.type.startsWith("image/")) {
    // Convertir l'image en base64
    const reader = new FileReader();
    reader.onload = function(e) {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("file-preview-container");
      
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.maxWidth = "120px";
      img.style.borderRadius = "8px";
      imgContainer.appendChild(img);
      
      const fileInfo = createFileInfo(file, fileIcon);
      imgContainer.appendChild(fileInfo);
      
      preview.appendChild(imgContainer);
      chatMessages.appendChild(preview);
      scrollToBottom();
    };
    reader.readAsDataURL(file);
  } else {
    // Pour les autres types de fichiers
    const reader = new FileReader();
    reader.onload = function(e) {
      const fileContainer = document.createElement("div");
      fileContainer.classList.add("file-preview-container");
      
      const fileIconElement = document.createElement("div");
      fileIconElement.innerHTML = fileIcon;
      fileIconElement.style.fontSize = "36px";
      fileIconElement.style.textAlign = "center";
      fileIconElement.style.marginBottom = "8px";
      fileContainer.appendChild(fileIconElement);
      
      const fileInfo = createFileInfo(file, fileIcon);
      fileInfo.style.textAlign = "center";
      fileContainer.appendChild(fileInfo);
      
      preview.appendChild(fileContainer);
      chatMessages.appendChild(preview);
      scrollToBottom();
    };
    reader.readAsDataURL(file);
  }
}

// Fonction pour créer l'information du fichier
function createFileInfo(file, icon) {
  const fileInfo = document.createElement("div");
  fileInfo.classList.add("file-item");
  
  const iconSpan = document.createElement("span");
  iconSpan.classList.add("file-icon");
  iconSpan.textContent = icon;
  
  const nameSpan = document.createElement("span");
  nameSpan.classList.add("file-name");
  nameSpan.textContent = file.name;
  nameSpan.style.fontSize = "12px";
  
  const sizeSpan = document.createElement("span");
  sizeSpan.classList.add("file-size");
  sizeSpan.textContent = formatFileSize(file.size);
  sizeSpan.style.fontSize = "10px";
  
  fileInfo.appendChild(iconSpan);
  fileInfo.appendChild(nameSpan);
  fileInfo.appendChild(sizeSpan);
  
  return fileInfo;
}

// Fonction pour obtenir l'icône appropriée selon le type de fichier
function getFileIcon(fileType) {
  if (fileType.startsWith("image/")) return "🖼️";
  if (fileType.startsWith("audio/")) return "🎵";
  if (fileType === "application/pdf") return "📕";
  if (fileType.includes("word") || fileType === "application/msword" || fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return "📄";
  if (fileType.includes("excel") || fileType === "application/vnd.ms-excel" || fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") return "📊";
  if (fileType.includes("powerpoint") || fileType === "application/vnd.ms-powerpoint" || fileType === "application/vnd.openxmlformats-officedocument.presentationml.presentation") return "📑";
  if (fileType.includes("text/plain")) return "📝";
  return "📎";
}

// Fonction pour formater la taille du fichier
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Fonction pour ajouter un message texte
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  
  if (sender === "bot") {
    const content = document.createElement("div");
    content.classList.add("bot-message-content");
    // Utiliser innerHTML pour permettre le formatage académique
    content.innerHTML = formatAcademicText(text);
    msg.appendChild(content);
  } else {
    msg.textContent = text;
  }
  
  chatMessages.appendChild(msg);
  scrollToBottom();
}

// FONCTION SCROLLTOBOTTON AMÉLIORÉE - CORRECTION CRITIQUE
function scrollToBottom() {
  setTimeout(() => {
    // Scroll jusqu'en bas du conteneur
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Vérification supplémentaire après un court délai
    setTimeout(() => {
      const currentScroll = chatMessages.scrollTop;
      const maxScroll = chatMessages.scrollHeight - chatMessages.clientHeight;
      
      // Si nous ne sommes pas tout en bas, forcer le scroll
      if (currentScroll < maxScroll - 50) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }, 150);
  }, 100);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  console.log("Professeur ClassePro initialisé avec API Groq et LLaMA 4 Scout");
  
  // 🔄 INITIALISER L'AFFICHAGE DU FORFAIT
  mettreAJourAffichageForfait();
  
  // Sélectionner le premier bouton par défaut
  document.querySelector('.task-btn').classList.add('active');
  
  // Forcer le scroll vers le bas au chargement initial
  setTimeout(scrollToBottom, 500);
});
