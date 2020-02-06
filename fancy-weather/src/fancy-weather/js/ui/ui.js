import renderIconFn from './renderIcons.js';

export class UI {
    init() {
        const bodyOverlay = document.createElement('div');
        bodyOverlay.classList.add('body-overlay');
        document.body.appendChild(bodyOverlay);        

        // Левая часть приложения с данными
        const dataContainer = document.createElement('div');

        const manageBtnContainer = document.createElement('div');
        manageBtnContainer.classList.add('manage-btn-container');

        const reloadBtn =document.createElement('button');
        reloadBtn.classList.add('reload-btn');
        reloadBtn.innerHTML = `<span>&#x21bb;</span>`;
        // &#xf021;
        const enBtn =document.createElement('button');
        enBtn.classList.add('en-btn');
        enBtn.innerHTML = `<span>EN</span>`;
        const ruBtn =document.createElement('button');
        ruBtn.classList.add('ru-btn');
        ruBtn.innerHTML = `<span>RU</span>`;
        const belBtn =document.createElement('button');
        belBtn.classList.add('bel-btn');
        belBtn.innerHTML = `<span>BEL</span>`;

        manageBtnContainer.appendChild(reloadBtn);
        manageBtnContainer.appendChild(enBtn);
        manageBtnContainer.appendChild(ruBtn);
        manageBtnContainer.appendChild(belBtn);

        dataContainer.appendChild(manageBtnContainer);

        const cityContainer = document.createElement('div');
        cityContainer.classList.add('city-container');

        const dateContainer = document.createElement('div');
        dateContainer.classList.add('date-container');

        const timeContainer = document.createElement('div');
        timeContainer.classList.add('clock');

        const temperatureContainer = document.createElement('div');
        temperatureContainer.classList.add('current-temperature');

        const temperatureIconContainer = document.createElement('div');
        temperatureIconContainer.classList.add('current-temperature-icon-container');

        dataContainer.appendChild(cityContainer);
        dataContainer.appendChild(dateContainer);
        dataContainer.appendChild(timeContainer);
        dataContainer.appendChild(temperatureContainer);
        dataContainer.appendChild(temperatureIconContainer);

        const weatherBrodcastContainer = document.createElement('div');
        weatherBrodcastContainer.classList.add('weather-brodcast-container');
        

        dataContainer.appendChild(weatherBrodcastContainer); 


        // Правая часть приложения с картой и инпутом
        const mapContainer = document.createElement('div');
        
        const searchBar = document.createElement('div');
        searchBar.classList.add('search-bar');

        const searchInput = document.createElement('input');
        searchInput.setAttribute('type', 'text');
        searchInput.classList.add('search-input');

        const searchBtn = document.createElement('button');
        searchBtn.classList.add('search-btn');
        searchBtn.innerHTML = `<span>Search</span>`;

        searchBar.appendChild(searchInput);
        searchBar.appendChild(searchBtn);

        mapContainer.appendChild(searchBar);

        const map = document.createElement('div');
        map.classList.add('map');
        mapContainer.appendChild(map);

        const coordinateContainer = document.createElement('div');
        coordinateContainer.classList.add('coordinate-container');
        mapContainer.appendChild(coordinateContainer);  
        
        const newsContainer = document.createElement('div');
        newsContainer.classList.add('news-container');
        mapContainer.appendChild(newsContainer);  
        
        dataContainer.classList.add('data-container');
        mapContainer.classList.add('map-container');

        bodyOverlay.appendChild(dataContainer);
        bodyOverlay.appendChild(mapContainer);

        
    }

    renderDate(magicNum) {
        const container = document.querySelector('.date-container');
        const date = new Date();

        let dayWeek = date.getDay();
        if (magicNum === undefined) {
            magicNum = 0;
        }
        dayWeek += magicNum;
        const dayMonth = date.getDate();
        const month = date.getMonth();

        const monthObj = {
            '0': 'January',
            '1': 'February',
            '2': 'March',
            '3': 'April',
            '4': 'May',
            '5': 'June',
            '6': 'July',
            '7': 'August',
            '8': 'September',
            '9': 'October',
            '10': 'November',
            '11': 'December'
        }

        const dayWeekObj = {
            '0': 'Sunday',
            '1': 'Monday',
            '2': 'Tuesday',
            '3': 'Wednesday',
            '4': 'Thursday',
            '5': 'Friday',
            '6': 'Saturday',
            '7': 'Sunday',
            '8': 'Monday',
            '9': 'Tuesday'
        }

        container.innerHTML = `${dayWeekObj[dayWeek]} ${dayMonth} ${monthObj[month]}`;

        const result = [dayWeekObj[dayWeek + 1], dayWeekObj[dayWeek + 2], dayWeekObj[dayWeek + 3]];
        return result;
    }

