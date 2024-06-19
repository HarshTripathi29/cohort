const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://harshtripathi042:harsh123@cluster0.etqbz6r.mongodb.net/todo_app");

const userSchema = new mongoose.Schema({
    username : String,
    firstname : String,
    lastname : String,
    password : String,
});

const User = mongoose.model('User', userSchema);

module.exports=User;