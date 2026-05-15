const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",//belong to the User
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    },
    streak:{
        type:Number,
        default:0
    },
    lastCompleted:{
        type:Date,
        default: null
    }
},{
    timestamps:true
})

const Habit = mongoose.model("Habit",habitSchema);

module.exports = Habit;
