var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var request = require("request");
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/register');
var adminRouter = require('./routes/admin');
var addProfileRouter = require('./routes/addProfile');
const User = require("./models/user")
var dotenv = require("dotenv");
const connectdb=require('./config/db');

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//connect to cloud db
dotenv.config({
	path:'./config/config.env'
  });
  connectdb();
  
var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	type: String,
	cart: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Cart"
	},
	view: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "View"
	}
});



app.use(require("express-session")({
	secret: "Anjaneya Tripathi",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var logout = require("./routes/logout");
app.use('/logout',logout);
var profileroute = require("./routes/profileroute");
app.use('/profile',profileroute);
var homee= require("./routes/home");
app.use('/home',homee);
var cartroute = require("./routes/cartroute");
app.use('/cart',cartroute)
var detailsroute = require("./routes/details");
app.use('/details',detailsroute)
var addprtofileroute = require("./routes/addprofile2");
app.use('/addProfile',addprtofileroute)
var billsroute = require("./routes/bills");
app.use('/bill',billsroute)
var historyroute = require("./routes/historyroute");
app.use('/history',historyroute)
var orderroute = require("./routes/orderroute");
app.use('/orders',orderroute)
var warehouseroute = require("./routes/warehouse");
app.use('/warehouse',warehouseroute)
var pendingorderroute = require("./routes/pendingorder");
app.use('/pendingOrders', pendingorderroute)
var updateroute = require("./routes/updateroute");
app.use('/update', updateroute)
var newsroute = require("./routes/news");
app.use('/news',newsroute)
var nearbysearchroute = require("./routes/search");
app.use('/search',nearbysearchroute)
var recordroute = require("./routes/record");
app.use('/record',recordroute)

app.use('/login', loginRouter);
app.use('/register', signupRouter);
app.use('/admin', adminRouter);
app.use('/addProfile', addProfileRouter);


app.get("/", function(req, res) {
	res.redirect("/welcome");
});

app.get("/welcome", function(req, res) {
	res.sendFile(__dirname + '/public/welcome.html');
});

app.listen(3000, function() {
	console.log("Listening");
});











