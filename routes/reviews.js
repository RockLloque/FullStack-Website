const express = require("express");
const catchAsync = require("../utils/catchAsync");
const Review = require("../models/reviews");
const Campground = require("../models/campground");
const reviews = require("../controllers/reviews");
const { isReviewAuthor, isLoggedIn, validateReview } = require("../middleware");
const ExpressError = require("../utils/ExpressError");

const router = express.Router({ mergeParams: true });

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
