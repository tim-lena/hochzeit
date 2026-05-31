// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all tab buttons and tab contents
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Tab switching function
    function switchTab(tabName) {
        // Remove active class from all buttons and contents
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(tabName);
        
        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${tabName}`);
            
            // Smooth scroll to top of content
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Handle deep linking (URL hash)
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            switchTab(hash);
        }
    }
    
    // Check for hash on page load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    
    // Accordion functionality for game cards
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const header = card.querySelector('.game-header');
        
        header.addEventListener('click', function() {
            // Toggle active class on clicked card
            const isActive = card.classList.contains('active');
            
            // Optional: Close other cards (comment out if you want multiple cards open)
            // gameCards.forEach(c => c.classList.remove('active'));
            
            // Toggle current card
            if (isActive) {
                card.classList.remove('active');
            } else {
                card.classList.add('active');
            }
        });
    });
    
    
    // Back to Top Button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    // Smooth scroll for internal links (e.g., Spiele link in Ablauf)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's a tab link
            const tabName = href.substring(1);
            const tabButton = document.querySelector(`[data-tab="${tabName}"]`);
            
            if (tabButton) {
                e.preventDefault();
                switchTab(tabName);
            }
        });
    });
    
});
