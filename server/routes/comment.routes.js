const CommentController = require("../controllers/comment.controller")

module.exports = (app) => {

    app.post("/api/comments", CommentController.createComment)

    app.get("/api/comments", CommentController.findAllComments)

    
}