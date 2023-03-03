import { getWallets, writeWallets } from "./blockchain-helpers.js";

import EC from "elliptic";
const ec = new EC.ec("p192");

const newWalletName = process.argv[2];

const wallets = getWallets();

if (wallets[newWalletName]) {
  console.error("A wallet with that name already exists");
  process.exit(1);
}

const keyPair = ec.genKeyPair();
const publicKey = keyPair.getPublic("hex");
const privateKey = keyPair.getPrivate("hex");

wallets[newWalletName] = {
  publicKey,
  privateKey
};

writeWallets(wallets);
