document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const ressourceCards = document.querySelectorAll('.ressource-card');
    
    // Fonction de recherche
    function searchRessources() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        let foundRessources = [];
        
        ressourceCards.forEach(card => {
            const ressourceName = card.querySelector('h3').textContent.toLowerCase();
            const ressourceDescription = card.querySelector('p').textContent.toLowerCase();
            
            const isMatch = ressourceName.includes(searchTerm) || 
                          ressourceDescription.includes(searchTerm);
            
            if (isMatch) {
                card.classList.remove('hidden');
                visibleCount++;
                if (searchTerm) {
                    foundRessources.push(card.querySelector('h3').textContent);
                }
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Afficher les résultats de recherche
        if (searchTerm) {
            if (foundRessources.length > 0) {
                searchResults.innerHTML = `
                    <div style="font-weight: bold; margin-bottom: 0.5rem;">
                        ${foundRessources.length} ressource(s) trouvée(s) :
                    </div>
                    <div>${foundRessources.join(', ')}</div>
                `;
                searchResults.classList.add('show');
            } else {
                searchResults.innerHTML = `
                    <div style="text-align: center; color: #ff6b6b;">
                        Aucune ressource trouvée pour "${searchTerm}"
                    </div>
                `;
                searchResults.classList.add('show');
            }
        } else {
            searchResults.classList.remove('show');
        }
        
        // Animation des cartes visibles
        setTimeout(() => {
            ressourceCards.forEach((card, index) => {
                if (!card.classList.contains('hidden')) {
                    card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
                }
            });
        }, 100);
    }
    
    // Événement de recherche en temps réel
    searchInput.addEventListener('input', searchRessources);
    
    // Raccourcis clavier
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            searchRessources();
            this.blur();
        }
    });
    
    // Focus automatique sur la barre de recherche
    searchInput.focus();
    
    // Animation d'apparition des cartes
    ressourceCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1 + 0.6}s both`;
    });
});
