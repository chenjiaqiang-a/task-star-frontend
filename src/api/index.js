/**
 * 请求接口函数
 */
import request from './request'
const api = {
    reqLogin (username, password) {
        return request.post("/login", {username, password})
    },

    reqRegister (userInfo) {
        return request.post("/users", userInfo)
    }
}

export default api