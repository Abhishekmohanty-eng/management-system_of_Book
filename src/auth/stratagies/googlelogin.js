
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
  
passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});
  


passport.use(new GoogleStrategy({
    clientID:"227085459906-453oa658k1kftrp0o00khmrf7t0mcdnd.apps.googleusercontent.com" ,
    clientSecret:"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" ,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log("SUCCESS")
    return done(null, profile);
  }
));