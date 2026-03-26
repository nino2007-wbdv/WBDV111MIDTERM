function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "Invalid login!";
    }
}

function showTab(tabId) {
    let tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => tab.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
}

function logout() {
    window.location.href = "index.html";
}