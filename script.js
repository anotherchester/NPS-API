const api_key = 'oEsw085tGAPhBCF5knpPNkXYO6TF06A3GK0DjDMB'
const searchURL = "https://developer.nps.gov/api/v1/parks?"

function formatParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getParks(query, maxResults = 10) {
    const params = {
        api_key: api_key,
        limit: maxResults,
        stateCode:query
    }
    const queryString = formatParams(params);
    const url = searchURL + queryString;

    console.log(url)
    fetch(url)
        .then(response => {
            if (response.ok) {
                console.log('ok')
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(responseJson) {
    console.log('in display',responseJson)
    res = responseJson.data
    $('#results-list').empty();
    for (let i = 0; i < res.length; i++) {
        $('#results-list').append(
            `<li>
            <h3>${res[i].fullName}</h3>
            <p>${res[i].description}</p>
            <a href=${res[i].url}>website</a>
        </li>`
        )
    };
    $('#results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const limit = $('#js-limit').val();
        getParks(searchTerm, limit)
    })
}

$(watchForm)