const password = document.getElementById('pass');
const confirmPassword = document.getElementById('pass-confirm');
const passwordStrength = document.getElementById('password-strength');
const generatePasswordBtn = document.getElementById('generate-password');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

password.addEventListener('input', updatePasswordStrength);
password.addEventListener('input', checkPasswordMatch);
confirmPassword.addEventListener('input', checkPasswordMatch);
generatePasswordBtn.addEventListener('click', generateStrongPassword);
togglePassword.addEventListener('click', () => togglePasswordVisibility(password, togglePassword));
toggleConfirmPassword.addEventListener('click', () => togglePasswordVisibility(confirmPassword, toggleConfirmPassword));

function updatePasswordStrength() {
  const strength = getPasswordStrength(password.value);
  passwordStrength.style.display = 'block';
  passwordStrength.className = 'password-strength ' + strength;
}

function getPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  if (strength <= 2) {
    return 'weak';
  } else if (strength <= 4) {
    return 'medium';
  } else {
    return 'strong';
  }
}

function generateStrongPassword() {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let passwordValue = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    passwordValue += charset.charAt(Math.floor(Math.random() * n));
  }
  password.value = passwordValue;
  confirmPassword.value = passwordValue;
  updatePasswordStrength();
  checkPasswordMatch();
}

function togglePasswordVisibility(inputField, icon) {
  const type = inputField.type === 'password' ? 'text' : 'password';
  inputField.type = type;
  icon.classList.toggle('bi-eye');
  icon.classList.toggle('bi-eye-slash');
}

function checkPasswordMatch() {
  if (password.value !== confirmPassword.value) {
    confirmPassword.classList.add('is-invalid');
  } else {
    confirmPassword.classList.remove('is-invalid');
  }
}
