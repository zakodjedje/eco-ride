const inputPseudo = document.getElementById("PseudoInput");
const inputEmail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidatePassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validationInscription");


inputPseudo.addEventListener("keyup",validateForm);
inputEmail.addEventListener("keyup",validateForm);
inputPassword.addEventListener("keyup",validateForm);
inputValidatePassword.addEventListener("keyup",validateForm);


function validateForm(){
    const pseudoOk = validateRequired(inputPseudo)
    const emailOk =validateRequired(inputEmail)
    const mailOk =validateMail(inputEmail)
    const passwordOk = validatePassword(inputPassword)
    const confirmePasswordOk =validateConfirmationPassword(inputPassword,inputValidatePassword)
    

    if (pseudoOk && emailOk && mailOk && passwordOk&& confirmePasswordOk){
        btnValidation.disabled=false;
    }
    else {
        btnValidation.disabled=true;
    }
}


function validateMail(input){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser =input.value;
    if(mailUser.match(emailRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;

    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }

}

function validatePassword(input){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{12,}$/;
    const passwordUser = input.value;
    if(passwordUser.match(passwordRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;

    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}
function validateConfirmationPassword(inputPassword, inputValidatePassword){
    if(inputPassword.value == inputValidatePassword.value){
        inputValidatePassword.classList.add("is-valid");
        inputValidatePassword.classList.remove("is-invalid");
        return true;
    }
    else{
        inputValidatePassword.classList.add("is-invalid");
        inputValidatePassword.classList.remove("is-valid");
        return false;
    }
}




function validateRequired(input){
    if(input.value !=''){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;

    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-inscription");
  if (!form) return; // protection en cas d'erreur

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("http://localhost:8000/user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    const msgDiv = document.getElementById("form-messages");
    msgDiv.innerHTML = "";

    if (result.success) {
      msgDiv.innerHTML = `<div class="alert alert-success">Inscription réussie !</div>`;
      form.reset();
    } else {
      for (const [field, message] of Object.entries(result.errors)) {
        msgDiv.innerHTML += `<div class="alert alert-danger">${field} : ${message}</div>`;
      }
    }
  });
});
