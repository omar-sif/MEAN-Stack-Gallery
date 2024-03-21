const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secretKey = 'chikabika';

const authenticate = async(req , res , next)=>{

    const token = req.headers.authorization?.split(' ')[1];

    if (!token){
        res.status(401).json({message : 'Authentication required'});
    }
    try{
        const decodedToken = jwt.verify(token , secretKey ) ;
        const user = await User.findById(decodedToken.userId);
        if (!user){
            return res.status(404).json({message : 'User not found'});
        }
        
        req.user = user ;
        next();
    } catch (error){
        next(error);
    }
};

module.exports = {authenticate};