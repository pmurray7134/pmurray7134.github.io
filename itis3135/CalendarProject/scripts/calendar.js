// scripts/calendar.js

document.addEventListener("DOMContentLoaded", () => {
  const daysContainer = document.querySelector(".calendar-days");
  const monthYear = document.getElementById("monthYear");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");

  let currentDate = new Date();

  // Helper: save assignments to localStorage
  function saveAssignments(assignments) {
    localStorage.setItem("studyPlans", JSON.stringify(assignments));
  }

  function renderCalendar() {
    const assignments = JSON.parse(localStorage.getItem("studyPlans")) || [];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    monthYear.textContent = `${monthNames[month]} ${year}`;

    daysContainer.innerHTML = "";

    // Blank boxes before the 1st
    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement("div");
      blank.classList.add("calendar-day");
      daysContainer.appendChild(blank);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement("div");
      dayCell.classList.add("calendar-day");

      const dateDiv = document.createElement("div");
      dateDiv.classList.add("date");
      dateDiv.textContent = day;
      dayCell.appendChild(dateDiv);

      const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayAssignments = assignments.filter(a => a.date === fullDate);

dayAssignments.forEach((a, index) => {
  const aDiv = document.createElement("div");
aDiv.classList.add("assignment");

// Title
const titleDiv = document.createElement("div");
titleDiv.classList.add("assignment-title");
titleDiv.textContent = a.title;
aDiv.appendChild(titleDiv);

// Time (always visible)
const timeDiv = document.createElement("div");
timeDiv.classList.add("assignment-time");
timeDiv.textContent = a.time ? `Due: ${a.time}` : "";
aDiv.appendChild(timeDiv);

// Description (hidden by default, shows on hover)
if (a.description) {
  const descDiv = document.createElement("div");
  descDiv.classList.add("assignment-desc");
  descDiv.textContent = a.description;
  aDiv.appendChild(descDiv);
}

// Apply completed style if marked
if (a.completed) {
  aDiv.classList.add("completed");
}

// Buttons container (hidden by default, shown on hover)
const btnContainer = document.createElement("div");
btnContainer.classList.add("btn-container");

// Complete / Unmark button
const completeBtn = document.createElement("button");
completeBtn.classList.add("small-btn", "complete-btn");
completeBtn.textContent = a.completed ? "Unmark" : "Complete";
completeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  a.completed = !a.completed;
  saveAssignments(assignments);
  renderCalendar();
});

// Delete button
const deleteBtn = document.createElement("button");
deleteBtn.classList.add("small-btn", "delete-btn");
deleteBtn.textContent = "Delete";
deleteBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const idx = assignments.findIndex(
    ev => ev.title === a.title && ev.date === a.date && ev.time === a.time
  );
  if (idx > -1) {
    assignments.splice(idx, 1);
    saveAssignments(assignments);
    renderCalendar();
  }
});

btnContainer.appendChild(completeBtn);
btnContainer.appendChild(deleteBtn);
aDiv.appendChild(btnContainer);

dayCell.appendChild(aDiv);

});




      daysContainer.appendChild(dayCell);
    }
  }

  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
});
