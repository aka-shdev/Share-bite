document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', function(e) {
        // Implement search logic here
        console.log('Searching for:', e.target.value);
    });

    // Category filter
    const categoryFilter = document.querySelector('.category-filter');
    categoryFilter.addEventListener('change', function(e) {
        // Implement category filtering logic here
        console.log('Selected category:', e.target.value);
    });

    // Sort filter
    const sortFilter = document.querySelector('.sort-filter');
    sortFilter.addEventListener('change', function(e) {
        // Implement sorting logic here
        console.log('Sort by:', e.target.value);
    });

    // Load more button
    const loadMoreBtn = document.querySelector('.load-more-btn');
    loadMoreBtn.addEventListener('click', function() {
        // Implement load more logic here
        console.log('Loading more campaigns...');
    });
});