const mongoose = require("mongoose");

const dbName = "LOZgames"


mongoose.connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log(`Success! You are now connected to the ${dbName} database.`)
    })
    .catch((err)=>{
        console.log(`Fail! There was a problem connecting to the ${dbName} database.`, err)
    })