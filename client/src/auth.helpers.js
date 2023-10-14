const jwt_decode = require('jwt-decode');


function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('token does not exist');
    return fetch(url, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            ...options.headers
        },
    }).then(r => {
        if (r.status === 401) {
            localStorage.removeItem('token');
            window.location.href = window.origin + '/login'
        }
        return r;
    });

}

function decodeJwt(jwt) {
    const decoded = jwt_decode(jwt);
    return decoded;
}

module.exports = { fetchWithAuth, decodeJwt };