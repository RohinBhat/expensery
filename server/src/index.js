const express = require("express");
require("./db/mongoose");
const { initTrie } = require("./db/trie");
const cors = require("cors");
const smsRouter = require("./routers/sms.router");

const app = express();
const port = process.env.PORT || 3000;

initTrie();

app.use(cors());
app.use(express.json());

app.use("/sms", smsRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
