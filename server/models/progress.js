const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const progressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
        unique: true,
    },
    overallProgress: { type: Number, required: true}
});

module.exports = mongoose.model("progress", progressSchema);