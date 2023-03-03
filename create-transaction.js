import {
  getAddressBalance,
  getTransactions,
  writeTransactions
} from "./blockchain-helpers.js";

import EC from "elliptic";
const ec = new EC.ec("p192");

const fromPrivateKey = process.argv[2];
const toAddress = process.argv[3];
const amount = parseFloat(process.argv[4]);

if (amount === 0) {
  console.error("Invalid amount");
  process.exit(1);
}

const fromKeyPair = ec.keyFromPrivate(fromPrivateKey);

const fromAddress = fromKeyPair.getPublic("hex");

const balance = getAddressBalance(fromAddress);
if (balance < amount) {
  console.error("Insufficient balance");
  process.exit(1);
}

const signature = fromKeyPair
  .sign(fromAddress + toAddress + amount)
  .toDER("hex");

const transactions = getTransactions();
const newTransaction = {
  fromAddress,
  toAddress,
  amount,
  signature
};

transactions.push(newTransaction);
writeTransactions(transactions);
