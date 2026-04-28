let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD */
function addToCart(name, price){
    cart.push({name, price});
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added!");
}

/* CART */
function renderCart(){
    let box = document.getElementById("cartBox");
    if(!box) return;

    let total = 0;
    box.innerHTML = "";

    if(cart.length === 0){
        box.innerHTML = "<p>Cart is empty</p>";
        return;
    }

    cart.forEach(item=>{
        total += item.price;
        box.innerHTML += `
        <div class="card">
            <h3>${item.name}</h3>
            <p>₱${item.price}</p>
        </div>`;
    });

    box.innerHTML += `<h2>Total: ₱${total}</h2>`;
}

/* CHECKOUT */
function checkout(){
    localStorage.setItem("receipt", JSON.stringify(cart));
    window.location.href = "receipt.html";
}

/* RECEIPT */
function loadReceipt(){
    let data = JSON.parse(localStorage.getItem("receipt")) || [];
    let box = document.getElementById("receiptBox");

    let total = 0;
    box.innerHTML = "";

    data.forEach(item=>{
        total += item.price;
        box.innerHTML += `<p>${item.name} - ₱${item.price}</p>`;
    });

    box.innerHTML += `<hr><h2>Total: ₱${total}</h2>`;
}

/* GO CONTACT */
function goContact(){
    window.location.href = "contact.html";
}

/* SEARCH */
function searchFood(){
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(c=>{
        c.style.display = c.innerText.toLowerCase().includes(input) ? "block" : "none";
    });
}

/* MENU */
function toggleMenu(){
    document.getElementById("menuDrop").classList.toggle("show");
}

window.onclick = function(e){
    if(!e.target.matches('.dropbtn')){
        document.getElementById("menuDrop").classList.remove("show");
    }
};