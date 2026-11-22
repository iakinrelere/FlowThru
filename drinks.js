
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let drinksDiv = document.getElementById("drink-orders");

// Display drink items from active orders
orders.forEach(function(order) {

    if (order.status !== "Submitted" &&
        order.status !== "Stored" &&
        order.status !== "Sent to Pickup") {
        return;
    }

    let drinkItems = order.items.filter(function(item) {
        return item.category === "Drinks";
    });

    if (drinkItems.length === 0) {
        return;
    }

    let div = document.createElement("div");

    let heading = document.createElement("h3");
    heading.textContent = "Order #" + order.id;

    let items = document.createElement("p");
    items.textContent = drinkItems.map(function(item) {
        return item.name;
    }).join(", ");

    let status = document.createElement("p");
    status.textContent = "Order Status: " + order.status;

    
let button = document.createElement("button");
button.textContent = "Mark Drinks Ready";

button.onclick = function() {
    order.drinksReady = true;

    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Drinks marked as ready!");
    location.reload();
};

div.appendChild(heading);
div.appendChild(items);
div.appendChild(status);

if (order.drinksReady === true) {
    let ready = document.createElement("p");
    ready.textContent = "Drinks Ready";
    div.appendChild(ready);
} else {
    div.appendChild(button);
}

div.appendChild(document.createElement("hr"));


    drinksDiv.appendChild(div);
});

if (drinksDiv.children.length === 0) {
    drinksDiv.textContent = "No drink orders yet.";
}
