const express = require("express");
const jwt = require("jsonwebtoken");
const rootRouter = require("./routes/index.js");  
const accountRouter = require("./account");

const app = express();

// cors
app.use(cors());
// body parser
app.use(express.json());

app.get("/api/v1", rootRouter);
router.use("/account", accountRouter);

app.listen(3000, ()=>{
    console.log("server is runnig at port 3000");
});
