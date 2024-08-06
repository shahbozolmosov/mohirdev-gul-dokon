module.exports = (sequelize, Sequelize) => {
  const UserSession = sequelize.define(
    "user_session",
    {
      sid: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      sess: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      expire: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "user_session",
    }
  );

  return UserSession;
};
