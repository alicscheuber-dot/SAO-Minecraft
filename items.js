document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const itemCards = document.querySelectorAll('.item-card');
    
    // Fonction de recherche
    function searchItems() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        let foundItems = [];
        
        itemCards.forEach(card => {
            const itemName = card.querySelector('h3').textContent.toLowerCase();
            const itemDescription = card.querySelector('p').textContent.toLowerCase();
            
            const isMatch = itemName.includes(searchTerm) || 
                          itemDescription.includes(searchTerm);
            
            if (isMatch) {
                card.classList.remove('hidden');
                visibleCount++;
                if (searchTerm) {
                    foundItems.push(card.querySelector('h3').textContent);
                }
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Afficher les résultats de recherche
        if (searchTerm) {
            if (foundItems.length > 0) {
                searchResults.innerHTML = `
                    <div style="font-weight: bold; margin-bottom: 0.5rem;">
                        ${foundItems.length} item(s) trouvé(s) :
                    </div>
                    <div>${foundItems.join(', ')}</div>
                `;
                searchResults.classList.add('show');
            } else {
                searchResults.innerHTML = `
                    <div style="text-align: center; color: #ff6b6b;">
                        Aucun item trouvé pour "${searchTerm}"
                    </div>
                `;
                searchResults.classList.add('show');
            }
        } else {
            searchResults.classList.remove('show');
        }
        
        // Animation des cartes visibles
        setTimeout(() => {
            itemCards.forEach((card, index) => {
                if (!card.classList.contains('hidden')) {
                    card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
                }
            });
        }, 100);
    }
    
    // Événement de recherche en temps réel
    searchInput.addEventListener('input', searchItems);
    
    // Raccourcis clavier
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            searchItems();
            this.blur();
        }
    });
    
    // Focus automatique sur la barre de recherche
    searchInput.focus();
    
    // Animation d'apparition des cartes
    itemCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1 + 0.7}s both`;
    });
});
