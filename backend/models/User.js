const mongoose = require('mongoose'); 
const Schema = mongoose.Schema ; 
const bcrypt = require('bcrypt');

let userSchema = new Schema({
    username : { type : String , required : true , unique : true  },
    pwd : {type : String , required : true },
    role : { type : String , enum : ['user' , 'admin']}
},
{timestamps :  true}
);

userSchema.pre('save', async function(next)  {
    const user = this ; 

    if ( !user.isModified('pwd') ) return next();
    try{
        const salt = await bcrypt.genSalt();
        user.pwd = await bcrypt.hash(user.pwd , salt)
        
        next() ;
    } catch (error){
        return next(error); 
    }
});

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password , this.pwd)
};

const User = mongoose.model('User', userSchema) ;

module.exports = User ;
