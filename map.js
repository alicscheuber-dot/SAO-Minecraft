class MapRenderer {
    constructor() {
        this.canvas = document.getElementById('mapCanvas');
        this.tiles = new Map();
        this.zoom = 1;
        this.panX = 0;
        this.panY = 0;
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.isDayMode = true;
        
        // Coordonnées de la carte (basées sur l'analyse des fichiers)
        // Commençons par une zone plus petite pour tester
        this.minX = -2;
        this.maxX = 5;
        this.minY = -2;
        this.maxY = 5;
        this.tileSize = 256; // Taille d'une tuile en pixels
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadMapTiles();
        this.updateMapDisplay();
    }
    
    setupEventListeners() {
        // Contrôles de zoom
        document.getElementById('zoomIn').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoomOut').addEventListener('click', () => this.zoomOut());
        document.getElementById('resetView').addEventListener('click', () => this.resetView());
        document.getElementById('toggleDayNight').addEventListener('click', () => this.toggleDayNight());
        document.getElementById('loadFullMap').addEventListener('click', () => this.loadFullMap());
        
        // Navigation avec la souris
        this.canvas.addEventListener('mousedown', (e) => this.startDrag(e));
        this.canvas.addEventListener('mousemove', (e) => this.drag(e));
        this.canvas.addEventListener('mouseup', () => this.endDrag());
        this.canvas.addEventListener('mouseleave', () => this.endDrag());
        
        // Zoom avec la molette
        this.canvas.addEventListener('wheel', (e) => this.handleWheel(e));
        
        // Empêcher le comportement par défaut
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    loadMapTiles() {
        const basePath = './journeymap/data/mp/Triggers/overworld';
        const mode = this.isDayMode ? 'day' : 'night';
        
        console.log('Chargement des tuiles de carte...');
        console.log('Mode:', mode);
        console.log('Chemin de base:', basePath);
        
        let loadedCount = 0;
        let totalTiles = 0;
        
        for (let x = this.minX; x <= this.maxX; x++) {
            for (let y = this.minY; y <= this.maxY; y++) {
                const tileKey = `${x},${y}`;
                const tilePath = `${basePath}/${mode}/${x},${y}.png`;
                totalTiles++;
                
                // Créer l'élément image
                const img = new Image();
                img.onload = () => {
                    this.tiles.set(tileKey, img);
                    loadedCount++;
                    console.log(`Tuile chargée: ${tileKey} (${loadedCount}/${totalTiles})`);
                    this.updateMapDisplay();
                };
                img.onerror = (e) => {
                    console.log(`Erreur chargement ${tileKey}:`, tilePath);
                    // Si l'image n'existe pas, essayer le mode jour par défaut
                    if (mode === 'night') {
                        const dayImg = new Image();
                        dayImg.onload = () => {
                            this.tiles.set(tileKey, dayImg);
                            loadedCount++;
                            console.log(`Tuile jour chargée: ${tileKey} (${loadedCount}/${totalTiles})`);
                            this.updateMapDisplay();
                        };
                        dayImg.onerror = () => {
                            console.log(`Aucune tuile trouvée pour ${tileKey}`);
                        };
                        dayImg.src = `${basePath}/day/${x},${y}.png`;
                    } else {
                        loadedCount++;
                    }
                };
                img.src = tilePath;
            }
        }
        
        console.log(`Total des tuiles à charger: ${totalTiles}`);
    }
    
    updateMapDisplay() {
        this.canvas.innerHTML = '';
        
        if (this.tiles.size === 0) {
            // Afficher un indicateur de chargement
            const loadingDiv = document.createElement('div');
            loadingDiv.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #FCE5C3;
                font-size: 1.5rem;
                text-align: center;
                z-index: 100;
            `;
            loadingDiv.innerHTML = `
                <div style="margin-bottom: 1rem;">🗺️</div>
                <div>Chargement de la carte...</div>
                <div style="font-size: 0.8rem; margin-top: 0.5rem;">${this.tiles.size} tuiles chargées</div>
            `;
            this.canvas.appendChild(loadingDiv);
            return;
        }
        
        const canvasRect = this.canvas.getBoundingClientRect();
        const centerX = canvasRect.width / 2;
        const centerY = canvasRect.height / 2;
        
        console.log(`Affichage de ${this.tiles.size} tuiles`);
        
        this.tiles.forEach((img, tileKey) => {
            const [x, y] = tileKey.split(',').map(Number);
            
            const tileElement = document.createElement('div');
            tileElement.className = 'map-tile';
            tileElement.style.width = `${this.tileSize * this.zoom}px`;
            tileElement.style.height = `${this.tileSize * this.zoom}px`;
            tileElement.style.left = `${centerX + (x * this.tileSize * this.zoom) + this.panX}px`;
            tileElement.style.top = `${centerY + (y * this.tileSize * this.zoom) + this.panY}px`;
            tileElement.style.backgroundImage = `url(${img.src})`;
            tileElement.style.backgroundSize = 'cover';
            tileElement.style.backgroundPosition = 'center';
            tileElement.title = `Zone (${x}, ${y})`;
            
            this.canvas.appendChild(tileElement);
        });
    }
    
    zoomIn() {
        this.zoom = Math.min(this.zoom * 1.2, 3);
        this.updateMapDisplay();
    }
    
    zoomOut() {
        this.zoom = Math.max(this.zoom / 1.2, 0.1);
        this.updateMapDisplay();
    }
    
    resetView() {
        this.zoom = 1;
        this.panX = 0;
        this.panY = 0;
        this.updateMapDisplay();
    }
    
    toggleDayNight() {
        this.isDayMode = !this.isDayMode;
        this.tiles.clear();
        this.loadMapTiles();
        
        const btn = document.getElementById('toggleDayNight');
        btn.textContent = this.isDayMode ? '🌙' : '☀️';
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        const deltaX = e.clientX - this.lastMouseX;
        const deltaY = e.clientY - this.lastMouseY;
        
        this.panX += deltaX;
        this.panY += deltaY;
        
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
        
        this.updateMapDisplay();
    }
    
    endDrag() {
        this.isDragging = false;
    }
    
    handleWheel(e) {
        e.preventDefault();
        
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        this.zoom = Math.max(0.1, Math.min(3, this.zoom * delta));
        this.updateMapDisplay();
    }
    
    loadFullMap() {
        console.log('Chargement de la carte complète...');
        this.minX = -2;
        this.maxX = 23;
        this.minY = -2;
        this.maxY = 14;
        this.tiles.clear();
        this.loadMapTiles();
    }
}

// Initialiser la carte quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    new MapRenderer();
});
