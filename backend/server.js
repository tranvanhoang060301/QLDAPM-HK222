const express = require('express');
const app = express();
const port = 5000;
const { db } = require('./config/firebase');
const route = require('./routes/index');

var cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.use((err, req, res, next) => {
    console.log("local: ",err.message)
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (!err.message) {
        console.log("next");
        next();
    }
    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err?.message,
    });
});
