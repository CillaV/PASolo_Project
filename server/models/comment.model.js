const mongoose = require("mongoose")



const CommentSchema = new mongoose.Schema({

    content: {
        type: String,
        // required: [true, "Words must be used to leave wisdom."],
        minlength: [3, "Must be at least 3 characters"]
    },

    // likes: {
    //     type: Number
    // },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

    // game: {
    //     type: String,
    //     ref:
    // }


}, {timestamps: true})

const Comment = mongoose.model("Comment", CommentSchema)

module.exports = Comment;