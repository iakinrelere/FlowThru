
let currentOrder = [];
let total = 0;

const menuDiv = document.getElementById("menu-items");

// Display menu
menu.forEach(function(item) {
    let button = document.createElement("button");

    button.textContent = item.name + " - $" + item.price.toFixed(2);

    button.onclick = function() {
        currentOrder.push(item);
        total += item.price;
        displayOrder();
    };

    menuDiv.appendChild(button);
});

// Display current order
function displayOrder() {
    let orderDiv = document.getElementById("order-items");
    orderDiv.innerHTML = "";

    currentOrder.forEach(function(item) {
        let p = document.createElement("p");
        p.textContent = item.name + " - $" + item.price.toFixed(2);
        orderDiv.appendChild(p);
    });

    document.getElementById("total").textContent = total.toFixed(2);
}

// Submit order
document.getElementById("submit-order").onclick = function() {
    if (currentOrder.length === 0) {
        alert("Please select an item first.");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let newOrder = {
        id: Date.now(),
        type: document.getElementById("order-type").value,
        items: currentOrder,
        total: total,
        status: "Submitted"
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Front counter order submitted!");

    currentOrder = [];
    total = 0;
    displayOrder();
};
