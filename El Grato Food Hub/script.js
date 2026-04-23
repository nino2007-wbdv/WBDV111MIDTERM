let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

// VIEW CART TOTAL (optional display function)
function getTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
}

// CHECKOUT
function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const order = {
        items: cart,
        total: getTotal()
    };

    localStorage.setItem("order", JSON.stringify(order));
    localStorage.removeItem("cart");

    window.location.href = "receipt.html";
}

// DROPDOWN MENU
function toggleMenu() {
    document.getElementById("menuDropdown").classList.toggle("show");
}

window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
        const menu = document.getElementById("menuDropdown");
        if (menu) menu.classList.remove("show");
    }
}