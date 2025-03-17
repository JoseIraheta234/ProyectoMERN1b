import express from "express";
import ReviewsController from "../controllers/reviewsController.js";
const router = express.Router();

router.route("/")
.get(ReviewsController.getReviews)
.post(ReviewsController.insertReviews)

router.route("/:id")
.put(ReviewsController.updateReviews)
.delete(ReviewsController.deleteReviews)

export default router