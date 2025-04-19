"use strict";

const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");

// Check if input is a valid URL object
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Check if input looks like a domain (e.g., github.com)
function isLikelyDomain(input) {
  return /^([a-z0-9-]+\.)+[a-z]{2,}$/i.test(input);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const input = address.value.trim();
  const engineTemplate = searchEngine.value;
  let finalUrl;

  if (isValidUrl(input)) {
    // User typed a full URL
    finalUrl = input.startsWith("http") ? input : `https://${input}`;
  } else if (isLikelyDomain(input)) {
    // User typed something like "youtube.com"
    finalUrl = `https://${input}`;
  } else {
    // Otherwise, treat it as a search query
    finalUrl = engineTemplate.replace('%s', encodeURIComponent(input));
  }

  // Navigate to /tabs.html with the URL in the hash
  window.location.href = `/tabs.html#${encodeURIComponent(finalUrl)}`;
});
