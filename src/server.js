import express from "express";
import morgan from "morgan";
import { connectDB, getDB } from "./config/mongodb.js";
import { env } from "./config/environtment.js";
import { routerV1 } from "./routes/v1/index.js";
import cors from "cors";

connectDB()
  .then(() => console.log(" Connected successful to database server "))
  .then(() => bootServer())
  .catch((error) => {
    console.log("============= error", error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();
  app.use(morgan("common"));

  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(express.json());

  app.use(cors());

  app.use("/trelloApi", routerV1);

  app.listen(env.PORT, () => {
    console.log("============= port ", env.PORT);
  });
};

// http call => router => [ middleware , validation] => controller => service => model => database
