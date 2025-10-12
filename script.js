// =============================================
// GESTIONNAIRE DE MISES À JOUR
// =============================================

class UpdateHandler {
    constructor() {
        this.updateButton = null;
        this.updateOverlay = null;
        this.isUpdating = false;
        this.init();
    }
    
    init() {
        this.createUpdateButton();
        this.setupServiceWorkerUpdates();
        console.log('🔄 Gestionnaire de mises à jour initialisé');
    }
    
    createUpdateButton() {
        // Créer le bouton de mise à jour (caché par défaut)
        this.updateButton = document.createElement('button');
        this.updateButton.className = 'update-btn update-pulse';
        this.updateButton.innerHTML = `
            <i class="fas fa-sync-alt"></i>
            Mettre à jour
        `;
        this.updateButton.style.display = 'none';
        
        const notificationDiv = document.createElement('div');
        notificationDiv.className = 'update-notification';
        notificationDiv.appendChild(this.updateButton);
        document.body.appendChild(notificationDiv);
        
        // Créer l'overlay de mise à jour
        this.updateOverlay = document.createElement('div');
        this.updateOverlay.className = 'update-overlay';
        this.updateOverlay.innerHTML = `
            <div class="update-animation-container">
                <lottie-player 
                    src="https://assets2.lottiefiles.com/packages/lf20_ykuxwdql.json" 
                    background="transparent" 
                    speed="1" 
                    loop 
                    autoplay>
                </lottie-player>
            </div>
            <div class="update-text">Mise à jour en cours...</div>
            <div class="update-subtext">L'application se rafraîchit avec les dernières améliorations</div>
        `;
        document.body.appendChild(this.updateOverlay);
        
        // Événement de clic sur le bouton de mise à jour
        this.updateButton.addEventListener('click', () => {
            this.triggerUpdate();
        });
    }
    
    setupServiceWorkerUpdates() {
        if (!navigator.serviceWorker) return;
        
        // Écouter les messages du Service Worker
        navigator.serviceWorker.addEventListener('message', event => {
            if (event.data && event.data.type === 'NEW_VERSION_AVAILABLE') {
                console.log('🆕 Nouvelle version détectée:', event.data.version);
                this.showUpdateButton();
            }
        });
        
        // Surveiller les mises à jour du Service Worker
        navigator.serviceWorker.ready.then(registration => {
            registration.addEventListener('updatefound', () => {
                console.log('🔍 Mise à jour du Service Worker détectée');
                const newWorker = registration.installing;
                
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log('🆕 Nouvelle version prête');
                        this.showUpdateButton();
                    }
                });
            });
        });
        
        // Vérifier les mises à jour périodiquement
        setInterval(() => {
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({type: 'CHECK_UPDATE'});
            }
        }, 60 * 60 * 1000); // Toutes les heures
    }
    
    showUpdateButton() {
        if (this.updateButton && !this.isUpdating) {
            console.log('🔄 Affichage du bouton de mise à jour');
            this.updateButton.style.display = 'flex';
            
            // Animation d'entrée
            this.updateButton.style.animation = 'slideInUp 0.5s ease-out';
            
            // Notification toast optionnelle
            this.showUpdateNotification();
        }
    }
    
    showUpdateNotification() {
        // Créer une notification toast
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 12px 20px;
            border-radius: var(--radius);
            box-shadow: var(--shadow-hover);
            z-index: 10001;
            animation: slideInUp 0.5s ease-out;
            max-width: 300px;
            font-size: 14px;
        `;
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-rocket" style="font-size: 16px;"></i>
                <span>Nouvelle version disponible !</span>
            </div>
        `;
        document.body.appendChild(toast);
        
        // Supprimer après 5 secondes
        setTimeout(() => {
            toast.style.animation = 'slideInUp 0.5s ease-out reverse';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 500);
        }, 5000);
    }
    
    triggerUpdate() {
        if (this.isUpdating) return;
        
        console.log('🔄 Démarrage de la mise à jour');
        this.isUpdating = true;
        
        // Afficher l'overlay de mise à jour
        this.updateOverlay.classList.add('active');
        this.updateButton.classList.add('updating');
        this.updateButton.innerHTML = '<i class="fas fa-sync-alt"></i> Mise à jour...';
        
        // Demander au Service Worker de sauter l'attente
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({type: 'SKIP_WAITING'});
        }
        
        // Recharger après un court délai pour permettre l'animation
        setTimeout(() => {
            console.log('🔄 Rechargement de l\'application');
            window.location.reload();
        }, 2000);
    }
}