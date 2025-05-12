import express from "express";
import multer from "multer";
import BlogController from "../controllers/BlogController.js";

const router = express.Router();


const upload = multer({dest: "public/"})


router.route("/").get(BlogController.getAllPosts)
.post(upload.single("image"),BlogController.createPost);



export default router;