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

const TableApi = { reserveTable };
export default TableApi;