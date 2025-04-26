"use strict";

/**
 * List of hostnames that are allowed to run service workers on http:
 */
const swAllowedHostnames = ["localhost", "127.0.0.1"];

/**
 * Global util
 * Used in 404.html and index.html
 */
async function registerSW() {
  if (
    location.protocol !== "https:" &&
    !swAllowedHostnames.includes(location.hostname)
  )
    throw new Error("Service workers cannot be registered without https.");

  if (!navigator.serviceWorker)
    throw new Error("Your browser doesn't support service workers.");

  // Ultraviolet has a stock `sw.js` script.
  await navigator.serviceWorker.register("/static/uv-sw.js", {
    scope: __uv$config.prefix
  });
}

// Form handling code
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
