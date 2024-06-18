const express = require("express");
const userRouter = require("./routes/user");

router.get("/api/v1/user", userRouter);
const app = express();