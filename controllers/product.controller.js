const { validationResult } = require("express-validator");
const db = require("../models");
const { raw } = require("express");
const { where } = require("sequelize");
const Product = db.product;

// Desc       Get dashboard products page
// Route      GET /dashboard/products
// Access     Private
const getProductsPage = async (req, res) => {
  try {
    // Auth
    const isAtuhenticated = req.session.isLogged;

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
      isAtuhenticated,
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

// Desc       Get dashboard products add page
// Route      GET /dashboard/products/add
// Access     Private
const getProductsAddPage = async (req, res) => {
  try {
    const isAtuhenticated = req.session.isLogged;
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
      isAtuhenticated,
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
    const isAtuhenticated = req.session.isLogged;
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
        isAtuhenticated,
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

    const isAtuhenticated = req.session.isLogged;
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
      isAtuhenticated,
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

module.exports = {
  getProductsPage,
  getProductsAddPage,
  addNewProduct,
  getProductsUpdatePage,
  updateProduct,
};
