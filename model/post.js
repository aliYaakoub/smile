const mongoose = require('mongoose');


const postsSchema = new  mongoose.Schema({
    authorUsername : {
        type : String,
        required : true
    },
    authorBadge : {
        type : String
    },
    authorPhoneNumber : {
        type : String,
        required : true
    },
    authorAddress : {
        type : String
    },
    category : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now
    },
    authorCity : {
        type : String,
        required : true
    }
});




module.exports = mongoose.model('Post',postsSchema);