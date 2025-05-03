const express = require("express");

//creating a router object
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing");

//requiring the middleware for authentication
const {isLoggedIn} = require("../middlewares.js");



//this function is used as middleware when an error is thrown while passing the parameters of schema
//this means if the values are not following the rules then this is used
const validateListing = (req,res,next)=>{
    //here the joi identifies the error from our request body and save it as an object
    let {error} = listingSchema.validate(req.body);
    if(error){
        //then if error occurs then it will take the details of all errors and then join all those details using comma
        let errMsg = error.details.map((el)=>el.message).join(",");
        //it throws the error msg
        throw new ExpressError(404,errMsg);
    }else{
        //if no any error occur then it will call to next non-error handling middleware
        next();
    }
}
//index route
//this route is used to display all listings
//we used here wrapAsync func to throw and display error
router.get("/",wrapAsync(async (req,res)=>{
    let allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
}));

//new route
//this is used for showing the page to create new listing
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("./listings/new.ejs");
})

//show route
//this is used to show the particular listing details
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{listing});
}));

//Create route
//used to display the listing route when new listing is added
router.post("/",isLoggedIn,validateListing,wrapAsync(async (req,res,next)=>{
        //this is used to save the data in this variable
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        req.flash("success","New listing created");
        res.redirect("/listings");
}));

//Edit route
//this is used to get the form  to edit the list
router.get("/:id/edit",isLoggedIn,wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested to edit does not exit");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));

//Update route
//after editing the list list this is used to redirect to that previous page
router.put("/:id",isLoggedIn,validateListing,wrapAsync(async (req,res)=>{
    //this is used when we have not entered the data in listing
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for listing");
    }
    let {id} = req.params;
    //here it spreads the object and updates the individual key of object
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
}));
//DElete route
//it is used to delete the listing
router.delete("/:id",isLoggedIn,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted!");
    res.redirect("/listings");
}));

module.exports = router;
