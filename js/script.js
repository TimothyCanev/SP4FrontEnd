document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const suggestions = document.querySelectorAll('.suggestion');
    const userNavLinks = document.querySelector('.user-nav-links');
    
    // Check authentication status and update UI
    function checkAuth() {
        const sessionToken = sessionStorage.getItem('bookfind_session');
        const username = sessionStorage.getItem('bookfind_user');
        
        if (sessionToken && username) {
            // User is logged in, update UI
            updateUIForLoggedInUser(username);
        }
    }
    
    // Update UI for logged in user
    function updateUIForLoggedInUser(username) {
        // Clear existing links
        userNavLinks.innerHTML = '';
        
        // Create welcome message
        const welcomeSpan = document.createElement('span');
        welcomeSpan.className = 'welcome-message';
        welcomeSpan.textContent = `Welcome, ${username}`;
        welcomeSpan.style.marginRight = '15px';
        welcomeSpan.style.color = '#495057';
        
        // Create profile link
        const profileLink = document.createElement('a');
        profileLink.href = 'profile.html';
        profileLink.className = 'profile-btn';
        profileLink.textContent = 'My Profile';
        profileLink.style.padding = '8px 16px';
        profileLink.style.borderRadius = '20px';
        profileLink.style.textDecoration = 'none';
        profileLink.style.fontWeight = '500';
        profileLink.style.color = '#3a86ff';
        profileLink.style.border = '1px solid #3a86ff';
        profileLink.style.marginRight = '10px';
        profileLink.style.transition = 'all 0.3s ease';
        
        // Create logout button
        const logoutButton = document.createElement('a');
        logoutButton.href = '#';
        logoutButton.className = 'logout-btn';
        logoutButton.textContent = 'Logout';
        logoutButton.style.padding = '8px 16px';
        logoutButton.style.borderRadius = '20px';
        logoutButton.style.textDecoration = 'none';
        logoutButton.style.fontWeight = '500';
        logoutButton.style.backgroundColor = '#dc3545';
        logoutButton.style.color = 'white';
        logoutButton.style.transition = 'all 0.3s ease';
        
        // Add hover effect for profile link
        profileLink.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f7ff';
        });
        
        profileLink.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        // Add hover effect for logout button
        logoutButton.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#c82333';
        });
        
        logoutButton.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#dc3545';
        });
        
        // Add logout functionality
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
        
        // Append new elements to nav
        userNavLinks.appendChild(welcomeSpan);
        userNavLinks.appendChild(profileLink);
        userNavLinks.appendChild(logoutButton);
    }
    
    // Logout function
    function logout() {
        // Clear session data
        sessionStorage.removeItem('bookfind_session');
        sessionStorage.removeItem('bookfind_user');
        sessionStorage.removeItem('bookfind_auth_provider');
        
        // Reload page to update UI
        window.location.reload();
    }
    
    // Handle search functionality
    searchButton.addEventListener('click', function() {
        performSearch();
    });
    
    // Allow search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Perform search
    function performSearch() {
        const query = searchInput.value.trim();
        
        if (query) {
            // In a real application, this would perform a real search
            console.log('Searching for:', query);
            
            // For demonstration purposes, update URL with search query
            const searchParams = new URLSearchParams();
            searchParams.set('q', query);
            
            // Redirect or update results
            // window.location.href = `search-results.html?${searchParams.toString()}`;
            
            // For this demo, let's just simulate filtering the results
            simulateSearchResults(query);
        }
    }
    
    // Simulate search results (for demonstration)
    function simulateSearchResults(query) {
        const resultsSection = document.querySelector('.results-section');
        const bookCards = document.querySelectorAll('.book-card');
        
        // Show loading state
        resultsSection.innerHTML = '<div class="loading-spinner" style="text-align: center; padding: 50px;"><i class="fas fa-spinner fa-spin" style="font-size: 40px; color: #3a86ff;"></i><p style="margin-top: 15px; font-size: 18px; color: #6c757d;">Searching for books...</p></div>';
        
        // Simulate API delay
        setTimeout(() => {
            // Clear results
            resultsSection.innerHTML = '';
            
            // Convert query to lowercase for case-insensitive matching
            const lowercaseQuery = query.toLowerCase();
            
            // Match count
            let matchCount = 0;
            
            // Check each book
            bookCards.forEach(card => {
                const title = card.querySelector('.book-title').textContent.toLowerCase();
                const author = card.querySelector('.book-author').textContent.toLowerCase();
                const description = card.querySelector('.book-description').textContent.toLowerCase();
                
                // Check if book matches query
                if (title.includes(lowercaseQuery) || 
                    author.includes(lowercaseQuery) || 
                    description.includes(lowercaseQuery)) {
                    
                    // Clone the card and add it to results
                    const clone = card.cloneNode(true);
                    resultsSection.appendChild(clone);
                    matchCount++;
                }
            });
            
            // If no results found
            if (matchCount === 0) {
                resultsSection.innerHTML = `
                    <div style="text-align: center; padding: 50px;">
                        <i class="fas fa-book-open" style="font-size: 40px; color: #6c757d;"></i>
                        <h3 style="margin-top: 20px; color: #495057;">No books found</h3>
                        <p style="margin-top: 10px; color: #6c757d;">
                            We couldn't find any books matching "${query}". <br>
                            Try different keywords or browse our categories instead.
                        </p>
                    </div>
                `;
            } else {
                // Update search input to show what was searched
                searchInput.value = query;
                
                // Scroll to results
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1500);
    }
    
    // Handle quick suggestions
    suggestions.forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            const term = this.textContent;
            searchInput.value = term;
            performSearch();
        });
    });
    
    // Check if Font Awesome is loaded, if not load it
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
        document.head.appendChild(fontAwesomeLink);
    }
    
    // Initialize
    checkAuth();
});

    // Check if user is logged in on page load
    document.addEventListener('DOMContentLoaded', function() {
        const sessionToken = sessionStorage.getItem('bookfind_session');
        const loginBtn = document.getElementById('login-btn');
        const registerBtn = document.getElementById('register-btn');
        const profileBtn = document.getElementById('profile-btn');
        const logoutBtn = document.getElementById('logout-btn');
        
        if (sessionToken) {
            // User is logged in
            loginBtn.style.display = 'none';
            registerBtn.style.display = 'none';
            profileBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'inline-block';
            
            // Add username to profile link if available
            const username = sessionStorage.getItem('bookfind_user');
            if (username) {
                profileBtn.innerHTML = `<i class="fas fa-user-circle"></i> ${username}`;
            }
            
            // Set up logout button
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                sessionStorage.removeItem('bookfind_session');
                sessionStorage.removeItem('bookfind_user');
                sessionStorage.removeItem('bookfind_auth_provider');
                window.location.reload();
            });
        }
    });