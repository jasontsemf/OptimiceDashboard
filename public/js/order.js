function navigate(id) {
    let tabid = "#" + id;
    let divId = "#d" + id;
    let allDiv = [1, 2, 3, 4, 5];
    // let div = document.getElementById("divId");
    // console.log(divId);
    $(String(tabid)).addClass("tab-active");
    $(String(divId)).fadeIn(600);
    allDiv.splice(id - 1, 1);
    // console.log(allDiv);
    for (i = 0; i < allDiv.length; i++) {
        let rmDivId = "#d" + allDiv[i];
        let rmTabId = "#" + allDiv[i];
        $(String(rmDivId)).hide();
        $(String(rmTabId)).removeClass("tab-active");
        $(String(rmTabId)).addClass("tab-inactive");
    }
    // $(String(divId)).hide();
    // console.log("hidden");
}

window.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("btn");
    button.onclick = async () => {
        let material = $("input[name='material']:checked").val();
        let color = $("input[name='color']:checked").val();
        let connectivity = $("input[name='connectivity']:checked").val();
        let sensor = $("input[name='sensor']:checked").val();

        let country = $("#country option:selected").val();

        let street_1 = document.getElementById("street_1").value;
        let street_2 = document.getElementById("street_2").value;
        let city = document.getElementById("city").value;

        let state = $("#state option:selected").val();

        let zip_code = document.getElementById("zip_code").value;
        console.log(zip_code);

        const response = await fetch('/api/orders', {
            method: "POST",
            body: JSON.stringify({
                "model_url": "./assets/3d/mouse.obj",
                "material": material,
                "color": color,
                "connectivity": connectivity,
                "sensor": sensor,
                "price": 100,
                "shipping_addr": {
                    "country": country,
                    "street_1": street_1,
                    "street_2": street_2,
                    "city": city,
                    "state": state,
                    "zip_code": zip_code
                },
                "status": "Paid",
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const order = await response.json();
        console.log(order);
        if (order.status === "Paid") {
            location.href = "confirm.html";
        }
        // alert("thank you for your purchase");
    }
});