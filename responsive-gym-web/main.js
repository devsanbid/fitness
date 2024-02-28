const pass_field = document.querySelector(".pass-key");
const showBtn = document.querySelector(".show");
const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("error-msg");
import { checkCookie } from "./utils/check_cookies";


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

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  if (emailInput.value.trim() === "") {
    alert("Please enter your email");
    emailInput.focus();
    return;
  }

  if (password.value.trim() === "") {
    alert("Please enter your password");
    passwordInput.focus();
    return;
  }

  const response = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value,
    }),
  });
  const jsondata = await response.json();
  if (jsondata.status) {
    window.location.href = "http://localhost:5173/home/index.html";
  } else {
    errorMessage.innerText = jsondata.message;
  }
});
