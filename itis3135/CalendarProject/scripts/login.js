// login.js — simple client-side login placeholder (no real authentication)

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "" || password === "") {
    alert("Please fill in all fields.");
    return;
  }

  // Demo-only: Accept any username/password
  loginMessage.textContent = `✅ Welcome, ${username}! Redirecting to your dashboard...`;
  loginMessage.classList.remove("hidden");

  // Simulated redirect to Post page
  setTimeout(() => {
    window.location.href = "post.html";
  }, 1500);
});
