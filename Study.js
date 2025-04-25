let randomMode = false;
let randomSequence = [];
let randomIndex = 0;
let randomPlayInterval = null;

//⚔️메인 주제열기
function openPopup(num) {
    var curtain = document.querySelector('.curtain'); 
        document.getElementById(`title${num}-1`).style.display = "block";
        curtain.style.display = "block"; 
        updateGoToPopupButtonLabel();

}
function title1Open() { openPopup(1); }
function title2Open() { openPopup(2); }
function title3Open() { openPopup(3); }
function title4Open() { openPopup(4); }
function title5Open() { openPopup(5); }
function title6Open() { openPopup(6); }
function title7Open() { openPopup(7); }
function title8Open() { openPopup(8); }

//헤더 버튼
//🌊페이지 이동 팝업열기
function goToPopup() {
    const popup = document.getElementById("goToPopup");
    popup.style.display = "block";
    
    // 팝업 열리자마자 인풋창에 자동으로 포커스를 줌
    const inputElement = document.getElementById("popupMoveInput");
    if (inputElement) {
        inputElement.focus();
    }
}
//🌊페이지 이동 팝업닫기
function closeGoToPopup() {
    const popup = document.getElementById("goToPopup");
        popup.style.display = "none";
}
//🌊페이지 이동 버튼 이름 변경
function updateGoToPopupButtonLabel() {
    const button = document.getElementById("goToPopupButton");
    const currentPopup = document.querySelector(".popup[style*='display: block']");

    if (!button) return;

    if (!currentPopup) {
        button.textContent = "🌊";
        return;
    }

    const match = currentPopup.id.match(/title(\d+)-(\d+)/);
    if (!match) {
        button.textContent = "🌊";
        return;
    }

    let x = match[1];
    let y = parseInt(match[2]);
    let maxY = 1;

    document.querySelectorAll(`.popup[id^="title${x}-"]`).forEach(popup => {
        const matchInner = popup.id.match(/title\d+-(\d+)/);
        if (matchInner) {
            let yVal = parseInt(matchInner[1]);
            if (yVal > maxY) maxY = yVal;
        }
    });

    button.textContent = `${y}/${maxY}`;
}
//🌊페이지 이동 로직
function moveToSpecificPopup() {
    const input = document.getElementById("popupMoveInput");
    const valueRaw = input.value.trim();
    const value = parseInt(valueRaw, 10);

    // 현재 열린 팝업 찾기
    const currentPopup = document.querySelector(".popup[style*='display: block']");
    if (!currentPopup) return;

    const match = currentPopup.id.match(/title(\d+)-(\d+)/);
    if (!match) return;

    const x = match[1];

    // 같은 x 그룹의 최대 y 찾기
    let maxY = 1;
    document.querySelectorAll(`.popup[id^="title${x}-"]`).forEach(popup => {
        const innerMatch = popup.id.match(/title\d+-(\d+)/);
        if (innerMatch) {
            const yVal = parseInt(innerMatch[1]);
            if (yVal > maxY) maxY = yVal;
        }
    });

    // 입력값이 없을 경우 -> 1번 팝업으로 이동
    if (valueRaw === "") {
        const newPopup = document.getElementById(`title${x}-1`);
        if (newPopup) {
            currentPopup.style.display = "none";
            newPopup.style.display = "block";

            updateGoToPopupButtonLabel();
            closeGoToPopup();
            input.value = "";

            // 금색 번쩍임
            triggerGoldFlash(newPopup);
        }
        return;
    }

    // 입력값이 유효 범위 내일 경우
    if (value >= 1 && value <= maxY) {
        const newPopup = document.getElementById(`title${x}-${value}`);
        if (newPopup) {
            currentPopup.style.display = "none";
            newPopup.style.display = "block";

            updateGoToPopupButtonLabel();
            closeGoToPopup();
            input.value = "";

            // 금색 번쩍임
            triggerGoldFlash(newPopup);
        }
    }
}
//🌊페이지 이동 후 애니메이션
function triggerGoldFlash(element) {
    element.classList.add("gold-flash");
    setTimeout(() => {
        element.classList.remove("gold-flash");
    }, 700); // 애니메이션 끝난 후 제거
}
//🌪️랜덤플레이/정상화
function randomPopupOpen() {
    randomMode = !randomMode;
    console.log("랜덤 모드:", randomMode ? "ON" : "OFF");

    const button = document.getElementById("randomPlayButton");
    if (randomMode) {

        const currentPopup = document.querySelector(".popup[style*='display: block']");
        if (!currentPopup) return;

        const match = currentPopup.id.match(/title(\d+)-(\d+)/);
        if (!match) return;

        let x = match[1];
        let maxY = 1;

        document.querySelectorAll(`.popup[id^="title${x}-"]`).forEach(popup => {
            const match = popup.id.match(/title\d+-(\d+)/);
            if (match) {
                let y = parseInt(match[1]);
                if (y > maxY) maxY = y;
            }
        });

        randomSequence = Array.from({ length: maxY }, (_, i) => i + 1);
        shuffle(randomSequence);
        randomIndex = 0;
        console.log(`랜덤 순서 (title${x}):`, randomSequence);
    } else {
        randomSequence = [];
        randomIndex = 0;
    }
}
//🌪️랜덤플레이
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
//🌪️랜덤플레이
function goToNextRandomPopup(x) {
    if (!randomMode || randomIndex >= randomSequence.length) return;

    const currentPopup = document.querySelector(".popup[style*='display: block']");
    const nextY = randomSequence[randomIndex];
    randomIndex++;

    const newPopup = document.getElementById(`title${x}-${nextY}`);
    if (newPopup && currentPopup !== newPopup) {
        currentPopup.style.display = "none";
        newPopup.style.display = "block";
        updateGoToPopupButtonLabel();
        triggerGoldFlash(newPopup);
    }

    if (randomIndex >= randomSequence.length) {
        shuffle(randomSequence);
        randomIndex = 0;
        console.log("랜덤 순서 재생성:", randomSequence);
    }
}
//❄️휘장 보이기/지우기
function curtainHidden() {
    var curtain = document.querySelector('.curtain'); 
    
    if (curtain.style.background === "rgba(0, 0, 0, 0)") {
        curtain.style.background = "linear-gradient(to bottom, #8B0000, #B22222)";
        curtain.style.border = "7px solid gold"; 
    } else {
        curtain.style.background = "rgba(0, 0, 0, 0)";  
        curtain.style.border = "none"; 
    }
    curtain.style.display = "block";
}
//⚡발음 보이기/가리기
function rtHidden() {
    const rtElements = document.querySelectorAll('rt');
    
    rtElements.forEach(function(rt) {
        if (rt.style.visibility === 'hidden' || rt.style.visibility === '') {
            rt.style.visibility = 'visible';
        } else {
            rt.style.visibility = 'hidden';
        }
    });
}
//🔥팝업닫기
function closePopup() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(function(popup) {
        popup.style.display = 'none';
    });
    var curtain = document.querySelector('.curtain'); 
        curtain.style.display = "none"; 
        updateGoToPopupButtonLabel();

}

