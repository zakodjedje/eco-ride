const mailInput=document.getElementById("EmailInput");
const passwordInput=document.getElementById("PasswordInput");
const btnSingin = document.getElementById("btnSignin")

btnSingin.addEventListener("click", checkInfo);

function checkInfo(){
    if(mailInput.value == "zakodjedje@gmail.com" && passwordInput.value=="123"){
       
        const token ="aaa222"
        setToken(token);

        window.location.replace("/");
    }
    else {
        mailInput.classList.add("is-invalid")
        passwordInput.classList.add("is-invalid")
    }
}

function isConnected(name){
    if(getToken()==null || getToken ==undefined){
        return false;
    }
    else{
        return true;
    }
}

if (isConnected()){
    alert ("je suis conecté")
}else{
    alert ("je ne suis APPP connectEX")
}