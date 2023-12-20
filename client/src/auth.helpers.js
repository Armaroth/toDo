import jwt_decode from 'jwt-decode';
export async function fetchWithAuth(url, options = {}) {
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
            } else {
                localStorage.removeItem('token');
                window.location.href = window.origin + '/login'
            }
        }
        return r;
    });
}

function refreshToken(url, options) {
    const token = localStorage.getItem('token');
    const decoded = decodeJwt(token);
    const id = decoded.id;
    const response = fetch(`http://localhost:4000/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    }).then(r => {
        if (r.ok) {
            return r.json();
        }
    }).then(r => {
        if (r) {
            const { accessToken } = r;
            localStorage.setItem('token', JSON.stringify(accessToken));
            fetchWithAuth(url, options);
        } else {
            localStorage.removeItem('token');
            window.location.href = window.origin + '/login'
        }
    });
}

export function decodeJwt(jwt) {
    const decoded = jwt_decode(jwt);
    return decoded;
}

