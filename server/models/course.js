const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const signSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true }
    // Possibly add image path here
});

const courseSchema = new Schema({
    title: { type: String, required: true, unique: true },
    signs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "sign"
    }]
});

const Sign = mongoose.model("sign", signSchema);
const Course = mongoose.model("course", courseSchema);

module.exports = { Sign, Course };