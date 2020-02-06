// module.exports = {
//     getLocation
// };


export default async function getLocation() {
    let locationData = {
        ipinfo: {
            city: '',
            country: '',
            latitude: '',
            longitude: '',
            region: '',
            timezone: '',
        },
        currentPosition: {
            latitude: '',
            longitude: '',
        }
    };

    function addGeoLocation(data) {        
        const latitude = data.loc.split(',')[0];
        const longitude = data.loc.split(',')[1];

        locationData.ipinfo.city = data.city;
        locationData.ipinfo.country = data.country;
        locationData.ipinfo.latitude = latitude;
        locationData.ipinfo.longitude = longitude;
        locationData.ipinfo.region = data.region;
        locationData.ipinfo.timezone = data.timezone;

        return locationData;
    }

    // Это берет данные по айпичнеку
    function getGeoLocation() {
        const TOKEN = '206803c3c45823';
        const URL = `https://ipinfo.io/json?token=${TOKEN}`;
        
        return fetch(URL)
                    .then(response => response.json())
                    .then(data => {
                        console.log('IP address coordinates  received');
                        return addGeoLocation(data);
                    })
                    .catch(function(error) {  
                        console.log('Request failed', error);  
                    });  
    }

    function getCurrentPositionFn(pos) {
        const crd = pos.coords;
        locationData.currentPosition.latitude = crd.latitude;
        locationData.currentPosition.longitude = crd.longitude;
        locationData.currentPosition.accuracy = crd.accuracy;
      };
      
    function getCurrentPositionFnError(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };    
    
    navigator.geolocation.getCurrentPosition(getCurrentPositionFn, getCurrentPositionFnError);
    
    locationData = await getGeoLocation();

    return locationData;
}
