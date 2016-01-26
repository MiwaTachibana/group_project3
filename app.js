var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var ejsLayouts   = require("express-ejs-layouts");
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

mongoose.connect('mongodb://localhost/burrito-app'); 


app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser()); 

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set("views","./views");
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

require('./config/passport')(passport);

// This middleware will allow us to use the current user in the layout
app.use(function (req, res, next) {
  global.user = req.user;
  next()
});

var userRoutes = require('./config/routes/userRoutes');
var restaurantRoutes = require('./config/routes/restaurantRoutes');
var reviewRoutes = require('./config/routes/reviewRoutes');

app.use('/users', userRoutes);
app.use( '/restaurants', restaurantRoutes);
app.use('/reviews', reviewRoutes);

app.listen(3000);
