var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require('geocoder');

//INDEX - SHOW ALL CAMPGROUNDS
router.get("/", function(req, res){

	//get all campgrounds from DB
	Campground.find({}, function(err, allcampgrounds){
			if(err) {
				console.log(err);
			} else {
			    res.render("campgrounds/index", {campgrounds:allcampgrounds, page: 'campgrounds'});
			}
	});
});


//CREATE - ADD NEW CAMPGROUND TO DB
router.post("/", middleware.isLoggedIn,function(req, res){
	//res.send("You hit the post route");
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var description = req.body.description;
	var price  = req.body.price;
	geocoder.geocode(req.body.location, function (err, data) {
		var lat = data.results[0].geometry.location.lat;
	    var lng = data.results[0].geometry.location.lng;
	    var location = data.results[0].formatted_address;
		var newCampground = {name: name, image:image, description:description, author:author, price:price, location: location, lat: lat, lng: lng};
	//create a new campgground and save to the db
	Campground.create(newCampground, function(err, newlyCreated){
		if(err) {
			console.log(err);
		} else {
		//	console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
 });
});

//NEW - SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/new", middleware.isLoggedIn,function(req, res){
	res.render("campgrounds/new");
});


//SHOW - SHOWS MORE INFO ABOUT ONE CAMPGROUND
router.get("/:id" , function(req, res) {
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err) {
			console.log(err);
		} else {
			//console.log(foundCampground);
			//render the show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
	//is user loggedin?
	
		Campground.findById(req.params.id, function(err, foundCampground) {
		 	  res.render("campgrounds/edit", {campground: foundCampground});
		});


	
});


//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	//find and update the correct campground
	geocoder.geocode(req.body.location, function (err, data) {
		var lat = data.results[0].geometry.location.lat;
	    var lng = data.results[0].geometry.location.lng;
	    var location = data.results[0].formatted_address;
	    var  updateData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
	Campground.findByIdAndUpdate(req.params.id, updateData , function(err, updatedCampground){
		if(err) {
			res.redirect("/campground");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
  });
});


//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
	 Campground.findByIdAndRemove(req.params.id, function(err){
	 	if(err) {
	 		res.redirect("/campgrounds");	
	 	} else {
	 		res.redirect("/campgrounds");
	 	}
	 });
});




module.exports = router;