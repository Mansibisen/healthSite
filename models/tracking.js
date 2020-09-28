const mongoose = require("mongoose");
var profileSchema = new mongoose.Schema({
	username: String,
	medicationReminder:[{
        ReminderFrequency:String,
        MedicationDetails:String,
       time:Date,
       Note:String

        
    }],
    upcomingDoctorVisit:[{
        
        time:Date,
        doctortype:String,
        treatment:String,
        note:String
         
     }],
    AttackRecords:[{
    attackType:String,
         intensity: String,
         starttime:Date,
         endtime:Date,
         affectedActivities:String,
         relief:String,
         medication:String,
         Notes: String,
         symptom:String,
         sense:String
        }
    ]

});

module.exports = mongoose.model("Trackeddata", profileSchema);