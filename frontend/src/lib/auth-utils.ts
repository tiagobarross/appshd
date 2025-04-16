export function getAuthToken() {
    return document.cookie.split('; ').find(row => row.startsWith('auth_token='));
}

export function isAuthenticated() {
    return getAuthToken() !== undefined;
}
