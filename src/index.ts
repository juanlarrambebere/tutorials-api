import "dotenv/config";
import express from "express";

const PORT = process.env.APP_PORT;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});
