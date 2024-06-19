const express = require("express");
const zod = require("zod");
const {Todo} = require("../db");
const router = express.Router();
const app = express();

const isValid = zod.object({
    title : zod.string(),
})

router.post("/todos", async function(req, res){
    const {success} = isValid.safeParse(req.body);

    if(!success){
        return res.status(411).json({ msg : "invalid inputs"});
    }

    let todo;
    try{
    todo = await Todo.create({
        title : req.body.title,
    })
    }catch(error){
        console.log("error creating todo", error);
    }
    if (todo){return res.status(200).json({
        msg : "todo created successfully",
        todo
    })
    }
})

router.get('/todos', async function(req, res){
    
    let todos

    try{
     todos = await Todo.find({})}catch(error){
        console.log("error getting todos", error);
    }

    if (todos){
        return res.status(200).json({
            msg : "successfully retrieved todos",
            todos
        })
    }
    
});

module.exports = router;