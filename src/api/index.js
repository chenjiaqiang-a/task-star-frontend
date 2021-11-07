/**
 * 请求接口函数
 */
import match from './match'
import request from './request'

const api = {
    // 刷新口令
    refreshToken() {
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
                    let userInfo = match.userMatchBack(response.data)
                    resolve(userInfo)
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
        let newUser = match.userMatch(userInfo)
        return new Promise((resolve, reject) => {
            request(
                "/admin/users/register",
                "post",
                newUser
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

    // 修改用户信息
    updateUserDetail (userInfo) {
        let newUser = match.userMatch(userInfo)
        return new Promise((resolve, reject) => {
            request(
                "/admin/users/edit",
                "post",
                newUser
            ).then(response => {
                if (response.code === 200) {
                    resolve("ok")
                } else {
                    resolve(false)
                }
            }).catch(err => {
                if (err.response.status === 401) {
                    resolve("token")
                } else {
                    resolve(false)
                }
            })
        })
    },

    // 获取热门任务
    getHotTask () {
        return new Promise((resolve, reject) => {
            request(
                "/admin/index",
                "post",
                {query: "四川大学",page: 1, limit: 6}
            ).then(response => {
                if (response.code === 200) {
                    let tasks = match.hotTaskMatchBack(response.data)
                    resolve(tasks)
                } else {
                    resolve(false)
                }
            }).catch(err => {
                resolve(false)
            })
        })
    },

    // 获取一条任务的详情
    getTaskById (id) {
        return new Promise((resolve, reject) => {
            request(
                "/admin/missions/info",
                "post",
                {id}
            ).then(response => {
                if (response.code === 200) {
                    let task = match.taskDetailMatchBack(response.data)
                    resolve(task)
                } else {
                    resolve(false)
                }
            }).catch(err => {
                if (err.response.status === 401) {
                    resolve("token")
                } else {
                    resolve(false)
                }
            })
        })
    },

    // 创建任务
    createTask (task, questions) {
        let matchedTask = match.taskDetailMatch(task, questions)
        console.log(matchedTask);
        return new Promise((resolve, reject) => {
            request(
                "/admin/missions/create",
                "post",
                matchedTask
            ).then(response => {
                if (response.code === 200) {
                    resolve("ok")
                } else {
                    resolve(false)
                }
            }).catch(err => {
                if (err.response.status === 401) {
                    resolve("token")
                } else {
                    resolve(false)
                }
            })
        })
    },

    // 完成任务
    submitAnswer (note, answers) {
        let answerMatched = match.answerMatch(note, answers)
        return new Promise((resolve, reject) => {
            request(
                "/admin/answers/create",
                "post",
                answerMatched
            ).then(response => {
                if (response.code === 200) {
                    resolve("ok")
                } else {
                    resolve(false)
                }
            }).catch(err => {
                if (err.response.status === 401) {
                    resolve("token")
                } else {
                    resolve(false)
                }
            })
        })
    }
}

export default api