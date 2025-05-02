(function () {
  function fakeAboutBlank() {
    // Change page title
    document.title = 'about:blank';

    // Replace URL to show "about:blank" in address bar
    if (location.pathname !== '/about:blank') {
      history.replaceState({}, '', '/about:blank');
    }

    // Remove favicon from tab
    const links = document.querySelectorAll("link[rel~='icon']");
    links.forEach(link => link.remove());

    // Optional: Clear favicon from memory by re-adding a blank one
    const blankFavicon = document.createElement('link');
    blankFavicon.rel = 'icon';
    blankFavicon.href = 'data:,';
    document.head.appendChild(blankFavicon);
  }

  // Auto-run when page loads
  window.addEventListener('DOMContentLoaded', fakeAboutBlank);
  window.addEventListener('popstate', fakeAboutBlank);

  // Optional: Allow calling from button
  window.fakeAboutBlank = fakeAboutBlank;
})();
