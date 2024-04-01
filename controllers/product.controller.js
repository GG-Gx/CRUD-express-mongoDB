




const Product = require('../models/product.model');



const getProducts = async (req, res) => {


  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);




}

}


module.exports = {
  getProducts,
}