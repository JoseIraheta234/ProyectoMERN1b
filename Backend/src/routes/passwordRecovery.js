import express from "express"; 
import passwordRecoveryController from "../controllers/passwordRecoveryControler.js";

 const router = express.Router();

 router.route("/requestCode").post(passwordRecoveryController.requestCode);
 router.route("/verigyCode").post(passwordRecoveryController.verifyCode);
 //router.route("/newCode").post(passwordRecoveryController);

 export default router;