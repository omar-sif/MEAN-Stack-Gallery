const Picture = require('../models/Picture')



const saveImage = async (req , res , next ) => {

        try {
            if(!req.file){
            return res.status(500).send({message : 'Upload failed !'});
        }
        else {
            const path = req.file.path ; 
            const username = req.user.username ;
            const pic = await Picture.create( {path , username} );
            res.status(200).send({message : 'Image saved successfully!'});

            }
        }catch(error){
            console.log('Error saving image', error);
            res.status(500).send({message : 'Error saving image to Database'})
        }

}

module.exports = {saveImage}