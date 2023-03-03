import {
  writeBlockchain,
  writeTransactions,
  writeWallets,
  writeContributions
} from "./blockchain-helpers.js";

const genesisBlock = {
  hash: "0",
  previousHash: null
};

writeBlockchain([genesisBlock]);
writeTransactions([]);
writeWallets({});
writeContributions([]);
