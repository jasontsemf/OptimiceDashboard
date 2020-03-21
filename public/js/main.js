window.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("btn");
    const input = document.getElementById("email");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          button.click();
        }
    });
    button.onclick = async () => {
        let name = document.getElementById("name");
        let email = document.getElementById("email");
        const response = await fetch('/api/signup', {
            method: "POST",
            body: JSON.stringify({
                "name": name.value,
                "email": email.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const person = await response.json();
        const list = document.getElementById("people-list");
        const msg = document.getElementById("message");
        const link = `Return to <a href="https://jasontsemf.github.io/optimice.html">OptiMice Page</a>`;
        msg.innerHTML = `Thank you for signing up, our ${numberToOrdinal(person.ordinal)} follower! <br>${link}`;
        name.value = "";
        email.value = "";
    }
});

function numberToOrdinal(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}