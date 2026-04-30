
// =========================
// DROPDOWN
// =========================
function toggleMenu(){
    document.getElementById("menuDrop").classList.toggle("show");
}

// =========================
// CART SYSTEM
// =========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(item, price){
    cart.push({item, price});
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(item + " added to cart!");
}

// =========================
// SIZED ITEM
// =========================
function addSizedItem(itemName, selectId){
    let select = document.getElementById(selectId);
    let value = select.value;

    let parts = value.split("-");
    let size = parts[0];
    let price = parseFloat(parts[1]);

    cart.push({
        item: itemName + " (" + size + ")",
        price: price
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(itemName + " added to cart!");
}

// =========================
// PROMO ITEM
// =========================
function addPromoItem(itemName, selectId){
    let select = document.getElementById(selectId);
    let value = select.value;

    let parts = value.split("-");
    let promo = parts[0];
    let price = parseFloat(parts[1]);

    cart.push({
        item: itemName + " (" + promo + ")",
        price: price
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(itemName + " added to cart!");
}

// =========================
// CHECKOUT + SALES
// =========================
function checkout(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }

    let total = 0;
    let foodSales = JSON.parse(localStorage.getItem("foodSales")) || {};
    let sales = parseFloat(localStorage.getItem("sales")) || 0;

    cart.forEach(c => {
        total += c.price;

        if(foodSales[c.item]){
            foodSales[c.item] += 1;
        } else {
            foodSales[c.item] = 1;
        }
    });

    localStorage.setItem("foodSales", JSON.stringify(foodSales));
    localStorage.setItem("sales", sales + total);

    alert("Order Complete! Total: ₱" + total);

    localStorage.removeItem("cart");
}

// =========================
// REGISTER (MULTI USER FIX)
// =========================
function register(){
    let user = document.getElementById("user").value.trim();
    let pass = document.getElementById("pass").value.trim();

    if(user === "" || pass === ""){
        alert("Fill all fields!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(u => u.user === user);
    if(exists){
        alert("Username already exists!");
        return;
    }

    users.push({user, pass});
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully!");
    window.location.href = "login.html";
}

// =========================
// LOGIN (FIXED)
// =========================
function login(){
    let user = document.getElementById("user").value.trim();
    let pass = document.getElementById("pass").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ADMIN
    if(user === "admin" && pass === "1234"){
        localStorage.setItem("role", "admin");
        window.location.href = "admin.html";
        return;
    }

    // USER
    let found = users.find(u => u.user === user && u.pass === pass);

    if(found){
        localStorage.setItem("role", "user");
        localStorage.setItem("currentUser", user);
        window.location.href = "index.html";
    } else {
        alert("Wrong login!");
    }
}

// =========================
// LOGOUT
// =========================
function logout(){
    localStorage.removeItem("role");
    window.location.href = "login.html";
}

// =========================
// AUTH UI
// =========================
function updateAuthUI(){
    let role = localStorage.getItem("role");

    let authLinks = document.getElementById("authLinks");
    let logoutBtn = document.getElementById("logoutBtn");

    if(role){
        if(authLinks) authLinks.style.display = "none";
        if(logoutBtn) logoutBtn.style.display = "inline";
    } else {
        if(authLinks) authLinks.style.display = "inline";
        if(logoutBtn) logoutBtn.style.display = "none";
    }
}

// =========================
// ADMIN DASHBOARD
// =========================
function loadAdminDashboard(){
    let sales = parseFloat(localStorage.getItem("sales")) || 0;
    let foodSales = JSON.parse(localStorage.getItem("foodSales")) || {};

    let salesEl = document.getElementById("totalSales");
    let foodEl = document.getElementById("foodSalesList");

    if(salesEl){
        salesEl.innerText = "₱" + sales.toFixed(2);
    }

    if(foodEl){
        foodEl.innerHTML = "";

        Object.keys(foodSales).forEach(item => {
            foodEl.innerHTML += `
                <div class="card">
                    <h4>${item}</h4>
                    <p>Sold: ${foodSales[item]}</p>
                </div>
            `;
        });
    }
}

// =========================
// AUTO RUN
// =========================
document.addEventListener("DOMContentLoaded", function(){
    updateAuthUI();
    loadAdminDashboard();
});

// LIVE UPDATE ADMIN
setInterval(function(){
    if(document.getElementById("totalSales")){
        loadAdminDashboard();
    }
}, 2000);