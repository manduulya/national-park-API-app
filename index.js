'use strict';

const apiKey = '3qJhuOZPD9xBnVK6UECGyG2GQRYV9lGA23hTzlby';
const apiUrl = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
}

function displayResults(responseJson, maxNumber){

    $('.result-list').empty();

    for (let i=0; i<responseJson.data.length & i<maxNumber; i++){
        $('body').append(
            `<section class="result-box hidden">
                <ul class="result-list">
                    <li><h3>Full name: </h3><p class="result-header">${responseJson.data[i].name}</p></li>
                    <li><h3>Description: </h3><p>${responseJson.data[i].description}</p></li>
                    <li><h3>Website URL: </h3><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></li>
                </ul>
            </section>`
        )
    }

    $('.result-box').removeClass('hidden');
}

function getNationalPark(query, maxNumber=10){
    const params = {
        stateCode: query,
        api_key: apiKey        
    };
    const queryString = formatQueryParams(params)
    const url = apiUrl + '?' + queryString;

    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxNumber))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    })
}

function watchForm(){
    $('form').submit(event =>{
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxNumber = $('#js-max-number').val();
        getNationalPark(searchTerm, maxNumber);
    });
}

$(watchForm);