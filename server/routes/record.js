const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This will help convert the id from string to ObjectId for the _id
const ObjectId = require("mongodb").ObjectId;

// Used for password hashing
const bcrypt = require("bcrypt");
const saltRounds = 10;

// This section will help you verify user login credentials
recordRoutes.route("/login").post(async function (req, res) {
    let db_connect = dbo.getDb();

    let myquery = {
        email: req.body.email
    };

    const user = await db_connect.collection("users").findOne(myquery);

    if (!user) {
        res.status(404).send("Status: Not found");
    } else {
        const hash = user.password;

        bcrypt
            .compare(req.body.password, hash)
            .then(result => {
                if (result) {
                    res.status(200).send("Status: OK");
                } else {
                    res.status(401).send("Status: Unauthorized");
                }
            })
            .catch(err => res.status(500).send(err))
    }
});

// This section will help you get a single user by email
recordRoutes.route("/user/:email").get(async function (req, res) {
    let db_connect = dbo.getDb();

    let myquery = {
        email: req.params.email
    };

    const result = await db_connect.collection("users").findOne(myquery);

    res.json(result); 
});

// This section will help you add a user 
recordRoutes.route("/user/add").post(function (req, res) {
    let db_connect = dbo.getDb();

    bcrypt
        .hash(req.body.password, saltRounds)
        .then(hash => {
            let myobj = {
                name: req.body.name,
                email: req.body.email,
                password: hash,
            };

            db_connect.collection("users").insertOne(myobj);

            res.status(200).send("Status: User registered");
        })
        .catch(err => res.status(500).send(err))
});

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

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, res) {
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

    res.status(200).send("Document updated in database");
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, res) => {
    let db_connect = dbo.getDb();

    let myquery = {
        _id: new ObjectId(req.params.id)
    };

    db_connect.collection("users").deleteOne(myquery);

    res.status(200).send("Deleted document from database");
});

module.exports = recordRoutes;