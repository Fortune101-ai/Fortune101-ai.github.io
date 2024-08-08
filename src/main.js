import { WEATHER_API_KEY,NEWS_API_KEY} from "./api_keys.js";

document.addEventListener('DOMContentLoaded', function () {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const navLinks = document.querySelector('.nav-links');

    hamburgerIcon.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    const weatherElement = document.getElementById('temperature');
    const weatherImageElement = document.getElementById('weather-image');

    //const location = 'Pretoria, ZA';
    let location = {};

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            res => {
               
                const latitude = res.coords.latitude;
                const longitude = res.coords.longitude;
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;
                const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
                getWeather(weatherUrl)
            },
            (err) => {
                console.error('An error occurred');
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
            }
        );
    } else {
        console.log("Geolocation may not be available")
    }

    const getWeather = (weatherUrl) => {
        fetch(weatherUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod === 200) {
                    const image = data.weather[0].icon;
                    const imageUrl = `http://openweathermap.org/img/wn/${image}.png`;
                    weatherElement.textContent = `Temp: ${data.main.temp}°C`;
                    weatherImageElement.src = imageUrl;
                } else {
                    weatherElement.textContent =
                        'Weather information not available';
                }
            })
            .catch((err) => {
                weatherElement.textContent = 'Failed to load weather information';
                console.error(err);
            });
    };



    const getNews = (apiUrl) => {

        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const articles = data.articles;
                const newsContainer = document.getElementById('news-content');

                // Limit to the first 6 articles
                const topArticles = articles.slice(0, 6);

                topArticles.forEach((article) => {
                    const articleElement = document.createElement('div');
                    articleElement.className = 'news-item';

                    const title = document.createElement('h2');
                    title.textContent = article.title;

                    const description = document.createElement('p');
                    description.textContent = article.description;

                    const link = document.createElement('a');
                    link.href = article.url;
                    link.textContent = 'Read more';
                    link.target = '_blank';

                    articleElement.appendChild(title);
                    articleElement.appendChild(description);
                    articleElement.appendChild(link);

                    newsContainer.appendChild(articleElement);
                });
            })
            .catch((error) => {
                console.error('Error fetching news:', error);
            });
    };

    getNews();
});

function displayAboutMe() {
    let elem = document.getElementById('more-about-me');

    if (elem.style.display === '') {
        elem.style.display = 'block';
        document.getElementById('view-button').innerText = 'Read less';
    } else if (elem.style.display === 'block') {
        document.getElementById('more-about-me').style.display = '';
        document.getElementById('view-button').innerText = 'Find our more';
    }
}