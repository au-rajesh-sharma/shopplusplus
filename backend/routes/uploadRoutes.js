import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

//define where images will be stored in the cloud or local disk
const storage = multer.diskStorage({
    destination(req, file, cb) {//cb is the call back function
        cb(null, 'uploads/')//store in a root folder called uploads, null means error
    },

    filename(req, file, cb) {//call back for formatting file names
        cb(null, //for error
        //formatted file name: 
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

//function to check the file type
function fileFilter(req, file, cb) {
    const filetypes = /jpe?g|png|webp/; //allowed file types
    //allowed mime types
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);
  
    if (extname && mimetype) {//if no error with file/mime types
      cb(null, true);
    } else {
      cb(new Error('Image files only!'), false);
    }
  }

//function to upload image files
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

//create the route. upload is handled by the upload() middleware
router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    //return message and uploaded path  
    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
});

export default router;