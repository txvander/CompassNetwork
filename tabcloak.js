
const originalTitle = document.title;  
const originalFavicon = document.querySelector("link[rel~='icon']").href;  // The original favicon URL

const faviconMap = {
  googleCloak: {
    title: "Google",
    icon: "https://www.google.com/favicon.ico",
  },
  youtubeCloak: {
    title: "YouTube",
    icon: "images/Tabcloaks/yt2.png",
  },
  desmosCloak: {
    title: "Desmos",
    icon: "images/Tabcloaks/desmos.png",
  },
  newtabCloak: {
    title: "Newtab",
    icon: "images/Tabcloaks/newtab.png",
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

function applyCloak(cloakId) {
  const { title, icon } = faviconMap[cloakId];
  document.title = title;
  setFavicon(icon);
  localStorage.setItem("tabCloak", cloakId);  
}


function resetToDefault() {
  document.title = originalTitle;  
  setFavicon(originalFavicon);    
  localStorage.removeItem("tabCloak");
}


Object.keys(faviconMap).forEach((id) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("click", () => applyCloak(id));
  }
});

const resetBtn = document.getElementById("resetCloak");
if (resetBtn) {
  resetBtn.addEventListener("click", resetToDefault);
}

window.addEventListener("DOMContentLoaded", () => {
  const savedCloak = localStorage.getItem("tabCloak");
  if (savedCloak && faviconMap[savedCloak]) {
    applyCloak(savedCloak);
  }
});
