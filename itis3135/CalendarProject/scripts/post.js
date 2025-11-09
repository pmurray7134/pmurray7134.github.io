// post.js — handles study plan submissions and saves them to localStorage

const form = document.getElementById("studyForm");
const confirmation = document.getElementById("confirmation");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const description = document.getElementById("description").value.trim();

  if (!title || !date) {
    alert("Please fill out all required fields.");
    return;
  }

  const newEvent = {
    title,
    date,
    time,
    description,
    completed: false // <- Add this flag for cross-off functionality
  };

  // Save to localStorage
  const events = JSON.parse(localStorage.getItem("studyPlans")) || [];
  events.push(newEvent);
  localStorage.setItem("studyPlans", JSON.stringify(events));

  // Show confirmation message
  confirmation.classList.remove("hidden");
  form.reset();

  // Hide message after a few seconds
  setTimeout(() => confirmation.classList.add("hidden"), 4000);
});
