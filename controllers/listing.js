const Listing = require("../models/listing");
const cloudinary = require("../utils/cloudinary");

module.exports.index = async (req,res) => {    // get request bheji /listings route par
    const allListings =  await Listing.find({});    // Listing model se sari documents ko allListing variable ke ander dal diya..
    res.render("listings/index.ejs", {allListings});       //index.js file ko run karaya and ussesare listing document bheja ..
}

module.exports.rendernewform = (req, res) => {   // so jaise hi is route par koi req aayi to new.ejs page render createHistogram..
      res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing =  await Listing.findById(id).populate({path:"reviews", populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested does not Exist ! ");
      return  res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}



module.exports.createListing = async (req, res) => {
    console.log("BODY:", req.body);
console.log("FILE:", req.file);

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    if (req.file) {

        const result = await new Promise((resolve, reject) => {

            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "listing_images"
                },
                (error, result) => {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            uploadStream.end(req.file.buffer);
        });

        newListing.image = {
            url: result.secure_url,
            filename: result.public_id
        };
    }

    await newListing.save();

    req.flash("success", "New Listing Created!");

    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true, runValidators: true }
    );

    if (req.file) {
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "listing_images"
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            uploadStream.end(req.file.buffer);
        });

        listing.image = {
            url: result.secure_url,
            filename: result.public_id
        };

        await listing.save();
    }

    req.flash("success", "Listing Updated!");

    res.redirect(`/listings/${id}`);
};

              


 module.exports.destroyListing = async (req,res) => {
    let{id} = req.params; 
     await Listing.findByIdAndDelete(id);
      req.flash("success", " Listing Deleted !")
     res.redirect("/listings");
   
}