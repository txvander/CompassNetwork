"use strict";

/**
 * The default service worker script, in this case, using the Ultraviolet setup.
 */
const stockSW = "/static/uv-sw.js";

/**
 * List of hostnames that are allowed to run service workers on http:
 */
const swAllowedHostnames = ["localhost", "127.0.0.1"];

/**
 * Register service worker
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
  await navigator.serviceWorker.register(stockSW, {
    scope: __uv$config.prefix
  });
}

// Call the registerSW function to register the service worker
registerSW().catch((error) => {
  console.error("Service Worker registration failed: ", error);
});
