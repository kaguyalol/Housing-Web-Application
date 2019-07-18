var mongoose = require("mongoose");
// create a new database and connect to it


var campgroundSchema = mongoose.Schema({
	name: String,
    img: String,
    price: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }
    ]
});

module.exports = mongoose.model("campgrounds", campgroundSchema);
