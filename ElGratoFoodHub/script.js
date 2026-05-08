// ================= AUTH =================
function getRole() {
    return localStorage.getItem("role");
}

function getUser() {
    return localStorage.getItem("currentUser");
}

// ================= LOGIN CHECK =================
function requireLogin() {
    if (!getRole()) {
        alert("❌ Please log in first!");
        window.location.href = "login.html";
        return false;
    }
    return true;
}

// ================= ADD TO CART =================
function addToCart(name, selectId) {
    if (!requireLogin()) return; // 🔥 Stop if not logged in

    const select = document.getElementById(selectId);
    if (!select || !select.value) {
        alert("⚠ Please select a size!");
        return;
    }

    const [price, size] = select.value.split("-");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Increase qty if same item+size exists
    let existing = cart.find(item => item.name === name && item.size === size);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price: Number(price), size, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ ${name} added to cart!`);
}

// ================= CART COUNT =================
function getCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((total, item) => total + item.qty, 0);
}

// ================= CHECKOUT =================
function checkout() {
    if (!requireLogin()) return; // 🔥 Stop if not logged in

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    // Redirect to TikTok-style checkout page
    window.location.href = "checkout.html";
}

// ================= LOGOUT =================
function logout() {
    localStorage.removeItem("role");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}

// ================= NAVBAR AUTO SWITCH =================
document.addEventListener("DOMContentLoaded", function () {
    const authLink = document.getElementById("authLink");
    if (!authLink) return;

    if (getRole()) {
        authLink.textContent = "LOGOUT";
        authLink.href = "#";
        authLink.onclick = e => { e.preventDefault(); logout(); };
    } else {
        authLink.textContent = "LOGIN";
        authLink.href = "login.html";
        authLink.onclick = null;
    }
});