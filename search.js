document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const searchResults = document.getElementById('searchResults');
    const searchResultTemplate = document.getElementById('searchResultTemplate').innerHTML;

    searchResults.innerHTML = 'Games Loading...';

    fetch('games.json')
        .then(response => response.json())
        .then(data => {
            const mockData = data;

            function renderSearchResults(searchTerm = '', category = 'all') {
                searchResults.innerHTML = '';

                const filteredResults = mockData.filter(item => {
                    const itemCategory = String(item.category).trim().toLowerCase();  // Convert to string, trim, and lowercase
                    const selectedCategory = String(category).trim().toLowerCase();  // Convert to string, trim, and lowercase
                    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesCategory = category === 'all' || itemCategory === selectedCategory;

                    return matchesSearch && matchesCategory;
                });

                if (filteredResults.length === 0) {
                    searchResults.innerHTML = '<p>No games found.</p>';
                    return;
                }

                filteredResults.forEach(result => {
                    const renderedTemplate = renderTemplate(searchResultTemplate, result);
                    searchResults.innerHTML += renderedTemplate;
                });
            }

            function renderTemplate(template, data) {
                return template.replace(/{{(.*?)}}/g, (match, key) => data[key.trim()] || '');
            }

            // Run search when page loads
            renderSearchResults('', categorySelect.value);

            // Search as user types
            searchInput.addEventListener('input', function() {
                renderSearchResults(searchInput.value.trim(), categorySelect.value);
            });

            // Search when category changes
            categorySelect.addEventListener('change', function() {
                renderSearchResults('', categorySelect.value); // Clears input and searches by category
                searchInput.value = ''; // Reset the search field when category changes
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
