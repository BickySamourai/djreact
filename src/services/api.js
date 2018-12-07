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


/*function create({ subject, content }) {
    return request({
        url: '/message/create',
        method: 'POST',
        data: {
            subject,
            content
        }
    });
}*/

const ApiService = {
    get, getId/*, create*/ //, update, delete, etc. ...
}

export default ApiService;