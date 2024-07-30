const { Op } = require("sequelize");
const db = require("../models");
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
