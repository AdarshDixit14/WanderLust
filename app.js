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


app.get("/", (req, res) => {      // basic API banana jo / route se through req le rha 
    res.send("I am root");
})

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
app.get("/listings", wrapAsync(async (req,res) => {    // get request bheji /listings route par
    const allListings =  await Listing.find({});    // Listing model se sari documents ko allListing variable ke ander dal diya..
    res.render("listings/index.ejs", {allListings});       //index.js file ko run karaya and ussesare listing document bheja ..
}))

//* new route 
app.get("/listings/new",(req, res) => {   // so jaise hi is route par koi req aayi to new.ejs page render createHistogram..
    res.render("listings/new.ejs");
})

//* ye show route ka code
app.get("/listings/:id",wrapAsync(async (req, res) => {
    let {id} = req.params;
    const listing =  await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", {listing});
}))

//* create route
app.post("/listings", wrapAsync( async (req,res, next) =>{
     const newListing = new Listing(req.body.listing);
     await newListing.save();
     res.redirect("/listings"); 
    
  
}));

//*edit route ka code
app.get("/listings/:id/edit", wrapAsync(async (req,res) => {  
    let{id} = req.params;
   const listing = await Listing.findById(id);
   res.render("listings/edit.ejs", {listing});    

}))

//*update route
app.put("/listings/:id", wrapAsync(async (req,res) => {
    let{id} = req.params;            // req me jo id aa rhi as parameter use access kar rahe
     await Listing.findByIdAndUpdate(id,{...req.body.listing});   // us id se documentya listing ko access ka update kardege
    res.redirect(`/listings/${id}`);
}))

//*delete route
app.delete("/listings/:id",wrapAsync(async (req,res) => {
    let{id} = req.params; 
     await Listing.findByIdAndDelete(id);
     res.redirect("/listings");
   
})) 

// Review
app.post("/listings/:id/reviews", async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
})

//  Review delete route
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });

    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}));

app.use((err, req, res, next) => {
    let{statuscode = 500,message = "something went wrong"} = err;
     res.status(statuscode).render("error.ejs", {message});
})

app.listen(8080, () => {         // ek server chalu kiya port 8080 par 
    console.log("Server is running on port 8080");
})



