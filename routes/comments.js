var express = require("express"),
    Campgrounds = require("../models/campgrounds"),
	Comments = require("../models/comments"),
	middleware = require("../middleware");


var router = express.Router({mergeParams: true});
// ---------------
// comments route
// ---------------
router.get("/new", middleware.isLoggedIn, function(req, res){
	Campgrounds.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

router.post("/", middleware.isLoggedIn, function(req, res){
	Campgrounds.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comments.create(req.body.comment, function(err, comment){
				if (err) {
					console.log(err);
				} else {
					// add username and id to comments
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Successfully Added Comment");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comments.findById(req.params.comment_id, function(err, foundComment){
		if (err) {
			res.redirect("back");
		} else {
			res.render("comments/edit", {
				campground_id: req.params.id,
				comment: foundComment
			});
		}
	});
	
});

// comment update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if (err) {
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// delete comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comments.findByIdAndRemove(req.params.comment_id, function(err){
		if (err) {
			res.redirect("back");
		} else {
			req.flash("success", "Successfully Deleted Comment");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// middleware


module.exports = router;

