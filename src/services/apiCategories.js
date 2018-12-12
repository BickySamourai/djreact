import request from './request';

function getCategories() {

    return request({
        url: `/auth/categories/`,
        method: 'GET'
    });
}

const ApiCategories = {
    getCategories
}

export default ApiCategories;