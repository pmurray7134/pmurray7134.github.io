// scripts/generate_html.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("introForm");
  const generateBtn = document.getElementById("generateHtmlBtn");
  const mainHeading = document.querySelector("main h2");
  const submittedContent = document.getElementById("submittedContent");

  generateBtn.addEventListener("click", () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Handle multiple courses (if user added more)
    const courses = [];
    document.querySelectorAll("#coursesContainer .course").forEach(course => {
      const dept = course.querySelector("[name='dept']").value;
      const number = course.querySelector("[name='number']").value;
      const name = course.querySelector("[name='courseName']").value;
      const reason = course.querySelector("[name='reason']").value;
      courses.push({ dept, number, name, reason });
    });

    // Generate HTML content string
    let htmlOutput = `
<section class="introduction">
  <h2>${data.firstName} ${data.lastName}'s Introduction</h2>
  <img src="${document.getElementById("previewImage").src}" alt="${data.caption}" style="max-width:200px;border-radius:8px;">
  <p><strong>Nickname:</strong> ${data.nickname || "N/A"}</p>
  <p><strong>Acknowledgment:</strong> ${data.ackStatement} (${data.ackDate})</p>
  <p><strong>Mascot:</strong> The ${data.mascotAdj} ${data.mascotAnimal}</p>
  <h3>Personal Statement</h3>
  <p>${data.personalStatement}</p>
  <h3>Main Bullets</h3>
  <pre>${data.mainBullets}</pre>
  <h3>Courses</h3>
  <ul>
    ${courses.map(c => `<li>${c.dept} ${c.number}: ${c.name} — ${c.reason}</li>`).join("")}
  </ul>
  <blockquote>
    "${data.quote}" — ${data.quoteAuthor}
  </blockquote>
  ${data.funnyThing ? `<p><strong>Funny Thing:</strong> ${data.funnyThing}</p>` : ""}
  ${data.somethingToShare ? `<p><strong>Something to share:</strong> ${data.somethingToShare}</p>` : ""}
  <h3>Links</h3>
  <ul>
    ${[data.link1, data.link2, data.link3, data.link4, data.link5]
      .filter(l => l)
      .map(l => `<li><a href="${l}" target="_blank">${l}</a></li>`)
      .join("")}
  </ul>
</section>`;

    // Display as highlighted HTML code
    mainHeading.textContent = "Introduction HTML";

    submittedContent.innerHTML = `
      <section id="generatedSection">
        <h3>Generated HTML Code:</h3>
        <pre><code class="language-html">${escapeHtml(htmlOutput)}</code></pre>
      </section>
    `;

    // Load Highlight.js if not already loaded
    if (!window.hljs) {
      const hljsLink = document.createElement("link");
      hljsLink.rel = "stylesheet";
      hljsLink.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css";
      document.head.appendChild(hljsLink);

      const hljsScript = document.createElement("script");
      hljsScript.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js";
      hljsScript.onload = () => hljs.highlightAll();
      document.body.appendChild(hljsScript);
    } else {
      hljs.highlightAll();
    }

    // Hide the form
    form.style.display = "none";
  });

  // Helper function to safely escape HTML
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
});
