const pass_field = document.querySelector(".pass-key");
const showBtn = document.querySelector(".show");
const form = document.getElementById("userRegistrationForm");
import { checkCookie } from "../utils/check_cookies";


window.addEventListener("load", () => {
  checkCookie("http://localhost:5173/home/index.html");
});


showBtn.addEventListener("click", () => {
  if (pass_field.type === "password") {
    pass_field.type = "text";
    showBtn.textContent = "HIDE";
    showBtn.style.color = "#3498db";
  } else {
    pass_field.type = "password";
    showBtn.textContent = "SHOW";
    showBtn.style.color = "#222";
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (nameInput.value.trim() === "") {
    alert("Please enter your full name.");
    nameInput.focus();
    return;
  }

  if (emailInput.value.trim() === "") {
    alert("Please enter your email or phone number.");
    emailInput.focus();
    return;
  }

  if (passwordInput.value.trim() === "") {
    alert("Please enter a password.");
    passwordInput.focus();
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });
    const jsondata = await response.json();
    if (jsondata.status) {
      window.location.href = "login/index.html";
    } else {
      console.log(jsondata.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
