const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: '*', // Allow all origins for development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/interest', function(req,res){
    const principal = parseInt(req.query.p);
    const rate = parseInt(req.query.r);
    const time = parseInt(req.query.t);

    const interest = (principal*rate*time)/100;
    const total = principal+interest;
    if (isNaN(a) || isNaN(b)) {
        res.status(400).json({ error: 'Invalid input' });
        return;
    }

    res.send({
        total : total,
        interest : interest,
    });
});

app.listen(5000, ()=>{
    console.log("server is running at port number 5000");
});