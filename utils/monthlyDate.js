const getMonthlyDate = async() => {
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

  return {
    firstDayOfCurrentMonth,
    firstDayOfLastMonth,
    lastDayOfLastMonth
  }
}

module.exports = getMonthlyDate;