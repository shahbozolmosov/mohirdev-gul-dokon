// Desc       Get dashboard home
// Route      GET /dashboard

const { calculateMonthlyNewCustomer } = require("../utils/customersStats");
const calculateMonthlyIncome = require("../utils/incomeStats");
const calculateMonthlyOrders = require("../utils/orderStats"); 

// Access     Private
const getDashboardPage = async (req, res) => {
  try {
    const isAuthenticated = req.session.isLogged;

    // New Orders
    const { ordersCurrentMonth, orderPercent } = await calculateMonthlyOrders();

    // Total income
    const { totalIncomeCurrentMonth, incomePercent } =
      await calculateMonthlyIncome();

    // New customers
    const { newCustomerCurrentMonth, customerPercent } =
      await calculateMonthlyNewCustomer();

    return res.render("dashboard/home", {
      title: "Dashboard",
      isAuthenticated,
      cardsData: {
        newOrder: {
          count: ordersCurrentMonth,
          percent: orderPercent, // monthly
          isPercentUp: orderPercent > 0,
        },
        totalIncome: {
          totalPrice: totalIncomeCurrentMonth,
          percent: incomePercent,
          isPercentUp: incomePercent > 0,
        },
        newCustomers: {
          count: newCustomerCurrentMonth,
          percent: customerPercent, // monthly
          isPercentUp: customerPercent > 0,
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
