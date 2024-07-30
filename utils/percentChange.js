const getPercentChange = async (current, last) => {
  let percentChange = 0;
  if (last === 0) {
    percentChange = current === 0 ? 0 : 100;
  } else {
    percentChange = ((current - last) / last) * 100;
  }

  return Math.round(percentChange * 100) / 100;
};

module.exports = getPercentChange;
