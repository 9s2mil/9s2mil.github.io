function checkPassword() {
    const input = document.getElementById("password").value;

    switch (input) {
        case "0001":
            window.location.href = "Study0.html";
            break;
        case "0002":
            window.location.href = "Study1.html"; 
            break;
        case "0003":
            window.location.href = "Study2.html";
            break;
        case "0004":
            window.location.href = "Study3.html";
            break;
        case "0005":
            window.location.href = "Study4.html";
            break;
        case "0006":
            window.location.href = "plan.html";
            break;
        default:
            showCustomAlert("비밀번호가 틀렸습니다");
            break;
    }
}

function showCustomAlert(message) {
    const alertBox = document.getElementById("customAlert");
    alertBox.textContent = message;
    alertBox.style.display = "block";
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 1000); 
}

document.getElementById("password").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
});

async function hardRefresh() {
    try {
        if ('caches' in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map(k => caches.delete(k)));
        }
        if ('serviceWorker' in navigator) {
            const regs = await navigator.serviceWorker.getRegistrations();
            await Promise.all(regs.map(r => r.unregister()));
        }
    } finally {
        window.location.reload();
    }
}

document.getElementById('hardReloadBtn')?.addEventListener('click', hardRefresh);