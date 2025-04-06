const cloakBtn = document.getElementById('cloakBtn');

cloakBtn.addEventListener('click', () => {
    document.title = "Google";
    document.getElementById('cloak').href = 
        `https://www.google.com/favicon.ico?${Date.now()}`;
});