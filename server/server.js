// added
require("dotenv").config()

const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser") // added
const app = express()



app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(cors({
    credentials: true,  // added 
    origin: "http://localhost:3000"
}))

app.use(cookieParser())

require("./config/mongoose.config")

// routes
require("./routes/user.routes")(app);
require("./routes/comment.routes")(app);


app.listen(process.env.MY_PORT, ()=> console.log(`Success! Connected to port ${process.env.MY_PORT}`))