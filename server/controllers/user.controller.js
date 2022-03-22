const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {

    register: (req, res) =>{

        const user = new User(req.body);


        user.save()
            .then((newUser) =>{
                console.log(newUser)
                console.log("Success on registering!")
                res.json({
                    successMessage: "New Player Added",
                    user: newUser
                })
            })
            .catch((err)=>{
                console.log(err)
                res.status(400).json(err)
            })
    },

    login: (req, res) =>{

        User.findOne({email: req.body.email})
            .then((userRecord) =>{
                // if no email found
                if(userRecord === null) {
                    res.status(400).json({message: "Invalid Data"})
                }
                else{
                    // email found, compare password
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((isPasswordValid)=>{
                            // password valid
                            if(isPasswordValid) {
                                console.log("password is valid")
                                res.cookie(
                                    "usertoken", // name of cookie
                                    jwt.sign(
                                        {
                                            id: userRecord._id,
                                            email:userRecord.email,
                                            username: userRecord.username
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 10000000)
                                    }
                                ).json({
                                    message: "Welcome Player 1",
                                    userLoggedIn: userRecord.username,
                                    userId: userRecord._id
                                })
                            }
                            // not valid password
                            else{
                                res.status(400).json({
                                    message: "Invalid Access"
                                })

                            }
                        })
                }
            })
            .catch((err)=>{
                console.log(err)
                res.status(400).json({message: "Invalid Entry"})
            })


    },

    logout: (req, res) =>{

        console.log("logging out")
        res.clearCookie("usertoken")
        res.json({
            message: "You are now leaving Hyrule. Safe Travels."
        })
    },

    updateUser: (req, res) =>{
        const decodedJwt = jwt.decode(req.cookies.usertoken, {complete: true})
        User.findOneAndUpdate({_id: decodedJwt.payload.id},
            req.body,
            {new:true, runValidators:true}
            )
            .then((updatedUser)=>{
                console.log(updatedUser)
                res.json(updatedUser)
            })
            .catch((err)=>{
                console.log("Failed to update user")
                res.status(400).json({message: "Something went wrong with update.", error: err})
            })
    },

    userLoggedIn: (req, res) =>{
        const decodedJwt = jwt.decode(req.cookies.usertoken, {complete: true})
        User.findOne({_id: decodedJwt.payload.id})
        // User.findOne({_id: req.jwtpayload.id})
            .then((user)=>{
                console.log(user)
                res.json(user)
            })
            .catch((err)=>{
                console.log(err)
                res.json(err)
            })
    },

    findAllUsers:  (req, res) =>{
        User.find()
            .then((allUsers)=>{
                console.log(allUsers)
                res.json(allUsers)
            })
            .catch((err)=>{
                console.log("Find All Users failed")
                res.json({message: "Something went wrong in findAll", error: err})
            })
    },
    
    deleteUserProfile: (req, res) =>{
        
        const decodedJwt = jwt.decode(req.cookies.usertoken, {complete: true})

        User.deleteOne({_id: req.params.id})
            .then((deletedUser)=>{
                console.log(deletedUser)
                res.json("Player has been terminated.")
            })
            .catch((err)=>{
                console.log("Delete User failed")
                console.log(err)
                res.status(400).json({message: "Something went wrong with delete profile", error: err})
            })
    }


}