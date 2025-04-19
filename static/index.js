"use strict";

const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");

// Detect if input looks like a domain
function isLikelyDomain(input) {
  return /^([a-z0-9-]+\.)+[a-z]{2,}$/i.test(input.trim());
}

if (!form || !address || !searchEngine) {
  console.error("Form elements not found! Check your HTML.");
} else {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const rawInput = address.value.trim();
    const input = rawInput.toLowerCase();
    const engineTemplate = searchEngine.value;
    let finalUrl = "";

    if (input.startsWith("http://") || input.startsWith("https://")) {
      finalUrl = input;
    } else if (isLikelyDomain(input)) {
      finalUrl = "https://" + input;
    } else {
      finalUrl = engineTemplate.replace("%s", encodeURIComponent(rawInput));
    }

    // Go to tabs.html with final URL
    window.location.href = `/tabs.html#${encodeURIComponent(finalUrl)}`;
  });
}
