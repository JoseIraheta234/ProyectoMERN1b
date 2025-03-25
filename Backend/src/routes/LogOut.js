import express from "express"; 
import LogOutController from "../controllers/LogoutController.js";
const router = express.Router();

router.route("/").post(LogOutController.logOut); 

export default router;