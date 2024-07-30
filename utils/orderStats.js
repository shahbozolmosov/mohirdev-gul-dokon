const { Op } = require("sequelize");
const db = require("../models");
const Order = db.order;

const calculateMonthlyOrders = async () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const firstDayOfCurrentMonth = new Date(currentYear, currentMonth - 1, 1);
  const firstDayOfLastMonth = new Date(currentYear, currentMonth - 2, 1);
  const lastDayOfLastMonth = new Date(
    currentYear,
    currentMonth - 1,
    0,
    23,
    59,
    59
  );

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

  let orderPercent;
  if (ordersLastMonth === 0) {
    orderPercent = ordersCurrentMonth === 0 ? 0 : 100;
  } else {
    orderPercent =
      ((ordersCurrentMonth - ordersLastMonth) / ordersLastMonth) * 100;
  }

  return {
    ordersCurrentMonth,
    orderPercent: Math.round(orderPercent * 100) / 100,
  };
};

module.exports = calculateMonthlyOrders;
