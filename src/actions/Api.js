function getRestaurant(cb) {
    return fetch('restaurant', {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function getPromotions(cb) {
    return fetch('promotions', {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function createPromotion(promotion) {
    console.log("in api createPromotion");
    const headers = { 'Content-Type': 'application/json' };
    const request = new Request('/promotions', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ promotion: promotion })
    });


    return fetch(request).then(response => {
        return response.json();
    }).catch(error => {
        return error;
    });
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
}

function parseJSON(response) {
    return response.json();
}

const Api = { getRestaurant, getPromotions, createPromotion };
export default Api;