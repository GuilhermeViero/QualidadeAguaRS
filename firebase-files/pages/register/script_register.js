
function register() {
    const email = forms.email().value;
    const password = forms.password().value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuário registrado:", user);
            window.location.href = "../home/index.html"; 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Erro ao Registrar");
            console.error("Erro ao registrar:", errorCode, errorMessage);
        });
}

function onChangeName() {
    const name = forms.name().value;
    forms.nameRequiredError().style.display = name ? "none" : "block";
}

function onChangeEmail() {
    const email = forms.email().value;
    forms.emailRequiredError().style.display = email ? "none" : "block";
    forms.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function onChangePassword() {
    const password = forms.password().value;
    forms.passwordRequiredError().style.display = password ? "none" : "block";
    validatePasswordsMatch();
}

function onChangeConfirmPassword() {
    validatePasswordsMatch();
}

function validatePasswordsMatch() {
    const password = forms.password().value;
    const confirmPassword = forms.confirmPassword().value;
    forms.confirmPasswordDoesntMatchError().style.display = password === confirmPassword ? "none" : "block";
}

function isformsValid() {
    const name = forms.name().value;
    if (!name) {
        return false;
    }

    const email = forms.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = forms.password().value;
    if (!password) {
        return false;
    }

    const confirmPassword = forms.confirmPassword().value;
    if (password !== confirmPassword) {
        return false;
    }

    return true;
}

function validateEmail(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

const forms = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button'),
    name: () => document.getElementById('name'),
    nameRequiredError: () => document.getElementById('name-required-error')
}