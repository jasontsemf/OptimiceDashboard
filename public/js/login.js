window.onload = function () {
    let loginButton = document.getElementById("login-btn");
    let email = document.getElementById("email");
    let password = document.getElementById("password");;

    password.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          loginButton.click();
        }
    });

    loginButton.onclick = function () {
        if(email.value != "" && password.value != ""){
            location.href = "dashboard.html";
        }
    }
}