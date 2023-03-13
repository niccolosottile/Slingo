const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User=require("./models/user")
console.log("after!!!");

 

//main line that connects to GOOGLE API
passport.use(
	new GoogleStrategy(
	  {
		clientID: "718618835820-h0o05bm0q2e74679r9fpbip1lbrgo3nh.apps.googleusercontent.com",
		clientSecret: "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",
		callbackURL: "http://localhost:8080/api/users/auth/google/callback",
		scope: ["profile", "email"]
	  },
	  //http://localhost:8080/auth/google/api/users/auth/google/callback
	  //http://localhost:8080/api/users/auth/google/callback
	  
	  async function (accessToken, refreshToken, profile, done) {
		//console.log("test!!");
		const existing_user = await User.User.findOne({ google_id: profile.id });
		console.log(profile.id);
		console.log(profile.displayName);
		console.log(existing_user);

		if (existing_user) {
		  existing_user.name = profile.displayName;
		  existing_user.email = profile.emails[0].value;
		  const session_token=await existing_user.generateAuthToken();
		  await User.User.updateOne({ _id: existing_user._id }, { $set: existing_user });
		  console.log("user already exists");
		  existing_user['session']=session_token;
		  done(null, existing_user);
		} else {
			console.log("user doesn't exist");
		  const newUser = {
			name: profile.displayName,
			email: profile.emails[0].value,
			google_id: profile.id,
			verified:true
		  };
		  console.log(newUser);
		  const finale=await new User.User(newUser);
		  await finale.save();
		  console.log (finale);
		  finale['session']=await finale.generateAuthToken();
		  
		  console.log("debg!!! paert2");
		  
		  done(null, finale);
		 // callback(null, profile);


		}
	 }

	)
  );
  /*
  passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
*/

  
  passport.serializeUser((user, done) => {
	done(null, user);
  });
  
  passport.deserializeUser( (user, done) => {
	//const user = User.User.findOne({ _id: user_id });
	done(null, user);
  });
  


