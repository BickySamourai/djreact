import request from './request';

function createSession(email, password) {

    return request({
        url: '/rest-auth/login/',
        method: 'POST',
        data: {
            email,
            password
        }
    });
}


function signUp(username, email, password1, password2, last_name, first_name, categories) {

    return request({
        url: '/auth/registration/',
        method: 'POST',
        data: {
            username,
            email,
            password1,
            password2,
            last_name,
            first_name,
            categories
        }
    });
}

const ApiLogin = {
    createSession, signUp
}

export default ApiLogin;