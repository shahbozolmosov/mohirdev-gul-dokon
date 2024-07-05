const { validationResult } = require("express-validator");
const db = require("../models");
const Order = db.order;

// Desc       Get dashboard order page
// Route      GET /dashboard/orders
// Access     Private
const getDashboardOrderPage = async (req, res) => {
  try {
    // Authenticated
    const isAuthenticated = req.session.isLogged;

    // Orders
    const orders = await Order.findAll({
      raw: true,
      include: ["region", "product"],
      nest: true,
    });

    return res.render("dashboard/order/main", {
      title: "New orders",
      isAuthenticated,
      orders,
    });
  } catch (err) {
    console.log(err);
  }
};

// Desc       Get dashboard order confirm page
// Route      GET /dashboard/orders/:orderId/confirm
// Access     Private
const getDashboardOrderConfirmPage = async (req, res) => {
  try {
    // Authenticated
    const isAuthenticated = req.session.isLogged;

    // Orders
    const order = await Order.findByPk(req.params.orderId, {
      raw: true,
      // plain: false,
      include: ["product", "region"],
      nest: true,
    });

    return res.render("dashboard/order/confirm", {
      title: `Confirm new order - ${order.fio}`,
      isAuthenticated,
      order,
      product: order.product,
    });
  } catch (err) {
    console.log(err);
  }
};

// Desc       Confirm order
// Route      POST /dashboard/orders/:orderId/confirm
// Access     Private
const confirmDashboardOrder = async (req, res) => {
  try {
    // Authenticated
    const isAuthenticated = req.session.isLogged;

    const { price, amount } = req.body;

    // Orders
    const order = await Order.findByPk(req.params.orderId, {
      raw: true,
      // plain: false,
      include: ["product", "region"],
      nest: true,
    });

    // Errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("dashboard/order/confirm", {
        title: `Confirm new order - ${order.fio}`,
        isAuthenticated,
        order,
        product: order.product,
        errorMessage: errors.array()[0].msg,
        oldInput: {
          price,
          amount,
        },
      });
    }
    // const res =
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getDashboardOrderPage,
  getDashboardOrderConfirmPage,
  confirmDashboardOrder,
};
