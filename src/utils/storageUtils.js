/** 
 * 操作localStorage的工具
*/
import store from 'store'

const storageUtils = {
    // 登陆状态
    saveIsSignedIn (status) {
        store.set('is_signed_in', status)
    },
    getIsSignedIn () {
        return store.get('is_signed_in') || false
    },
    removeIsSignedIn () {
        store.remove('is_signed_in')
    },

    // 用户信息
    saveUserInfo (userInfo) {
        store.set('user_info', userInfo)
    },
    getUserInfo () {
        return store.get('user_info') || {
            rememberInfo: false,
            username: "",
            userId: "",
            phone: "",
            email: "",
            nickname: ""
        }
    },
    removeUserInfo () {
        store.remove('user_info')
    },

    // 令牌
    saveToken (token) {
        store.set('task_token', token)
    },
    getToken () {
        return store.get('task_token') || ""
    },
    removeToken () {
        store.remove('task_token')
    }
}

export default storageUtils