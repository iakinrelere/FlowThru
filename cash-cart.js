
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let orderDiv = document.getElementById("stored-orders");

orders.forEach(function(order) {

    let div = document.createElement("div");

    div.innerHTML = `
    <h3>Order #${order.id}</h3>
    <p>Lane: ${order.lane}</p>
    <p>Total: $${order.total.toFixed(2)}</p>
    <p>Status: ${order.status}</p>
    <button class="send-order">Send to Pickup Window</button>
    <hr>
`;
let button = div.querySelector(".send-order");

if (order.status === "Sent to Pickup") {
    button.disabled = true;
}

button.onclick = function() {
    order.status = "Sent to Pickup";

    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Order sent to pickup window!");

    location.reload();
};


    orderDiv.appendChild(div);
});

if (orders.length === 0) {
    orderDiv.textContent = "No stored orders yet.";
}

