require("dotenv").config();

console.log("Cloudinary API Key exists:",
    !!process.env.CLOUDINARY_API_KEY
);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/user");
const userRouter = require("./routes/users.js");
const listingRouter = require("./routes/listings.js");

const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const { listingSchema, reviewSchema } = require("./Schema.js");

const reviewController = require("./controllers/review.js");



const {
    isLoggedIn,
    isReviewAuthor
} = require("./middleware.js");


// =========================
// PASSPORT CONFIGURATION
// =========================

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// =========================
// DATABASE
// =========================

const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(Mongo_URL);
}


// =========================
// APP CONFIGURATION
// =========================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

app.use(
    express.static(path.join(__dirname, "/public"))
);


// =========================
// SESSION
// =========================

const sessionOption = {
    secret: "mysupersecretcode",

    resave: false,

    saveUninitialized: true,

    cookie: {
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        ),

        maxAge: 7 * 24 * 60 * 60 * 1000,

        httpOnly: true
    }
};

app.use(session(sessionOption));


// =========================
// PASSPORT
// =========================

app.use(passport.initialize());

app.use(passport.session());


// =========================
// FLASH
// =========================

app.use(flash());


// =========================
// GLOBAL VARIABLES
// =========================

app.use((req, res, next) => {

    res.locals.success = req.flash("success");

    res.locals.error = req.flash("error");

    res.locals.currUser = req.user;

    next();
});


// =========================
// HOME ROUTE
// =========================

app.get("/", (req, res) => {

    res.send("I am root");

});


// =========================
// USER ROUTES
// =========================

app.use("/", userRouter);


// =========================
// LISTING ROUTES
// =========================

app.use("/listings", listingRouter);


// =========================
// REVIEW VALIDATION
// =========================

const validateReview = (req, res, next) => {

    let { error } = reviewSchema.validate(req.body);

    if (error) {

        let errMsg = error.details
            .map((el) => el.message)
            .join(",");

        return next(
            new ExpressError(400, errMsg)
        );
    }

    next();
};


// =========================
// REVIEW CREATE ROUTE
// =========================

app.post(
    "/listings/:id/reviews",

    isLoggedIn,

    validateReview,

    wrapAsync(reviewController.createReview)
);


// =========================
// REVIEW DELETE ROUTE
// =========================

app.delete(
    "/listings/:id/reviews/:reviewId",

    isLoggedIn,

    isReviewAuthor,

    wrapAsync(reviewController.destroyReview)
);


// =========================
// ERROR HANDLING
// =========================

app.use((err, req, res, next) => {

    console.error(err);

    let {
        statusCode = 500,
        message = "Something went wrong"
    } = err;

    res
        .status(statusCode)
        .render("error.ejs", {
            message
        });

});


// =========================
// SERVER
// =========================

app.listen(8080, () => {

    console.log(
        "Server is running on port 8080"
    );

});



