const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js"); 
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/review.js");  
const Listing = require("../models/listing.js"); 
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/review.js");

//review route => creates a new review for a listing (this is a POST route)
router.post("/", isLoggedIn,validateReview,  wrapAsync(reviewController.createReview));

//delete review route => deletes a review from a listing
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;