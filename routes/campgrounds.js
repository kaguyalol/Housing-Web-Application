var express = require("express"),
	Campgrounds = require("../models/campgrounds"),
	Comments = require("../models/comments"),
	middleware = require("../middleware");
	// automaticall invoke index.js in middleware folder
var router = express.Router();

router.get("/", function(req, res){
	// res.render("campgrounds", {campgrounds: campgrounds});
	Campgrounds.find({}, function(err, allCampgrounds){
		if (err) {
			console.log("No records available!");
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
			console.log("Successfully show records");
		}
	});
});

router.post("/", middleware.isLoggedIn, function(req, res){
	// add data from forms and add to campgrounds array
	// redirect back to campgrounds page
	var name = req.body.name;
	var img = req.body.img;
	var price = req.body.price;
	var desc = req.body.desc;
	// campgrounds.push({name:name, img:img});
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	Campgrounds.create({name:name, img:img, description:desc, price: price, author: author}, function(err, newlyCreated){
		if (err) {
			console.log(err);
		} else {
			console.log("newly create campgrounds:");
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
	// res.send("You hit the post route!");
});

router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
//	the new file includes the action to /campgrounds post
});

router.get("/:id", function(req, res){
	Campgrounds.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// edit campgrounds route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campgrounds.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});	
});
// update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	// find and update correct campground
	Campgrounds.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// destroy campgrounds route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campgrounds.findByIdAndRemove(req.params.id, function(err){
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

// middleware


module.exports = router;

