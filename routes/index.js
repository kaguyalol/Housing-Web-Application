var express = require("express"),
    passport = require("passport"),
    Users = require("../models/users");
var router = express.Router();

router.get("/", function(req, res){
	res.render("landing");	
	// res.send("This would be the landing page soon!!");
});



// -----------
// auth routes
// -----------

// show register form
router.get("/register", function(req, res){
	res.render("register");
});
// handle sign up logic
router.post("/register", function(req, res){
	var newUser = new Users({username: req.body.username});
	// user as param in function is newUser
	Users.register(newUser, req.body.password, function(err, user){ 
		if (err) {
			req.flash("error", err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome! " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

// show login form
router.get("/login", function(req, res){
	res.render("login");
});
// handle login logic
//router.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){
});

// logout
router.get("/logout", function(req, res){
	req.logOut();
	req.flash("success", "Successfully Logout");
	res.redirect("/campgrounds");
});
// middleware


module.exports = router;