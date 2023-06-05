# Voting Functionality

We will now define the `vote` function that allows users to vote for their favorite Dapp.

```js
const vote = async (candidate) => {
  if (!wallet) {
    return alert("Connect your wallet first.");
  } else if (!poll) {
    return alert("Create a new poll first.");
  }
  let vote = {};
  if (candidate === 0) {
    vote = { eth: true };
  } else if (candidate === 1) {
    vote = { sol: true };
  } else if (candidate === 2) {
    vote = { pol: true };
  }
  await program.methods
    .vote(vote)
    .accounts({
      poll: poll.publicKey,
      user: wallet.publicKey,
    })
    .rpc();
  
    const pollAccount = await program.account.poll.fetch(poll.publicKey);
    setVotes({
      ethereum: parseInt(pollAccount.ethereum.toString()),
      solana: parseInt(pollAccount.solana.toString()),
      polygon: parseInt(pollAccount.polygon.toString()),
    });
};
```

The function checks if the wallet is connected and if there is an existing poll. It then sets the vote based on the candidate and calls the `vote` method from the program, passing the necessary accounts. After the vote is processed, it fetches the updated poll account and updates the `votes` state variable.
