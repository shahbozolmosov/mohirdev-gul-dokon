const db = require("../models");
const Order = db.order;

// Desc       Get notifications page
// Route      GET /dashboard/notifications
// Access     Private
const getNotifPage = async (req, res) => {
  try {

    // Authenticated
    const isAuthenticated = req.session.isLogged;
    
    // Orders
    const orders = await Order.findAll({
      raw: true,
    });

    return res.render("dashboard/notif/main", {
      title: "Notifications - New order",
      isAuthenticated,
      orders,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getNotifPage,
};
