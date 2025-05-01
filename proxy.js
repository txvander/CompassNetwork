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
  
  function getSearchEngineUrl(engine, query) {
    const encodedQuery = encodeURIComponent(query);
    switch (engine) {
      case "google":
        return `https://www.google.com/search?q=${encodedQuery}`;
      case "bing":
        return `https://www.bing.com/search?q=${encodedQuery}`;
      case "brave":
        return `https://search.brave.com/search?q=${encodedQuery}`;
      default:
        return `https://duckduckgo.com/?q=${encodedQuery}`;
    }
  }
  
  function handleSearch(event) {
    event.preventDefault();
  
    const input = document.getElementById("uv-address").value.trim();
    const searchEngine = localStorage.getItem("searchEngine") || "duckduckgo";
  
    if (!input) return;
  
    let finalUrl;
  
    if (isValidUrl(input)) {
      finalUrl = input.startsWith("http") ? input : `https://${input}`;
    } else if (isLikelyDomain(input)) {
      finalUrl = `https://${input}`;
    } else {
      finalUrl = getSearchEngineUrl(searchEngine, input);
    }
  
    window.location.href = `/tabs.html#${encodeURIComponent(finalUrl)}`;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("searchEngineSelect");
  
    if (select) {
      // Load and apply saved search engine
      const saved = localStorage.getItem("searchEngine") || "duckduckgo";
      select.value = saved;
  
      // Save on change
      select.addEventListener("change", () => {
        localStorage.setItem("searchEngine", select.value);
      });
    }
  
    // Optional: bind handleSearch to form submission
    const form = document.getElementById("uv-form");
    if (form) {
      form.addEventListener("submit", handleSearch);
    }
  });
  