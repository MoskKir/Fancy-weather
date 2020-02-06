import '../css/style.css';
import '../css/weather-icons.min.css';
import '../css/style.sass';
import geoLocation from './APIs/geolocation';
import getWeather from './APIs/weather.js';
import getImage from './APIs/bgimage.js';
import queryGeoLocation from './APIs/opencagedata.js';
import mapBox from './APIs/mapBox.js';
import * as UI from './ui/ui.js';
import renderIconFn from './ui/renderIcons.js';
import getTranslate from './APIs/translate';
import getNews from './APIs/newsRSS';

(async function main() {
    const ui = new UI.UI;
    ui.spinnerAdd();

	ui.init();
	
    const geoLocationData = await geoLocation();

    if (geoLocationData.currentPosition.latitude === '') {
        console.log('Сoordinates from the navigator not received');
    } else {
        console.log('Сoordinates received from the navigator');
    }

    let coordinates;
    if (geoLocationData.currentPosition.latitude === '' || geoLocationData.currentPosition.longitude === '') {
        coordinates = `${geoLocationData.ipinfo.latitude  },${  geoLocationData.ipinfo.longitude}`;
    } else {        
        coordinates = `${geoLocationData.currentPosition.latitude.toFixed(4)  },${  geoLocationData.currentPosition.longitude.toFixed(4)}`;
    }

    let weather = await getWeather(coordinates);

    const cityName = geoLocationData.ipinfo.city;
    const queryGeoLocationData = await queryGeoLocation(cityName);
    
    const {city} = geoLocationData.ipinfo;
    const {country} = queryGeoLocationData.components;

    ui.renderCityName(city, country);

    const currentTimeZone = queryGeoLocationData.annotations.timezone.offset_string;

    function clock(timeZone) {
        timeZone = timeZone.replace(/0*$/, '');
        if (timeZone === '+') {
            timeZone = 0;
        }
        const time = new Date();
        let hours = time.getUTCHours() + Number(timeZone);
        const minutes = time.getMinutes();
                
        const seconds = time.getSeconds();

        if (hours >= 24) {
            hours -= 24;
        } 

        document.querySelector('.clock').innerHTML = `${zerosForMe(hours)  }:${  zerosForMe(minutes)  }:${  zerosForMe(seconds)}`;
    
        function zerosForMe(standIn) {
            if (standIn < 10) {
                standIn = `0${  standIn}`
            } 
            return standIn;
        }
    }

    let mySetInterval = setInterval(() => {clock(currentTimeZone)} , 1000);
    
    

    const coordinatesArr = coordinates.split(',');
    let latitude = Number(coordinatesArr[0]).toFixed(2);
    let longitude = Number(coordinatesArr[1]).toFixed(2);

    ui.renderCoordinates(latitude, longitude);

    ui.renderCurrentWeater(weather);
    
    ui.renderWeatherBrodcast(weather);
    
    renderIconFn(weather.currently.icon);

    ui.renderTemperatureSwitcher();

    function switcherTemp() {
        const celseusBtn = document.querySelector('.buttonCe');
        const faringateBtn = document.querySelector('.buttonFr');
    
        const temp1 = document.querySelector('.temperature1').innerText;
        const temp2 = document.querySelector('.temperature2').innerText;
        const temp3 = document.querySelector('.temperature3').innerText;
        const temp4 = document.querySelector('.temperature4').innerText;
        const temp5 = document.querySelector('.temperature5').innerText;
    
        const arrTemperatures = [
            parseInt(temp1, 10),
            parseInt(temp2, 10),
            parseInt(temp3, 10),
            parseInt(temp4, 10),
            parseInt(temp5, 10)
        ];

        const arrTemperaturesInCelsius = arrTemperatures.map(val => {
            return Math.round((val - 32) * 5 / 9);
        })        
        
        celseusBtn.addEventListener('click', () => {
            arrTemperaturesInCelsius.forEach((val, index) => {
                document.querySelector(`.temperature${index + 1}`).innerHTML = val
            });
        })
        faringateBtn.addEventListener('click', () => {
            arrTemperatures.forEach((val, index) => {
                document.querySelector(`.temperature${index + 1}`).innerHTML = val
            });
        })
        return [arrTemperaturesInCelsius, arrTemperatures]
    };

    const arrsTemperatures = switcherTemp();
    const tempCe = arrsTemperatures[0];
    
    function toCelsisu(tempCe) {
        tempCe.forEach((val, index) => {
            document.querySelector(`.temperature${index + 1}`).innerHTML = val;
        });
    }
    toCelsisu(tempCe);


    mapBox(coordinates);

    const date = new Date();

    const month = date.getMonth();
    const currentHour = date.getHours();

    const season = {
        'spring': [2,3,4],
        'summer': [5,6,7],
        'autumn': [8,9,10],
        'winter': [11,0,1]
    }

    const timeOfDay = {
        'morning': [6,7,8,9,10],
        'noon': [11,12,13,14,15,16],
        'evening': [17,18,19,20,21],
        'night': [22,23,0,1,2,3,4,5]
    }

    let currentTimeOfDay;
    Object.entries(timeOfDay).forEach(arr => {
        if (arr[1].includes(currentHour)) {
            currentTimeOfDay = arr[0];
        }
    });

    let currentSeason;
    Object.entries(season).forEach(arr => {
        if (arr[1].includes(month)) {
            currentSeason = arr[0];
        }
    });
    
    const currentWeatherForQuery = weather.currently.icon

    const bgImageURL = await getImage(cityName, currentSeason, currentTimeOfDay, currentWeatherForQuery);

    document.body.style.backgroundImage = `url(${bgImageURL})`;
    document.body.style.backgroundRepeat = 'no-repeat';

    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');

    searchBtn.addEventListener('click', function() { 
        const cityFromInput = searchInput.value;
        console.log(cityFromInput);
        

        (async function searchBtnFn() {
            ui.spinnerAdd();
            const data = await queryGeoLocation(cityFromInput);

            const timeZoneFromQuery = data.annotations.timezone.offset_string

            clearInterval(mySetInterval);

            mySetInterval = setInterval(() => {clock(timeZoneFromQuery)} , 1000);

            coordinates =  `${data.geometry.lat.toFixed(4)  },${  data.geometry.lng.toFixed(4)}`;

            weather = await getWeather(coordinates);
    
            ui.renderCurrentWeater(weather);

            ui.renderWeatherBrodcast(weather);

            renderIconFn(weather.currently.icon);

            ui.renderCityName(data.components.city, data.components.country);
            mapBox(coordinates);
            
            latitude = data.geometry.lat.toFixed(2);            
            longitude = data.geometry.lng.toFixed(2);
            ui.renderCoordinates(latitude, longitude);

            const bgImageURL = await getImage(data.formatted, currentSeason, currentTimeOfDay, weather.currently.icon);

            document.body.style.backgroundImage = `url(${bgImageURL})`;
            document.body.style.backgroundRepeat = 'no-repeat';

            const arrsTemperatures = switcherTemp();
            const tempCe = arrsTemperatures[0];
            
            function toCelsisu(tempCe) {
                tempCe.forEach((val, index) => {
                    document.querySelector(`.temperature${index + 1}`).innerHTML = val;
                });
            }
            toCelsisu(tempCe);

            ui.spinnerRemove();
        })();
        
    });

    ui.spinnerRemove();

    const reloadBgBtn = document.querySelector('.reload-btn');
    reloadBgBtn.addEventListener('click', () => {        
        (async function() {
            const bgImageURL = await getImage(cityName, currentSeason, currentTimeOfDay, currentWeatherForQuery);
    
            document.body.style.backgroundImage = `url(${bgImageURL})`;
        })();
    })

    getTranslate('ru-en');

    const ruBtn = document.querySelector('.ru-btn');
    ruBtn.addEventListener('click', () => {
        getTranslate('ru');
    });
    const enBtn = document.querySelector('.en-btn');
    enBtn.addEventListener('click', () => {
        getTranslate('en');
    })
    const belBtn = document.querySelector('.bel-btn');
    belBtn.addEventListener('click', () => {
        getTranslate('be');
    })

    await getNews();

})();