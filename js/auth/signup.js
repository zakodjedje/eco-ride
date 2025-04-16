const inputPseudo = document.getElementById("PseudoInput");
const inputEmail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidatePassword = document.getElementById("ValidatePasswordInput");

inputPseudo.addEventListener("keyup",validateForm);
inputEmail.addEventListener("keyup",validateForm);
inputPassword.addEventListener("keyup",validateForm);
inputValidatePassword.addEventListener("keyup",validateForm);

function validateForm(){
    validateRequired(inputPseudo)
    validateRequired(inputEmail)
    validateMail(inputEmail)
}
function validateMail(input){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser =input.value;
    if(mailUser.match(emailRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");

    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    }

}


function validateRequired(input){
    if(input.value !=''){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");

    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    }
}