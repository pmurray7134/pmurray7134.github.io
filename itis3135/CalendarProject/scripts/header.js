// scripts/header.js
(function () {
  function initHeader() {
    // Dynamic navbar highlight
    const currentPage = document.body.dataset.page;
    if (currentPage) {
      const activeLink = document.querySelector(`[data-nav="${currentPage}"]`);
      if (activeLink) activeLink.classList.add("active");
    }

    // Dark mode toggle
    const toggleBtn = document.getElementById("themeToggle");
    if (!toggleBtn) return; // safety if header not present

    // set initial state from localStorage
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      toggleBtn.textContent = "☀️ Light Mode";
    } else {
      toggleBtn.textContent = "🌙 Dark Mode";
    }

    // avoid adding multiple listeners if initHeader runs more than once
    if (!toggleBtn.dataset.hasListener) {
      toggleBtn.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");
        toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
        localStorage.setItem("theme", isDark ? "dark" : "light");
      });
      toggleBtn.dataset.hasListener = "true";
    }
  }

  // expose to global so loader can call after injection
  window.headerInit = initHeader;
})();
