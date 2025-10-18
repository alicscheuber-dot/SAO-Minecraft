document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const mobCards = document.querySelectorAll('.mob-card');
    
    // Fonction de recherche
    function searchMobs() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        let foundMobs = [];
        
        mobCards.forEach(card => {
            const mobName = card.querySelector('h3').textContent.toLowerCase();
            const mobDescription = card.querySelector('p').textContent.toLowerCase();
            
            const isMatch = mobName.includes(searchTerm) || 
                          mobDescription.includes(searchTerm);
            
            if (isMatch) {
                card.classList.remove('hidden');
                visibleCount++;
                if (searchTerm) {
                    foundMobs.push(card.querySelector('h3').textContent);
                }
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Afficher les résultats de recherche
        if (searchTerm) {
            if (foundMobs.length > 0) {
                searchResults.innerHTML = `
                    <div style="font-weight: bold; margin-bottom: 0.5rem;">
                        ${foundMobs.length} mob(s) trouvé(s) :
                    </div>
                    <div>${foundMobs.join(', ')}</div>
                `;
                searchResults.classList.add('show');
            } else {
                searchResults.innerHTML = `
                    <div style="text-align: center; color: #ff6b6b;">
                        Aucun mob trouvé pour "${searchTerm}"
                    </div>
                `;
                searchResults.classList.add('show');
            }
        } else {
            searchResults.classList.remove('show');
        }
        
        // Animation des cartes visibles
        setTimeout(() => {
            mobCards.forEach((card, index) => {
                if (!card.classList.contains('hidden')) {
                    card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
                }
            });
        }, 100);
    }
    
    // Événement de recherche en temps réel
    searchInput.addEventListener('input', searchMobs);
    
    // Raccourcis clavier
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            searchMobs();
            this.blur();
        }
    });
    
    // Focus automatique sur la barre de recherche
    searchInput.focus();
    
    // Animation d'apparition des cartes
    mobCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1 + 0.6}s both`;
    });
});
