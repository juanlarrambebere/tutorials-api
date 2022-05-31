import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize(process.env.DATABASE_ENDPOINT!, {
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
