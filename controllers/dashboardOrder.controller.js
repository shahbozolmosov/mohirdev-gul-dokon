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
      include: ["product"],
      nest: true,
    });
    console.log("🚀 ~ getDashboardOrderConfirmPage ~ order:", order.product);

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

module.exports = {
  getDashboardOrderPage,
  getDashboardOrderConfirmPage,
};
