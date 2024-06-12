// GET : user can check their number and health of kidneys.
// POST : user can add a new kidney.
// PUT : user can replace a and make it healthy.
// DELETE : user cam re,ove a kidney.

const express = require("express");
const app = express();

const users = [{
    name : "harsh",
    kidneys : [{
        healthy : true,
    },]
},]


app.get("/doctor", function(req, res){
    const kidney = users[0].kidneys;
    const noOfKidney = kidney.length;
    let noOfHealthyKidneys = 0;

    for(let i=0; i<noOfKidney; i++)
        {
            if(kidney[i].healthy)
                {
                    noOfHealthyKidneys=noOfHealthyKidneys+1
                }
        }
        const noOfUnealthyKidneys = noOfKidney-noOfHealthyKidneys;

        res.json({
            noOfKidney,
            noOfHealthyKidneys,
            noOfUnealthyKidneys,
        })
})

app.use(express.json());

app.post("/doctor", function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy : isHealthy,
    })
    res.json({msg: "Done"})
})

app.put("/doctor", function(req,res){
    for(let i=0; i<users[0].kidneys.length; i++)
        {
            users[0].kidneys[i].healthy = true;
        }
        res.json({})
})

app.delete("/doctor", function(req,res){
    if(isThereUnhealthyKidney())
        {
            const newKidney = [];
            for(let i=0; i<users[0].kidneys.lengthn; i++)
                {
                    if(users[0].kidneys[i].helathy){
                        newKidney.push({
                            healthy : true,
                        })
                    }
                }

                users[0].kidneys = newKidney;
                res.json({msg : "done"});
        }
        else{
            res.status(411).json({
                msg : "you have no bad kidneys"
            });
        }

        function isThereUnhealthyKidney(){
            let atLeastOneKidney = false;
            for(let i=0; i<users[0].kidneys.length; i++)
                {
                    if(!users[0].kidneys[i].healthy)
                        {
                            atLeastOneKidney = true;
                        }
                }
                return atLeastOneKidney;
        }
})
app.listen(8000);