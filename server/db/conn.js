const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    /*connectToServer: function (callback) {
        client.connect(function (err, db) {
            // Verify we got a "good" database object
            if (db) {
                _db = db.db("employees");
                console.log("Successfully connected to MongoDB.");
            }

            return callback(err);
        });
    },*/

    connectToServer: async function () {
        try {
            await client.connect();
        
            _db = client.db('employees');
            console.log("Successfully connected to MongoDB.");
        } catch (err) {
            console.error(err);
        }
    },

    getDb: function () {
        return _db;
    },
};