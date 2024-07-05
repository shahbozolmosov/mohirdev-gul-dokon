const { validationResult } = require("express-validator");
const db = require("../models");
const { where } = require("sequelize");
const Order = db.order;
const Product = db.product;
const Payment = db.payment;
const sequelize = db.sequelize;

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
      where: {
        status: "new",
      },
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

// Desc       Get dashboard order page
// Route      GET /dashboard/orders
// Access     Private
const getDashboardCompletedOrderPage = async (req, res) => {
  try {
    // Authenticated
    const isAuthenticated = req.session.isLogged;

    // Orders
    const orders = await Order.findAll({
      raw: true,
      include: ["region", "product", "payment"],
      nest: true,
      where: {
        status: "completed",
      },
    });
    console.log("🚀 ~ getDashboardCompletedOrderPage ~ orders:", orders)

    return res.render("dashboard/order/completed", {
      title: "Completed orders",
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
      errorMessage: req.flash("error"),
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
  // Begin transaction
  const transaction = await sequelize.transaction();

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

    // Check order status
    if (order.status !== "new") {
      req.flash("error", "This product has already been submitted");
      return res.redirect(`/dashboard/orders/${req.params.orderId}/confirm`);
    }

    // Check amount
    if (amount > order.product.amount) {
      req.flash("error", "There is not enough product in stock");
      return res.redirect(`/dashboard/orders/${req.params.orderId}/confirm`);
    }

    // Decrement from stock
    await Product.update(
      {
        amount: order.product.amount - amount,
      },
      {
        where: { id: order.product.id },
        transaction,
      }
    );

    await Order.update(
      {
        status: "completed",
      },
      {
        where: { id: order.id },
        transaction,
      }
    );

    await Payment.create(
      {
        amount,
        price,
        totalPrice: amount * price,
        orderId: order.id,
      },
      {
        transaction,
      }
    );

    // Transaction commit
    await transaction.commit();

    return res.redirect(`/dashboard/orders`);
  } catch (err) {
    // Transaction rollback
    await transaction.rollback();
    console.log(err);
  }
};

module.exports = {
  getDashboardOrderPage,
  getDashboardOrderConfirmPage,
  confirmDashboardOrder,
  getDashboardCompletedOrderPage
};
