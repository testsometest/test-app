import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import api from "./api/api";

const port = 3000;

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/qbex_test", { useMongoClient: true });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

app.use(express.static("public"));

app.use("/api", api);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port, () => console.log("App is running on port 3000"));
