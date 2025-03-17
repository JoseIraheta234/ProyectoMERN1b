const reviewsController = {};
import reviewsModel from "../models/Reviews.js"

// Select 
reviewsController.getReviews = async (req, res) => {
    const reviews = await reviewsModel.find().populate("idClient")
    res.json(reviews)
};

//insert

reviewsController.insertReviews = async (req, res) => {
    const {comment,rating,idClient} = req.body;
    const newReviews = new reviewsModel({comment,rating,idClient})

    await newReviews.save()
    res.json({message: "Review saved"});
};

//delete 
reviewsController.deleteReviews = async (req, res) => {
    await reviewsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Review Deleted"})
}; 

//update 

reviewsController.updateReviews = async (req, res) => {
    const {comment,rating,idClient} = req.body;
    const updatedReviews = await reviewsModel.findByIdAndUpdate(req.params.id, {comment,rating,idClient} , {new: true} )

    res.json({message: "Updated Review"})
};


export default reviewsController;