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
          as: "userThreadRate",
        },
      },
      rating: {
        type: DataTypes.STRING(1),
        allowNull: true,
        validate: {
          isIn: [["l", "d"]], // Restrict input to 'l', 'd'
        },
      },
      threadID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Threads",
          key: "threadID",
          as: "threadRatings",
        },
      },
    },
    { timestamps: true }
  );

  return threadRate;
};
