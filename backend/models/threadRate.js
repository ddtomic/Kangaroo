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
        allowNull: false,
        defaultValue: "n", // Default value is 'n'
        validate: {
          isIn: [["l", "d", "n"]], // Restrict input to 'l', 'd', 'n'
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
    { timestamps: false }
  );

  return threadRate;
};
