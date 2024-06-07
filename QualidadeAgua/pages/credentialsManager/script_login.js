function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    console.log('antes');
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login bem-sucedido
            var user = userCredential.user;
            console.log("Login bem-sucedido:", user);
            window.location.href = "../../index.html";
        })
        .catch((error) => {
            // Tratar erros
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Erro no login:", errorCode, errorMessage);
            alert("Usuário não encontrado");
        });
}


function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
}

function onChangePassword() {
    validatePasswordsMatch();
}

function validatePasswordsMatch() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}



function validateEmail(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}


function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password) {
        return false;
    }

    return true;
}

const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    loginButton: () => document.getElementById('login-button')
}