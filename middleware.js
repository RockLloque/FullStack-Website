const ExpressError = require("./utils/ExpressError");
const { campgroundSchema, reviewSchema } = require("./schemas");
const Campground = require("./models/campground");
const Review = require("./models/reviews");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in!");
    return res.redirect("/login");
  }
  next();
};

module.exports.validateCampground = (req, res, next) => {
  console.log(req.body);
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const message = error.details.map((ele) => ele.message).join(",");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "Youn do not have the permission to do that");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const message = error.details.map((ele) => ele.message).join(",");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  try {
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
      req.flash("error", "You do not have the permission to do that");
      return res.redirect(`/campgrounds/${id}`);
    }
  } catch (err) {
    //throw new ExpressError(err, 500);
    req.flash("error", "Something went wrong");
    console.log(err);
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};
