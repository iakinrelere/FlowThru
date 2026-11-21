
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let orderDiv = document.getElementById("stored-orders");

orders.forEach(function(order) {

    let div = document.createElement("div");

    div.innerHTML = `
        <h3>Order #${order.id}</h3>
        <p>Lane: ${order.lane}</p>
        <p>Total: $${order.total.toFixed(2)}</p>
        <p>Status: ${order.status}</p>
        <hr>
    `;

    orderDiv.appendChild(div);
});

if (orders.length === 0) {
    orderDiv.textContent = "No stored orders yet.";
}

