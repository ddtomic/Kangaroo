"use strict";

require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const process = require("process");
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connected to MySQL with Sequelize!"))
  .catch((err) => console.error("Unable to connect:", err));

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const Thread = require("./Thread")(sequelize, Sequelize.DataTypes);
const Users = require("./Users")(sequelize, Sequelize.DataTypes);
const commentRate = require("./commentRate")(sequelize, Sequelize.DataTypes);
const threadRate = require("./threadRate")(sequelize, Sequelize.DataTypes);

//User assoc.

Users.hasMany(Thread, { foreignKey: "userID" });
Thread.belongsTo(Users, { foreignKey: "userID" });
//Thread -> Users via userID
Users.hasOne(commentRate, { foreignKey: "userID" });
commentRate.belongsTo(Users, { foreignKey: "userID" });
//commentRate -> Users via userID
Users.hasOne(threadRate, { foreignKey: "userID" });
threadRate.belongsTo(Users, { foreignKey: "userID" });
//threadRate -> Users via userID
//Thread assoc.
Thread.hasMany(commentRate, { foreignKey: "threadID" });
commentRate.belongsTo(Thread, { foreignKey: "threadID" });
//commentRate -> Thread via threadID
Thread.hasMany(threadRate, { foreignKey: "threadID" });
threadRate.belongsTo(Thread, { foreignKey: "threadID" });
//threadRate -> Thread via threadID

module.exports = {
  db,
  Users,
  Thread,
  commentRate,
  threadRate,
};
