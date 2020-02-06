export default function getImage(city, season, timeOfDay, weather) {
    const TOKEN = '85f98878a1c6d85d8ed36d11d6e4ad7a2037abd3d9b828cc52f4a94c969da400';
    const CITY = city;
    const URL = `https://api.unsplash.com/photos/random?query=${season},${timeOfDay},${weather},${CITY}&client_id=${TOKEN}`;

    return fetch(URL)
                .then(response => response.json())
                .then(data => {
                    console.log('Image received');
                    return data.urls.regular;
                })      

}