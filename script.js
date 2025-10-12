// =============================================
// GESTIONNAIRE DE MISES À JOUR
// =============================================

class UpdateManager {
    constructor() {
        this.updateButton = null;
        this.isUpdateAvailable = false;
        this.registration = null;
        this.init();
    }
    
    init() {
        this.setupServiceWorker();
        this.createUpdateButton();
    }
    
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    this.registration = registration;
                    console.log('✅ Service Worker enregistré:', registration.scope);
                    
                    // Écouter les mises à jour
                    registration.addEventListener('updatefound', () => {
                        this.handleUpdateFound(registration);
                    });
                    
                    // Vérifier s'il y a une mise à jour en attente
                    if (registration.waiting) {
                        this.showUpdateButton();
                    }
                })
                .catch(error => {
                    console.log('❌ Échec Service Worker:', error);
                });
                
            // Écouter les changements d'état du controller
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('🔄 Controller changé - rechargement de la page');
                this.showUpdateAnimation();
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            });
        }
    }
    
    handleUpdateFound(registration) {
        const newWorker = registration.installing;
        
        newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('🆕 Nouvelle version disponible!');
                this.isUpdateAvailable = true;
                this.showUpdateButton();
            }
        });
    }
    
    createUpdateButton() {
        this.updateButton = document.createElement('button');
        this.updateButton.id = 'updateButton';
        this.updateButton.innerHTML = `
            <i class="fas fa-sync-alt"></i>
            <span>Mettre à jour</span>
            <div class="update-pulse"></div>
        `;
        this.updateButton.style.display = 'none';
        
        this.updateButton.addEventListener('click', () => {
            this.applyUpdate();
        });
        
        document.body.appendChild(this.updateButton);
    }
    
    showUpdateButton() {
        if (this.updateButton) {
            console.log('🔼 Affichage du bouton de mise à jour');
            this.updateButton.style.display = 'flex';
            
            // Animation d'apparition
            setTimeout(() => {
                this.updateButton.classList.add('show');
            }, 100);
            
            // Notification discrète
            this.showUpdateNotification();
        }
    }
    
    showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <i class="fas fa-rocket"></i>
            <span>Nouvelle version disponible !</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Suppression automatique après 5 secondes
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
    
    applyUpdate() {
        if (this.registration && this.registration.waiting) {
            console.log('🚀 Application de la mise à jour...');
            
            // Envoyer un message au service worker pour skip waiting
            this.registration.waiting.postMessage({ type: 'skipWaiting' });
            
            // L'animation de mise à jour sera déclenchée par l'événement controllerchange
        }
    }
    
    showUpdateAnimation() {
        const updateOverlay = document.createElement('div');
        updateOverlay.id = 'updateOverlay';
        updateOverlay.innerHTML = `
            <div class="update-animation">
                <lottie-player
                    src="https://assets1.lottiefiles.com/packages/lf20_iv4dsx3q.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay>
                </lottie-player>
                <h3>Mise à jour en cours...</h3>
                <p>Votre application se met à jour avec les dernières améliorations</p>
            </div>
        `;
        
        document.body.appendChild(updateOverlay);
    }
}

// =============================================
// ANIMATION DE CHARGEMENT - VERSION CORRIGÉE
// =============================================

class LoadingAnimation {
    constructor() {
        this.totalDuration = 3000;
        this.intervalTime = 30;
        this.progress = 0;
        this.intervalId = null;
        
        this.elements = {
            loadingProgress: document.getElementById('loading-progress'),
            percentage: document.getElementById('percentage'),
            splashScreen: document.getElementById('splash-screen'),
            pageAccueil: document.getElementById('page-accueil')
        };
        
        this.init();
    }
    
    init() {
        if (!this.validateElements()) {
            this.showMainContent();
            return;
        }
        
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
            }
        }
        
        return allValid;
    }
    
    startProgressAnimation() {
        const steps = this.totalDuration / this.intervalTime;
        const increment = 100 / steps;
        
        this.intervalId = setInterval(() => {
            this.progress += increment;
            this.progress = Math.min(this.progress, 100);
            
            if (this.elements.loadingProgress) {
                this.elements.loadingProgress.style.width = `${this.progress}%`;
            }
            
            if (this.elements.percentage) {
                this.elements.percentage.textContent = `${Math.round(this.progress)}%`;
            }
            
            if (this.progress >= 100) {
                this.completeAnimation();
            }
        }, this.intervalTime);
    }
    
    completeAnimation() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        
        if (this.elements.loadingProgress) {
            this.elements.loadingProgress.style.width = '100%';
        }
        if (this.elements.percentage) {
            this.elements.percentage.textContent = '100%';
        }
        
        setTimeout(() => {
            this.showMainContent();
        }, 500);
    }
    
    showMainContent() {
        if (!this.elements.splashScreen || !this.elements.pageAccueil) return;

        this.elements.splashScreen.style.opacity = '0';
        this.elements.splashScreen.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            this.elements.splashScreen.style.display = 'none';
            this.elements.pageAccueil.style.display = 'block';
            
            void this.elements.pageAccueil.offsetWidth;
            
            this.elements.pageAccueil.style.opacity = '0';
            this.elements.pageAccueil.style.transform = 'translateY(20px)';
            this.elements.pageAccueil.style.transition = 'all 0.4s ease-out';
            
            requestAnimationFrame(() => {
                this.elements.pageAccueil.style.opacity = '1';
                this.elements.pageAccueil.style.transform = 'translateY(0)';
            });
        }, 500);
    }
}

// =============================================
// GESTION PWA
// =============================================

class PWAHandler {
    constructor() {
        this.deferredPrompt = null;
        this.installButton = document.getElementById('installButton');
        this.init();
    }
    
    init() {
        this.setupInstallPrompt();
        this.checkIfInstalled();
    }
    
    setupInstallPrompt() {
        if (!this.installButton) return;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });
        
        this.installButton.addEventListener('click', async () => {
            if (!this.deferredPrompt) return;
            
            this.deferredPrompt.prompt();
            const choiceResult = await this.deferredPrompt.userChoice;
            
            console.log(`📱 Installation: ${choiceResult.outcome}`);
            this.deferredPrompt = null;
            this.hideInstallButton();
        });
        
        window.addEventListener('appinstalled', () => {
            console.log('✅ Application installée');
            this.hideInstallButton();
            this.deferredPrompt = null;
        });
    }
    
    showInstallButton() {
        if (this.installButton) {
            this.installButton.style.display = 'block';
            setTimeout(() => {
                this.installButton.classList.add('show');
            }, 100);
        }
    }
    
    hideInstallButton() {
        if (this.installButton) {
            this.installButton.classList.remove('show');
            setTimeout(() => {
                this.installButton.style.display = 'none';
            }, 300);
        }
    }
    
    checkIfInstalled() {
        if (!this.installButton) return;
        
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
            console.log('📱 Application déjà installée');
            this.hideInstallButton();
        }
    }
}

// =============================================
// INTERACTIONS UTILISATEUR
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

document.addEventListener('DOMContentLoaded', function() {
    console.log('=====================================');
    console.log('🚀 ClassePro - DOM Chargé');
    console.log('=====================================');
    
    // Démarrer l'animation de chargement
    const loadingAnimation = new LoadingAnimation();
    
    // Initialiser le gestionnaire de mises à jour
    const updateManager = new UpdateManager();
    
    // Initialiser la PWA
    const pwaHandler = new PWAHandler();
    
    // Initialiser les interactions
    const interactionHandler = new InteractionHandler();
    
    console.log('✅ Application initialisée avec succès');
    console.log('=====================================');
});