//푸터 버튼
//🗡️이전 팝업 열기
function prevPopup() {
    movePopup(-1);
    var curtain = document.querySelector('.curtain'); 
    curtain.style.display = "block"; 
}
//🛡️휘장 올리기/내리기
function curtainUpDown() {
    var curtain = document.querySelector('.curtain'); 
    if (curtain.style.display === "none" || curtain.style.display === "") {
        curtain.style.display = "block"; 
    } else {
        curtain.style.display = "none"; 
    }
}
//⚔️다음 팝업 열기        
function nextPopup() {
    const currentPopup = document.querySelector(".popup[style*='display: block']");
    if (!currentPopup) return;

    const match = currentPopup.id.match(/title(\d+)-(\d+)/);
    if (!match) return;

    let x = match[1];
    let currentY = parseInt(match[2]);

    if (randomMode) {
        if (randomIndex >= randomSequence.length) {
            // 랜덤 시퀀스 끝나면 리셋
            shuffle(randomSequence);
            randomIndex = 0;
        }

        const nextY = randomSequence[randomIndex];
        randomIndex++;

        const nextPopup = document.getElementById(`title${x}-${nextY}`);
        if (nextPopup) {
            currentPopup.style.display = "none";
            nextPopup.style.display = "block";
            updateGoToPopupButtonLabel();
            var curtain = document.querySelector('.curtain'); 
            curtain.style.display = "block"; 
        }
    } else {
        // 기존 순차 방식
        const nextPopup = document.getElementById(`title${x}-${currentY + 1}`);
        if (nextPopup) {
            currentPopup.style.display = "none";
            nextPopup.style.display = "block";
            updateGoToPopupButtonLabel();
            var curtain = document.querySelector('.curtain'); 
            curtain.style.display = "block"; 
        }
    }
}
//🗡️/⚔️이전/다음 팝업 이동 함수
function movePopup(direction) {
    const currentPopup = document.querySelector(".popup[style*='display: block']");
    if (!currentPopup) return;

    const match = currentPopup.id.match(/title(\d+)-(\d+)/);
    if (!match) return;

    let x = match[1]; // 앞자리 숫자 (X)
    let y = parseInt(match[2]); // 현재 Y값

    if (randomMode) {
        // 랜덤 모드에서는 순서대로 이동
        let newIndex = randomIndex + direction;
        if (newIndex < 0 || newIndex >= randomSequence.length) return; // 범위 초과 방지
        
        randomIndex = newIndex;
        let newPopupId = `title${x}-${randomSequence[randomIndex]}`;
        let newPopup = document.getElementById(newPopupId);

        if (newPopup) {
            currentPopup.style.display = "none";
            newPopup.style.display = "block";
        }
    } else {
        // 일반 모드에서는 순차 이동
        let newPopupId = `title${x}-${y + direction}`;
        let newPopup = document.getElementById(newPopupId);

        if (newPopup) {
            currentPopup.style.display = "none";
            newPopup.style.display = "block";
        }
    }
    updateGoToPopupButtonLabel();

}

