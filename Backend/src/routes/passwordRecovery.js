import express from "express"; 

 const router = express.Router();

 router.route("/requestCode").post();
 router.route("/verigyCode").post();
 router.route("/newCode").post();

 export default router;