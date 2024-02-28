import { getUsers } from "../utils/get_users";

const movementStrength = 25;
const height = movementStrength / window.screen.height;
const width = movementStrength / window.screen.width;
const hero = document.getElementById("section-hero");
const logoutBtn = document.getElementById("logout-btn");
const membership = document.getElementById("membership");
const names = document.getElementById("name");

const checkMember = async () => {
  const check = await fetch("http://localhost:8080/api/purchase", {
    method: "GET",
    credentials: "include",
  });
  const jsondata = await check.json();
  console.log(jsondata);
  if (jsondata.status) {
    membership.innerText = `( ${jsondata.message.product_name.toUpperCase()} )`;
  }
};

window.addEventListener("load", async () => {
  await checkMember()
  const users = await getUsers();

  console.log(users.status);
  if (users.status) {
    names.innerText = users.message.name;
  }
});

const checkCookie = async () => {
  const checkCookies = await fetch("http://localhost:8080/api/check-cookie", {
    method: "GET",
    credentials: "include",
  });
  const jsondata = await checkCookies.json();
  if (!jsondata.status)
    window.location.href = "http://localhost:5173/index.html";
};

window.addEventListener("load", async () => {
  checkCookie();
});
hero.addEventListener("mousemove", (e) => {
  const pageX = e.clientX - window.screen.width / 2;
  const pageY = e.clientY - window.screen.height / 2;
  const newvalueX = width * pageX * -1 - 10;
  const newvalueY = height * pageY * -1 - 0;
  hero.style.backgroundPosition = `${newvalueX}px     ${newvalueY}px`;

  const div = document.createElement("div");
  div.classList.add("hero-section-mouseClick");
  div.style.left = `${e.clientX}px`;
  div.style.top = `${e.clientY}px`;
  const box = document.getElementById("section-hero");
  box.appendChild(div);
  setTimeout(() => {
    box.removeChild(div);
    div.remove();
  }, 250);
});

logoutBtn.addEventListener("click", async () => {
  const response = await fetch("http://localhost:8080/api/logout", {
    method: "GET",
    credentials: "include",
  });
  checkCookie();
  const jsondata = await response.json();
  if (jsondata.status) {
    console.log(jsondata.message);
  }
});
