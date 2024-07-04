module.exports = (sequelize, Sequelize) => {
  const order = sequelize.define(
    "order",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      fio: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return order;
};
