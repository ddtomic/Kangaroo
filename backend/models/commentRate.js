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
        allowNull: true,
        validate: {
          isIn: [["l", "d"]], // Restrict input to 'l', 'd'
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
    { timestamps: true }
  );

  return commentRate;
};
