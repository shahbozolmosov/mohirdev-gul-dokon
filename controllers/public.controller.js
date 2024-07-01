const db = require("../models");
const Product = db.product;

// Desc       Get home page
// Route      GET /
// Access     Public
const getHomePage = async (req, res) => {
  try {
    // Get products
    const products = await Product.findAll({
      raw: true,
    });

    return res.render("main", {
      title: "Home Page",
      isAuthenticated: false,
      products,
    });
  } catch (err) {
    console.log(err);
  }
};

// Desc       Get oder product page
// Route      GET /:productId/order
// Access     Public
const getOrderProductPage = async (req, res) => {
  try {
    // Get product
    const product = await Product.findByPk(req.params.productId, {
      raw: true,
    });

    return res.render("orderProduct", {
      title: `Order - ${product?.title}`,
      isAuthenticated: false,
      ...product,
    });
  } catch (err) {
    console.log(err);
  }
};

// Desc       Create new order
// Route      POST /:productId/order
// Access     Public
const createNewOrder = async (req, res) => {
  try {
    // Get product
    const product = await Product.findByPk(req.params.productId, {
      raw: true,
    });

    if(!product) {
      req.flash("error", "Product not found");
      return res.redirect(`${req.params.productId}/order/create`);
    }

    
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getHomePage,
  getOrderProductPage,
  createNewOrder,
};
