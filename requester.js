const baseURL = "https://baas.kinvey.com"
const appKey = "kid_B19VWxETH"
const appSecret = "9d7f2bb4aa6848d193b5b8042a6f0ea3"

function createAutorizationType(type) {
    return type === 'Basic'
        ? `Basic ${btoa(`${appKey}:${appSecret}`)}`
        : `Kinvey ${sessionStorage.getItem('authtoken')}`
}


function makeHeaders(httpMethod, data, type) {
    let header = {
        method: httpMethod,
        headers: {
            'Authorization': createAutorizationType(type),
            'Content-Type': 'application/json'
        }
    }
    if (httpMethod === 'POST' || httpMethod === 'PUT') {
        header.body = JSON.stringify(data)
    }
    return header
}

function handler(res){
    if(res.status === 409) {
        alert('This username is already used!');
    }
    if (!res.ok) { 
        throw new Error(`Something went wrong! Status: ${res.status}, Status text: ${res.statusText}`);
    }
    if(res.status === 204){
        return res;
    }
    return res.json();
}

function fetchData(kinveyModule, endpoint, headers) {
    const url = `${baseURL}/${kinveyModule}/${appKey}/${endpoint}`
    return fetch(url, headers)
        .then(handler)
}



export function get(kinveyModule, endpoint, type) {
    const header = makeHeaders('GET', type)
    return fetchData(kinveyModule, endpoint, header)
}
export function post(kinveyModule, endpoint, data, type) {
    let headers = makeHeaders('POST', data, type)
    return fetchData(kinveyModule, endpoint, headers)
}
export function put(kinveyModule, endpoint, data, type) {
    let headers = makeHeaders('PUT', data, type)
    return fetchData(kinveyModule, endpoint, headers)
}
export function del(kinveyModule, endpoint, type) {
    let headers = makeHeaders('DELETE', type)
    return fetchData(kinveyModule, endpoint, headers)
}