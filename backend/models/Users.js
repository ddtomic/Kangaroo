module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      bio: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { timestamps: false }
  );

  return Users;
};
