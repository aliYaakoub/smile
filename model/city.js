const mongoose = require('mongoose');
const Joi = require('joi');


const citySchema = new mongoose.Schema({
    name : {
        type : String
    }
});




module.exports = mongoose.model('City',citySchema);