const CommentController = require("../controllers/comment.controller")
const {authenticate} = require("../config/jwt.config")

module.exports = (app) => {

    app.get("/api/comments", CommentController.findAllComments)
    
    app.post("/api/comments", CommentController.createComment)

    

    
}