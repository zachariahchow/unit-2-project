// AJAX //
const sendHttpRequest = async (httpMethod, url, data, httpHeaders) => {

    try {

        const response = await fetch(url, {
            method: httpMethod,
            body: JSON.stringify(data),
            headers: httpHeaders
        })

        if (response.status >= 200 && response.status < 300) {
            return response.json();

        } else {

            return response.json().then(errData => {
                console.log(errData);
                throw new Error('Server-side Error.');
            })
        }
    } catch (err) {
        console.log(err);
    }
}
//