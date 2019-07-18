var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	flash = require("connect-flash"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Campgrounds = require("./models/campgrounds"),
	Comments = require("./models/comments"),
	Users = require("./models/users"),
	seedDB = require("./seeds");

// require routes
var campgroundsRoutes = require("./routes/campgrounds"),
	commentsRoutes = require("./routes/comments"),
	indexRoutes = require("./routes/index");

// seedDB();
mongoose.connect("mongodb+srv://dbUser:12345droeen@cluster0-uwzr8.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/public'));
app.use(flash());

// passport configuration
app.use(require("express-session")({
	secret: "yelp camp",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
app.use("/campgrounds", campgroundsRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
	console.log("YelpCamp Server Has Started!!");
});


