const mailInput=document.getElementById("EmailInput");
const passwordInput=document.getElementById("PasswordInput");
const btnSingin = document.getElementById("btnSignin")

btnSingin.addEventListener("click", checkInfo);

function checkInfo(){
    if(mailInput.value == "zakodjedje@gmail.com" && passwordInput.value=="123"){
       
        const token ="aaa222"
        setToken(token);

        setCookie(RoleCookieName,"admin", 7)

        window.location.replace("/");
    }
    else {
        mailInput.classList.add("is-invalid")
        passwordInput.classList.add("is-invalid")
    }
}

