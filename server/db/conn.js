const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: async function () {
        try {
            await client.connect();
        
            _db = client.db('slingo');
            console.log("Successfully connected to MongoDB.");
        } catch (err) {
            console.error(err);
        }
    },

    getDb: function () {
        return _db;
    },
};