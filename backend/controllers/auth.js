const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcrypt') ;
const User = require ('../models/User') ;

const secretKey = 'chikabika';

const register = async ( req, res , next ) => {
    const {username , pwd } = req.body ;
    
    

    try{
        const user = new User({username , pwd}) ;
        user.save();
        res.json({message : 'Registered Successfully !'});

    } catch(error){
        next(error);
    }
};
const login = async (req , res , next) =>{

    const {username , pwd } = req.body
    try{
        const user = await User.findOne({username}) ;
        if(!user){
            return res.status(404).json({message : 'User not found.'});
        }
        const passwordMatch = await user.comparePassword(pwd) ;
        console.log(passwordMatch);
        if (!passwordMatch){
            return res.status(401).json({message : 'Incorrect password'});
        }
        const  token = jwt.sign({userId : user._id}, secretKey , {expiresIn : '1 hour'});
        res.json({token});

    } catch(error){
        next(error);
    }
};

module.exports = {register , login} ;