// https://scotch.io/tutorials/upgrading-our-easy-node-authentication-series-to-expressjs-4-0

const mongoose = require('mongoose');

const express = require('express');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
const bodyParser = require('body-parser');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var flash    = require('connect-flash');

const cors = require('cors');
const helmet = require('helmet');
var morgan       = require('morgan');

mongoose.connect('mongodb://localhost:8080/ngForms', { useMongoClient: true, promiseLibrary: global.Promise });

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});

let app = express();

// load up the user model
var User       = require('./models/user');

app.use('*', cors()); // * only allow for LOCAL development
app.use(helmet());
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
// 

app.post('/registerUser', (req,res) => {
    console.log('registerUser post request=', JSON.stringify(req.body));
    res.json({"message" : "user added succesfully"});
});

app.use('/', (req, res)=> {
    console.log('/ request');
    res.send('i am all ears!');
});

 // route for showing the profile page
app.get('/profile', isLoggedIn, function(req, res) {
    res.json({
        'user' : req.user // get the user out of session and pass to template
    });
});

// https://scotch.io/tutorials/easy-node-authentication-facebook
passport.use(new FacebookStrategy({
    clientID: '173621403200811',
    clientSecret: '7db45238f4a0a491b834f19bcd3bbfac',
    callbackURL: "http://www.localhost:8080/auth/facebook/callback"
  }, 
        // find the user in the database based on their facebook id
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }
            })          
));


// =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

app.listen('8080', ()=> {
    console.log('i started listening to 8080');
});
