const faviconMap = {
    googleCloak: {
        title: "Google",
        icon: "https://www.google.com/favicon.ico" 
    },
    youtubeCloak: {
        title: "YouTube",
        icon: "images/Tabcloaks/yt2.png" 
    },
    desmosCloak: {
        title: "Desmos",
        icon: "images/Tabcloaks/desmos.png" 
    },
    newtabCloak:{
        title: "Newtab",
        icon:"images/Tabcloaks/newtab.png"
    },
};

function setFavicon(url) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
    }
    link.href = `${url}?t=${Date.now()}`;  
}

Object.keys(faviconMap).forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener('click', () => {
            const { title, icon } = faviconMap[id];
            document.title = title;
            setFavicon(icon);
        });
    }
});
