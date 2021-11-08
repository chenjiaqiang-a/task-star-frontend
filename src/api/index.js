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
                    let tasks = match.taskMatchBack(response.data)
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
    getTaskById (id, create=false) {
        return new Promise((resolve, reject) => {
            request(
                "/admin/missions/info",
                "post",
                {id}
            ).then(response => {
                if (response.code === 200) {
                    let task
                    if (create) {
                        task = match.createTaskDetailMatchBack(response.data)
                    } else {
                        task = match.doTaskDetailMatchBack(response.data)
                    }
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

    // 搜索任务
    searchTasks (kw) {
        return new Promise((resolve, reject) => {
            request(
                "/admin/index",
                "post",
                {query: kw, page: 1, limit: 99}
            ).then(response => {
                if (response.code === 200) {
                    let tasks = match.taskMatchBack(response.data)
                    resolve(tasks)
                } else {
                    resolve([])
                }
            }).catch(err => {
                resolve([])
            })
        })
    },

    // 获取我的任务
    getMyTasks (userId) {
        return new Promise((resolve, reject) => {
            request(
                "/admin/missions/mymission",
                "post",
                {creator_id: userId}
            ).then(response => {
                if (response.code === 200) {
                    let tasks = match.taskMatchBack(response.data)
                    resolve(tasks)
                } else {
                    resolve([])
                }
            }).catch(err => {
                resolve([])
            })
        })
    },

    // 创建任务
    createTask (task, questions) {
        let matchedTask = match.createTaskDetailMatch(task, questions)
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

    // 更新任务详情
    updateTaskDetail (task, questions, deletedQuestions) {
        let matchedTask = match.updateTaskDetailMatch(task, questions, deletedQuestions)
        console.log(matchedTask);
        return new Promise((resolve, reject) => {
            request(
                "/admin/missions/edit",
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

    // 更新任务概要
    updateTask (task) {
        let matchedTask = match.updateTaskMatch(task)
        console.log(matchedTask);
        return new Promise((resolve, reject) => {
            request(
                "/admin/missions/edit",
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
    },

    // 修改任务
    updateAnswer (note, answers) {
        let answerMatched = match.updateAnswerMatch(note, answers)
        return new Promise((resolve, reject) => {
            request(
                "/admin/answers/edit",
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
    },

    // 查找我的答案 
    getMyAnswers (userId) {
        return new Promise((resolve, reject) => {
            request(
                "/admin/answers/myanswer",
                "post",
                {user_id:userId, page:1, limit:99}
            ).then(response => {
                if (response.code === 200) {
                    let doneTasks = match.myAnswerTasksMatchBack(response.data)
                    resolve(doneTasks)
                } else {
                    resolve([])
                }
            }).catch(err => {
                resolve([])
            })
        })
    },

    // 获得某一任务的所有答案
    getTaskAnswers (taskId) {
        return new Promise((resolve, reject) => {
            request(
                "/admin/answers/showbysurveyid",
                "post",
                {id:taskId, page:1, limit:999}
            ).then(response => {
                if (response.code === 200) {
                    let answers = match.taskAnswersMatchBack(response.data)
                    resolve(answers)
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

    // 获取一个答案
    getAnswerById (id) {
        return new Promise((resolve, reject) => {
            request(
                "/admin/answers/showbyid",
                "post",
                {id}
            ).then(response => {
                if (response.code === 200) {
                    let answer = match.answerMatchBack(response.data)
                    resolve(answer)
                } else {
                    resolve(false)
                }
            }).catch(err => {
                resolve(false)
            })
        })
        
    }

}

export default api