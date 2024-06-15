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

app.get('/sum', function(req, res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    if (isNaN(a) || isNaN(b)) {
        res.status(400).json({ error: 'Invalid input' });
        return;
    }
    const sum = a + b;
    res.send(sum.toString());
});

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
