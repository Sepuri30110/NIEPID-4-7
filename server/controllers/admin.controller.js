// const loginModel=require('../model/login.model')
const userModel=require('../models/user.model')
const teacherModel=require('../models/teacher.model')
const studentModel=require('../models/student.model')
const studentDetailsModel=require('../models/studentDetails.model')
const classModel=require('../models/class.model')
const path = require('path')

const generateClassId = require('../deriving/deriveClass')
const studentJsonGenerate = require('../deriving/deriveStd')

const jwt=require('jsonwebtoken')


const registerStudent=async(req,res)=>{
    try{
        const val1 = {}
        const data = req.body
        const arr1 = await studentDetailsModel.find({regNo:data.details.regNo})
        const arr2 = await studentModel.find({regNo:data.details.regNo})
        lable1:if(arr1.length == 0 && arr2.length == 0){
            const flag = false
            const responce1 = await new studentDetailsModel(data.details).save()
            .then(()=>{console.log("data entered in studentDetailsModel successfully")})
            .catch((err)=>{
                console.log("error occured "+err)
                flag = true
            })
            if(flag){
                res.status(400).find({reason:"studentDetails already exists"})
                break lable1
            }
            const value1 = generateClassId(data.stdCred.section,data.stdCred.year)
            console.log(value1)
            const arr3 = await classModel.find({classId:"preprimary_1"})
            console.log(arr3.length)
            console.log(arr3)
            if(arr3.length == 0){
                res.status(400).json({reason:"no class exists"})
                break lable1
            }else if(arr3.length == 1){
                const v1 = arr3[0].student
                v1.push(data.details.regNo) 
                const searchClass = generateClassId(data.stdCred.section,data.stdCred.year)
                const responce2 = await classModel.findOneAndUpdate(
                   {classId:searchClass},
                   {student:v1},
                   {new :true}
                )
                const ans = studentJsonGenerate(data,searchClass)
                console.log(ans)
                const responce3 = await new studentModel(ans).save()
                .then(()=>{console.log("student has been saved")})
                .catch((err)=>{
                    console.log("student has not been saved \n"+err)
                    flag = true
                    console.log(ans)
                })
                if(flag){
                    res.status(400).find({reason:"student already exists"})
                    break lable1
                }
            }
        }
        else{
            console.log("hi ")
            res.status(400).json({failure:"true"})
        }
    }
    catch(error){
        console.log(error)
        res.status(404).send(false)
    }
}

const registerTeacher=async(req,res)=>{
    try{
        

    }
    catch(error){
        res.status(404).send(false)
    }
}

const viewStudent=async(req,res)=>{
    try{
        const students = await studentModel.find({})
        // console.log(students)
        if(students){
            res.status(200).json({status:"success",data:students})
        }
        else{
            res.status(405).json({status:"success",data:[]})
        }
    }
    catch(error){
        res.status(404).json("Error")
    }
}

const viewTeacher=async(req,res)=>{
    try{
        

    }
    catch(error){
        res.status(404).send(false)
    }
}

const downloadExcel= async(req, res) => {
    console.log("hii")
    const file = await path.join(__dirname, '..','samplesheets', 'sampleDataTeacher.xlsx'); // Adjust the path to your file
    console.log("File path:", file); // Log the file path for debugging
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Set the CORS header for this route
    res.download(file, (err) => {
    if (err) {
        console.error("File not found:", err);
        res.status(404).send("File not found");
    }
    });
};

module.exports={
    registerStudent,
    registerTeacher,
    viewStudent,
    viewTeacher,
    downloadExcel
}
