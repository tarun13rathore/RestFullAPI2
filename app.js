const express = require("express");
const connectioDB = require("./DB/conn");
// const path = require("path");
const app = express();
const routes = require("./routes/index.js");
const port = 3001;

connectioDB();
// global.appRoot = path.resolve(__dirname);
app.use(express.json());
app.use("/api", routes);

app.listen(port, () => console.log(`Connect to server port at ${port}`));
