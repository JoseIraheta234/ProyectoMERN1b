import blogModel from "../models/Blog.js"; 
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
    secure: true
});

const BlogController = {}

BlogController.getAllPosts = async (req, res) => {
    const posts = await blogModel.find();
    res.json(posts);
}

BlogController.createPost = async (req, res) => {
    try {
        const { title, content} = req.body;
        let imageURL = ""

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "public",
                allowed_formats: ["jpg", "png", "jpeg"]
              
            });
            imageURL = result.secure_url;
        }

        const newPost = new blogModel({
            title,
            content,
            image: imageURL
        });
        newPost.save()

        res.json({message: "Post Saved"})

    } catch (error) {
        console.log("error"+ error);
    }
}


export default BlogController;