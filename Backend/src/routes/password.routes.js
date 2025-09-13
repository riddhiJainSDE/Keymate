import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {addPassword, decryptPassword, deletePassword, encryptPassword, getallPasswords, getPassword, updatePassword} from '../controllers/password.controller.js'
const router= Router();

//SECURED ROUTES
router.route('/addpassword').post(verifyJWT,addPassword);
router.route("/deletePassword/:passwordID").delete(verifyJWT, deletePassword);
router.route("/updatePassword/:passwordID").patch(verifyJWT, updatePassword);
router.route("/allpasswords").get(verifyJWT, getallPasswords);
router.route("/getpassword/:passwordID").post(verifyJWT, getPassword);

//FRONTEND ROUTES TESTING
router.route('/encryptPassword').post(encryptPassword);
router.route('/decryptPassword').post(decryptPassword);

export default router