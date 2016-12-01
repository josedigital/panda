var express = require('express');
var controllers = require('./controllers/index');
var bodyParser = require('body-parser');
var path = require('path');
var hbs = require('express-handlebars');
var fs = require('fs');
var passport = require('passport');
var Strategy = require('passport-github').Strategy;
var github = require('octonode');
var models  = require('./models');
var methodOverride = require('method-override');

// var client = github.client();

var app = express();
var PORT = process.env.PORT || 3000;


// Config Github strategy for Passport
passport.use(new Strategy({
    clientID: '4f448e79b704b975714a',
    clientSecret: 'b95e804eb860775f081c28f576701c15cf75ab0a',
    callbackURL: 'http://localhost:4000/login/github/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    profile.token = accessToken;
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));

app.engine('hbs', hbs(
  {
    extname: 'hbs',
    // defaultLayout: '_main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/layouts/'
  }
));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/img', express.static('public/img'));

app.use('/', controllers);

fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
    route = require('./controllers/' + file);
    app.use(route, controllers);
  }
});

 app.use(function(req, res) {
      res.status(400);
     res.render('404', {title: '404: File Not Found', class: 'not-found'});
  });
// extract our sequelize connection from the models object
var sequelizeConnection = models.sequelize;
// sync the tables
sequelizeConnection.sync();

app.listen(PORT, function () {
  console.log('express on port ' + PORT);
});
