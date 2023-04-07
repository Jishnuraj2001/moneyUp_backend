const express=require('express')
const {newTaskModel}=require("../model/newBudget.model")
const{Accountmodel}=require("../model/account.model");
const{authenticator}=require("../middleware/authentication");
const newBudgetRouter=express.Router()

newBudgetRouter.get("/",async(req,res)=>{
    res.status(200).send({msg:"This is newBudgetRouter page"})
})

newBudgetRouter.post('/create',authenticator,async(req,res)=>{
    try {
        req.body.createdDate=get_date()
        req.body.createdTime=get_time()
        let newTask=new newTaskModel(req.body)
        await newTask.save()
        res.status(200).send({msg:"Task Created Successfull"})
    } catch (error) {
        console.log(error.message)
        res.status(401).send({msg:"server error"})
    }
})

function get_date(){
    let date= new Date();
    var year = date.getFullYear();
    var mes = date.getMonth()+1;
    var dia = date.getDate();
    var today =dia+"-"+mes+"-"+year;
    return today;
}
function get_time(){
    let date= new Date();    
    let hours= date.getHours();
    let mins= date.getMinutes();
    let sec= date.getSeconds();
    var time = hours+":"+mins+":"+sec;
    return time;
}



module.exports={
    newBudgetRouter
}

// {
//     "email":"raj88@gmail.com",
//     "name":"raj",
//     "password":"raj",
//     "mob_no":"8959294632",
//     "dob":"21/2/2000"
//   }

// {
//     "name":"AXIS",
//      "acc_no":1968465498,
//      "balance":8000,
//      "userID":"642fb936c7e914ec71b08234"
//  }