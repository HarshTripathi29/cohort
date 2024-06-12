const express = require("express");
const app = express();

function calculateSum(n){
    let ans = 0;
    for(let i=0; i<n; i++)
        {
            ans+=i;
        }
    return ans;
} 

let ans = calculateSum(10);
console.log(ans);

app.get("/", function(req, res){
    const n = req.query.n;
    const ans = calculateSum(n);
    res.send("the answer is" + ans);
})

app.listen(5000);