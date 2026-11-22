
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let baggingDiv = document.getElementById("front-bagging-orders");

orders.forEach(function(order) {

    // Only Dine-In and Carryout orders
    if (order.type !== "Dine-In" &&
        order.type !== "Carryout") {
        return;
    }

    // Hide completed or already bagged orders
    if (order.status === "Completed" ||
        order.frontBagged === true) {
        return;
    }

    // Only display food items
    let foodItems = order.items.filter(function(item) {
        return item.category === "Food";
    });

    if (foodItems.length === 0) {
        return;
    }

    let div = document.createElement("div");

    let heading = document.createElement("h3");
    heading.textContent = "Order #" + order.id;

    let type = document.createElement("p");
    type.textContent = "Order Type: " + order.type;

    let items = document.createElement("p");
    items.textContent = foodItems.map(function(item) {
        return item.name;
    }).join(", ");

    let button = document.createElement("button");
    button.textContent = "Mark as Bagged";

    button.onclick = function() {
        order.frontBagged = true;

        localStorage.setItem("orders", JSON.stringify(orders));

        alert("Front order marked as bagged!");
        location.reload();
    };

    div.appendChild(heading);
    div.appendChild(type);
    div.appendChild(items);
    div.appendChild(button);
    div.appendChild(document.createElement("hr"));

    baggingDiv.appendChild(div);
});

if (baggingDiv.children.length === 0) {
    baggingDiv.textContent = "No front counter food orders to bag.";
}
