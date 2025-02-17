const weatherConditionIcon = document.querySelector(".weather__condition__icon");
const weatherConditionText = document.querySelector(".weather__condition__text");
const tempActual = document.querySelector(".weather__temprature__actual");
const tempFeels = document.querySelector(".weather__temprature__feels");
const cityInput = document.querySelector("#city-input");
const weather = document.querySelector(".weather");
const quote = document.querySelector(".quote");

const reset = (err) => {
    cityInput.style.color = "#dc3545";
    cityInput.value = err;
    tempActual.innerHTML = "";
    tempFeels.innerHTML = "";
    weatherConditionIcon.src = "";
    weatherConditionIcon.alt = ""
    weatherConditionText.innerText = "";
    quote.innerText = "";

}
const displayData = ({ name, temp_c, feelslike_c, condition }) => {
    if (name) {
        cityInput.value = name;
        tempActual.innerHTML = temp_c + "&deg"
        tempFeels.innerHTML = `Feels ${feelslike_c}&deg`
        weatherConditionIcon.src = "https:" + condition.icon;
        weatherConditionText.innerText = condition.text;
        quote.innerText = "Make the most of this nice weather that I genrated for you. Or else.";
    } else reset("Invalid Input!!")
}
const fetchData = (cityName) => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${cityName}&aqi=no`)
        .then(res => res.json())
        .then(res => displayData({ ...res.current, ...res.location }))
        .catch(error => reset("Invalid Input!!"))
}
fetchData("kolkata");
cityInput.addEventListener('click', () => {
    cityInput.style.color = "white";
    cityInput.value = "";
})

cityInput.addEventListener('keydown', (e) => {
    if (cityInput.style.color !== "white") cityInput.click();
    if (e.code === "Enter") {
        const text = cityInput.value;
        (text.length) ? fetchData(text.trim()) : reset("Blank input!!");
    }
})