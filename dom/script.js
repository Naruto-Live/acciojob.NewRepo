const decBtn = document.getElementById("dec");
const incBtn = document.getElementById("inc");
const clrBtn = document.getElementById("clr");
const display = document.getElementById("countDisplay");
const error = document.querySelector(".error-message");

let count = 1;

function updateDisplay() {
  display.textContent = count;
  decBtn.disabled = count === 0 ? true : false;
  error.style.display = count > 0 ? "none" : "block";
  console.log(error);
  clrBtn.style.display = count === 0 ? "none" : "block";
}
function incCount() {
  count++;
  updateDisplay();
}
function decCount() {
  if (count > 0) {
    count--;
    updateDisplay();
  } else {
    error.style.display = "block";
  }
}
function clrDisplay() {
  count = 0;
  
  updateDisplay();
}
incBtn.addEventListener("click", incCount);
decBtn.addEventListener("click", decCount);
clrBtn.addEventListener("click", clrDisplay);

updateDisplay();