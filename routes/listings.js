const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const upload = require("../utils/multer.js");

const listingController = require("../controllers/listing.js");

const {
    isLoggedIn,
    isOwner
} = require("../middleware.js");


// INDEX - GET /listings
router.get(
    "/",
    wrapAsync(listingController.index)
);


// NEW - GET /listings/new
router.get(
    "/new",
    isLoggedIn,
    listingController.rendernewform
);


// SHOW - GET /listings/:id
router.get(
    "/:id",
    wrapAsync(listingController.showListing)
);


// CREATE - POST /listings
router.post(
    "/",
    isLoggedIn,
    upload.single("image"),
    wrapAsync(listingController.createListing)
);


// EDIT - GET /listings/:id/edit
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);


// UPDATE - PUT /listings/:id
router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    upload.single("image"),
    wrapAsync(listingController.updateListing)
);


// DELETE - DELETE /listings/:id
router.delete(
    "/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
);


module.exports = router;