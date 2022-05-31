import "dotenv/config";
import express from "express";
import authRouter from "./routers/auth";
import tutorialsRouter from "./routers/tutorials";

const PORT = process.env.APP_PORT;

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/tutorials", tutorialsRouter);

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});
