const mongoose = require('mongoose');


const accountSchema = new  mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 50
    },
    username : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255,
        unique : true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique:true
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255
    },
    address : {
        type : String,
        minlength : 5,
        maxlength : 1000,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    numberOfDonation : {
        type : Number,
        default : 0
    },
    phoneNumber : {
        type : Number,
        minlength : 8,
        maxlength : 50,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    badge : {
        type : String,
        default : 'new'
    }
});


module.exports = mongoose.model('Account',accountSchema);