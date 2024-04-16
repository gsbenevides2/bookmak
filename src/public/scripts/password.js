function hasUpperCase(password) {
  return /[A-Z]/.test(password);
}

function hasLowerCase(password) {
  return /[a-z]/.test(password);
}

function hasNumber(password) {
  return /[0-9]/.test(password);
}

function hasSpecialCharacter(password) {
  return /[^A-Za-z0-9]/.test(password);
}

function validatePasswordSecurity(password) {
  return (
    password.length >= 8 &&
    hasUpperCase(password) &&
    hasLowerCase(password) &&
    hasNumber(password) &&
    hasSpecialCharacter(password)
  );
}

window.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("registerForm")
    .addEventListener("submit", (event) => {
      const password = document.getElementById("password").value;
      const passwordConfirmation =
        document.getElementById("passwordConfirm").value;
      const alertDialog = document.getElementById("errorAlert");
      if (passwordConfirmation !== password) {
        alertDialog.style.display = "block";
        alertDialog.innerHTML = "As senhas não coincidem!";
        event.preventDefault();
        return;
      }
      if (validatePasswordSecurity(password) === false) {
        alertDialog.style.display = "block";
        alertDialog.innerHTML =
          "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial!";
        event.preventDefault();
        return;
      }
    });
});
