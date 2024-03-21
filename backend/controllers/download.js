const Picture = require('../models/Picture');
const fs = require('fs');
const path = require('path') ;


const download = async (req , res , next ) => {

    try{const user = req.user; 
    const recentPic = await Picture.findOne({username : user.username}).sort({createdAt : -1}) ;
    
    if (!recentPic){
        res.status(500).send({message : 'No image found'});
    }
    res.setHeader('Content-type' , 'image/'+ path.extname(recentPic.path).slice(1)) ;
    // const stream = fs.createReadStream(recentPic.path);
    // stream.pipe(res);
    res.download(recentPic.path);
    }catch(error){
        console.error('Error fetching most recent picture', error);
        res.status(500).json({error : 'Internal server error'});
    }

}

module.exports = download;