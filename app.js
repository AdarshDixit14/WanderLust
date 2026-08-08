const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverRide = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const {listingSchema,reviewSchema} = require("./Schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const userRouter = require("./routes/users.js");
const {isLoggedIn,isOwner,isReviewAuthor} = require("./middleware.js");
const listingController = require("./controllers/listing.js");
const reviewController = require("./controllers/review.js");


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to db");      //  if main func chal gya to then ka bolck of code run and if err aya to use catch func lega and uska block of code run hoga ..
}).catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect(Mongo_URL);     //mongodb database ko node se connect kiya 
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverRide("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));  //static file ko access karne ke liye public folder ka path joda

const sessionOption = {
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
};



app.get("/", (req, res) => {      // basic API banana jo / route se through req le rha 
    res.send("I am root");
})

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");  // agar req ke ander flash me koi bi msg aata to usse res ke local par store kar deghe...
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// app.get("/demoUser", async (req,res) => {
//     let fakeUser = new User ({
//         email:"abc123@gmail.com",
//         username:"abhay" 
//     })
//     const registeredUser = await User.register(fakeUser, "helloworld");
//     res.send("registerUser");
// });

app.use("/", userRouter);
    

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        // Pass the error directly to your Express error-handling middleware
        next(new ExpressError(400, errMsg)); 
    } else {
        next();
    }
};

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        // Pass the error directly to your Express error-handling middleware
        next(new ExpressError(400, errMsg)); 
    } else {
        next();
    }
};

//*ye index route ka code
app.get("/listings", wrapAsync(listingController.index));

//* new route 
app.get("/listings/new" , isLoggedIn , listingController.rendernewform);

//* ye show route ka code
app.get("/listings/:id",wrapAsync(listingController.showListing));

//* create route
app.post("/listings", wrapAsync(listingController.createListing));

//*edit route ka code
app.get("/listings/:id/edit", isLoggedIn, wrapAsync(listingController.editListing));

//*update route
app.put("/listings/:id",isLoggedIn,isOwner,validateListing, wrapAsync(listingController.updateListing));

//*delete route
app.delete("/listings/:id",isLoggedIn,wrapAsync(listingController.destroyListing)) ;

//* Review
app.post("/listings/:id/reviews",isLoggedIn,validateReview, wrapAsync(reviewController.createReview));

//  Review delete route
app.delete("/listings/:id/reviews/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));

// app.use((err, req, res, next) => {
//     let{statuscode = 500,message = "something went wrong"} = err;
//      res.status(statuscode).render("error.ejs", {message});
// })

app.use((err, req, res, next) => {
    console.error(err);   // 👈 Add this line

    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {         // ek server chalu kiya port 8080 par 
    console.log("Server is running on port 8080");
})



