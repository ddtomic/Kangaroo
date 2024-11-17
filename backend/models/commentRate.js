module.exports = (sequelize, DataTypes) => {
  const commentRate = sequelize.define(
    "commentRate",
    {
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "userID",
          as: "userCommentRate",
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
      commentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Comments",
          key: "commentID",
          as: "commentRate",
        },
      },
    },
    { timestamps: false }
  );

  return commentRate;
};
