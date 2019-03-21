import debug from "debug";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";

// routes
import UrlCheckRouter from "./routes/UrlCheckRouter";
import Report from "./routes/ReportRouter";
import Signaling from "./routes/SignalingRouter";
import Retire from "./routes/RetireRouter";

// config
const config = require("./config/config");

// debug
const log = debug("server:index");

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
// routes
app.use("/api/v1/urlcheck", UrlCheckRouter);
app.use("/api/v1/report", Report);
app.use("/api/v1/signaling", Signaling);
app.use("/api/v1/retire", Retire);
/// catch 404
app.use((req, res, next) => {
    res.status(404).send();
});
// listen
const server = app.listen(config.app.port);
server.on("listening", onListening);
server.on("error", onError);

function onListening(): void {
  log("Server thread started");
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") throw error;
  switch (error.code) {
    case "EACCES":
      log("Required elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      log("Port is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

export default server;