const { Op } = require("sequelize");
const db = require("../models");
const getMonthlyDate = require("./monthlyDate");
const getPercentChange = require("./percentChange");
const Payment = db.payment;

const calculateMonthlyIncome = async () => {
  // Monthly date
  const { firstDayOfCurrentMonth, firstDayOfLastMonth, lastDayOfLastMonth } =
    await getMonthlyDate();

  const totalIncomeCurrentMonth =
    (await Payment.sum("totalPrice", {
      where: {
        createdAt: {
          [Op.gte]: firstDayOfCurrentMonth,
        },
      },
    })) || 0;

  const totalIncomeLastMonth =
    (await Payment.sum("totalPrice", {
      where: {
        createdAt: {
          [Op.gte]: firstDayOfLastMonth,
          [Op.lte]: lastDayOfLastMonth,
        },
      },
    })) || 0;

  let incomePercent = await getPercentChange(
    totalIncomeCurrentMonth,
    totalIncomeLastMonth
  );

  return {
    totalIncomeCurrentMonth,
    incomePercent,
  };
};

module.exports = calculateMonthlyIncome;
