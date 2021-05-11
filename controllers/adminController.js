const Product = require('../models/product')

exports.getAdminData = (req, res, next) => {
    res.status(200).json({
        success: true, 
        data: "You have access to the private data on this route"
    })
}

exports.updateProduct = (req, res, next) => {
    const { productId, images, title, description, rate, category, subcategory } = req.body
  
    const updatedProduct = {
      images, title, description, rate, category, subcategory
    }
  
    Product.findByIdAndUpdate(productId, updatedProduct, (error, result) => {
        if(error) {
            res.json({error: 'Unable to update product'})
        } else {
            res.json({success: true, message: 'Product updated successfully!'})
        }
    })
}

exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId 
  
    Product.remove({
      _id: productId
    }, (error, result) => {
      if(error) {
        res.json({error: 'Unable to delete product'})
      } else {
        res.json({success: true, message: 'Product deleted successfully!'})
      }
    })
}