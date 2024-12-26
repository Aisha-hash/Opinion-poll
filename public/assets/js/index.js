'use strict';

import { elements } from "./settings.js";

const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', evt => {
    console.log('Connection established');
});

socket.addEventListener('message', evt => {
    const results = JSON.parse(evt.data);
    // console.log(results);

    elements.resultsContainer.innerHTML = '';
    for (const [color, votes] of Object.entries(results)) {
        // let percentage = 0;
        let percentage = `${(votes / results.total * 100).toFixed(2)}%`;

        elements.resultsContainer.innerHTML += `
            <div>${color}</div>
            <div class="bar" style="width: ${percentage};">${percentage}</div>
            `;

    }
})


const sendData = evt => {
    evt.preventDefault();

    const formData = new FormData(elements.formData);
    const vote = formData.get('color');
    socket.send(JSON.stringify({ vote }));
    // formData.reset();
}

const init = () => {
    elements.formData = document.querySelector('#poll-form');
    elements.resultsContainer = document.querySelector('#results');

    elements.formData.addEventListener('submit', sendData);


}

init();