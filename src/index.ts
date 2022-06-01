import "dotenv/config";
import express from "express";
import errorHandler from "./middlewares/errorHandler";
import database from "./models";
import authRouter from "./routers/authRouter";
import tutorialsRouter from "./routers/tutorialsRouter";

const PORT = process.env.APP_PORT;

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/tutorials", tutorialsRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  try {
    await database.sync({ alter: true });
  } catch (error) {
    console.error("Error while synchronizing the database", error);
    process.exit(1);
  }

  console.log(`Server running in http://localhost:${PORT}`);
});
