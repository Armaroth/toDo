import jwt_decode from 'jwt-decode';

export function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('token does not exist');

    return fetch(url, {
        ...options,
        headers: {
            authorization: `Bearer ${token}`,
            ...options.headers
        }
    }).then(r => {
        if (r.status === 401) {

            const decoded = decodeJwt(token);
            const exp = decoded.exp;
            if (token && (exp * 1000 <= Date.now())) {
                refreshToken(url, options);
            }


            localStorage.removeItem('token');
            window.location.href = window.origin + '/login'

        }
        return r;
    });

}

function refreshToken(url, options) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error(' refresh token does not exist');
    const response = fetch(`http://localhost:4000/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
    }).then(r => {
        if (r.ok) {
            return r.json();
        }
    }).then(r => {
        if (r) {
            const { accessToken, refreshToken } = r;
            localStorage.setItem('token', JSON.stringify(accessToken));
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
            fetchWithAuth(url, options);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            window.location.href = window.origin + '/login'
        }
    });


}

export function decodeJwt(jwt) {
    const decoded = jwt_decode(jwt);
    return decoded;
}

