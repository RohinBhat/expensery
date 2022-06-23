const amountPattern =
  /((rs(.?|:?))|(inr(.?|:?))|(mrp(.?|:?)))(\s?)((\d{1,2})(,\d{2})*(,\d{1,3}){1}|(\d+))(\.\d{1,})?/gi;
const balanceAmountPattern =
  /((rs(.?|:?))|(inr(.?|:?))|(mrp(.?|:?)))?(\s?)((\d{1,2})(,\d{2})*(,\d{1,3}){1}|(\d+))(\.\d{1,})?/gi;
const accountPattern =
  /(a\/c|a\/c no|a\/c no.|a\/c. no.|a\/c number|a\/c.|account|account number|account no.|account no|acc.|acct|acct.|acc no|acc no.|acc. no.|acc. no|acct no|acct no.|acct. no|acct. no.|ac|ac.|ac. no.|ac no|ac. no|ac no.|savings no|savings no.|ending|ending in|ending with)\s?(\d{0,8}[nx\*\.]*\d{2,8})/gi;
const creditPattern =
  /(credited|(?!credit card)credit|deposited|payment|spent|received)/i;
const debitPattern =
  /(debited|(?!debit card)debit|deducted|sent|paid|transferred from)/i;
const balancePattern = /(balance|bal|bal.)/i;

module.exports = {
  amountPattern,
  balanceAmountPattern,
  accountPattern,
  creditPattern,
  debitPattern,
  balancePattern,
};
