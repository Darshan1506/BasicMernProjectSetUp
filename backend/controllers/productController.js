const Product = require("../models/ProductModal")


//Create Product 
exports.createProducts = async(req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}

//Get All Product
exports.getAllProducts = async(req,res)=>{

    const products  = await Product.find();
    res.status(201).json({
        success:true,
        products
    })
}

//get single product deltails
exports.getProductDetails = async(req,res,next)=>{

    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    res.status(201).json({
        success:true,
        product
    })
}


//Update any product -- Admin
exports.updateProduct = async(req,res,next)=>{

    let product =await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(201).json({
        success:true,
        product
    })
}

//Delete Product

exports.deleteProduct = async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    await product.remove();
    res.status(201).json({
        success:true,
        message:"Product deleted successfully"
    })
}