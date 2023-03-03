const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const Progress = require("../models/progress");
const mongoose = require("mongoose");

router.post("/:id", async (req, res) => {
    try {
        // Retrieve user associated with id
        const id = new mongoose.Types.ObjectId(req.params.id)
        const user = await User.findOne({ _id: id });

        if (!user) {
            res.status(401).send({ message: "Invalid request "});
        }

        // Save progress for related user
        const progress = await new Progress({
            userId: user._id,
            overallProgress: req.body.progress
        }).save();

        res.status(200).send({ message: "The user progress was saved successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        // Retrieve user associated with id
        const id = new mongoose.Types.ObjectId(req.params.id)
        const user = await User.findOne({ _id: id });

        if (!user) {
            res.status(401).send({ message: "Invalid request "});
        }

        // Retrieve progress for related user
        let progress = await Progress.findOne({ userId: user._id });

        if (!progress) {
            progress = await new Progress({
                userId: user._id,
                overallProgress: 0
            }).save();
        }

        res.status(200).send({ 
            overallProgress: progress.overallProgress, 
            message: "The user progress was retrieved successfully" 
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }

});

module.exports = router;