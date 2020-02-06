export default function getNews() {        
    const Feed = require('rss-to-json');
    const newsContainer = document.querySelector('.news-container');
    newsContainer.innerHTML = `<h4>News</h4>`;
 
    // https://meduza.io/rss/all
    // https://cors-anywhere.herokuapp.com/https://lenta.ru/rss

    Feed.load('https://cors-anywhere.herokuapp.com/https://meduza.io/rss/all', function(err, rss){
        const newsArr = [];

        for (let i = 0; i < 8; i++) {
            newsArr.push(rss.items[i])
        };

        newsArr.forEach(value => {
            const item = document.createElement('div');
            item.innerHTML = `
                <a href="${value.link}" target="_blank">${(value.title).substring(0, 70)}...</a>
            `;

            newsContainer.appendChild(item);
        });

        if (!err) {
            console.log('News received');
        } else {
            console.error(err);
        }
    });
}
