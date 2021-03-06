import { Sequelize } from "sequelize-typescript";
import Tutorial from "./Tutorial";
import User from "./User";

const sequelize = new Sequelize(process.env.DATABASE_ENDPOINT!, {
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  models: [User, Tutorial],
});

Tutorial.belongsTo(User, { foreignKey: { name: "userId", allowNull: false }, onDelete: "CASCADE" });

export default sequelize;
