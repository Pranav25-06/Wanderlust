const express = require("express");
const app = express();
const mongoose = require("mongoose");

//file which contains the collection schema
const Listing = require("./models/listing");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");

//this is used to implement the DRY code in reuseable templates
const ejsMate = require("ejs-mate");

//this is used for conversion of methods 
const methodOverride = require("method-override");

//this function contains the class used for error handling in utils
const ExpressError = require("./utils/ExpressError.js");


//this is used to require the routes 
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

//requiring of express-session
const session = require("express-session");

const flash = require("connect-flash");

//require the passport for authentication
const passport = require("passport");

//require the local strategy and userSchema for authentication 
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


//for parsing the id from request
app.use(express.urlencoded({extended: true}));
main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
}

app.use(session(sessionOptions));
app.use(flash());

//middleeware for passport we have only declared here that we are using passport and its methods
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",(req,res)=>{
    res.send("Hii, I am root");
});

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// app.get("/demousers",async(req,res)=>{
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "alpha-student"
//     })

//     let registeredUser = await User.register(fakeUser, "helloworld");
//     res.send(registeredUser);
// })

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

//when any random route is encountered then it throws this error
app.all("*",(req,res,next)=>{
    //this is used to call the next error handling middleware
    next(new ExpressError(404,"Page not found"));
})
//error handling middleware
//this middleware is used to handle the errors if any error occurs
app.use((err,req,res,next)=>{
    //this is used to initialize the default values 
    let {status = 500,message = "Something went wrong"} = err;
    //this is used to send the message in new file that is error,ejs
    res.status(status).render("error.ejs",{message});
    // res.status(status).send(message);
})

app.listen(8080,()=>{
    console.log("Server is listening on port 8080");
})
