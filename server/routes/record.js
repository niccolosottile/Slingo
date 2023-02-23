const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This will help convert the id from string to ObjectId for the _id
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(async function (req, res) {
    let db_connect = dbo.getDb();
    
    const cursor = db_connect.collection("users").find({});

    const result = await cursor.toArray();

    res.json(result);
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(async function (req, res) {
    let db_connect = dbo.getDb();

    let myquery = {
        _id: new ObjectId(req.params.id)
    };

    const result = await db_connect.collection("users").findOne(myquery);

    res.json(result);
});

// This section will help you create a new record.
recordRoutes.route("/user/add").post(function (req, response) {
    let db_connect = dbo.getDb();

    let myobj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };

    db_connect.collection("users").insertOne(myobj);

    response.send("Document inserted into database");
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();

    let myquery = {
        _id: new ObjectId(req.params.id)
    };

    let newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        },
    };
    
    db_connect.collection("users").updateOne(myquery, newvalues);

    response.send("Document updated in database");
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();

    let myquery = {
        _id: new ObjectId(req.params.id)
    };

    db_connect.collection("users").deleteOne(myquery);

    response.send("Deleted document from database");
});

module.exports = recordRoutes;