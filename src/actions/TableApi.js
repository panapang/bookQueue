function getTables(cb) {
    return fetch('/tables', {
        accept: 'application/json'
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function reserveTable(guests) {
    const data = { guests: guests };
    const headers = { 'Content-Type': 'application/json' };
    const request = new Request('/reserve', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });


    return fetch(request).then(response => {
        return response.json();
    }).catch(error => {
        return error;
    });
}

function pay(name) {
    const data = { name: name };
    const headers = { 'Content-Type': 'application/json' };
    const request = new Request('/pay', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
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

const TableApi = { reserveTable, getTables, pay };
export default TableApi;