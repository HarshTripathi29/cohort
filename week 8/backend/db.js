//step 2
const mongoose  = require("mongoose");

mongoose.connect("mongodb+srv://harshtripathi042:harsh123@cluster0.etqbz6r.mongodb.net/paytm");

// Create a Schema for Users
const userSchema = new mongoose.schema({
    username : String,
    password : String,
    firstname : String,
    lastname : String,
});

// Create a model from the schema
const User = mongoose.model("User", userSchema);

module.exports({
    User,
});
