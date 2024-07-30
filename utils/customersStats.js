const { Op, Sequelize } = require("sequelize");
const db = require("../models");
const getMonthlyDate = require("./monthlyDate");
const getPercentChange = require("./percentChange");
const Order = db.order;

const calculateMonthlyNewCustomer = async () => {
  // Monthly date
  const { firstDayOfCurrentMonth, firstDayOfLastMonth, lastDayOfLastMonth } =
    await getMonthlyDate();

  const newCustomerCurrentMonth = await Order.count({
    distinct: true,
    col: "phone",
    where: {
      createdAt: {
        [Op.gte]: firstDayOfCurrentMonth,
      },
    },
  });

  const newCustomerLastMonth = await Order.count({
    distinct: true,
    col: "phone",
    where: {
      createdAt: {
        [Op.gte]: firstDayOfLastMonth,
        [Op.lte]: lastDayOfLastMonth,
      },
    },
  });

  // Percent change
  const customerPercent = await getPercentChange(
    newCustomerCurrentMonth,
    newCustomerLastMonth
  );

  return {
    newCustomerCurrentMonth,
    customerPercent,
  };
};

module.exports = {
  calculateMonthlyNewCustomer,
};
