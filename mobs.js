document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const mobTags = document.querySelectorAll('.mob-tag');
    
    // Fonction de recherche
    function searchMobs() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        let foundMobs = [];
        
        mobTags.forEach(tag => {
            const mobName = tag.textContent.toLowerCase();
            
            const isMatch = mobName.includes(searchTerm);
            
            if (isMatch) {
                tag.classList.remove('hidden');
                visibleCount++;
                if (searchTerm) {
                    foundMobs.push({
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
            if (foundMobs.length > 0) {
                const mobsList = foundMobs.map(mob => 
                    `<span class="search-result-item" onclick="${mob.onclick}" style="cursor: pointer; color: #5E891B; font-weight: bold; text-decoration: underline; margin: 0 0.3rem;">${mob.name}</span>`
                ).join(', ');
                
                searchResults.innerHTML = `
                    <div style="font-weight: bold; margin-bottom: 0.5rem;">
                        ${foundMobs.length} mob(s) trouvé(s) :
                    </div>
                    <div>${mobsList}</div>
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
        
        // Animation des tags visibles
        setTimeout(() => {
            mobTags.forEach((tag, index) => {
                if (!tag.classList.contains('hidden')) {
                    tag.style.animation = `fadeInUp 0.5s ease-out ${index * 0.05}s both`;
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
    
    // Animation d'apparition des tags
    mobTags.forEach((tag, index) => {
        tag.style.animation = `fadeInUp 0.5s ease-out ${index * 0.05 + 0.4}s both`;
    });
});
