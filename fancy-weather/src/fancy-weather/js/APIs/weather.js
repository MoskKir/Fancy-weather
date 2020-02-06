// d6ae9c88c11b19627f55899f38ecc6db
// Нужно получить данные геопозиции

export default function getWeather(geoLocation) {
    const TOKEN = 'd6ae9c88c11b19627f55899f38ecc6db';
    const GEOLOCATION = geoLocation;
    const PROXYURL = "https://cors-anywhere.herokuapp.com/";
    const URL = `https://api.darksky.net/forecast/${TOKEN}/${GEOLOCATION}`;
    
    // https://api.darksky.net/forecast/d6ae9c88c11b19627f55899f38ecc6db/37.8267,-122.4233
    
    return fetch(PROXYURL + URL)
                .then(response => response.json())
                .then(data => { 
                    console.log('Weather forecast received')
                    return data
                })
                .catch(() => console.error('No weather forecast received'));

}