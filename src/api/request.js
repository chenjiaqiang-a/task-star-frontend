import ajax from './ajax'
import memoryUtils from '../utils/memoryUtils'


function request(url, method='get', data={}) {
    const headers = {
        "Authorization": "Bearer " + memoryUtils.token,
    }
    return new Promise((resolve, reject) => {
        ajax({
            url,
            method,
            data,
            headers,
        }).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export default request;