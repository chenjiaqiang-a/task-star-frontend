/** 
 * 操作localStorage的工具
*/
import store from 'store'

const storageUtils = {
    saveIsSignedIn (status) {
        store.set('is_signed_in', status)
    },

    getIsSignedIn () {
        return store.get('is_signed_in') || false
    },

    removeIsSignedIn () {
        store.remove('is_signed_in')
    },

    saveUserInfo (userInfo) {
        store.set('user_info', userInfo)
    },

    getUserInfo () {
        return store.get('user_info') || {rememberInfo: false}
    },

    removeUserInfo () {
        store.remove('user_info')
    },

}

export default storageUtils