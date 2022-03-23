const Comment = require("../models/comment.model")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")


module.exports = {

    
    createComment: (req, res) =>{
        // const newCommentObj = new Comment(req.body)

        // const decodedJWT = jwt.decode(req.cookies.usertoken, {
        //     complete: true
        // })

        // newCommentObj.author = decodedJWT.payload.id
        // newCommentObj.user = req.jwtpayload.id
        
        Comment.create(req.body)
        // newCommentObj.save()
        .then((newComment)=>{
            console.log(newComment)
            res.json(newComment)
        })
        .catch((err)=>{
            console.log("Create comment failed.")
            res.status(400).json(err)
        })
    },

    findAllComments: (req, res) =>{
        Comment.find()
        // .populate("author", "username email" )
        .then((allComments)=>{
            console.log(allComments)
            res.json(allComments)
        })
            
        .catch((err)=>{
            console.log("Find all games failed")
            res.json({message: "Something went wrong with all comments", error: err})
        })
    },

    updateComment: (req, res) =>{
        Comment.findOneAndUpdate({_id: req.params.id},
            req.body,
            {new: true, runValidators: true}
            )
        .then((updatedComment)=>{
            console.log(updatedComment)
            res.json(updatedComment)
        })
        .catch((err)=>{
            console.log("Update comment failed.")
            res.status(400).json(err)
        })
    }, 

    deleteComment: (req, res) =>{
        Comment.deleteOne({_id: req.params.id})
        .then((deletedComment)=>{
            console.log(deletedComment)
            res.json(deletedComment)
        })
        .catch((err)=>{
            console.log("Delete comment failed.")
            res.json({message: "Something went wrong with delete comment."})
        })
    },
    
    findAllCommentsByUser: (req, res) =>{ // below change to id instead in case another user has same username
        if(req.jwtpayload.username !== req.params.username){ // if not user
            User.findOne({username: req.params.username}) // find user by req params username
                .then((notUserLoggedIn)=>{  // if promise is fufilled 
                    Comment.find({user: notUserLoggedIn._id}) // find comments by current user
                        .populate("author", "username") // bring info from comment model property user
                        .then((allCommentsByUser)=>{
                            console.log(allCommentsByUser)
                            res.json(allCommentsByUser)
                        })
                        .catch((err)=>{
                            console.log(err)
                            res.status(400).json(err)
                        })
                })
                .catch((err)=>{
                    console.log(err)
                    res.status(400).json(err)
                })
        }
        else{
            Comment.find({user: req.jwtpayload.id}) // if is user logged in
            .then((commentsByLoggedInUser)=>{
                console.log(commentsByLoggedInUser)
                res.json(commentsByLoggedInUser)
            })
            .catch((err)=>{
                console.log(err)
                res.status(400).json(err)
            })
        }
    },

    // findAllCommentsByGame: (req, res) =>{

    // },

    

}