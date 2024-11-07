module.exports = (sequelize, DataTypes) => {
  const threadRate = sequelize.define(
    "threadRate",
    {
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "userID",
        },
      },
      rating: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      threadID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Threads",
          key: "threadID",
        },
      },
    },
    { timestamps: false }
  );

  return threadRate;
};
