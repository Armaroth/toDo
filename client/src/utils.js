import jwt_decode from "jwt-decode";
export function decodeJwt(jwt) {
    const decoded = jwt_decode(jwt);
    return decoded;
}