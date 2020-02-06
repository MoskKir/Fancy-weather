export default function queryGeoLocation(city) {
    const TOKEN = '2f4c3c995c9f4edc952f9bedabf86043';
    const CITY = city;
    const URL = `https://api.opencagedata.com/geocode/v1/json?q=${CITY}&key=${TOKEN}`;

    return fetch(URL)
                .then(response => response.json())
                .then(data => {
                    console.log('Location data received')
                    return data.results[0];
                })
                .catch(() => console.error('Location data not received'));

}