// 키보드 이벤트 추가
document.addEventListener("keydown", function (event) {
    //푸터 버튼 제어
    if (event.key === "ArrowLeft") {// 왼쪽 방향키: 이전 페이지🗡️
        document.getElementById("prevPopupButton").click();
    } else if (event.key === "ArrowRight") {// 오른쪽 방향키: 다음 페이지⚔️
        document.getElementById("nextPopupButton").click();
    }  else if (event.key === "Shift") {// 스페이스 바: 휘장 보이기/가리기🛡️
        document.getElementById("curtainUpDownButton").click();
    } 
    //헤더 버튼 제어
    else if (event.key === "F2") {// F2: 페이지 이동 팝업 열기🌊
        document.getElementById("goToPopupButton").click();
    }  else if (event.key === "Enter") {// Enter: 페이지 이동 버튼🌊
        const goToPopup = document.getElementById("goToPopup");
        if (goToPopup && goToPopup.style.display === "block") {
            document.getElementById("moveToSpecificPopupButton").click();
        }
    }  else if (event.key === "F4") {// 위쪽 방향키: 랜덤 페이지🌪️
        document.getElementById("randomPopupOpen").click();
    }  else if (event.key === "ArrowUp") {// 위쪽 방향키: 휘장 지우기/보이기❄️
        document.getElementById("curtainHiddenButton").click();
    }  else if (event.key === "ArrowDown") {// 아래쪽 방향기: 발음 가리기/보이기⚡
        document.getElementById("rtHiddenButton").click();
    }  else if (event.key === "Escape") {// Esc: 열린 팝업 닫기🔥
        const goToPopup = document.getElementById("goToPopup");
        
        if (goToPopup && goToPopup.style.display === "block") {
            document.getElementById("closeGoToPopupButton").click();
        } else {
            document.getElementById("closePopupButton").click();
        }
    }
    //메인 버튼 제어
    else if (event.ctrlKey && event.key >= 1 && event.key <= 8) { // ctrlKey + Number: 메인 팝업 열기⚔️
        const num = event.key;
        window[`title${num}Open`]();
    }
});

window.addEventListener('load', () => {
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 100);
  });
  
  