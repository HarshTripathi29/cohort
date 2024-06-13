const express = require("express");
const mongoose = require("mongoose");

const app = express();

//create a new database in the mongo cluster : userappnew.
mongoose.connect("mongodb+srv://harshtripathi042:harsh123@cluster0.etqbz6r.mongodb.net/userappnew");

//define the model to store data in the db. Schema of the db
const User = mongoose.model("Users", {
    name : String,
    email : String,
    password : String,
})

app.use(express.json());

//create a new table/collection and put data in it.
const user = new User({
    name : "Harsh",
    email : "harsh@gmail.com",
    password : "123321",
});

//save the data
user.save();

//instead of giving data to the sb manually let user give their data themselves.
// create an HTTP route to post request on to the server to create collection and save the data.
app.post("/signup", function(req, res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({                         
        name : username,
        email : email,
        password : password,
    })

    user.save();
    res.json({
        msg : "user created successfully"
    });

});


app.listen(4000);