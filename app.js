const http = require('http')
const express = require('express')
const mongoose = require('mongoose');
const { log } = require('console');
const rootDir = require('./util/path');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs')
const productRouter = require('./Routes/productsRouter')

const server = http.createServer(app);

const Product = require('./models/product.model');

// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static(path.join(rootDir,'public')))

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};




app.get('/',(req,res,next)=>{
    res.send("Hello World");
})

app.use(productRouter);



mongoose.connect(`mongodb+srv://abaysankar777:wc4q3PTcjD7QvZLV@crudnodedb.c62zg.mongodb.net/crudNodedb?retryWrites=true&w=majority&appName=crudNodedb`)
.then(()=>{
    console.log('mongo db connected successfully');
    
    server.listen(5000,()=>{
        console.log('server is running on port 5000');
    })
    
})
.catch(()=>{
    console.log('mongo db connection failed');
})