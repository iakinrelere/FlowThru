
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let frontDiv = document.getElementById("front-orders");

// Get front counter orders
let frontOrders = orders.filter(function(order) {
    return (order.type === "Dine-In" ||
            order.type === "Carryout") &&
            order.status === "Submitted";
});

// Display orders
frontOrders.forEach(function(order) {

    let div = document.createElement("div");

    let heading = document.createElement("h3");
    heading.textContent = "Order #" + order.id;

    let type = document.createElement("p");
    type.textContent = "Type: " + order.type;

    let items = document.createElement("p");
    items.textContent = "Items: " +
        order.items.map(function(item) {
            return item.name;
        }).join(", ");

    let total = document.createElement("p");
    total.textContent = "Total: $" + order.total.toFixed(2);

    let button = document.createElement("button");
    button.textContent = "Complete Order";

    button.onclick = function() {
        order.status = "Completed";

        localStorage.setItem("orders", JSON.stringify(orders));

        alert("Order completed!");
        location.reload();
    };

    div.appendChild(heading);
    div.appendChild(type);
    div.appendChild(items);
    div.appendChild(total);
    div.appendChild(button);
    div.appendChild(document.createElement("hr"));

    frontDiv.appendChild(div);
});

if (frontOrders.length === 0) {
    frontDiv.textContent = "No front counter orders yet.";
}
