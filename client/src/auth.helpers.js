import jwt_decode from 'jwt-decode'

export function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('token does not exist');
    return fetch(url, {
        ...options,
        headers: {
            authorization: `Bearer ${token}`,
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

export function decodeJwt(jwt) {
    const decoded = jwt_decode(jwt);
    return decoded;
}

