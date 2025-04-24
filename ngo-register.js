document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('ngoRegisterForm');
    const passwordInputs = document.querySelectorAll('.password-input input');
    const toggleButtons = document.querySelectorAll('.toggle-password');

    // Toggle password visibility
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            button.classList.toggle('fa-eye');
            button.classList.toggle('fa-eye-slash');
        });
    });

    // Set max year to current year
    const currentYear = new Date().getFullYear();
    document.getElementById('foundedYear').setAttribute('max', currentYear);

    // Form validation
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Show loading state
            showLoadingState();

            // Create FormData object
            const formData = new FormData(registerForm);
            const ngoData = Object.fromEntries(formData);

            // Simulate API call with a timeout
            setTimeout(() => {
                // Store NGO data in localStorage (in real app, this would come from backend)
                localStorage.setItem('ngoData', JSON.stringify({
                    name: ngoData.ngoName,
                    email: ngoData.email,
                    isLoggedIn: true,
                    lastLogin: new Date().toISOString()
                }));

                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Registration successful! Redirecting to your dashboard...</p>
                `;
                registerForm.appendChild(successMessage);

                // Redirect to NGO dashboard after 2 seconds
                setTimeout(() => {
                    window.location.href = 'ngo-dashboard.html';
                }, 2000);
            }, 1500);
        }
    });
});

function validateForm() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Password validation
    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return false;
    }

    if (!/\d/.test(password)) {
        alert('Password must contain at least one number');
        return false;
    }

    if (!/[!@#$%^&*]/.test(password)) {
        alert('Password must contain at least one special character');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }

    // File size validation (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    const certificateFile = document.getElementById('registrationCertificate').files[0];
    const taxFile = document.getElementById('taxExemption').files[0];

    if (certificateFile && certificateFile.size > maxSize) {
        alert('Registration Certificate file size must be less than 5MB');
        return false;
    }

    if (taxFile && taxFile.size > maxSize) {
        alert('Tax Exemption Certificate file size must be less than 5MB');
        return false;
    }

    return true;
}

function showLoadingState() {
    const submitBtn = document.querySelector('.register-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
}

function hideLoadingState() {
    const submitBtn = document.querySelector('.register-btn');
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Register NGO';
}

// Phone number validation
document.getElementById('phone').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// Year validation
document.getElementById('foundedYear').addEventListener('input', (e) => {
    const currentYear = new Date().getFullYear();
    let value = parseInt(e.target.value);
    
    if (value > currentYear) {
        e.target.value = currentYear;
    }
});

// Add this CSS to ngo-register.css
const style = document.createElement('style');
style.textContent = `
    .success-message {
        background-color: #d4edda;
        color: #155724;
        padding: 1rem;
        border-radius: 4px;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .success-message i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);
