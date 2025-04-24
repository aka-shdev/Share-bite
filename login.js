document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = passwordInput.value;
        const remember = document.querySelector('input[name="remember"]').checked;

        // Here you would typically make an API call to your backend
        console.log('Login attempt:', { email, password, remember });

        // For demonstration purposes, we'll simulate a login
        simulateLogin(email, password);
    });

    // Handle social login buttons
    document.querySelector('.google-btn').addEventListener('click', () => {
        console.log('Google login clicked');
        // Implement Google OAuth login
    });

    document.querySelector('.facebook-btn').addEventListener('click', () => {
        console.log('Facebook login clicked');
        // Implement Facebook OAuth login
    });
});

function simulateLogin(email, password) {
    // Simulate API call delay
    showLoadingState();
    
    setTimeout(() => {
        if (email && password) {
            // Successful login simulation
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Redirect to dashboard or home page
            window.location.href = 'index.html';
        } else {
            alert('Please enter valid credentials');
        }
        hideLoadingState();
    }, 1000);
}

function showLoadingState() {
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.disabled = true;
    loginBtn.innerHTML = 'Logging in...';
}

function hideLoadingState() {
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.disabled = false;
    loginBtn.innerHTML = 'Login';
}