
let currentOrder = [];
let total = 0;

// Display menu items
const menuDiv = document.getElementById("menu-items");

menu.forEach(function(item) {
    let button = document.createElement("button");

    button.textContent = item.name + " - $" + item.price.toFixed(2);

    button.onclick = function() {
        addItem(item);
    };

    menuDiv.appendChild(button);
});

// Add an item to the order
function addItem(item) {
    currentOrder.push(item);
    total += item.price;

    displayOrder();
}

// Display current order
function displayOrder() {
    const orderDiv = document.getElementById("order-items");

    orderDiv.innerHTML = "";

    currentOrder.forEach(function(item) {
        let p = document.createElement("p");
        p.textContent = item.name + " - $" + item.price.toFixed(2);
        orderDiv.appendChild(p);
    });

    document.getElementById("total").textContent = total.toFixed(2);
}

// Save the order
document.getElementById("store-order").onclick = function() {

    if (currentOrder.length === 0) {
        alert("Please select an item first.");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let newOrder = {
        id: Date.now(),
        lane: laneNumber,
        items: currentOrder,
        total: total,
        status: "Stored"
    };

    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Order stored!");

    currentOrder = [];
    total = 0;

    displayOrder();
};
