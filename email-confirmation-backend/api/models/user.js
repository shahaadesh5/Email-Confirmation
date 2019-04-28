//creating a model schema for User collection
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    email:{type:String, unique:true},
    password:String,
    isActive:{
        type: Boolean,
        default: false
    },
    secretToken: String
});
module.exports = mongoose.model("User", userSchema);
