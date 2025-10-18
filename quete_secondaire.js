document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const queteCards = document.querySelectorAll('.quete-card');
    
    // Fonction de recherche
    function searchQuetes() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        let foundQuetes = [];
        
        queteCards.forEach(card => {
            const queteName = card.querySelector('h3').textContent.toLowerCase();
            const queteDescription = card.querySelector('p').textContent.toLowerCase();
            const dataName = card.getAttribute('data-name').toLowerCase();
            
            const isMatch = queteName.includes(searchTerm) || 
                          queteDescription.includes(searchTerm) || 
                          dataName.includes(searchTerm);
            
            if (isMatch) {
                card.classList.remove('hidden');
                visibleCount++;
                if (searchTerm) {
                    foundQuetes.push(card.querySelector('h3').textContent);
                }
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Afficher les résultats de recherche
        if (searchTerm) {
            if (foundQuetes.length > 0) {
                searchResults.innerHTML = `
                    <div style="font-weight: bold; margin-bottom: 0.5rem;">
                        ${foundQuetes.length} quête(s) trouvée(s) :
                    </div>
                    <div>${foundQuetes.join(', ')}</div>
                `;
                searchResults.classList.add('show');
            } else {
                searchResults.innerHTML = `
                    <div style="text-align: center; color: #ff6b6b;">
                        Aucune quête trouvée pour "${searchTerm}"
                    </div>
                `;
                searchResults.classList.add('show');
            }
        } else {
            searchResults.classList.remove('show');
        }
        
        // Animation des cartes visibles
        setTimeout(() => {
            queteCards.forEach((card, index) => {
                if (!card.classList.contains('hidden')) {
                    card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
                }
            });
        }, 100);
    }
    
    // Événement de recherche en temps réel
    searchInput.addEventListener('input', searchQuetes);
    
    // Événement de clic sur les cartes de quête
    queteCards.forEach(card => {
        card.addEventListener('click', function() {
            const queteName = this.querySelector('h3').textContent;
            const dataName = this.getAttribute('data-name');
            
            // Si la carte a déjà un onclick dans le HTML, on ne fait rien
            if (this.getAttribute('onclick')) {
                return;
            }
            
            // Sinon, afficher le message par défaut
            alert(`Quête sélectionnée : ${queteName}\n\nCette fonctionnalité sera développée prochainement !`);
        });
    });
    
    // Raccourcis clavier
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            searchQuetes();
            this.blur();
        }
    });
    
    // Focus automatique sur la barre de recherche
    searchInput.focus();
    
    // Animation d'apparition des cartes
    queteCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1 + 0.6}s both`;
    });
});
