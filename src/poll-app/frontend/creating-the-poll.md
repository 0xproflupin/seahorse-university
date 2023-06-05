# Creating the Poll
In this part, we define the `createPoll` function that allows a user to create a new poll using the Anchor program.

```js
const createPoll = async () => {
  if (!wallet) {
    return alert("Connect your wallet first.");
  }
  
  const newPoll = anchor.web3.Keypair.generate();

  await program.methods
  .create()
  .accounts({
    poll: newPoll.publicKey,
    user: wallet.publicKey,
  })
  .signers([newPoll])
  .rpc();
  const pollAccount = await program.account.poll.fetch(newPoll.publicKey);
  setVotes({
    ethereum: parseInt(pollAccount.ethereum.toString()),
    solana: parseInt(pollAccount.solana.toString()),
    polygon: parseInt(pollAccount.polygon.toString()),
  });
  setPoll(newPoll);
};
```

The function first checks if the wallet is connected. It then generates a new key pair for the poll and calls the `create` method from the program. It sets the necessary accounts and signers and sends an RPC request to the program.

After successfully creating the poll, the function fetches the newly created poll account, extracts the votes, and updates the `votes` and `poll` state variables.