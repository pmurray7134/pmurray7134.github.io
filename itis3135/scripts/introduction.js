document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("introForm");
  const addCourseBtn = document.getElementById("addCourseBtn");
  const coursesContainer = document.getElementById("coursesContainer");


  form.addEventListener("submit", (e) => {
    e.preventDefault();
    displayFormData();
  });


  addCourseBtn.addEventListener("click", () => {
    const courseDiv = document.createElement("div");
    courseDiv.classList.add("course");
    courseDiv.innerHTML = `
      <label>Department: <input type="text" name="dept" required></label>
      <label>Number: <input type="text" name="number" required></label>
      <label>Name: <input type="text" name="courseName" required></label>
      <label>Reason: <input type="text" name="reason" required></label>
      <button type="button" class="deleteCourseBtn">Delete</button>
    `;
    coursesContainer.appendChild(courseDiv);


    courseDiv.querySelector(".deleteCourseBtn").addEventListener("click", () => {
      coursesContainer.removeChild(courseDiv);
    });
  });


  document.querySelector("button[type='clear']").addEventListener("click", () => {
    Array.from(form.querySelectorAll("input, textarea")).forEach(el => {
      el.value = "";
    });
  });


  function displayFormData() {
    const formData = new FormData(form);
    let output = "<h3>Form Submission Result:</h3><ul>";
    for (const [key, value] of formData.entries()) {
      output += `<li><strong>${key}:</strong> ${value}</li>`;
    }
    output += "</ul><a href='' onclick='location.reload()'>Reset Form</a>";
    document.getElementById("submittedContent").innerHTML = output;
    form.style.display = "none";
  }
});

const pictureInput = document.getElementById("pictureInput");
const previewImage = document.getElementById("previewImage");

pictureInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    previewImage.src = "images/default.jpg";
  }
});
