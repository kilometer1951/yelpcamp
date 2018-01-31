var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    User    = require("./models/user"),
    methodOverride  =  require("method-override"),
    seedDB     = require("./seeds");
    

//REQUIRING ROUTES
var commentRoutes = require("./routes/comments"),
	campgroundRoutes  = require("./routes/campgrounds"),
	indexRoutes    =  require("./routes/index");
    

 
mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));//telling express to use body parser (middle ware setup)
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();   //seed the db

//PASSPORT CONFIGURATION
app.locals.moment = require('moment');
app.use(require("express-session")({
	secret: "12345",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//END CONFIG

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error =  req.flash("error");
	res.locals.success =  req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelpcamp has started");
});