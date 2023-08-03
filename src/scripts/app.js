// Variáveis
import apiKey from "./apiKey.js"

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const CountyElement = document.querySelector('#country')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')
const loadElement = document.querySelector('#loading-div')

const weatherDataContainer = document.querySelector('#weather-data')
const errorDiv = document.querySelector('#error-div')

// Funções
const getWeatherData = async (city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherUrl)
    const data = await res.json()

    return data
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city)
    loadElement.classList.toggle('hide')

    if(data.cod == 404){
        errorDiv.innerText = 'Parece que essa cidade não existe, certifique se você digitou corretamente!'
        weatherDataContainer.classList.add('hide')
        errorDiv.classList.remove('hide')
    }
    else if(data.cod == 400){
        errorDiv.innerText = 'Digite uma Cidade para que se possa ver suas informações!'
        weatherDataContainer.classList.add('hide')
        errorDiv.classList.remove('hide')
    }
    else{
        errorDiv.classList.add('hide')
        weatherDataContainer.classList.remove('hide')
        cityElement.innerText = data.name
        tempElement.innerText = parseInt(data.main.temp)
        descElement.innerText = data.weather[0].description
        weatherIconElement.setAttribute(
            'src',
            `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
            )
        CountyElement.setAttribute(
            'src',
            `https://flagsapi.com/${data.sys.country}/flat/64.png`
        )
        humidityElement.innerText = `${data.main.humidity}%`
        windElement.innerText = `${data.wind.speed}Km/h`
    }
}

// Eventos
searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const city = cityInput.value
    loadElement.classList.toggle('hide')
    weatherDataContainer.classList.add('hide')
    errorDiv.classList.add('hide')

    showWeatherData(city)
})

cityInput.addEventListener('keyup', (e) => {
    if(e.code === 'Enter'){
        const city = e.target.value
        loadElement.classList.toggle('hide')
        weatherDataContainer.classList.add('hide')
        errorDiv.classList.add('hide')

        showWeatherData(city)
    }
})