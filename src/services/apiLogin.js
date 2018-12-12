import request from './request';

function createSession(username, password) {
    console.log(username,password)

    return request({
        url: '/auth/login/',
        method: 'POST',
        data: {
            username,
            password
        }
    });
}


function signUp(username, email, password, password2, last_name, first_name, categories) {

    return request({
        url: '/auth/registration/',
        method: 'POST',
        data: {
            username,
            email,
            password,
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