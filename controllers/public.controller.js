const { raw } = require("express");
const db = require("../models");
const Product = db.product;
const Region = db.region;

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

// Desc       Get product details page
// Route      GET /:productId/order
// Access     Public
const getProductDetailsPage = async (req, res) => {
  try {
    // Get product
    const product = await Product.findByPk(req.params.productId, {
      raw: true,
    });

    return res.render("details", {
      title: `Details - ${product?.title}`,
      isAuthenticated: false,
      ...product,
    });
  } catch (err) {
    console.log(err);
  }
};

// Desc       Get new order page
// Route      GET /:productId/order/new
// Access     Public
const getNewOrderPage = async (req, res) => {
  try {
    // Get product
    const product = await Product.findByPk(req.params.productId, {
      raw: true,
    });

    if (!product) {
      req.flash("error", "Product not found");
      return res.render("order", {
        title: `New order - Not found`,
        isAuthenticated: false,
        productNotFound: true,
      });
    }

    // Get all regions
    const regions = await Region.findAll({
      raw: true,
    });


    return res.render("order", {
      title: `Order - ${product?.title}`,
      isAuthenticated: false,
      ...product,
      regions,
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
    
    
    console.log("🚀 ~ createNewOrder ~ req:", req.body)
    return;
    // Get product
    const product = await Product.findByPk(req.params.productId, {
      raw: true,
    });

    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect(`${req.params.productId}/order/create`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getHomePage,
  getProductDetailsPage,
  getNewOrderPage,
  createNewOrder,
};
