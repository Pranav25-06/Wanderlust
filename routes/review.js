const express = require("express");

//creating a router object that merge the params
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//function for validating review
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(404,errMsg);
    }else{
        next();
    }
}

//Route for review
//Post route
router.post("/",validateReview,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new review saved");
    // res.send("new review saved");
    req.flash("success","Review saved successfully");
    res.redirect(`/listings/${listing._id}`);
}));
//Delete route
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted!");
    res.redirect(`/listings/${id}`);
}))

module.exports = router;
