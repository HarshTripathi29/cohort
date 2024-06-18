const mongoose = require("mongoose");

mongoose.db("mongodb+srv://harshtripathi042:harsh123@cluster0.etqbz6r.mongodb.net/");

const userSchema = new Schema({
    username : String,
    firstname : String,
    lastname : String,
    password : String,
});

const User = mongoose.model("User", userSchema);

module.exports={User}