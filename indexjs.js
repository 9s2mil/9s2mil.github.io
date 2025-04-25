function checkPassword() {
    const input = document.getElementById("password").value;

    switch (input) {
        case "1234":
            window.location.href = "/%암기복습노트/source/Study.html";
            break;
        case "5678":
            window.location.href = "/%암기복습노트/source/to.html"; 
            break;
        case "abcd":
            window.location.href = "/%암기복습노트/source/next.html";
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
        checkPassword(); // 로그인 버튼 클릭 기능 수행
    }
});
