
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let pickupDiv = document.getElementById("pickup-orders");

let pickupOrders = orders.filter(function(order) {
    return order.status === "Sent to Pickup";
});

pickupOrders.forEach(function(order) {

    let div = document.createElement("div");

    let items = order.items.map(function(item) {
        return item.name;
    }).join(", ");

    div.innerHTML = `
        <h3>Order #${order.id}</h3>
        <p>Lane: ${order.lane}</p>
        <p>Items: ${items}</p>
        <p>Total: $${order.total.toFixed(2)}</p>
        <button class="complete-order">Complete Order</button>
        <hr>
    `;

    let button = div.querySelector(".complete-order");

    button.onclick = function() {
        order.status = "Completed";

        localStorage.setItem("orders", JSON.stringify(orders));

        alert("Order completed!");

        location.reload();
    };

    pickupDiv.appendChild(div);
});

if (pickupOrders.length === 0) {
    pickupDiv.textContent = "No orders at pickup window.";
}
