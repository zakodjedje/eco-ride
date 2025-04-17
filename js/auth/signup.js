const inputPseudo = document.getElementById("PseudoInput");
const inputEmail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidatePassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validationInscription")

inputPseudo.addEventListener("keyup",validateForm);
inputEmail.addEventListener("keyup",validateForm);
inputPassword.addEventListener("keyup",validateForm);
inputValidatePassword.addEventListener("keyup",validateForm);

function validateForm(){
    const pseudoOk = validateRequired(inputPseudo)
    const emailOk =validateRequired(inputEmail)
    const mailOk =validateMail(inputEmail)

    if (pseudoOk && emailOk && mailOk){
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