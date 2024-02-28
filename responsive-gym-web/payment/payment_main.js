import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { getUsers } from "../utils/get_users";
const cardDrop = document.getElementById("card-dropdown");
const user_name = document.getElementById("name");
const membership = document.getElementById("membership");
const extra = document.getElementById("extra");
const time_period = document.getElementById("timeperiod");
const total_price = document.getElementById("total-price");
const paybtn = document.getElementById("paybtn");
const data = await getUsers();
user_name.value = data.message.name;

const check_price = (value_membership, value_extra, value_time) => {
  let price;
  switch (value_membership) {
    case "basic":
      price = 3000;
      break;
    case "zumbastic":
    case "yogastic":
      price = 5000;
      break;
    case "elite":
      price = 8000;
      break;
    case "platinum":
      price = 12000;
      break;
    default:
      price = 0;
      break;
  }

  if (!(value_extra[0] === "")) {
    if (value_extra.length === 2) {
      price += 11500 * value_time;
    } else {
      if (value_extra[0] === "sauna-stream") {
        price += 1500 * value_time;
      } else {
        price += 10000 * value_time;
      }
    }
  }
  return price;
};

const updatePrice = () => {
  const value_membership = membership.value;
  const value_extra = Array.from(extra.options)
    .filter((option) => option.selected)
    .map((option) => option.value);
  const value_time = time_period.value;

  const value_total_price = check_price(
    value_membership,
    value_extra,
    value_time,
  );
  console.log(value_total_price);
  total_price.innerText = value_total_price;
};

membership.addEventListener("change", updatePrice);
extra.addEventListener("change", updatePrice);
time_period.addEventListener("change", updatePrice);

updatePrice();

paybtn.addEventListener("click", async () => {
  const value_membership = membership.value;
  const value_extra = Array.from(extra.options)
    .filter((option) => option.selected)
    .map((option) => option.value);
  const value_time = time_period.value;

  const value_total_price = check_price(
    value_membership,
    value_extra,
    value_time,
  );

  const response = await fetch("http://localhost:8080/api/purchase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_name: value_membership,
      addition_production: value_extra.length > 0 ? value_extra : null,
      price: value_total_price,
      time: value_time,
      user_id: data.message.id,
    }),
  });
  const jsondata = await response.json();
  if (jsondata.status) {
    Toastify({
      text: `${total_price.innerText} paid successfully`,
      duration: 2500,
      close: true,
      gravity: "top",
      position: "center",
      className: "success",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #4CAF50, #4CAF53)",
        padding: "15px",
      },
    }).showToast();

    setTimeout(() => {
      window.location.href = "http://localhost:5173/home/index.html";
    }, 2200);
  }
});

let activeDropdown;
cardDrop.addEventListener("click", function() {
  let node;
  for (let i = 0; i < this.childNodes.length - 1; i++)
    node = this.childNodes[i];
  if (node.className === "dropdown-select") {
    node.classList.add("visible");
    activeDropdown = node;
  }
});

window.onclick = (e) => {
  if (e.target.tagName === "LI" && activeDropdown) {
    if (e.target.innerHTML === "Master Card") {
      document.getElementById("credit-card-image").src =
        "https://dl.dropboxusercontent.com/s/2vbqk5lcpi7hjoc/MasterCard_Logo.svg.png";
      activeDropdown.classList.remove("visible");
      activeDropdown = null;
      e.target.innerHTML = document.getElementById("current-card").innerHTML;
      document.getElementById("current-card").innerHTML = "Master Card";
    } else if (e.target.innerHTML === "American Express") {
      document.getElementById("credit-card-image").src =
        "https://dl.dropboxusercontent.com/s/f5hyn6u05ktql8d/amex-icon-6902.png";
      activeDropdown.classList.remove("visible");
      activeDropdown = null;
      e.target.innerHTML = document.getElementById("current-card").innerHTML;
      document.getElementById("current-card").innerHTML = "American Express";
    } else if (e.target.innerHTML === "Visa") {
      document.getElementById("credit-card-image").src =
        "https://dl.dropboxusercontent.com/s/ubamyu6mzov5c80/visa_logo%20%281%29.png";
      activeDropdown.classList.remove("visible");
      activeDropdown = null;
      e.target.innerHTML = document.getElementById("current-card").innerHTML;
      document.getElementById("current-card").innerHTML = "Visa";
    }
  } else if (e.target.className !== "dropdown-btn" && activeDropdown) {
    activeDropdown.classList.remove("visible");
    activeDropdown = null;
  }
};
