"use strict";

// Shortcuts UI Elements
const shortcutsContainer = document.getElementById("shortcuts-container");
const addShortcutBtn = document.getElementById("addShortcutBtn");
const addShortcutModal = document.getElementById("addShortcutModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const saveShortcutBtn = document.getElementById("saveShortcutBtn");
const nameInput = document.getElementById("shortcut-name");
const urlInput = document.getElementById("shortcut-url");

// Load saved shortcuts from localStorage
function loadShortcuts() {
  const shortcuts = JSON.parse(localStorage.getItem("shortcuts")) || [];
  shortcutsContainer.innerHTML = ''; // Clear current list

  shortcuts.forEach(shortcut => {
    const shortcutEl = document.createElement("div");
    shortcutEl.className = "shortcut";
    const urlWithProtocol = shortcut.url.startsWith('http') ? shortcut.url : `https://${shortcut.url}`;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${urlWithProtocol}&sz=64`;

    shortcutEl.innerHTML = `
      <img src="${faviconUrl}" style="width:24px;height:24px;vertical-align:middle;margin-right:5px;">
      <span style="color:white; text-decoration:none; vertical-align:middle; cursor:pointer;">${shortcut.name}</span>
    `;

    // When a shortcut is clicked, redirect to tabs.html with URL
    shortcutEl.onclick = () => {
      let finalUrl = shortcut.url.startsWith('http') ? shortcut.url : `https://${shortcut.url}`;
      window.location.href = `/tabs.html#${encodeURIComponent(finalUrl)}`;
    };

    // Right-click to delete shortcut (without showing an alert)
    shortcutEl.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      const contextMenu = document.createElement("div");
      contextMenu.classList.add("context-menu");
      contextMenu.innerHTML = `
        <div class="menu-item" onclick="deleteShortcut('${shortcut.url}')">Delete</div>
      `;
      document.body.appendChild(contextMenu);

      // Position context menu where the user clicked
      contextMenu.style.left = `${event.pageX}px`;
      contextMenu.style.top = `${event.pageY}px`;

      // Close context menu when clicking anywhere else
      window.addEventListener("click", () => {
        if (contextMenu) contextMenu.remove();
      }, { once: true });
    });

    shortcutsContainer.appendChild(shortcutEl);
  });
}

// Save a new shortcut to localStorage
function saveShortcut() {
  const name = nameInput.value.trim();
  let url = urlInput.value.trim();

  // If fields are empty, simply do nothing (no alert, no message)
  if (name && url) {
    if (!url.startsWith('http')) {
      url = `https://${url}`;
    }

    const shortcuts = JSON.parse(localStorage.getItem("shortcuts")) || [];
    shortcuts.push({ name, url });
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));

    // Clear the form fields
    nameInput.value = '';
    urlInput.value = '';

    loadShortcuts();
    closeModal();
  }
}

// Open the modal to add a new shortcut
function openModal() {
  addShortcutModal.style.display = "flex";
}

// Close the modal
function closeModal() {
  addShortcutModal.style.display = "none";
}

// Event Listeners
addShortcutBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
saveShortcutBtn.addEventListener("click", saveShortcut);

// Load shortcuts on page load
window.addEventListener("DOMContentLoaded", loadShortcuts);

// Optional: close modal by clicking outside
window.addEventListener("click", (e) => {
  if (e.target == addShortcutModal) {
    closeModal();
  }
});

// Delete a shortcut from localStorage
function deleteShortcut(url) {
  const shortcuts = JSON.parse(localStorage.getItem("shortcuts")) || [];
  const updatedShortcuts = shortcuts.filter(shortcut => shortcut.url !== url);
  localStorage.setItem("shortcuts", JSON.stringify(updatedShortcuts));
  loadShortcuts();
}
