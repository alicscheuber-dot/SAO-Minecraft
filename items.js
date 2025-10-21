document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const itemTags = document.querySelectorAll('.item-tag');
    
    // Fonction de recherche
    function searchItems() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        let foundItems = [];
        
        itemTags.forEach(tag => {
            const itemName = tag.textContent.toLowerCase();
            
            const isMatch = itemName.includes(searchTerm);
            
            if (isMatch) {
                tag.classList.remove('hidden');
                visibleCount++;
                if (searchTerm) {
                    foundItems.push({
                        name: tag.textContent,
                        onclick: tag.getAttribute('onclick')
                    });
                }
            } else {
                tag.classList.add('hidden');
            }
        });
        
        // Afficher les résultats de recherche
        if (searchTerm) {
            if (foundItems.length > 0) {
                const itemsList = foundItems.map(item => 
                    `<span class="search-result-item" onclick="${item.onclick}" style="cursor: pointer; color: #5E891B; font-weight: bold; text-decoration: underline; margin: 0 0.3rem;">${item.name}</span>`
                ).join(', ');
                
                searchResults.innerHTML = `
                    <div style="font-weight: bold; margin-bottom: 0.5rem;">
                        ${foundItems.length} item(s) trouvé(s) :
                    </div>
                    <div>${itemsList}</div>
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
        
        // Animation des tags visibles
        setTimeout(() => {
            itemTags.forEach((tag, index) => {
                if (!tag.classList.contains('hidden')) {
                    tag.style.animation = `fadeInUp 0.5s ease-out ${index * 0.05}s both`;
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
    
    // Animation d'apparition des tags
    itemTags.forEach((tag, index) => {
        tag.style.animation = `fadeInUp 0.5s ease-out ${index * 0.05 + 0.4}s both`;
    });
});
