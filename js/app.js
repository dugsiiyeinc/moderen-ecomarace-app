document.addEventListener('DOMContentLoaded', () => {
    // Select the new navigation elements
    const helloUserSpan = document.querySelector("#hello-user");
    const signinBtn = document.querySelector("#signin-btn");
    const logoutBtn = document.querySelector("#logout-btn");
    const cartCount = document.querySelector("#cartCount");
    
    // Function to check the user's login status and update the UI
    const updateNavUI = () => {
        const onlineUser = JSON.parse(localStorage.getItem('onlineUser'));

        if (onlineUser) {
            // User is signed in
            helloUserSpan.textContent = `Hi, ${onlineUser.username}`;
            helloUserSpan.style.display = 'inline-block';
            signinBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            
        } else {
            // User is signed out
            helloUserSpan.style.display = 'none';
            signinBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
        }
    };

    // Add event listener for the logout button
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('onlineUser');
        updateNavUI();
        window.location.reload(); // Reload the page to reset the state
    });

    // Initial call to set the UI on page load
    updateNavUI();
});