export function redirectLogin(error) {
    if (error.response.status === 401) {
        const host  = window.location.host;
        window.location.replace(`http://${host}/login`);
    }
};