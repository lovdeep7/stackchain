import {
  getContributions,
  getTransactions,
  writeContributions,
  writeTransactions
} from "./blockchain-helpers.js";

import EC from "elliptic";
const ec = new EC.ec("p192");

const reviewerPrivateKey = process.argv[2];
const contributionUuid = process.argv[3];
const review = parseInt(process.argv[4]) === 1;

const reviewerKeyPair = ec.keyFromPrivate(reviewerPrivateKey);

const reviewerAddress = reviewerKeyPair.getPublic("hex");

const contributions = getContributions();

const index = contributions.findIndex(
  (contribution) => contribution.uuid === contributionUuid
);
if (index === -1 || contributions[index].threshold === -1) {
  console.error("Contribution is not active");
  process.exit(1);
}

if (contributions[index].contributorAddress === reviewerAddress) {
  console.error("You cannot review your contribution");
  process.exit(1);
}

const previousReview = contributions[index].reviews.find(
  (review) => review.reviewerAddress === reviewerAddress
);
if (previousReview) {
  console.error("You already reviewed this contribution");
  process.exit(1);
}

const signature = reviewerKeyPair
  .sign(reviewerAddress + contributionUuid)
  .toDER("hex");

const newReview = {
  reviewerAddress,
  review,
  signature
};

contributions[index].reviews.push(newReview);
if (contributions[index].reviews.length === contributions[index].threshold) {
  /* issue the corresponding transactions */
  const accepting = contributions[index].reviews.filter(
    (review) => review.review
  ).length;
  const transactions = getTransactions();
  if ((1.0 * accepting) / contributions[index].threshold > 0.5) {
    // contribution accepted
    transactions.push({
      fromAddress: null,
      toAddress: contributions[index].contributorAddress,
      amount: 1,
      contributionUuid: contributions[index].uuid
    });
    contributions[index].reviews.forEach(({ reviewerAddress, review }) => {
      if (review)
        transactions.push({
          fromAddress: null,
          toAddress: reviewerAddress,
          amount: (1.0 * 10) / accepting,
          contributionUuid: contributions[index].uuid
        });
    });
    contributions[index].threshold = -1;
  } else {
    // contribution rejected
    contributions[index].reviews.forEach(({ reviewerAddress, review }) => {
      if (!review)
        transactions.push({
          fromAddress: null,
          toAddress: reviewerAddress,
          amount:
            (1.0 * 10) / (contributions[index].reviews.length - accepting),
          contributionUuid: contributions[index].uuid
        });
    });
    contributions.splice(index, 1);
  }
  writeTransactions(transactions);
}
writeContributions(contributions);
