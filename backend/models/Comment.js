module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "userID",
        },
      },
      threadID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Threads",
          key: "threadID",
        },
      },
      content: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      commentID: {
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

  return Comment;
};
