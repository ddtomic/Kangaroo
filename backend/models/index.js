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
const Comment = require("./Comment")(sequelize, Sequelize.DataTypes);

//User assoc.
Users.hasMany(Thread, { foreignKey: "userID", as: "userThread" });
Thread.belongsTo(Users, { foreignKey: "userID", as: "userThread" });
//Thread -> Users via userID
Users.hasOne(commentRate, { foreignKey: "userID", as: "userCommentRate" });
commentRate.belongsTo(Users, { foreignKey: "userID", as: "userCommentRate" });
//commentRate -> Users via userID
Users.hasOne(threadRate, { foreignKey: "userID", as: "userThreadRate" });
threadRate.belongsTo(Users, { foreignKey: "userID", as: "userThreadRate" });
//threadRate -> Users via userID
Users.hasMany(Comment, { foreignKey: "userID", as: "userComment" });
Comment.hasOne(Users, { foreignKey: "userID", as: "userComment" });

//Thread assoc.
Thread.hasMany(threadRate, { foreignKey: "threadID", as: "threadRatings" });
threadRate.belongsTo(Thread, { foreignKey: "threadID", as: "threadRatings" });
//threadRate -> Thread via threadID
Thread.hasMany(Comment, { foreignKey: "threadID", as: "threadComments" });
Comment.hasOne(Thread, { foreignKey: "threadID", as: "threadComments" });
//Comment -> Thread via threadID

//Comment assoc.
Comment.hasMany(commentRate, {
  foreignKey: "commentID",
  as: "commentRate",
});
commentRate.belongsTo(Comment, {
  foreignKey: "commentID",
  as: "commentRate",
});
//commentRate -> Comment via commentID

module.exports = {
  db,
  Users,
  Thread,
  commentRate,
  threadRate,
  Comment,
};
