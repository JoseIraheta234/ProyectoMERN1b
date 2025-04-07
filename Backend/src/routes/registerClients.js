import express from "express"; 
import registerClientrsController from "../controllers/RegisterClientController.js";


const router = express.Router();

router.route("/").post(registerClientrsController.register); 
router.route("/verifyCodeEmail").post(registerClientrsController.verifyCodeEmail);

export default router;