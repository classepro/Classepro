// =============================================
// ANIMATION DE CHARGEMENT - VERSION CORRIGÉE
// =============================================

class LoadingAnimation {
    constructor() {
        this.totalDuration = 3000; // 3 secondes
        this.intervalTime = 30; // Mise à jour toutes les 30ms
        this.progress = 0;
        this.intervalId = null;
        
        this.elements = {
            loadingProgress: document.getElementById('loading-progress'),
            percentage: document.getElementById('percentage'),
            splashScreen: document.getElementById('splash-screen'),
            pageAccueil: document.getElementById('page-accueil')
        };
        
        console.log('🔍 Éléments trouvés:', this.elements);
        this.init();
    }
    
    init() {
        console.log('🚀 Initialisation de l animation de chargement');
        
        // Vérifier que tous les éléments existent
        if (!this.validateElements()) {
            console.error('❌ Éléments manquants, affichage direct de la page principale');
            this.showMainContent();
            return;
        }
        
        console.log('✅ Tous les éléments sont présents, démarrage dans 100ms');
        
        // Démarrer l'animation après un court délai
        setTimeout(() => {
            this.startProgressAnimation();
        }, 100);
    }
    
    validateElements() {
        let allValid = true;
        
        for (const [key, element] of Object.entries(this.elements)) {
            if (!element) {
                console.error(`❌ Élément manquant: ${key}`);
                allValid = false;
            } else {
                console.log(`✅ ${key}: présent`);
            }
        }
        
        return allValid;
    }
    
    startProgressAnimation() {
        console.log('🔄 Démarrage de l animation de progression');
        
        const steps = this.totalDuration / this.intervalTime;
        const increment = 100 / steps;
        
        this.intervalId = setInterval(() => {
            this.progress += increment;
            this.progress = Math.min(this.progress, 100); // Éviter de dépasser 100%
            
            console.log(`📊 Progression: ${Math.round(this.progress)}%`);
            
            // Mettre à jour les éléments visuels
            if (this.elements.loadingProgress) {
                this.elements.loadingProgress.style.width = `${this.progress}%`;
            }
            
            if (this.elements.percentage) {
                this.elements.percentage.textContent = `${Math.round(this.progress)}%`;
            }
            
            // Vérifier si l'animation est terminée
            if (this.progress >= 100) {
                this.completeAnimation();
            }
        }, this.intervalTime);
    }
    
    completeAnimation() {
        console.log('✅ Animation terminée à 100%');
        
        // Arrêter l'intervalle
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        
        // S'assurer que la barre est à 100%
        if (this.elements.loadingProgress) {
            this.elements.loadingProgress.style.width = '100%';
        }
        if (this.elements.percentage) {
            this.elements.percentage.textContent = '100%';
        }
        
        console.log('⏳ Attente de 500ms avant transition...');
        
        // Attendre un peu puis passer à la page principale
        setTimeout(() => {
            this.showMainContent();
        }, 500);
    }
    
    showMainContent() {
        console.log('🔄 Transition vers la page principale');
        
        if (!this.elements.splashScreen || !this.elements.pageAccueil) {
            console.error('❌ Impossible de faire la transition - éléments manquants');
            return;
        }

        // Étape 1: Commencer la disparition de l'écran de démarrage
        this.elements.splashScreen.style.opacity = '0';
        this.elements.splashScreen.style.transition = 'opacity 0.5s ease';
        
        console.log('🎭 Début du fondu de sortie du splash screen');
        
        // Étape 2: Après la disparition, afficher la page principale
        setTimeout(() => {
            console.log('👋 Cache le splash screen');
            this.elements.splashScreen.style.display = 'none';
            
            // Étape 3: Afficher la page principale IMMÉDIATEMENT
            console.log('🎪 Affichage de la page principale');
            this.elements.pageAccueil.style.display = 'block';
            
            // Forcer un reflow pour s'assurer que le navigateur enregistre le display: block
            void this.elements.pageAccueil.offsetWidth;
            
            // Étape 4: Préparer l'animation d'entrée
            this.elements.pageAccueil.style.opacity = '0';
            this.elements.pageAccueil.style.transform = 'translateY(20px)';
            this.elements.pageAccueil.style.transition = 'all 0.4s ease-out';
            
            // Étape 5: Démarrer l'animation d'entrée sur le prochain frame
            requestAnimationFrame(() => {
                console.log('🎬 Démarrage de l animation d entrée');
                this.elements.pageAccueil.style.opacity = '1';
                this.elements.pageAccueil.style.transform = 'translateY(0)';
                
                console.log('✅ Page principale complètement affichée');
            });
            
        }, 500); // Correspond à la durée de la transition opacity
    }
}

