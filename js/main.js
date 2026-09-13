import { students } from "./students.js";
import {
  searchStudents,
  filterStudentsByBlock,
  filterStudentsByStatus
} from "./gradeUtils.js";
import {
  displayStudents,
  displaySummary,
  displayMessage
} from "./display.js";

const searchInput = document.getElementById("searchInput");
const blockFilter = document.getElementById("blockFilter");
const statusFilter = document.getElementById("statusFilter");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");

function applyFilters() {
  const query = searchInput.value;
  const block = blockFilter.value;
  const status = statusFilter.value;

  let result = searchStudents(students, query);
  result = filterStudentsByBlock(result, block);
  result = filterStudentsByStatus(result, status);

  displayStudents(result);
  displaySummary(result);

  if (result.length === 0) {
    displayMessage("No students found");
  } else {
    displayMessage("");
  }
}

function resetFilters() {
  searchInput.value = "";
  blockFilter.value = "All";
  statusFilter.value = "All";
  displayMessage("");
  displayStudents(students);
  displaySummary(students);
}

applyBtn.addEventListener("click", applyFilters);
resetBtn.addEventListener("click", resetFilters);

searchInput.addEventListener("input", applyFilters);


displayStudents(students);
displaySummary(students);