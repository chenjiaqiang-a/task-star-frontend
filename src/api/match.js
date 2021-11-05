const questionType = ["text-input", "text-area", "radio", "date-input", "checkbox"]

const match = {
    taskMatch(frontTask) {
        let newTask = {}
        newTask.survey_name = frontTask.title
        newTask.survey_description = frontTask.description
        newTask.status = frontTask.status
        newTask.creator_id = frontTask.creatorId
        newTask.updater_id = frontTask.creatorId

        let questions = []
        frontTask.questions.forEach((item, idx)=> {
            let question = {}
            question.question_type = questionType.indexOf(item.type)
            question.question_name = item.question
            question.question_description = choices
            question.question_sort = idx
            question.required_flag = item.required?1:2

            question.question_pic_id = 129749127590214
            questions.push(question)
        });
        newTask.questions = questions


        newTask.survey_sort = 1
        newTask.top_flag = 1
        newTask.end_time = "2021-10-20 15:00"
        newTask.start_time = "2021-10-18 18:34"
        newTask.survey_pic_id = 12912491025712

        return newTask
    },
}
/*
{
    "survey_name": "大学生幸福指数",
    "survey_description": "调查大学生的幸福指数",
    "start_time":"2021-10-18 18:34", // 因为时存储字符串格式，所以时间是不是精确到秒没有什么问题，按照你方便的来
    "end_time": "2021-10-20 15:00",
    "status": 1, // 问卷状态，1 发布， 2 暂存，3 结束,  4 删除, 5 草稿
    "survey_sort": 2, // 任务的优先级，从1开始，越大越优先
    "top_flag": 1, // 任务是否置顶,1置顶，2不置顶
    "creator_id": 2,
    "updater_id": 2,
    "survey_pic_id":12912491025712, // 问卷的首页图片，目前先不要用，可以先不用发送这个字段，后期使用雪花算法会生成uuid才能使用
    "questions":[
        {
            "question_type": 1,
            "question_name": "每天睡觉时间", // 问题名字
            "question_description": "选出你的睡觉时间", // 问题具体内容
            "question-sort": 1, // 问题题号，从1开始
            "required_flag": 1, // 是否必填，1必填，2不必填
            "question_pic_id":129749127590214, // 不要用,可以先不填
        },
        {
            "question_type": 3,
            "question_name": "你觉得你开心吗", // 问题名字
            "question_description": "你开心吗", // 问题具体内容
            "question-sort": 2, // 问题题号，从1开始
            "required_flag": 1, // 是否必填，1必填，2不必填
            "question_pic_id":129749127590214, // 不要用,可以先不填
        }
    ]
    
}

const task = {
    title: "任务名称",
    description: "任务描述",
    private: false,
    manySubmit: false,
    id: nanoid(),
}
const questions = [
    {
        id: "1",
        task_id: task.id,
        question: "这是一个单行输入框",
        type: "text-input",
        choices: "",
        required: true,
        selected: false
    },
    {
        id: "2",
        task_id: task.id,
        question: "这是一个多行输入框",
        type: "text-area",
        choices: "",
        required: false,
        selected: false
    },
    {
        id: "3",
        task_id: task.id,
        question: "这是一个单项选择",
        type: "radio",
        choices: "选项一;选项二;[other]其它",
        selected: false,
        required: true,
    },
    {
        id: "4",
        task_id: task.id,
        question: "这是一个日期输入框",
        type: "date-input",
        choices: "",
        required: false,
        selected: false
    },
    {
        id: "5",
        task_id: task.id,
        question: "这是一个多项选择",
        type: "checkbox",
        choices: "选项一;选项二",
        selected: false,
        required: true,
    },
]
*/