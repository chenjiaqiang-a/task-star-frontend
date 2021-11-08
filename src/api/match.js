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
    
    createTaskDetailMatch (frontTask, frontQuestions) {
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

    updateTaskDetailMatch (frontTask, frontQuestions, deletedQuestions) {
        let newTask = {}
        newTask.survey_id = frontTask.id
        newTask.survey_name = frontTask.title
        newTask.survey_description = frontTask.description
        newTask.status = frontTask.status
        newTask.creator_id = frontTask.creator
        newTask.updater_id = frontTask.creator
        newTask.private = frontTask.private?1:2

        let questions = []
        frontQuestions.forEach((item, idx)=> {
            let question = {}
            if (item.status !== 3) {
                question.id = item.id
            }
            
            question.survey_id = newTask.survey_id
            question.status = item.status
            question.question_type = questionType.indexOf(item.type)
            question.question_name = item.question
            question.question_description = item.choices
            question.question_sort = idx+1
            question.required_flag = item.required?1:2

            question.question_pic_id = 129749
            questions.push(question)
        });
        deletedQuestions.forEach(item => {
            let question = {}
            question.id = item.id
            question.survey_id = item.task_id
            question.status = 2
            question.question_type = questionType.indexOf(item.type)
            question.question_name = item.question
            question.question_description = item.choices
            question.question_sort = item.sort
            question.required_flag = item.required?1:2

            question.question_pic_id = 129749
            questions.push(question)
        })
        newTask.questions = questions


        newTask.survey_sort = 1
        newTask.top_flag = 1
        newTask.end_time = "2021-10-20 15:00"
        newTask.start_time = "2021-10-18 18:34"
        newTask.survey_pic_id = 129124

        console.log(newTask);

        return newTask
    },

    updateTaskMatch (frontTask) {
        let newTask = {}
        newTask.survey_id = frontTask.id
        newTask.survey_name = frontTask.title
        newTask.survey_description = frontTask.description
        newTask.status = frontTask.status
        newTask.creator_id = frontTask.creator
        newTask.updater_id = frontTask.creator
        newTask.private = frontTask.private?1:2
        
        newTask.questions = []

        newTask.survey_sort = 1
        newTask.top_flag = 1
        newTask.end_time = "2021-10-20 15:00"
        newTask.start_time = "2021-10-18 18:34"
        newTask.survey_pic_id = 129124

        return newTask
    },

    taskMatchBack (tasksBack) {
        let tasks = []
        tasksBack.forEach(task => {
            let newTask = {}
            newTask.id = task.Survey.id
            newTask.title = task.Survey.SurveyName
            newTask.description = task.Survey.SurveyDescription
            newTask.status = task.Survey.Status
            newTask.private = task.Survey.Private === 1
            newTask.creator = task.Survey.CreatorId
            newTask.published = newTask.status === 1
            tasks.push(newTask)
        })

        return tasks
    },

    createTaskDetailMatchBack (taskBack) {
        let result = {}
        let task = {}
        let questions = []

        task.id = taskBack.Survey.id
        task.title = taskBack.Survey.SurveyName
        task.description = taskBack.Survey.SurveyDescription
        task.private = taskBack.Survey.Private === 1
        task.status = taskBack.Survey.Status
        task.manySubmit = true
        result.task = task

        taskBack.Questions.forEach(item => {
            let question = {}
            question.id = item.id
            question.order = item.question_sort
            question.status = 1
            question.task_id = item.survey_id
            question.question = item.question_name
            question.required = item.required_flag === 1
            question.selected = false
            question.type = questionType[item.question_type]
            
            question.choices = item.question_description

            questions.push(question)
            
        })
        questions.sort((a, b) => (a.order - b.order))
        result.questions = questions
        

        return result
    },

    doTaskDetailMatchBack (taskBack) {
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
        console.log(newAnswer);
        return newAnswer
    },
    updateAnswerMatch (note, answers) {
        let newAnswer = {}
        newAnswer.answer_id = note.id
        newAnswer.user_id = note.user_id
        newAnswer.survey_id = note.task_id
        newAnswer.created_at = note.create_time.toLocaleString()
        newAnswer.updated_at = note.update_time.toLocaleString()
        newAnswer.status = note.status
        newAnswer.answer_string = answers.map(item => {
            let answer = {}
            answer.id = item.id
            answer.answer_id = newAnswer.answer_id
            answer.question_id = item.question_id
            answer.option_content = item.content
            answer.answer_file_id = 219749
            answer.status = 1
            return answer
        })
        return newAnswer
    },
    answerMatchBack (answer) {
        let newAnswer = answer.Answers.map(item => {
            let temp = {}
            temp.id = item.id
            temp.answerId = item.answer_id
            temp.questionId = item.question_id
            temp.value = item.option_content
            return temp
        })
        return newAnswer

    },

    taskAnswersMatchBack(answers) {
        let newAnswers = answers.map(answer => {
            let newAnswer = {}
            newAnswer.id = answer.BaseAnswer.id
            newAnswer.submitTime = answer.BaseAnswer.updated_at.slice(0, 10)
            newAnswer.author = {
                id: answer.BaseAnswer.user_id,
                avatar: "",
                name: "用户"+answer.BaseAnswer.user_id
            }
            return newAnswer
        })

        return newAnswers
    },

    myAnswerTasksMatchBack (tasks) {
        let doneTasks = tasks.map(task => {
            let newTask = {}
            newTask.title = task.SurveyName
            newTask.description = task.SurveyDescription
            newTask.status = 

            newTask.id = task.id
            newTask.answerId = task.AnswerId
            
            newTask.status = task.Status
            newTask.private = task.Private === 1
            newTask.creator = task.CreatorId
            newTask.published = newTask.status === 1

            return newTask
        })

        return doneTasks
    }

}
export default match;

/*
{
    "answer_id": 104,
    "user_id": 12,
    "survey_id": 11,
    "created_at": "2021-11-11 14:34:14",
    "updated_at": "2021-11-11 14:34:14",
    "status": 2,
    "answer_string": [
        {
            "id": 108,
            "answer_id": 104,
        	"question_id": 133,
        	"option_content": "考研突击班",
        	"answer_file_id": 219749,
            "status": 1
        },
        {
            "id": 109,
            "answer_id": 104,
        	"question_id": 134,
        	"option_content": "推荐好的考研培训机构",
        	"answer_file_id": 21974,
            "status": 1
        }
    ]
}
*/
