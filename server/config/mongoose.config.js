const mongoose = require("mongoose");

// const dbName = "LOZgames"


mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log(`Success! You are now connected to the ${process.env.DB_NAME} database.`)
    })
    .catch((err)=>{
        console.log(`Fail! There was a problem connecting to the ${process.env.DB_NAME} database.`, err)
    })