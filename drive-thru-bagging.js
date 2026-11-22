
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let baggingDiv = document.getElementById("bagging-orders");

orders.forEach(function(order) {

    // Only show drive-thru orders
    if (order.lane !== 1 && order.lane !== 2 &&
        order.type !== "Drive-Thru") {
        return;
    }

    // Hide completed and already bagged orders
    if (order.status === "Completed" || order.bagged === true) {
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

    let lane = document.createElement("p");
    lane.textContent = "Lane: " + (order.lane || "Cash Cart");

    let items = document.createElement("p");
    items.textContent = foodItems.map(function(item) {
        return item.name;
    }).join(", ");


let hasFood = order.items.some(function(item) {
    return item.category === "Food";
});

let hasDrinks = order.items.some(function(item) {
    return item.category === "Drinks";
});

let hasDesserts = order.items.some(function(item) {
    return item.category === "Desserts";
});

let foodReady = !hasFood || order.foodReady === true;
let drinksReady = !hasDrinks || order.drinksReady === true;
let dessertsReady = !hasDesserts || order.dessertsReady === true;

let allReady = foodReady && drinksReady && dessertsReady;

let readiness = document.createElement("p");

readiness.textContent =
    "Food: " + (foodReady ? "Ready" : "Preparing") +
    " | Drinks: " + (drinksReady ? "Ready" : "Preparing") +
    " | Desserts: " + (dessertsReady ? "Ready" : "Preparing");

div.appendChild(readiness);


    let button = document.createElement("button");
    button.textContent = "Mark as Bagged";
    button.disabled = !allReady;

    button.onclick = function() {
        order.bagged = true;

        localStorage.setItem("orders", JSON.stringify(orders));

        alert("Order marked as bagged!");
        location.reload();
    };

    div.appendChild(heading);
    div.appendChild(lane);
    div.appendChild(items);
    div.appendChild(button);
    div.appendChild(document.createElement("hr"));

    baggingDiv.appendChild(div);
});

if (baggingDiv.children.length === 0) {
    baggingDiv.textContent = "No drive-thru food orders to bag.";
}
