document.addEventListener('DOMContentLoaded', () => {
    // 1. Get DOM Elements
    const authForm = document.getElementById('authForm');
    const formTitle = document.getElementById('form-title');
    const authButton = document.getElementById('authButton');
    const switchFormLink = document.getElementById('switchForm');

    const usernameInput = document.getElementById('username');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');

    let isRegisterMode = false;

    // A key to store user data in Local Storage
    const STORAGE_KEY = 'byruun_user_data';

    // 2. Function to Toggle Form Mode and Autocomplete
    const toggleFormMode = () => {
        isRegisterMode = !isRegisterMode;

        if (isRegisterMode) {
            // --- REGISTER Mode ---
            formTitle.textContent = 'Register';
            authButton.textContent = 'Register';
            switchFormLink.textContent = 'Sign In now';

            usernameInput.style.display = 'block';
            confirmPasswordInput.style.display = 'block';
            passwordInput.setAttribute('autocomplete', 'new-password');

        } else {
            // --- SIGN IN Mode ---
            formTitle.textContent = 'Sign In';
            authButton.textContent = 'Sign In';
            switchFormLink.textContent = 'Register now';

            usernameInput.style.display = 'none';
            confirmPasswordInput.style.display = 'none';
            passwordInput.setAttribute('autocomplete', 'current-password');
        }

        // Reset the form fields when switching modes
        authForm.reset();
    };

    // 3. Attach Event Listener for Toggling
    switchFormLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleFormMode();
    });

    // 4. Handle Form Submission
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (isRegisterMode) {
            // === REGISTRATION LOGIC ===
            const username = usernameInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Check if user already exists (by email)
            if (localStorage.getItem(STORAGE_KEY + '_' + email)) {
                alert("A user with this email already exists. Please sign in.");
                return;
            }

            // Save new user data
            const userData = {
                username: username,
                email: email,
                password: password // NOTE: In a real app, NEVER store passwords in plaintext!
            };
            localStorage.setItem(STORAGE_KEY + '_' + email, JSON.stringify(userData));

            alert("Registration successful! Please sign in.");
            toggleFormMode(); // Switch to sign-in page

        } else {
            // === SIGN IN LOGIC (Automatic Redirect on Success) ===
            const storedDataJSON = localStorage.getItem(STORAGE_KEY + '_' + email);

            if (storedDataJSON) {
                const storedData = JSON.parse(storedDataJSON);

                // Check password
                if (storedData.password === password) {
                    
                    // Set a simple flag to show the user is logged in
                    localStorage.setItem('isLoggedIn', 'true'); 
                    localStorage.setItem('currentUserName', storedData.username);
                    
                    // SUCCESS: Redirect to the home page
                    console.log("Sign In successful. Redirecting to home page...");
                    window.location.href = 'index.html'; 
                    return;

                } else {
                    alert("Sign In failed: Invalid password.");
                }
            } else {
                alert("Sign In failed: User not found. Please register.");
            }
        }
    });

    // 5. Initialize the form to Sign In mode on load
    passwordInput.setAttribute('autocomplete', 'current-password');
});