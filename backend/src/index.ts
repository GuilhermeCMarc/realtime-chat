import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import logger from "./utils/logger";
import buildRoutes from "./framework/routeBuilder";

dotenv.config();

// Initializing
const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello World!" });
});

buildRoutes(app);

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
