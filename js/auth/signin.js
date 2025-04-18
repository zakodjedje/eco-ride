const mailInput=document.getElementById("EmailInput");
const passwordInput=document.getElementById("PasswordInput");
const btnSingin = document.getElementById("btnSignin")

btnSingin.addEventListener("click", checkInfo);

function checkInfo(){
    if(mailInput.value == "zakodjedje@gmail.com" && passwordInput.value=="123"){
        alert ("vous etes connected")
        const token ="aaa"

        window.location.replace("/");
    }
    else {
        mailInput.classList.add("is-invalid")
        passwordInput.classList.add("is-invalid")
    }
}