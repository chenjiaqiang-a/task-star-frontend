const questionType = ["text-input", "text-area", "radio", "date-input", "checkbox", "image-uploader", "file-uploader"]

const match = {
    userMatch (frontUser) {
        let newUser = {}
        newUser.pass = frontUser.password || "12345678"
        newUser.username = frontUser.username
        newUser.id = frontUser.userId || ""
        newUser.nick_name = frontUser.nickname || frontUser.username
        newUser.email = frontUser.email || "123@123.com"
        newUser.phone = frontUser.phone || "11111111111"

        newUser.identity = "123123"

        return newUser
    },
    userMatchBack (backUser) {
        let newUser = {}
        newUser.username = backUser.user_name
        newUser.userId = backUser.userId
        newUser.phone = backUser.phone || ""
        newUser.email = backUser.email || ""
        newUser.nickname = backUser.nick_name || backUser.user_name
        newUser.token = backUser.token

        return newUser
    },
    
    taskDetailMatch (frontTask, frontQuestions) {
        let newTask = {}
        newTask.survey_name = frontTask.title
        newTask.survey_description = frontTask.description
        newTask.status = frontTask.status
        newTask.creator_id = frontTask.creator
        newTask.updater_id = frontTask.creator
        newTask.private = frontTask.private?1:2

        let questions = []
        frontQuestions.forEach((item, idx)=> {
            let question = {}
            question.question_type = questionType.indexOf(item.type)
            question.question_name = item.question
            question.question_description = item.choices
            question.question_sort = idx+1
            question.required_flag = item.required?1:2

            question.question_pic_id = 129749
            questions.push(question)
        });
        newTask.questions = questions


        newTask.survey_sort = 1
        newTask.top_flag = 1
        newTask.end_time = "2021-10-20 15:00"
        newTask.start_time = "2021-10-18 18:34"
        newTask.survey_pic_id = 129124

        return newTask
    },

    hotTaskMatchBack (tasksBack) {
        let tasks = []
        tasksBack.forEach(task => {
            let newTask = {}
            newTask.id = task.Survey.id
            newTask.title = task.Survey.SurveyName
            newTask.description = task.Survey.SurveyDescription
            tasks.push(newTask)
        })

        return tasks
    },

    taskDetailMatchBack (taskBack) {
        let result = {}
        let task = {}
        let questions = []

        task.id = taskBack.Survey.id
        task.title = taskBack.Survey.SurveyName
        task.description = taskBack.Survey.SurveyDescription
        result.task = task

        taskBack.Questions.forEach(item => {
            let question = {}
            question.id = item.id
            question.order = item.question_sort
            question.task_id = item.survey_id
            question.question = item.question_name
            question.required = item.required_flag === 1
            question.type = questionType[item.question_type]
            let choices = item.question_description.split(";")
            if (choices.length > 1) {
                choices = choices.map(choice => {
                    let newChoice = {}
                    newChoice.other = false
                    newChoice.text = choice
                    if(choice[0] === "[" && choice.slice(1,6) === "other") {
                        newChoice.other = true
                        newChoice.text = choice.slice(7)
                        newChoice.value = ""
                    }
                    return newChoice
                })
            } else {
                choices = choices[0]
            }
            question.choices = choices

            question.choose = []
            question.value = ""

            questions.push(question)
            
        })
        questions.sort((a, b) => (a.order - b.order))
        result.questions = questions

        return result
    },
    answerMatch (note, answers) {
        let newAnswer = {}
        newAnswer.user_id = note.user_id
        newAnswer.survey_id = note.task_id
        newAnswer.created_at = note.create_time.toLocaleString()
        newAnswer.updated_at = note.update_time.toLocaleString()
        newAnswer.status = note.status
        newAnswer.answer_string = answers.map(item => {
            let answer = {}
            answer.answer_id = item.task_id
            answer.question_id = item.question_id
            answer.option_content = item.content
            answer.answer_file_id = 219749
            return answer
        })
        return newAnswer
    }

}
export default match;
