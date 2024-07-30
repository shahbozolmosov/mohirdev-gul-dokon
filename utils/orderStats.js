const { Op } = require("sequelize");
const db = require("../models");
const getMonthlyDate = require("./monthlyDate");
const getPercentChange = require("./percentChange");
const Order = db.order;

const calculateMonthlyOrders = async () => {
  // Monthly date
  const { firstDayOfCurrentMonth, firstDayOfLastMonth, lastDayOfLastMonth } =
    await getMonthlyDate();

  const ordersCurrentMonth = await Order.count({
    where: {
      createdAt: {
        [Op.gte]: firstDayOfCurrentMonth,
      },
    },
  });

  const ordersLastMonth = await Order.count({
    where: {
      createdAt: {
        [Op.gte]: firstDayOfLastMonth,
        [Op.lte]: lastDayOfLastMonth,
      },
    },
  });

  // Percent change
  const orderPercent = getPercentChange(ordersCurrentMonth, ordersLastMonth);

  
  return {
    ordersCurrentMonth,
    orderPercent: orderPercent,
  };
};

module.exports = calculateMonthlyOrders;
