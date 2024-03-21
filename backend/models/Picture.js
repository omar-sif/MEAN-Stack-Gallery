const mongoose = require('mongoose'); 

const Schema = mongoose.Schema ; 

let picSchema = new Schema({

    path :  { type : String , required : true },
    username : { type : String , required : true},
    createdAt : { type : Date , require : true , default : Date.now}

});

const Picture = mongoose.model('Pic' , picSchema);

module.exports = Picture ;