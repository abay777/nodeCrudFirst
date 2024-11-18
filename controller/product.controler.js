const Product = require('../models/product.model')
const getProducts = async (req,res,next) =>{
    try {
        const products = await Product.find({});
        if( products){
         res.status(200).json({products})
        }else{
            throw Error ('products not found')
        }
     }catch (error) {
        res.status(500).json({message:error.message})
    }
}

const createProduct = async(req, res, next)=>{
    try {
        console.log(req.body, req.file)


        const productData = {
            ...req.body,
           ...(req.file && { image: req.file ? req.file.filename : null }) // Save the filename in the database
        };

        const product = await Product.create(productData);
        res.status(200).json({ product });
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

const findProduct = async(req ,res, next)=>{
    try {
     const { id} = req.params
     const product = await Product.findById(id);
     if(!product){
             // Throwing an error with a message as a string
             throw new Error(`No product found with ID: ${id}`);
     }else{
         res.status(200).json(product)
     }
     
    } catch (error) {
     res.status(500).json({message:error.message})
     
    }
 }

 const updateProduct =  async (req, res, next) => {
    try {
        const {id} = req.params;
        console.log(req.body)
        const product = await Product.findByIdAndUpdate(id,req.body)
        if(product) {
            const updatedProduct = await Product.findById(id)
          return  res.status(200).json(updatedProduct)
        }else{
          return  res.status(404).json({message:"product not found"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const deleteProduct = async (req,res,next) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message:"product not found"})
        }
        res.status(200).json({message:"product deleted successfully"})
    } catch (error) {
        res.status(500).json(error)
        
    }
}

module.exports = {
    getProducts,
    createProduct,
    findProduct,
    updateProduct,
    deleteProduct
}