    renderCityName(city, country) {
        document.querySelector('.city-container').innerHTML = `${city}, ${country}`;
    }

    renderCoordinates(latitude, longitude) {
        const container = document.querySelector('.coordinate-container');
        container.innerHTML = `<span class="lat">Latitude:</span> ${latitude} <br><span class="lon">Longitude:</span> ${longitude}`;
    }

    // сюда нужно передавать weather и внутри
    renderCurrentWeater(weather) {
        const {temperature} = weather.currently;
        const currentIcon = weather.currently.icon;
        const {summary} = weather.currently;
        const {apparentTemperature} = weather.currently;
        const {windSpeed} = weather.currently;
        const {humidity} = weather.currently;

        const container = document.querySelector('.current-temperature');
        container.innerHTML = `
            <div class="temperature1-container"><span class="temperature1">${Math.round(temperature)}</span>&#176;</div> 
            <div class="current-temp-description">
                <div class="icon-container">
                    <div class=${currentIcon}></div>
                </div>
                <div class="summary">${summary}</div>
                <div><span class="feels-like">Feels like: </span><span class="temperature2">${apparentTemperature}</span>&#176;</div>
                <div class="wind">Wind: ${ (windSpeed / 2.237).toFixed(2) } m/s</div>
                <div class="humidity">Humidity: ${Math.round(humidity * 100)}%</div>
            </div>
        `;
    }

    renderTemperatureSwitcher() {
        const container = document.querySelector('.manage-btn-container');
        const buttonFr = document.createElement('button');
        buttonFr.classList.add('buttonFr');
        const buttonCe = document.createElement('button');
        buttonCe.classList.add('buttonCe');

        buttonFr.innerHTML = `<span>&#8457;</span>`;
        buttonCe.innerHTML = `<span>&#8451;</span>`;

        container.appendChild(buttonFr);
        container.appendChild(buttonCe);
    }

    renderWeatherBrodcast(weather) {
        const arrOfDay = this.renderDate();

        const weatherBrodcastContainer = document.querySelector('.weather-brodcast-container');
        weatherBrodcastContainer.innerHTML = `
            <div class="brodcast-item">
                <h3>${arrOfDay[0]}</h3>
                <div class="temperature"><span class="temperature3">${Math.round(weather.daily.data[0].temperatureMax)}</span>&#176;    <span class="${weather.daily.data[0].icon}"></span></div> 
            </div>
            <div class="brodcast-item">
                <h3>${arrOfDay[1]}</h3>
                <div class="temperature"><span class="temperature4">${Math.round(weather.daily.data[1].temperatureMax)}</span>&#176;    <span class="${weather.daily.data[1].icon}"></span></div>
            </div>
            <div class="brodcast-item">
                <h3>${arrOfDay[2]}</h3>
                <div class="temperature"><span class="temperature5">${Math.round(weather.daily.data[2].temperatureMax)}</span>&#176;    <span style="color:red;" class="${weather.daily.data[2].icon}"></span></div>
            </div>`;
        renderIconFn(weather.daily.data[0].icon);
        renderIconFn(weather.daily.data[1].icon);
        renderIconFn(weather.daily.data[2].icon);
    }

    spinnerAdd() {
        const container = document.createElement('div');
        container.classList.add('spinner-container');

        container.innerHTML = `
            <div class="spinner js-loading-spinner" role="alert" aria-live="assertive">
                <p class="vh js-loading-spinner-copy">Content is l<span style="color:red;">o</span>ading...</p>
            </div>`;

        document.body.appendChild(container);
    }

    spinnerRemove() {
        const elem = document.querySelector('.spinner-container');
        elem.remove();
    }
}
