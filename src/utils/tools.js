/**
 * 工具函数
 */
export function isEmail (str) {
    let stand = /^[\w\-.]+@[a-z0-9]+(-[a-z0-9]+)?(\.[a-z0-9]+(-[a-z0-9]+)?)*\.[a-z]{2,4}$/i
    return stand.test(str)
}

// 重排列表
export function reorder (list, startIdx, endIdx) {
    const result = Array.from(list)
    const [removed] = result.splice(startIdx, 1)
    result.splice(endIdx, 0, removed)

    return result
}

// 组合问题和答案
export function combineQuestionAndAnswer(questions, answers) {
    answers.forEach(answer => {
        let index = questions.findIndex(item => item.id === answer.questionId)
        if (questions[index].type === "radio" || questions[index].type === "checkbox") {
            let value = answer.value.split(";")
            value = value.map(val => {
                if(val[0] === "[" && val.slice(1,6) === "other") {
                    val = val.slice(7)
                    let idx = val.indexOf(":")
                    let text = val.slice(idx+1)
                    val = val.slice(0, idx)
                    questions[index].choices[val*1].value = text
                }
                return val*1
            })
            questions[index].choose = value
        } else {
            questions[index].value = answer.value
        }
        questions[index].answerId = answer.id
    })
    
    return questions
}
