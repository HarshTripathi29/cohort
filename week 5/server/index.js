const express = require("express");
const mainRouter = require("./routes/index");

const router = express.Router();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);



app.listen(3000, ()=>{
    console.log("the server is running at port 3000");
})