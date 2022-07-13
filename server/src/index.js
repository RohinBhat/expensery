const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./db/mongoose");
const { initTrie } = require("./db/trie");
const smsRouter = require("./routers/sms.router");
const userRouter = require("./routers/user.router");
const transactionRouter = require("./routers/transaction.router");
const categoryRouter = require("./routers/category.router");
const budgetRouter = require("./routers/budget.router");

const app = express();
const port = process.env.PORT || 8000;

initTrie();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/sms", smsRouter);
app.use("/user", userRouter);
app.use("/transaction", transactionRouter);
app.use("/category", categoryRouter);
app.use("/budget", budgetRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
