import {
  getBlockchain,
  getContributions,
  getTransactions,
  writeBlockchain,
  writeContributions,
  writeTransactions
} from "./blockchain-helpers.js";

import sha256 from "crypto-js/sha256.js";

const blockchain = getBlockchain();
const previousHash = blockchain[blockchain.length - 1].hash;
const transactions = getTransactions();
let contributions = getContributions();

const minedContributions = contributions.filter(
  (contribution) => contribution.threshold === -1
);
contributions = contributions.filter(
  (contribution) => contribution.threshold !== -1
);

let hash = sha256(
  previousHash +
    JSON.stringify(transactions) +
    JSON.stringify(minedContributions)
).toString();

const newBlock = {
  hash,
  previousHash,
  transactions,
  contributions: minedContributions
};

if (transactions.length || contributions.length) blockchain.push(newBlock);

writeBlockchain(blockchain);
writeTransactions([]);
writeContributions(contributions);
