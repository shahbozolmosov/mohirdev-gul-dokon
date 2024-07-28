const db = require("../models");
const Product = db.product;
const Comment = db.comment;

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
// Route      GET /:productId/details
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

// Desc       Add comment to product
// Route      GET /:productId/comment
// Access     Public
const addCommentToProduct = async (req, res) => {
  try {
    // Req body
    const { email, comment } = req.body;

    // Get product
    const product = await Product.findByPk(req.params.productId, {
      raw: true,
    });

    // Check not found
    if (!product) {
      return res.status(404).render("details", {
        title: `Details - ${product?.title}`,
        isAuthenticated: false,
      });
    }

    // Add
    await Comment.create({
      email,
      comment,
      productId: req.params.id,
    });

    return res.status(201).redirect(`/${product.id}/details`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getHomePage,
  getProductDetailsPage,
  addCommentToProduct,
};