// =============================================
// GESTION PWA (inchangée)
// =============================================

class PWAHandler {
    constructor() {
        this.deferredPrompt = null;
        this.installButton = document.getElementById('installButton');
        this.init();
    }
    
    init() {
        this.registerServiceWorker();
        this.setupInstallPrompt();
        this.checkIfInstalled();
    }
    
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('✅ Service Worker enregistré:', registration.scope);
                })
                .catch(error => {
                    console.log('❌ Échec Service Worker:', error);
                });
        }
    }
    
    setupInstallPrompt() {
        if (!this.installButton) return;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.installButton.style.display = 'block';
            console.log('📱 Bouton d installation affiché');
        });
        
        this.installButton.addEventListener('click', async () => {
            if (!this.deferredPrompt) return;
            
            this.deferredPrompt.prompt();
            const choiceResult = await this.deferredPrompt.userChoice;
            
            console.log(`📱 Installation: ${choiceResult.outcome}`);
            this.deferredPrompt = null;
            this.installButton.style.display = 'none';
        });
        
        window.addEventListener('appinstalled', () => {
            console.log('✅ Application installée');
            this.installButton.style.display = 'none';
            this.deferredPrompt = null;
        });
    }
    
    checkIfInstalled() {
        if (!this.installButton) return;
        
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
            console.log('📱 Application déjà installée');
            this.installButton.style.display = 'none';
        }
    }
}

// =============================================
// INTERACTIONS UTILISATEUR (inchangée)
// =============================================

class InteractionHandler {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupButtonHover();
        this.setupKeyboardNavigation();
        this.addKeyboardStyles();
    }
    
    setupButtonHover() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mouseenter', function() {
                if (!this.classList.contains('disabled')) {
                    this.style.transform = 'translateY(-3px)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    addKeyboardStyles() {
        if (!document.querySelector('#keyboard-styles')) {
            const styles = document.createElement('style');
            styles.id = 'keyboard-styles';
            styles.textContent = `
                .keyboard-navigation button:focus,
                .keyboard-navigation .btn:focus {
                    outline: 3px solid var(--accent);
                    outline-offset: 2px;
                }
            `;
            document.head.appendChild(styles);
        }
    }
}

// =============================================
// INITIALISATION PRINCIPALE
// =============================================

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('=====================================');
    console.log('🚀 ClassePro - DOM Chargé');
    console.log('=====================================');
    
    // Démarrer l'animation de chargement
    const loadingAnimation = new LoadingAnimation();
    
    // Initialiser la PWA
    const pwaHandler = new PWAHandler();
    
    // Initialiser les interactions
    const interactionHandler = new InteractionHandler();
    
    console.log('✅ Application initialisée avec succès');
    console.log('=====================================');
});

// Debug informations au chargement du script
console.log('🔍 Debug Information - Script chargé:');
console.log(' - DOM ContentLoaded attaché: ✅');
console.log(' - Service Worker supporté:', 'serviceWorker' in navigator);
console.log(' - Éléments présents au chargement:', {
    splashScreen: !!document.getElementById('splash-screen'),
    loadingProgress: !!document.getElementById('loading-progress'),
    percentage: !!document.getElementById('percentage'),
    pageAccueil: !!document.getElementById('page-accueil'),
    installButton: !!document.getElementById('installButton')
});