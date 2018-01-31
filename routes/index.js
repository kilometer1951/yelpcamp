var express    = require("express");
var router     = express.Router();
var User    = require("../models/user");
var passport   = require("passport");


router.get("/", function(req, res){
	res.render("landing");
});


//==================
// AUTH ROUTES
//==================
router.get("/register", function(req, res) {
    res.render("register", {page: 'register'}); 
});
//handling sign up form logic
router.post("/register", function(req, res) {
	var newuser = new User({username:req.body.username});
    User.register(newuser, req.body.password, function(err, user){
    	if(err) {
    	 // req.flash("error", err.message);
    	  return res.render("register", {error: err.message});
    	} 
    	passport.authenticate("local")(req, res, function(){
    	    req.flash("success", "Welcome to yelpcamp "+ user.username);
    		res.redirect("/campgrounds");
    	});
    });
});

//show login form
router.get("/login", function(req, res) {
    res.render("login", {page: 'login'}); 
});

//handling login form logic
router.post("/login", passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}),function(req, res) {
    
});

//logic route
router.get("/logout", function(req, res) {
   req.logout(); 
   req.flash("success", "Logged you out");
   res.redirect("/campgrounds");
});



module.exports = router;