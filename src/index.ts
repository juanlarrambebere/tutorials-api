import "dotenv/config";
import express from "express";
import database from "./config/database";
import authRouter from "./routers/auth";
import tutorialsRouter from "./routers/tutorials";

const PORT = process.env.APP_PORT;

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/tutorials", tutorialsRouter);

app.listen(PORT, async () => {
  try {
    await database.authenticate();
    console.log(`listening on port http://localhost:${PORT}`);
  } catch (error) {
    console.error("Failed to authenticate to the database", error);
    process.exit(1);
  }
});
