"use strict";

// Wait for the DOM to fully load
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uv-form");
  const address = document.getElementById("uv-address");
  const searchEngine = document.getElementById("uv-search-engine");

  // Check if the form and elements exist
  if (!form || !address || !searchEngine) {
    console.error("Form elements not found! Please make sure the HTML is correct.");
    return;
  }

  // Check if input is a valid URL
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  function isLikelyDomain(input) {
    return /^([a-z0-9-]+\.)+[a-z]{2,}$/i.test(input);
  }

  // Handle form submit
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = address.value.trim();
    const engineTemplate = searchEngine.value;
    let finalUrl;

    if (isValidUrl(input)) {
      finalUrl = input.startsWith("http") ? input : `https://${input}`;
    } else if (isLikelyDomain(input)) {
      finalUrl = `https://${input}`;
    } else {
      finalUrl = engineTemplate.replace('%s', encodeURIComponent(input));
    }

    // Redirect to tabs.html with encoded URL in the hash
    window.location.href = `/tabs.html#${encodeURIComponent(finalUrl)}`;
  });
});
