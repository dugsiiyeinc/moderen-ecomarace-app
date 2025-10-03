document.addEventListener('DOMContentLoaded', () => {
    // 1. Get DOM Elements from the navigation bar
    const helloUserSpan = document.getElementById('hello-user');
    const signInBtn = document.getElementById('signin-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // 2. Retrieve user state from Local Storage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUserName = localStorage.getItem('currentUserName');

    if (isLoggedIn === 'true' && currentUserName) {
        // === USER IS LOGGED IN ===
        
        // Update the span to display the welcome message and username
        helloUserSpan.textContent = `Hello, ${currentUserName}!`;
        
        // Make the welcome message and Logout button visible
        helloUserSpan.style.display = 'block';
        logoutBtn.style.display = 'block';
        
        // Hide the Sign In button
        signInBtn.style.display = 'none';

    } else {
        // === USER IS LOGGED OUT ===
        
        // Ensure only the Sign In button is visible (which is the default in your HTML)
        helloUserSpan.style.display = 'none';
        logoutBtn.style.display = 'none';
        signInBtn.style.display = 'block'; // Ensure Sign In button is visible
    }

    // 3. Handle Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            
            // Clear the login state and user data from Local Storage
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUserName');
            localStorage.removeItem('byruun_user_data_' + localStorage.getItem('currentUserEmail'));
            localStorage.removeItem('currentUserEmail'); // Assuming you save this too

            // Redirect to the home page or reload to update the UI
            window.location.href = 'home.html'; 
            // Alternatively: window.location.reload(); 
        });
    }
});