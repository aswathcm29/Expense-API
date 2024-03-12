const mongoose = require('mongoose')
 const expenseSchema =new mongoose.Schema({
    amount : {
        type:Number
    },
    description:{
        type:String
    },
      date :{
        type:String
      }
 })

 const Model = mongoose.model('expense',expenseSchema)
 module.exports={Model}