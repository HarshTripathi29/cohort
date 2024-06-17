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

const accountSchema = new mongoose.schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

// Create a model from the schema
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports({
    User, Account
});
