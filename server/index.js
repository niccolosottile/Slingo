require("dotenv").config({ path: "./config.env" });

const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset");
const passport=require("passport");
const passport_session=require("./passport");
const session=require("express-session");

// database connection
connection();

// middlewares

app.use(express.json());
app.use(session({
    secret: 'j2kw$s@lp2!vx(/dfc%0',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.session());
app.use(passport.initialize());

app.use(cors());
  




// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Server is running on port: ${port}!`))