const express=require('express')
const routes=express.Router()
const { historyStudent,evaluateStudent,getStudents,getQuestions } = require('../controllers/teacher.controller')

routes.get('/history/:id',historyStudent)
routes.get('/getStudents',getStudents)
routes.post('/evaluate/:types',evaluateStudent)
routes.post('/evaluate/getQuestions',getQuestions)

module.exports=routes