// scripts/generate_json.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("introForm");
  const generateBtn = document.getElementById("generateJsonBtn");
  const mainHeading = document.querySelector("main h2");
  const submittedContent = document.getElementById("submittedContent");

  generateBtn.addEventListener("click", () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Collect multiple course fields
    const courses = [];
    document.querySelectorAll("#coursesContainer .course").forEach(course => {
      const dept = course.querySelector("[name='dept']").value;
      const number = course.querySelector("[name='number']").value;
      const name = course.querySelector("[name='courseName']").value;
      const reason = course.querySelector("[name='reason']").value;
      courses.push({ dept, number, name, reason });
    });

    // Collect link fields
    const links = [data.link1, data.link2, data.link3, data.link4, data.link5].filter(Boolean);

    // Prepare the JSON structure
    const jsonObject = {
      basicInfo: {
        firstName: data.firstName,
        middleName: data.middleName,
        nickname: data.nickname,
        lastName: data.lastName,
        acknowledgment: {
          statement: data.ackStatement,
          date: data.ackDate
        }
      },
      mascot: {
        adjective: data.mascotAdj,
        animal: data.mascotAnimal,
        divider: data.divider
      },
      image: {
        src: document.getElementById("previewImage").src,
        caption: data.caption
      },
      personalInfo: {
        statement: data.personalStatement,
        mainBullets: data.mainBullets
      },
      courses: courses,
      extras: {
        quote: data.quote,
        quoteAuthor: data.quoteAuthor,
        funnyThing: data.funnyThing,
        somethingToShare: data.somethingToShare
      },
      links: links
    };

    // Convert to formatted JSON text
    const jsonText = JSON.stringify(jsonObject, null, 2);

    // Replace form with JSON code section
    mainHeading.textContent = "Introduction JSON";
    form.style.display = "none";

    submittedContent.innerHTML = `
      <section id="generatedJSON">
        <h3>Generated JSON:</h3>
        <pre><code class="language-json">${escapeHtml(jsonText)}</code></pre>
      </section>
    `;

    // Load Highlight.js dynamically if not present
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
  });

  // Escape HTML characters inside the JSON string
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
});
