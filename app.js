const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

const api = process.env.API_URL;

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

const productSchema = mongoose.Schema({
    name : String,
    image : String,
    countInStock : Number
}); 

const Product = mongoose.model('Product',productSchema); 

app.get(`${api}/products`,(req,res) =>{
    const product = {
        id : 1,
        name : 'Fideos',
        image : 'some_ur'
    };
    
    res.send(product);
});

app.post(`${api}/products`,(req,res) =>{
    console.log(req.body);
    const product = new Product({
        name : req.body.name,
        image : req.body.image,
        countInStock : req.body.countInStock
    });

    product.save().then((createdProduct =>{
        res.status(201).json(createdProduct);

    })).catch((err) => {
        
        res.status(500).json({
            error : err,
            succes: false
        });
    });
});

mongoose.connect(process.env.CONNECTION_STRING)
.then(() =>{
    console.log('Database connection is ready...');
}).catch((err) =>{
    console.log(err);
});

app.listen(3000, () =>{
    console.log(api);
   console.log("server is running in http://localhost:3000"); 
});