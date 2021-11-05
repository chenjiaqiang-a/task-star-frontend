/**
 * 请求接口函数
 */
import request from './request'

const api = {
    // 刷新口令
    refreshToken () {
        return new Promise((resolve, reject) => {
            request("/admin/users/refreshtoken", "post")
            .then(response => {
                if (response.code === 200) {
                    resolve(response.data.token)
                } else {
                    resolve(false)
                }
            }).catch(err => {
                resolve(false)
            })
        })
    },

    // 登录
    reqLogin (username, pass) {
        return new Promise((resolve, reject) => {
            request(
                "/admin/users/login",
                "post",
                {username, pass}
            ).then(response => {
                if (response.code === 200) {
                    resolve(response.data)
                } else {
                    resolve(false)
                }
            }).catch(err => {
                resolve(false)
            })
        })
    },

    // 注册
    reqRegister (userInfo) {
        return new Promise((resolve, reject) => {
            request(
                "/admin/users/register",
                "post",
                userInfo
            ).then(response => {
                if (response.code === 200) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }).catch(err => {
                resolve(false)
            })
        })
    },

    // 获取热门任务
    getHotTask () {
        
    }
}

export default api