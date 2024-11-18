const express = require('express');
const router = express.Router();
const multer = require("multer");
const rootDir = require('../util/path');
const path = require('path')
const Product = require('../models/product.model.js')
const productController = require('../controller/product.controler.js')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,rootDir,"/assets")
    },
    filename:(req, file, cb) => {
        const productName = req.body.name;
        const uniqueSuffix = Date.now() + '-' +  Math.ceil(Math.random() * 1E9)
        // Set the filename format: productName-timestamp.extension
        cb(null, `${productName}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
})


const upload = multer({ storage: storage  });


// Add products *********

router.get('/api/add-product',(req,res,next) => {
    res.sendFile(path.join(rootDir,'views','add-product.html'))
})

// save products **********


router.post('/api/add-product',upload.single("image"),productController.createProduct)

// get products **********

router.get('/api/products',productController.getProducts)

// find product ********

router.get('/api/product/:id',productController.findProduct)

// update product

router.put('/api/product/:id',productController.updateProduct)


// delete product api

router.delete('/api/product/:id', productController.deleteProduct)

module.exports = router;