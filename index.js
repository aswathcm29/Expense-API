/**Expense Tracker 
 * Add expense - Post method
 * Delete expense(using id) - Post method 
 * Display expense - Get method
 * Update expense - Post method 
 * */
/**
 * 
 */
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { Model } = require('./schema')
const cors = require('cors')
app.use(bodyParser.json())
app.use(cors())

const connectToDb = async()=>{
    try{
    await mongoose.connect('mongodb+srv://aswathcm29:abcd1234@connecto.twkskak.mongodb.net/ExpenseTrack?retryWrites=true&w=majority&appName=Connecto')
    console.log('DB connection established')
    app.listen(8000,function(){
        console.log('Listening on 8000')
    })
     }catch(err){
    console.log('Error connecting to MongoDB : ',err.message)
    }
}

connectToDb()


app.post('/add-expense',async function(req,res){
  try{
   const data = req.body
  await Model.create({
       "amount":data.amount,
       "description":data.description,
       "date":data.date
  })
  res.status(201).json({
    "error":"false",
    "message":'Entry created'
  })
}
catch(err){
  res.status(500).json({
    "error":"false",
    "message":'Entry Failed',
    "reason":err.message
  })
}
})

app.get('/get-expense',async function(req,res){
    try{
        const data = await Model.find()
         res.status(201).json({
            'error':'false',
            'message':'displayed',
            'data':data
         })
    }catch(err){
        res.status(500).json({
            'error':'true',
            'message':err.message
        })
    }
})

app.delete('/delete-expense/:id',async function (req,res){
    
    try{
      const ExpenseId = await Model.findById(req.params.id)
      if(ExpenseId){
        await Model.findByIdAndDelete(req.params.id)
        res.status(200).json({
          'error':'false',
           'meessage':'Entry Deleted'
        })
      }
        else {
          response.status(404).json({
              "error" : "true",
              "message" : "entry not found"
          })
      }
    }catch(err){
      res.status(500).json({
        'error':'true',
        'message':'Could not delete',
         'reason':err.message
      })
    }
  })

  app.post('/update-expense/:id',async function(req,res){
     try{
      const ExpenseId = await Model.findByIdAndUpdate(req.params.id)
      if(ExpenseId){
       await Model.updateOne({
         "amount":req.body.amount,
         "description":req.body.description,
         "date":req.body.date
       })
       res.status(201).json({
         'error':'false',
         'message':'entry updated'
       })
      }
      else{
       res.status(404).json({
         'error':'true',
         'message':'entry not found'
       })
      }
     }
     catch(err){
      res.status(501).json({
        'error':'true',
        'message':'failure',
        'reason':err.message
      })
     }  
  })