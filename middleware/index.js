// all the middlewares go here
var Campgrounds = require("../models/campgrounds"),
    Comments = require("../models/comments");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
	// Is user log in?
	if (req.isAuthenticated()) {
		Campgrounds.findById(req.params.id, function(err, foundCampground){
			if (err) {
				req.flash("error", "Campground Not Found");
				res.redirect("back");
			} else {
				// Does user own the campground?
				// foundCampground.author.id is an object
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "Permission Denied");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Please Login First");
		res.redirect("back");
	}
}


middlewareObj.checkCommentOwnership = function(req, res, next) {
	// Is user log in?
	if (req.isAuthenticated()) {
		Comments.findById(req.params.comment_id, function(err, foundComment){
			if (err) {
				res.redirect("back");
			} else {
				// Does user own the comment?
				// foundCampground.author.id is an object
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "Permission Denied");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Please Login First");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "Please Login First");
	res.redirect("/login");
}


module.exports = middlewareObj;