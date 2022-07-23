const mongoose = require("mongoose");
const {ObjectId}= mongoose.Schema.Types;

const formSchema=new mongoose.Schema({
    formname:{
        type:String,
        required:true
    },
    students:{ type: String, required: true },
    questions:[{type:String}],
    created_by: {
        type:String,
        required:true
    },
    created_at: { type: Date, default: Date.now }
})

mongoose.model("Form",formSchema);
