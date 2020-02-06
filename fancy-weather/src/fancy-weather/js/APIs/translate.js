export default function getTranslate(lang) {
    const TOKEN = 'trnsl.1.1.20191213T132154Z.8a6a778259f39faa.4a5afd5e8790076c9e0c335796244f7df67bcc39';
    const city = document.querySelector('.city-container');
    const date = document.querySelector('.date-container');
    const summary = document.querySelector('.summary');
    const feelsLike = document.querySelector('.feels-like');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const broadCast = document.querySelectorAll('h3');
    const dayArr = []; 
    const lat = document.querySelector('.lat');
    const lon = document.querySelector('.lon');

    broadCast.forEach((val, index) => {
        dayArr[index] = val.innerText;
    })

    const URL = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TOKEN}
                        &text=${encodeURIComponent(city.textContent)}
                        &text=${encodeURIComponent(date.textContent)}
                        &text=${encodeURIComponent(summary.textContent)}
                        &text=${encodeURIComponent(feelsLike.textContent)}
                        &text=${encodeURIComponent(wind.textContent)}
                        &text=${encodeURIComponent(humidity.textContent)}
                        &text=${encodeURIComponent(dayArr)}
                        &text=${encodeURIComponent(lat.textContent)}
                        &text=${encodeURIComponent(lon.textContent)}
                        &lang=${lang}
                        &format=plain
                        &options=1`;


    function returnTranslateInToHTML(data) {
        city.innerHTML = data.text[0];
        date.innerHTML = data.text[1];
        summary.innerHTML = data.text[2];
        feelsLike.innerHTML = data.text[3];
        wind.innerHTML = data.text[4];
        humidity.innerHTML = data.text[5];

        data.text[6].split(',').forEach((val, index) => { broadCast[index].textContent = val; });

        lat.innerHTML = data.text[7];
        lon.innerHTML = data.text[8];
    }

    return fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log('Translate received');
            return returnTranslateInToHTML(data);
        })
        .catch((error) => console.error('Translate not received', error));

}