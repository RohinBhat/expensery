const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./db/mongoose");
const { initTrie } = require("./db/trie");
const smsRouter = require("./routers/sms.router");

const app = express();
const port = process.env.PORT || 3000;

initTrie();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/sms", smsRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
