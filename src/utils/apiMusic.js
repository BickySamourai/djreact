import request from './request';


function get() {

    return request({
        url: `/api/`,
        method: 'GET'
    });
}

function getId(id) {
    return request({
        url: `/api/${id}`,
        method: 'GET'
    });
}

const ApiService = {
    get, getId
}

export default ApiMusics;