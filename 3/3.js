const wsURL = 'wss://echo-ws-service.herokuapp.com';

const input = document.querySelector('.j-input');
const btnSend = document.querySelector('.j-btn');
const btnGeo = document.querySelector('.geo-btn');
const output = document.querySelector('.output');

let websocket = new WebSocket(wsURL);
websocket.addEventListener('open', function (event) {});

function writeToScreen(message, response) {
    let sms = document.createElement('p');
    sms.style.overflowWrap = 'break-word';
    sms.innerHTML = message;

    if (response == 'click') {
        sms.className = 'right';
    } else if (response == 'answer') {
        sms.className = 'left';
    } else {
        sms.className = 'error'
    }
    output.appendChild(sms);
}

btnSend.addEventListener('click', () => {
    websocket.send(input.value);
    writeToScreen(input.value, 'click');
})

websocket.addEventListener('message', function (event) {
    writeToScreen(event.data, 'answer');
});

websocket.onerror = function (event) {
    writeToScreen(event.data, 'error')
}

//Geolocation

const success = (position) => {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    writeToScreenGeo(latitude, longitude);
    console.log(latitude);
}

function writeToScreenGeo(latitude, longitude) {
    let geo = document.createElement('a');

    geo.href = `https://yandex.ru/maps/?pt=${longitude},${latitude}&z=18&l=map`;
    geo.textContent = 'Мое местоположение';
    geo.className = 'right';
    geo.style.display = 'block';
    geo.style.color= '#5374ec';
    geo.style.background= '#a2add6';
    output.appendChild(geo);
}

btnGeo.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(success);

});
