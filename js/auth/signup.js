const inputPseudo = document.getElementById("PseudoInput");
const inputFirstname = document.getElementById("FirstnameInput");
const inputEmail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidatePassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validationInscription");


inputPseudo.addEventListener("keyup",validateForm);
inputFirstname.addEventListener("keyup", validateForm);
inputEmail.addEventListener("keyup",validateForm);
inputPassword.addEventListener("keyup",validateForm);
inputValidatePassword.addEventListener("keyup",validateForm);


function validateForm(){
    const pseudoOk = validateRequired(inputPseudo)
    const firstnameOk = validateRequired(inputFirstname);
    const emailOk =validateRequired(inputEmail)
    const mailOk =validateMail(inputEmail)
    const passwordOk = validatePassword(inputPassword)
    const confirmePasswordOk =validateConfirmationPassword(inputPassword,inputValidatePassword)
    

    if (pseudoOk && firstnameOk && emailOk && mailOk && passwordOk&& confirmePasswordOk){
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




function initInscriptionForm() {
  const form = document.getElementById("form-inscription");
  if (!form) {
    console.warn("Formulaire d'inscription introuvable !");
    return;
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    // Ton code fetch ici, ou appel d’une autre fonction
    // Récupération des données du formulaire
    const userData = {
      username: form.querySelector("#PseudoInput").value,
      firstname: form.querySelector("#FirstnameInput").value,
      email: form.querySelector("#EmailInput").value,
      password: form.querySelector("#PasswordInput").value,
      role: form.querySelector("#role").value
    };

    fetch("http://localhost:8000/add-user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => {
      console.log("Réponse back :", data);
      if (data.success) {
        alert("✅ Utilisateur ajouté avec succès !");
        window.location.href = "/";
      } else {
        alert("❌ Erreur : " + JSON.stringify(data.errors || data.message));
      }
    })
    .catch(err => {
      alert("❌ Erreur de communication : " + err);
    });
  });
}

// Appelle cette fonction immédiatement à la fin du fichier inscription.js :
initInscriptionForm();
