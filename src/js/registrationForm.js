document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var errorElement = document.getElementById("error");

    if (password !== confirmPassword) {
      event.preventDefault();
      errorElement.textContent = "Passwords do not match.";
    } else {
      errorElement.textContent = "";
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const showButton = document.getElementById("showButton");
  const myDiv = document.getElementById("registration-form");

  showButton.addEventListener("click", function () {
    myDiv.style.display = "block";
  });
});
