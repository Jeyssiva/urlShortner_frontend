const WEBSERVICE_URL = 'http://localhost:8085/api';

export function getUrlDataList() {
    const promise = new Promise((resolve, reject) => {
        fetch(`${WEBSERVICE_URL}/`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return resolve(data)
        })
    })
    return promise;
}

export function saveUrlData(longUrl) {
    const promise = new Promise((resolve, reject) => {
        fetch(`${WEBSERVICE_URL}/short/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({longUrl})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return resolve(data)
        })
    })
    return promise;
}

export function deleteUrl(urlId) {
    const promise = new Promise((resolve, reject) => {
        fetch(`${WEBSERVICE_URL}/${urlId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return resolve(data)
        })
    })
    return promise;
}