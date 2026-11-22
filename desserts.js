
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let dessertDiv = document.getElementById("dessert-orders");

// Display dessert items from active orders
orders.forEach(function(order) {

    if (order.status !== "Submitted" &&
        order.status !== "Stored" &&
        order.status !== "Sent to Pickup") {
        return;
    }

    let dessertItems = order.items.filter(function(item) {
        return item.category === "Desserts";
    });

    if (dessertItems.length === 0) {
        return;
    }

    let div = document.createElement("div");

    let heading = document.createElement("h3");
    heading.textContent = "Order #" + order.id;

    let items = document.createElement("p");
    items.textContent = dessertItems.map(function(item) {
        return item.name;
    }).join(", ");

    let status = document.createElement("p");
    status.textContent = "Order Status: " + order.status;

    
let button = document.createElement("button");
button.textContent = "Mark Desserts Ready";

button.onclick = function() {
    order.dessertsReady = true;

    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Desserts marked as ready!");
    location.reload();
};

div.appendChild(heading);
div.appendChild(items);
div.appendChild(status);

if (order.dessertsReady === true) {
    let ready = document.createElement("p");
    ready.textContent = "Desserts Ready";
    div.appendChild(ready);
} else {
    div.appendChild(button);
}

div.appendChild(document.createElement("hr"));


    dessertDiv.appendChild(div);
});

if (dessertDiv.children.length === 0) {
    dessertDiv.textContent = "No dessert orders yet.";
}
