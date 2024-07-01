module.exports = (sequelize, Sequelize) => {
  const Region = sequelize.define(
    "region",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamp: true,
    }
  );

  return Region;
};
