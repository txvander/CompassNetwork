function refreshClock() {
    const clockElement = document.querySelector('#clock');
    if (!clockElement) return; 
    const now = new Date();
    let hrs = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    const period = hrs >= 12 ? 'PM' : 'AM'; 
    hrs = hrs % 12 || 12;
    clockElement.innerText = `${hrs}:${mins}:${secs} ${period}`;
}

window.refreshClock = refreshClock;
setInterval(refreshClock, 1000);
refreshClock();