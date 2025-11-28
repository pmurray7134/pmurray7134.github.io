// include.js — loads header/footer, then runs headerInit()

document.addEventListener("DOMContentLoaded", async () => {
  const includes = document.querySelectorAll("[data-include]");

  // Load all includes (header, footer, etc.)
  for (const el of includes) {
    const file = el.getAttribute("data-include");

    try {
      const response = await fetch(file, { cache: "no-store" });
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      const html = await response.text();
      el.innerHTML = html;
    } catch (err) {
      console.error(err);
      el.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
    }
  }

  // 🔥 IMPORTANT: Now that the header is loaded, run the header JS
  if (typeof window.headerInit === "function") {
    window.headerInit();
  }
});
