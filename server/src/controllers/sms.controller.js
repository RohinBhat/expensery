const regexHelper = require("../helpers/regex");

const extractAmount = (text) => {
  const amtMatches = text.match(regexHelper.amountPattern);
  return amtMatches ? amtMatches[0] : "";
};

const extractAccount = (text) => {
  const accMatches = text.match(regexHelper.accountPattern);
  return accMatches ? accMatches[0] : "";
};

const extractTransactionType = (text) => {
  if (regexHelper.debitPattern.test(text)) {
    return "debit";
  } else if (regexHelper.creditPattern.test(text)) {
    return "credit";
  } else {
    return "unknown";
  }
};

const extractBalance = (text) => {
  const balPosition = text.match(regexHelper.balancePattern)
    ? text.match(regexHelper.balancePattern).index
    : text.length;
  const balString = text.slice(balPosition);
  const balance = balString.match(regexHelper.balanceAmountPattern);

  console.log(balance);

  return balance ? balance[balance.length - 1] : "";
};

const cleanAmount = (text) => {
  let amount = "";

  if (
    text.toLowerCase().startsWith("rs.") ||
    text.toLowerCase().startsWith("rs:")
  ) {
    amount = text.slice(3);
  } else if (text.toLowerCase().startsWith("rs")) {
    amount = text.slice(2);
  } else if (
    text.toLowerCase().startsWith("inr.") ||
    text.toLowerCase().startsWith("mrp.") ||
    text.toLowerCase().startsWith("inr:") ||
    text.toLowerCase().startsWith("mrp:")
  ) {
    amount = text.slice(4);
  } else if (
    text.toLowerCase().startsWith("inr") ||
    text.toLowerCase().startsWith("mrp")
  ) {
    amount = text.slice(3);
  } else {
    amount = text;
  }

  amount = amount.trim();

  const processedAmount = amount.replace(",", "");
  const cleanedAmount = parseFloat(processedAmount);

  return cleanedAmount;
};

const cleanAccount = (text) => {
  const words = text.split(" ");
  const cleanedAccount = words ? words[words.length - 1] : "";
  return cleanedAccount;
};

const parseSMS = async (req, res) => {
  const message = req.body.message;

  let messageDetails = {};

  messageDetails.amount = cleanAmount(extractAmount(message));
  messageDetails.account = cleanAccount(extractAccount(message));
  messageDetails.transactionType = extractTransactionType(message);
  messageDetails.balance = cleanAmount(extractBalance(message));

  res.send({ messageDetails });
};

module.exports = {
  parseSMS,
};
