const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({
    path: "./config.env"
});
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
    // performs a database connection when the server starts
    dbo.connectToServer();
    console.log(`Server is running on port: ${port}!`);
});