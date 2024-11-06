const Users = require("./Users");

module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define(
    "Thread",
    {
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "userID",
        },
      },
      content: {
        type: DataTypes.STRING(1234),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      threadID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      timestamps: true,
    }
  );

  // Associations

  return Thread;
};
