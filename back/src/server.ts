import express, {Express} from 'express';
import dotenv from 'dotenv';
// @ts-ignore
import cors from 'cors';
import path from "path";
import {fileURLToPath} from "url";
import router from "./routes.js";

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Express = express();
app.use(cors({
  origin: [
    "http://localhost:4200"
  ], credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);

app.listen(APP_PORT, ()=> {
  console.log(`[Server]: I am running at https://${APP_HOSTNAME}:${APP_PORT}`);
});