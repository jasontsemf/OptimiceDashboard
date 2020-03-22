window.onload = function () {
    let loginButton = document.getElementById("login-btn");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    loginButton.onclick = function () {
        if(email.value != "" && password.value != ""){
            location.href = "dashboard.html";
        }
    }
}