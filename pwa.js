// pwa.js
document.addEventListener('DOMContentLoaded', () => {
    const popups = document.querySelectorAll('.popup');
    const buttons = document.querySelectorAll('footer button');
    let activePopup = null; // 현재 열려 있는 팝업 추적

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const popupId = button.getAttribute('data-popup');
            const targetPopup = document.getElementById(popupId);
            if (!targetPopup) return;

            // 같은 팝업이 이미 열려있으면 닫기
            if (activePopup === targetPopup) {
                targetPopup.classList.remove('show');
                activePopup = null;
                return;
            }

            // 모든 팝업 닫기
            popups.forEach(popup => popup.classList.remove('show'));

            // 새로운 팝업 열기
            targetPopup.classList.add('show');
            activePopup = targetPopup;
        });
    });
});
