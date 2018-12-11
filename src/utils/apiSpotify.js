import request from './request';


function get() {

    return request({
        url: `auth/login/`,
        method: 'GET'
    });
}

/*function getId(id) {

    return request({
        url: `/api/${id}`,
        method: 'GET'
    });
}*/

const ApiSpotify = {
    get/*, getId*/
}

export default ApiSpotify;