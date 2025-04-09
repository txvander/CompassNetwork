// Store the original title and favicon
const originalTitle = document.title;  // The original title
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

// Function to set favicon
function setFavicon(url) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = `${url}?t=${Date.now()}`;  // Adding a timestamp to prevent caching
}

// Function to apply a cloak (title and favicon)
function applyCloak(cloakId) {
  const { title, icon } = faviconMap[cloakId];
  document.title = title;
  setFavicon(icon);
  localStorage.setItem("tabCloak", cloakId);  // Save selected cloak to localStorage
}

// Function to reset to the default title and favicon
function resetToDefault() {
  document.title = originalTitle;  // Reset the title to the original
  setFavicon(originalFavicon);    // Reset the favicon to the original
  localStorage.removeItem("tabCloak");  // Remove saved cloak from localStorage
}

// Add event listeners to the cloak buttons
Object.keys(faviconMap).forEach((id) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("click", () => applyCloak(id));
  }
});

// Add event listener for the "reset" button
const resetBtn = document.getElementById("resetCloak");
if (resetBtn) {
  resetBtn.addEventListener("click", resetToDefault);
}

// When the DOM is loaded, check if a cloak is saved in localStorage
window.addEventListener("DOMContentLoaded", () => {
  const savedCloak = localStorage.getItem("tabCloak");
  if (savedCloak && faviconMap[savedCloak]) {
    applyCloak(savedCloak);
  }
});
