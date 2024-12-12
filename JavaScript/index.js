"use strict";
(async function () {
  try {
    await getCityCurrent("cairo");
    await getdates();
    await next();
    display();
  } catch (error) {
    body.innerHTML = `  <div
  class="d-flex justify-content-center align-items-center align-content-center vh-100 w-100  flex-wrap"
>
  <img src="images/no_internet.webp" alt="" class="w-50 me-3" />

  <h1 class="alert alert-secondary w-50 text-center">
    No internet connction
  </h1>
</div>`;
  }
})();

let nextData;
let displayedDates;
const weather = document.querySelector(".weather");
const body = document.querySelector("body");
let data;
let city;
let temp;
let conditionIcon;
let conditionText;

async function getCityCurrent(location) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=73e06a37bb4045518fe130526240812&q=${location}&days=3`
  );
  data = await res.json();
  city = data.location.name;
  temp = data.current.temp_c;
  conditionText = data.current.condition.text;
  conditionIcon = data.current.condition.icon;
}

async function getdates() {
  const dates = [
    data.forecast.forecastday[0].date,
    data.forecast.forecastday[1].date,
    data.forecast.forecastday[2].date,
  ];
  displayedDates = [];

  for (const element of dates) {
    const NumDate = element;
    const dateDay = new Date(NumDate);
    const dayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(dateDay);
    displayedDates.push(dayOfWeek);
    const day = dateDay.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      dateDay
    );
    const formattedDate = `${day}${month}`;
    displayedDates.push(formattedDate);
  }
  displayedDates.splice(3, 1);
  displayedDates.splice(-1, 1);
}

async function next() {
  nextData = [];
  for (let i = 1; i <= 2; i++) {
    let nextItem = {};
    nextItem.conditionIcon = data.forecast.forecastday[i].day.condition.icon;
    nextItem.conditionText = data.forecast.forecastday[i].day.condition.text;
    nextItem.minTemp = data.forecast.forecastday[i].day.mintemp_c;
    nextItem.maxtemp = data.forecast.forecastday[i].day.maxtemp_c;
    nextData.push(nextItem);
  }
}

function display() {
  weather.innerHTML = `        <div class="row m-auto  rounded-4 my-5">
          <div
            class="col-lg-4  rounded-start-4 rounded-bottom-0 py-1 todayDate order-0 order-lg-0 weather-BG-HEADcolor-1"
          >
            <div class="d-flex justify-content-between">
              <span>${displayedDates[0]}</span>
              <span>${displayedDates[1]}</span>
            </div>
          </div>
          <div class="col-lg-4  py-1 order-2 order-lg-1 weather-BG-HEADcolor-2">
            <div class="d-flex justify-content-center">
              <span>${displayedDates[2]}</span>
            </div>
          </div>
          <div class="col-lg-4  rounded-end-4 rounded-bottom-0 py-1 order-4 order-lg-2 weather-BG-HEADcolor-1">
            <div class="d-flex justify-content-center">
              <span>${displayedDates[3]}</span>
            </div>
          </div>
          <div class="col-lg-4 city-card  py-4 ps-xl-4 order-1 order-lg-3 weather-BG-color-1">
            <p class="city">${city}</p>
            <div class=" d-flex flex-row align-items-center flex-lg-column align-items-lg-start ">
                <p class="today pe-3 pe-lg-0">${temp}°C</p>
                <div class="weather-icon">
                    <img src="https:${conditionIcon}" alt="" class="w-100">
                </div>
            </div>
            <p class="pt-1 text-info ">${conditionText}</p>
            <div class="dita d-flex justify-content-lg-around justify-content-start pe-5 me-5">
              <div class="pe-2 pe-0">
                <i
                  class="fa-solid fa-umbrella fa-rotate-by"
                  -fa-rotate-angle:
                  60deg;
                ></i>
                <span>20%</span>
              </div>
              <div class="pe-2 pe-0">
                <i class="fa-solid fa-wind"></i>
                <span>18km/h</span>
              </div>
              <div class="pe-2 pe-0">
                <i class="fa-regular fa-compass"></i>
                <span>East </span>
              </div>
            </div>
          </div>
          <div class="col-lg-4 next  py-4 ps-4 d-flex justify-content-center  flex-wrap align-content-start text-center order-3 order-lg-4 weather-BG-color-2">
            <div class="weather-icon mb-3 mt-4">
                <img src="https:${nextData[0].conditionIcon}" alt="weather clouds sun" class="w-100">
            </div>
            <p class="max-deg w-100 m-0 h4 fw-bold text-white">${nextData[0].maxtemp}°C</p>
            <p class="min-deg w-100 ">${nextData[0].minTemp}°</p>
            <p class="weather-status text-info w-100 ">${nextData[0].conditionText}</p>
        </div>
          <div class="col-lg-4 after-next  py-4 ps-4 d-flex justify-content-center  flex-wrap align-content-start text-center  order-5 order-lg-5 weather-BG-color-1">
            <div class="weather-icon mb-3 mt-4">
                <img src="https:${nextData[1].conditionIcon}" alt="weather clouds sun" class="w-100">
            </div>
            <p class="max-deg w-100 m-0 h4 fw-bold text-white">${nextData[1].maxtemp}°C</p>
            <p class="min-deg w-100 ">${nextData[1].minTemp}°</p>
            <p class="weather-status text-info w-100 ">${nextData[1].conditionText}</p>
        </div>
        </div>`;
}

function search() {
  const searchInput = document.querySelector(".search-input");
  searchInput.addEventListener("input", async function () {
    let searchInputValue = searchInput.value;
    await getCityCurrent(searchInputValue)
    await getdates();
    await next();
    display()
  });
}
search();
