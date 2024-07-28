const { validationResult } = require("express-validator");
const db = require("../models");
const Product = db.product;
const Comment = db.comment;

// Desc       Get dashboard products page
// Route      GET /dashboard/products
// Access     Private
const getProductsPage = async (req, res) => {
  try {
    // Auth
    const isAuthenticated = req.session.isLogged;

    // Get products
    const products = await Product.findAll({
      raw: true,
    });

    return res.render("dashboard/products/main", {
      title: "Products",
      breadcrumb: [
        {
          label: "Dashboard",
          route: "/dashboard",
        },
        {
          label: "Products",
          route: "/dashboard/products",
          active: true,
        },
      ],
      isAuthenticated,
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

// Desc       Get dashboard products details page
// Route      GET /dashboard/products/:productId/details
// Access     Private
const getProductDetailsPage = async (req, res) => {
  try {
    // Auth
    const isAuthenticated = req.session.isLogged;

    // Get product
    const data = await Product.findByPk(req.params.productId, {
      raw: false,
      plain: true,
      include: ["comment"],
      nest: true,
    });

    const product = await data.toJSON();

    if (!product) {
      return res.status(404).render("dashboard/products/details", {
        title: `Details - Not found`,
        breadcrumb: [
          {
            label: "Dashboard",
            route: "/dashboard",
          },
          {
            label: "Products",
            route: "/dashboard/products",
          },
          {
            label: "Details",
            active: true,
          },
        ],
        isAuthenticated,
        ...product,
        comments: [],
      });
    }

    return res.render("dashboard/products/details", {
      title: `Details - ${product.title}`,
      breadcrumb: [
        {
          label: "Dashboard",
          route: "/dashboard",
        },
        {
          label: "Products",
          route: "/dashboard/products",
        },
        {
          label: "Details",
          active: true,
        },
      ],
      isAuthenticated,
      ...product,
      productId: product.id,
      comments: product.comment,
    });
  } catch (err) {
    console.log(err);
  }
};

// Desc       Get dashboard products add page
// Route      GET /dashboard/products/add
// Access     Private
const getProductsAddPage = async (req, res) => {
  try {
    const isAuthenticated = req.session.isLogged;
    return res.render("dashboard/products/add", {
      title: "Product Add",
      breadcrumb: [
        {
          label: "Dashboard",
          route: "/dashboard",
        },
        {
          label: "Products",
          route: "/dashboard/products",
        },
        {
          label: "Product Add",
          route: "/dashboard/products/add",
          active: true,
        },
      ],
      isAuthenticated,
    });
  } catch (error) {
    console.log(error);
  }
};

// Desc       Add new product
// Route      POST /dashboard/products/add
// Access     Private
const addNewProduct = async (req, res) => {
  try {
    const isAuthenticated = req.session.isLogged;
    const { title, image, description, amount } = req.body;

    // Errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("dashboard/products/add", {
        title: "Product add",
        breadcrumb: [
          {
            label: "Dashboard",
            route: "/dashboard",
          },
          {
            label: "Products",
            route: "/dashboard/products",
          },
          {
            label: "Product Add",
            route: "/dashboard/products/add",
            active: true,
          },
        ],
        isAuthenticated,
        errorMessage: errors.array()[0].msg,
        oldInput: {
          title,
          image,
          description,
          amount,
        },
      });
    }

    // Create new product
    await Product.create({
      title,
      image,
      description,
      amount,
    });

    return res.redirect("/dashboard/products");
  } catch (error) {
    console.log(error);
  }
};

// Desc       Get dashboard products update page
// Route      GET /dashboard/products/product_id/update
// Access     Private
const getProductsUpdatePage = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      raw: true,
    });

    const isAuthenticated = req.session.isLogged;
    return res.render("dashboard/products/update", {
      title: "Product Update",
      breadcrumb: [
        {
          label: "Dashboard",
          route: "/dashboard",
        },
        {
          label: "Products",
          route: "/dashboard/products",
        },
        {
          label: "Product Update",
          active: true,
        },
      ],
      product,
      isAuthenticated,
    });
  } catch (error) {
    console.log(error);
  }
};

// Desc       Update product
// Route      POST /dashboard/products/product_id/update
// Access     Private
const updateProduct = async (req, res) => {
  try {
    await Product.update(
      {
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        amount: req.body.amount,
      },
      {
        where: { id: req.params.productId },
      }
    );

    res.redirect("/dashboard/products");
  } catch (error) {
    console.log(error);
  }
};

// Desc       Delete product
// Route      DELETE /dashboard/products/product_id/delete
// Access     Private
const deleteProduct = async (req, res) => {
  try {
    await Product.destroy({
      where: { id: req.params.productId },
    });

    res.redirect("/dashboard/products");
  } catch (error) {
    console.log(error);
  }
};

// Desc       Delete product comment
// Route      DELETE /dashboard/products/:productId/:commentId/delete
// Access     Private
const deleteProductComment = async (req, res) => {
  try {
    const isDelete = await Comment.destroy({
      where: { id: req.params.commentId },
    });

    if (!isDelete) {
      return res
        .status(404)
        .redirect(`/dashboard/products/${req.params.productId}/details`);
    }

    res.redirect(`/dashboard/products/${req.params.productId}/details`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductsPage,
  getProductDetailsPage,
  getProductsAddPage,
  addNewProduct,
  getProductsUpdatePage,
  updateProduct,
  deleteProduct,
  deleteProductComment,
};
