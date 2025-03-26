// Name Calculation (Using Arviend Sud’s method)
const nameValues = {
  A: 1,
  I: 1,
  J: 1,
  Q: 1,
  Y: 1,
  B: 2,
  K: 2,
  R: 2,
  C: 3,
  G: 3,
  L: 3,
  S: 3,
  D: 4,
  M: 4,
  T: 4,
  E: 5,
  H: 5,
  N: 5,
  X: 5,
  U: 6,
  V: 6,
  W: 6,
  O: 7,
  Z: 7,
  F: 8,
  P: 8
};

function calculateName() {
  let name = document
    .getElementById("nameInput")
    .value.toUpperCase()
    .replace(/\s+/g, "");
  let total = name
    .split("")
    .reduce((sum, char) => sum + (nameValues[char] || 0), 0);
  let finalTotal = total % 9 || 9;

  document.getElementById(
    "nameResult"
  ).innerHTML = `<p><strong>Name Total:</strong> ${total} → ${finalTotal}</p>`;
}

// Date of Birth Calculation
function calculateNumbers() {
  let dob = document.getElementById("dobInput").value;
  let gender = document.getElementById("gender").value;
  let [year, month, day] = dob.split("-").map(Number);

  let driver = day % 9 || 9;
  let conductor = (day + month + year) % 9 || 9;
  let kua =
    gender === "male"
      ? (11 - (year % 9 || 9)) % 9 || 9
      : (4 + (year % 9 || 9)) % 9 || 9;

  document.getElementById("dobResult").innerHTML = `
        <p><strong>Driver Number:</strong> ${driver}</p>
        <p><strong>Conductor Number:</strong> ${conductor}</p>
        <p><strong>Kua Number (${gender.toUpperCase()}):</strong> ${kua}</p>
    `;
}

// Lo Shu Grid
const loShuPositions = {
  1: [2, 1],
  2: [0, 2],
  3: [1, 0],
  4: [0, 0],
  5: [1, 1],
  6: [2, 2],
  7: [1, 2],
  8: [2, 0],
  9: [0, 1]
};

function generateLoShuGrid() {
  let dob = document.getElementById("dobInput").value;
  let gender = document.getElementById("gender").value;
  let [year, month, day] = dob.split("-").map(Number);

  let driver = day % 9 || 9;
  let conductor = (day + month + year) % 9 || 9;
  let kua =
    gender === "male"
      ? (11 - (year % 9 || 9)) % 9 || 9
      : (4 + (year % 9 || 9)) % 9 || 9;

  let allNumbers = [
    ...dob.replace(/-/g, "").split("").map(Number),
    driver,
    conductor,
    kua
  ];
  let loShuGrid = Array.from({ length: 3 }, () => Array(3).fill(""));

  let presentNumbers = new Set();
  allNumbers.forEach((num) => {
    if (loShuPositions[num]) {
      let [r, c] = loShuPositions[num];
      loShuGrid[r][c] += num + " ";
      presentNumbers.add(num);
    }
  });

  let missingNumbers = [];
  for (let i = 1; i <= 9; i++) {
    if (!presentNumbers.has(i)) missingNumbers.push(i);
  }

  let gridHtml = "<table>";
  loShuGrid.forEach((row) => {
    gridHtml +=
      "<tr>" + row.map((cell) => `<td>${cell || "-"}</td>`).join("") + "</tr>";
  });
  gridHtml += "</table>";

  document.getElementById("loShuGrid").innerHTML = gridHtml;
  document.getElementById(
    "missingNumbers"
  ).innerHTML = `<p><strong>Missing Numbers:</strong> ${
    missingNumbers.join(", ") || "None"
  }</p>`;
}

// Mobile & Account Number Calculation
function calculateMobileAccount() {
  let mobile = document.getElementById("mobileInput").value.replace(/\D/g, "");
  let account = document
    .getElementById("accountInput")
    .value.replace(/\D/g, "");

  let mobileTotal =
    mobile.split("").reduce((sum, num) => sum + parseInt(num), 0) % 9 || 9;
  let accountTotal =
    account.split("").reduce((sum, num) => sum + parseInt(num), 0) % 9 || 9;

  document.getElementById("numberResult").innerHTML = `
        <p><strong>Mobile Number Total:</strong> ${mobileTotal}</p>
        <p><strong>Account Number Total:</strong> ${accountTotal}</p>
    `;
}
