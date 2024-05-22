import express from 'express'
import { blogFrom,blogdata,blogget,page1,deletedata,editdata,updatedata} from '../controller/controller.js'
const router = express.Router()
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage: storage });

router.get('/page1',page1)
router.get("/page2",blogFrom)
router.post('/insert', upload.single('image'), blogdata);
router.get("/get",blogget)
router.delete('/delete/:id',deletedata)
router.get("/edit/:id", editdata)
router.post("/update/:id",upload.single('image'), updatedata)



export default router
