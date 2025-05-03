const express = require("express");
const app = express();
const session  = require("express-session");
const flash = require("connect-flash");
const path = require("path");
// const cookieParser = require("cookie-parser");

//cookieParser contains any string
// app.use(cookieParser("secretcode"));
// app.get("/getcookies",(req,res)=>{
//     res.cookie("color","red",{signed: true});
//     res.send("got cookies");
// })

// app.get("/verify",(req,res)=>{
//     res.send(req.signedCookies);
// })

//express-session
const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionOptions));
app.use(flash());
//middleware created for flash functions
app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
    let {name = "anonymous"} = req.query;
    // console.log(req.session);
    req.session.name = name;
    // res.send(name);
    if(req.session.name === "anonymous"){
        req.flash("error","User not registered");
    }else{
        req.flash("success","User registered successfully");
    }    
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    //  res.locals.successMsg = req.flash("success");
    //  res.locals.errorMsg = req.flash("error");
    res.render("page.ejs",{name: req.session.name});
})

// app.get("/reqcnt",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
// })
// app.get("/test",(req,res)=>{
//     res.send("Test successful");
// })
app.listen(3000,()=>{
    console.log("App is listening");
});