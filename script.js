import config from "./config.js";
let inputField = document.querySelector(".inputField");
let inputForm = document.querySelector(".inputForm");
let mainImage = document.querySelector(".mainImage");
let tempPara = document.querySelector(".tempPara");
let locationpara = document.querySelector(".locationpara");
let humidPara = document.querySelector(".humidText");
let windPara = document.querySelector(".windText");

let API = `https://api.weatherapi.com/v1/current.json?key=${config.API_KEY}&aqi=no`;

async function getWeatherData(value) {
  try {
    let response = await fetch(API + `&q=${value}`);
    if (!response.ok) {
      throw new Error("City not found.");
    }
    let data = await response.json();
    return data;
  } catch (err) {
    alert(`${err} Please enter a valid city`);
    throw err;
  }
}

inputForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let value = inputField.value.trim().toLowerCase();

  if (value === "") {
    alert("Please enter a city");
    return;
  }

  try {
    let data = await getWeatherData(value);
    let {
      temp_c,
      condition: { icon },
      wind_kph,
      humidity,
    } = data.current;
    let {name} = data.location;
    tempPara.innerText = `${temp_c}℃`;
    mainImage.src = `https:${icon}`;
    mainImage.style.height = "100px";
    windPara.innerText = wind_kph;
    humidPara.innerText = humidity;
    locationpara.innerText = name;
    inputField.value = "";
  } catch (err) {
    console.error(err);
  }
});
