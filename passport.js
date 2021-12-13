const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = "978516581854-ed0cfhg2dgahpvrnmcv1dmc4egvnmerm.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile)
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });

  }
));

passport.serializeUser((user,done)=> {
  done(null,user)
})

passport.deserializeUser((user,done)=> {
  done(null,user)
})