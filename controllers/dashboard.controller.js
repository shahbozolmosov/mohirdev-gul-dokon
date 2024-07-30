const db = require("../models");
const Order = db.order;

// Desc       Get dashboard home
// Route      GET /dashboard
// Access     Private
const getDashboardPage = async (req, res) => {
  try {
    const isAuthenticated = req.session.isLogged;

    // New Orders
    const newOrders = await Order.findAll({
      raw: true,
      nest: true,
      where: {
        status: "new",
      },
    });

    return res.render("dashboard/home", {
      title: "Dashboard",
      isAuthenticated,
      cardsData: {
        newOrderCount: newOrders.length,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDashboardPage,
};
