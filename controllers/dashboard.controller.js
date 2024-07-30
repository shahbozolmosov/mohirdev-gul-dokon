// Desc       Get dashboard home
// Route      GET /dashboard

const calculateMonthlyOrders = require("../utils/orderStats");

// Access     Private
const getDashboardPage = async (req, res) => {
  try {
    const isAuthenticated = req.session.isLogged;

    // New Orders
    const { ordersCurrentMonth, orderPercent } = await calculateMonthlyOrders();

    return res.render("dashboard/home", {
      title: "Dashboard",
      isAuthenticated,
      cardsData: {
        newOrder: {
          count: ordersCurrentMonth,
          percent: orderPercent, // monthly
          isPercentUp: orderPercent > 0,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDashboardPage,
};
