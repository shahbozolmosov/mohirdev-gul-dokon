const db = require("../models");
const Order = db.order;

// Desc       Get dashboard order page
// Route      GET /dashboard/notifications
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

module.exports = {
  getDashboardOrderPage,
};
