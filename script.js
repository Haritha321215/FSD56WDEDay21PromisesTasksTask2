//Displays the selected country's sun rise and sun set times from api based on lattitude and longitude of the country

let countriesurl = "https://restcountries.com/v2/all";
let sunUrl = "https://api.sunrise-sunset.org/json?";

let containerDiv = document.createElement("div");
containerDiv.className =
  "container d-flex flex-column align-items-center justify-content-center";

let header1 = document.createElement("h1");
header1.className = "header text-primary";
header1.innerText = "Sun Set and Sun Rise";



let sundiv = document.createElement("div");
sundiv.className = "sundiv shadow-lg p-3 mb-5 bg-body rounded text-primary";
let select1 = document.getElementById("sunBox");


async function getSun() {
  sundiv.innerHTML = "";
  let h61 = document.createElement("h6");
  let h62 = document.createElement("h6");
  let h63 = document.createElement("h6");

  sundiv.append(h61, h62, h63);

  let sunBox = document.getElementById("sunBox");
  let selectedValue = sunBox.options[sunBox.selectedIndex].value;
  let latlng = selectedValue.split(",");
  // console.log(latlng[0],latlng[1]);

  try {
    const response = await fetch(`${sunUrl}lat=${latlng[0]}&lng=${latlng[1]}`);
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }
    const data = await response.json();
    h61.innerText = "Sun Rise ☀️: " + data.results.sunrise;
    h62.innerText = "Sun Set 🌅: " + data.results.sunset;
    h63.innerText = "Day Time 😎: " + data.results.day_length;
    // data.then((result)=>console.log(result));
    console.log(data.results);
  } catch (error) {
    console.error(error);
  }
}

// Displays the countries and allows to user to select the country
function getSunRiseSet(country) {
  let option1 = document.createElement("option");
  option1.innerText = country.name;
  let latlng = country.lat + "," + country.lng;
  // console.log(latlng);
  option1.value = latlng;
  select1.append(option1);
  sundiv.append(select1);
  containerDiv.append(select1, sundiv);
}

// constructor function for Country
function Country(name, code, lat, lng) {
  (this.name = name), (this.code = code), (this.lat = lat), (this.lng = lng);
}

// Gets the country names, codes and lantitude and longitudes..
async function getCountryNames() {
  let countries = [];
  try {
    let data = await fetch(countriesurl);
    let result = await data.json();
    for (const iterator of result) {
      if (iterator.latlng === undefined) {
        continue;
      } else {
        const country = new Country(
          iterator.name,
          iterator.alpha2Code,
          iterator.latlng[0],
          iterator.latlng[1]
        );
        countries.push(country);
      }
    }
    return countries;
  } catch (error) {
    console.error(error);
  }
}

function showCountries() {
  let countries = getCountryNames();
  countries.then((cts) =>
    cts.forEach((country) => {
      getSunRiseSet(country);
    })
  );
}

window.onload = function () {
  showCountries(); // starts the execution from here
  containerDiv.append(header1);
  document.body.append(containerDiv);
};
