
const express = require('express');
const router = express.Router();
const {isLoggedIn,isLoggedInA} = require("../middleware/fixers");
const Track = require("../models/tracking")

router.get("/",isLoggedIn,(req,res) =>{
    res.render("trackhomepage")
})
router.get("/doctorvisit",isLoggedIn,(req,res) =>{
    res.render("doctorreminder")
})
router.get("/medicationReminder",isLoggedIn,(req,res) =>{
    res.render("medicationreminder")
})
router.get("/attackrecord",isLoggedIn,(req,res) =>{
    res.render("attackrecord")
})

// for docter reminder
router.post("/setdoctorreminder",isLoggedIn ,async (req,res) => {
    let user = req.user;
    console.log(user.username)
    await Track.find({username:user.username} , async (err,result) => {
        if (err) throw err;
        console.log(result)
        let mainarray = result[0].upcomingDoctorVisit
        let data = {
            time:req.body.time,
            doctortype:req.body.type,
            treatment:req.body.treatment,
            note:req.body.note
        }
        mainarray.push(data)
        await Track.updateOne({username:user.username},{ $set : { upcomingDoctorVisit:mainarray }},(err,result) => {
            if(err) throw err;
            //console.log(result)
            res.redirect("/record")
        })
    })
    //console.log(data)
})

router.get("/doctorvisitcheck",isLoggedIn ,async (req,res) => {
    let user = req.user;
    console.log(user.username)
    await  Track.find({username:user.username} ,(err,result) => {
        if (err) throw err;
        
        // rendering not done you need to render all the planned visit which are noted 
        // in the result[0].upcomingDoctorVisit[i] where i is any integer . make other view file to render .
        // as an example i m doing console for result[0].upcomingDoctorVisit[0]
        
            for (i=0; i<result[0].upcomingDoctorVisit.length; i++){
            console.log(result[0].upcomingDoctorVisit[i]);
            
           
        };
        res.render('doctorrecord', {result:result});
    })
    //console.log(data)
})


router.post("/medicationReminder",isLoggedIn , async (req,res) =>{
    let user = req.user;
    console.log(user.username)
    await Track.find({username:user.username} , async (err,result) => {
       if (err) throw err;
       let mainarray = result[0].medicationReminder
       let data = {
           time:req.body.date,
           MedicationDetails:req.body.medication,
           ReminderFrequency:`${req.body.Frequency} day per ${req.body.Frequency2}`,
           Note:req.body.note
       }
       mainarray.push(data)
       await Track.updateOne({username:user.username},{ $set : { medicationReminder:mainarray }},(err,result) => {
           if(err) throw err;
           //console.log(result)
           res.redirect("/record")
       })
   })
})

router.get("/medicationRemindercheck",isLoggedIn ,async (req,res) => {
    let user = req.user;
    console.log(user.username)
    await  Track.find({username:user.username} ,(err,result) => {
        if (err) throw err;
        // rendering not done you need to render all the medical reminder which are noted 
        // in the result[0].medicationReminder[i] where i is any integer . make other view file to render .
        // as an example i m doing console for result[0].medicationReminder[0]
       
        for (i=0; i<result[0].medicationReminder.length; i++){
            console.log(result[0].medicationReminder[i]);
            
           
        };
        res.render('meditationrecord', {result:result});})
    //console.log(data)
})


router.post("/attackrecord",isLoggedIn , async (req,res) =>{
    let user = req.user;
    console.log(user.username)
    await Track.find({username:user.username} , async (err,result) => {
       if (err) throw err;
       let mainarray = result[0].AttackRecords
       let data = {
        starttime:req.body.startdate,
        endtime:req.body.enddate,
           attackType:req.body.Attacktype,
           intensity:req.body.Painlevel,
           affectedActivities:req.body.activities,
           relief:req.body.reliefmethods,
           medication:req.body.medication,
           symptom:req.body.Symptoms,
           Note:req.body.note,
           sense:req.body.sense
       }
       mainarray.push(data)
       await Track.updateOne({username:user.username},{ $set : { AttackRecords:mainarray }},(err,result) => {
           if(err) throw err;
           console.log(result)
           res.redirect("/record")
       })
   })
})


router.get("/attackrecordcheck",isLoggedIn ,async (req,res) => {
    let user = req.user;
    console.log(user.username)
    await  Track.find({username:user.username} ,(err,result) => {
        if (err) throw err;
        // rendering not done you need to render all the medical reminder which are noted 
        // in the result[0].AttackRecords[i] where i is any integer . make other view file to render .
        // as an example i m doing console for result[0].AttackRecordsAttackRecords[0]
        // this should be replaced by file to be rendered not only for zero but for 0->i
        for (i=0; i<result[0].AttackRecords.length; i++){
            console.log(result[0].AttackRecords[i]);
            
           
        };
        res.render('attackrecordOutput', {result:result});
    });
    //console.log(data)
    })
    





module.exports=router;