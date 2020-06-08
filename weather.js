const weatherContainer = document.querySelector('.js-weather');
const weather = weatherContainer.querySelector('h3');
const API_KEY = 'ec757e904841990307f2d7eed9e63a50';

const COORDS = 'coords';

function getWeather(lat, lon) {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (json) {
			console.log(json);
			const temperature = json.main.temp;
			const place = json.name;
			weather.innerText = `${temperature} @ ${place}`;
			weather.classList.add('weatherTitle');
		});
}

function saveCoords(coordsObj) {
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
	console.log(position);
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude,
	};
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleGeoError() {
	console.log('Cant access geo location');
}
function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
	const loadedCoords = localStorage.getItem(COORDS);
	if (loadedCoords === null) {
		askForCoords();
	} else {
		const parseCoords = JSON.parse(loadedCoords);
		console.log(parseCoords);
		getWeather(parseCoords.latitude, parseCoords.longitude);
	}
}

function init() {
	loadCoords();
}
init();
