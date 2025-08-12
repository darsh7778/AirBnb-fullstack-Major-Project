const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


router.get("/search", wrapAsync(listingController.search));

router
  .route("/")
  .get(wrapAsync(listingController.index)) //index route => renders listing titles on the page
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  ); //create route => creates a new listing and redirects to the index page

//new route => renders a form to create a new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) //show route => renders a information of a individual listing
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  ) //update route => updates an existing listing and redirects to the listing's detail page
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); //delete route => deletes a listing and redirects to the index page

//edit route => rendering to a edit page for a listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);



  

module.exports = router;
