import {
  calculateFinalGrade,
  getAcademicStatus,
  getPerformanceRemark,
  calculateClassAverage,
  countPassingStudents,
  getTopStudent
} from "./gradeUtils.js";

export function displayStudents(students) {
  const studentList = document.getElementById("studentList");
  const messageArea = document.getElementById("messageArea");
  studentList.innerHTML = "";

  if (students.length === 0) {
    messageArea.textContent = "No students found";
    return;
  }

  messageArea.textContent = "";

  students.forEach((student) => {
    const { id, name, block, quiz, lab, exam } = student;
    const finalGrade = calculateFinalGrade(student);
    const status = getAcademicStatus(finalGrade);
    const remark = getPerformanceRemark(finalGrade);
    const statusClass = status.toLowerCase().replace(/\s+/g, "-");

    const card = document.createElement("article");
    card.className = "student-card";
    card.dataset.id = id;
    card.innerHTML = `
      <h3 class="student-name">${name}</h3>
      <p class="student-block">${block}</p>
      <p class="student-scores">Quiz: ${quiz} | Lab: ${lab} | Exam: ${exam}</p>
      <p class="student-final">Final Grade: ${finalGrade.toFixed(2)}</p>
      <p class="student-status ${statusClass}">${status}</p>
      <p class="student-remark">${remark}</p>
    `;
    studentList.appendChild(card);
  });
}

export function displaySummary(students) {
  const classAverageEl = document.getElementById("classAverage");
  const passingCountEl = document.getElementById("passingCount");
  const displayedCountEl = document.getElementById("displayedCount");
  const topStudentEl = document.getElementById("topStudent");

  const avg = students.length
    ? (
        students.reduce((sum, s) => sum + calculateFinalGrade(s), 0) /
        students.length
      ).toFixed(2)
    : "0.00";

  const passing = students.filter(
    (s) => calculateFinalGrade(s) >= 75
  ).length;

  let topName = "N/A";
  if (students.length > 0) {
    const top = students.reduce((best, s) =>
      calculateFinalGrade(s) > calculateFinalGrade(best) ? s : best
    );
    topName = `${top.name} (${calculateFinalGrade(top).toFixed(2)})`;
  }

  classAverageEl.textContent = avg;
  passingCountEl.textContent = passing;
  displayedCountEl.textContent = students.length;
  topStudentEl.textContent = topName;
}

export function displayMessage(message) {
  const messageArea = document.getElementById("messageArea");
  messageArea.textContent = message;
}
