// const loginModel=require('../model/login.model')
// const userModel=require('../model/user.model')
const userModel=require('../models/user.model')
const teacherModel=require('../models/teacher.model')
const studentModel=require('../models/student.model')
const studentDetailsModel=require('../models/studentDetails.model')
const classModel=require('../models/class.model')


const jwt=require('jsonwebtoken')

const evaluateStudent=async(req,res)=>{
    const val = req.params.type
    if(val === 'personal'||val === 'social'||val === 'academic'||val === 'occupational'||val === 'recreational'){    
        val = val+"QA"
        try{
            const data = req.body
            const responce = studentModel.findOneAndUpdate(
                {regNo:data.username},//check if it is username or not
                {val:data.questions},
                {new:true}
            )
            console.log(responce)//for testing
            res.status(200).json({message:"successfully updated student"})
        }
        catch(error){
            res.status(404).send(false)
        }
    }else{
        res.status(400).json({message:"wrong category"})
    }
}
const historyStudent=async(req,res)=>{
    try{
        
    }
    catch(error){
        res.status(404).send(false)
    }
}

const getStudents = async (req, res) => {
    try {
        console.log("Hiii")
        const id = req.headers.id
        const teacher = await teacherModel.find({ "teacherId": id })
        const students = []
        for (let index = 0; index < teacher.classId.length; index++) {
            const classId = teacher.classId[index];
            const students_classId = await studentModel.find({"classId" : classId})
            students.push(students_classId)
        }
        console.log(students)
        if (students) {
            res.json({ status: "success", data: students })
            console.log(students)
        }
        else {
            res.status(405).send(false)
        }
    }
    catch (error) {
        res.status(404).send(false)
    }
        
        // ----------------------IGNORE----------------------------
    //     const students = await studentModel.find({ "classId": { $in: teacher.classId } })
        
}

const getQuestions = async (req, res) => {
    try {
        const id = req.headers.id
        const student = await studentModel.find({"regNo" : id})
        if(student){
            res.json({status:"success",data:student})
        }
        else{
            res.status(405).send(false)
        }
    }
    catch (error) {
        res.status(404).send(false)
    }
}


module.exports={
    historyStudent,
    getStudents,
    evaluateStudent,
    getQuestions
}