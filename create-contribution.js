import { getContributions, writeContributions } from "./blockchain-helpers.js";
import { v4 as uuidv4 } from "uuid";

import EC from "elliptic";
const ec = new EC.ec("p192");

const contributorPrivateKey = process.argv[2];
const threshold = parseInt(process.argv[3]);
const platform = process.argv[4];
const contributionHash = process.argv[5];

const contributorKeyPair = ec.keyFromPrivate(contributorPrivateKey);

const contributorAddress = contributorKeyPair.getPublic("hex");

const signature = contributorKeyPair
  .sign(contributorAddress + platform + contributionHash)
  .toDER("hex");

const contributions = getContributions();
const newContribution = {
  uuid: uuidv4(),
  contributorAddress,
  platform,
  contributionHash,
  signature,
  reviews: [],
  threshold
};

contributions.push(newContribution);
writeContributions(contributions);
