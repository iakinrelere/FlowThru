
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let kitchenDiv = document.getElementById("kitchen-orders");

// Display food items from active orders
orders.forEach(function(order) {

    if (order.status !== "Submitted" &&
        order.status !== "Stored" &&
        order.status !== "Sent to Pickup") {
        return;
    }

    let foodItems = order.items.filter(function(item) {
        return item.category === "Food";
    });

    if (foodItems.length === 0) {
        return;
    }

    let div = document.createElement("div");

    let heading = document.createElement("h3");
    heading.textContent = "Order #" + order.id;

    let items = document.createElement("p");
    items.textContent = foodItems.map(function(item) {
        return item.name;
    }).join(", ");

    let status = document.createElement("p");
    status.textContent = "Order Status: " + order.status;

    
let button = document.createElement("button");
button.textContent = "Mark Food Ready";

button.onclick = function() {
    order.foodReady = true;

    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Food marked as ready!");
    location.reload();
};

div.appendChild(heading);
div.appendChild(items);
div.appendChild(status);

if (order.foodReady === true) {
    let ready = document.createElement("p");
    ready.textContent = "Food Ready";
    div.appendChild(ready);
} else {
    div.appendChild(button);
}

div.appendChild(document.createElement("hr"));


    kitchenDiv.appendChild(div);
});

if (kitchenDiv.children.length === 0) {
    kitchenDiv.textContent = "No food orders yet.";
}
