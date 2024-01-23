const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "72f09b6a6091fbf62b032191154122f4"; 

weatherForm.addEventListener("submit", async event => {

     event.preventDefault();

     const city = cityInput.value;

     if (city) {
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData)
        }
        catch(error){
            console.error(error);
            displayError(error)
        }
     } 
     else {
        displayError("Please enter a city");
     }
});
async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok){
        throw new Error("Could not fetch weater data");
    }

    return await response.json();
}
function displayWeatherInfo(data){

    const {name: city, 
           main: {temp, humidity},
           weather: [{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1")
    const tempDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Hunidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id)


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}
function getWeatherEmoji(id){
    switch(true){
        case (id >= 200 && id < 300):
            return "⛈️";
        case (id >= 300 && id < 400):
            return "🌧️";
        case (id >= 500 && id < 600):
            return "🌧️";
        case (id >= 600 && id < 700):
            return "❄️";
        case (id >= 700 && id < 800):
            return "🌫️";
        case (id === 800):
            return "☀️";
        case (id >= 701 && id < 810):
            return "☁️";
        default:
            return "❓"
        
    }
}
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay")

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay); 
}