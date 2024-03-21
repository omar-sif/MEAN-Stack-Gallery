const multer = require('multer');
const path = require('path');
const fs = require('fs');



const storage = multer.diskStorage({
    destination : async (req, file , cb) => {
        try {
            const user = req.user;
            if(!user ){
                return cb(new Error('Authentication required for upload !'));
            }
            const folderName = path.join(__dirname, '../uploads', user.username);
            if (!fs.existsSync(folderName)){
                fs.mkdirSync(folderName , {recursive : true});
            }
            cb(null , folderName);

        }
        catch(error){
            cb(error);
        }
    },
    filename : (req , file , cb ) => {
        const extension = path.extname(file.originalname) ; 
        const fileName = Date.now() + extension ;
        cb(null , fileName);        
    }
});

const upload = multer({storage : storage });

module.exports = upload.single('image');


