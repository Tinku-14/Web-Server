const mongoose=require("mongoose");
const CustomerSchema=mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    htno:{
        type:Number,
        required:true
    },
    Email: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    }

});
const Customer=mongoose.model("custData",CustomerSchema);
module.exports=Customer;