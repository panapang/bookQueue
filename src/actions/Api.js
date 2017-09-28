function getRestaurant(cb) {
    return fetch('/restaurant', {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function getPromotion(id, cb) {
    return fetch('/promotions/' + id, {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function getPromotions(cb) {
    return fetch('/promotions', {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function createPromotion(promotion) {
    const headers = { 'Content-Type': 'application/json' };
    const request = new Request('/promotions', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(promotion)
    });


    return fetch(request).then(response => {
        return response.json();
    }).catch(error => {
        return error;
    });
}

function updatePromotion(promotion) {
    const headers = { 'Content-Type': 'application/json' };
    const request = new Request('/promotions/' + promotion._id, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(promotion)
    });


    return fetch(request).then(response => {
        return response.json();
    }).catch(error => {
        return error;
    });
}

function deletePromotion(id) {
    const request = new Request('/promotions/' + id, {
        method: 'DELETE'
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

const Api = { getRestaurant, getPromotion, getPromotions, createPromotion, updatePromotion, deletePromotion };
export default Api;