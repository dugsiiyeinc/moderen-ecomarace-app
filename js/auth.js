document.addEventListener('DOMContentLoaded', () => {
    const authSwitch = document.querySelector("#authSwitch");
    const authButton = document.querySelector("#authButton");
    const authForm = document.querySelector("#authForm");
    const formTitle = document.querySelector("#form-title");
    const usernameInput = document.querySelector("#username");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const confirmPasswordInput = document.querySelector("#confirmPassword");

    let signIn = true;

    // Check if the form element exists before adding the listener
    if (authForm) {
        authForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (signIn) {
                // --- Sign-in Logic ---
                const users = JSON.parse(localStorage.getItem("users")) || [];
                const existingUser = users.find(
                    (user) => user.email === emailInput.value && user.password === passwordInput.value
                );

                if (existingUser) {
                    localStorage.setItem("onlineUser", JSON.stringify(existingUser));
                    window.location.href = '../html/index.html';
                } else {
                    alert("Invalid Credentials");
                }
            } else {
                // --- Sign-up Logic ---
                const users = JSON.parse(localStorage.getItem("users")) || [];

                const existingUser = users.find(
                    (user) => user.email === emailInput.value
                );

                if (existingUser) {
                    alert(`User with email ${existingUser.email} already exists.`);
                    return;
                }
                
                if (confirmPasswordInput.value !== passwordInput.value) {
                    alert("Password mismatch");
                    return;
                }

                const newUser = {
                    username: usernameInput.value,
                    email: emailInput.value,
                    password: passwordInput.value,
                };

                users.push(newUser);
                localStorage.setItem("users", JSON.stringify(users));
                
                localStorage.setItem("onlineUser", JSON.stringify(newUser));
                
                alert("Registered successfully!");
                window.location.href = '../html/index.html';
            }
        });
    }

    // Check if the switch element exists before adding the listener
    if (authSwitch) {
        authSwitch.addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.id === "switchFormLink") {
                switchAuthForm();
            }
        });
    }

    function switchAuthForm() {
        signIn = !signIn;
        authForm.reset();

        if (!signIn) {
            authButton.textContent = "Sign up";
            formTitle.textContent = "Sign up";
            usernameInput.style.display = "block";
            confirmPasswordInput.style.display = "block";
            authSwitch.innerHTML = `Already have an account? <a href="#" id="switchFormLink">Sign in</a>`;
        } else {
            authButton.textContent = "Sign in";
            formTitle.textContent = "Sign in";
            usernameInput.style.display = "none";
            confirmPasswordInput.style.display = "none";
            authSwitch.innerHTML = `Don't have an account? <a href="#" id="switchFormLink">Sign up</a>`;
        }
    }
});