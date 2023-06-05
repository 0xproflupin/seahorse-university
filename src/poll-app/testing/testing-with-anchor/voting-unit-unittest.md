## # Unit Test for Voting

We will now add the unit testing for the vote intruction. Add the following code to the test suite:

```ts

it("vote", async () => {
    // Send transaction
    const txSolHash = await pg.program.methods
      .vote({ sol: true })
      .accounts({
        poll: newPoll.publicKey,
        user: pg.wallet.publicKey,
      })
      .rpc();

    // Confirm transaction
    await pg.connection.confirmTransaction(txSolHash);

    // Send transaction
    const txEthHash = await pg.program.methods
      .vote({ eth: true })
      .accounts({
        poll: newPoll.publicKey,
        user: pg.wallet.publicKey,
      })
      .rpc();

    // Confirm transaction
    await pg.connection.confirmTransaction(txEthHash);

    // Fetch the poll account
    const pollAccount = await pg.program.account.poll.fetch(newPoll.publicKey);

    console.log("ethereum:", pollAccount.ethereum.toString());
    assert(pollAccount.ethereum.toString(), "1");

    console.log("solana:", pollAccount.solana.toString());
    assert(pollAccount.solana.toString(), "1");

    console.log("polygon:", pollAccount.polygon.toString());
    assert(pollAccount.polygon.toString(), "0");
});

```

Let's got through this step by step.

```ts
const txSolHash = await pg.program.methods
    .vote({ sol: true })
    .accounts({
        poll: newPoll.publicKey,
        user: pg.wallet.publicKey,
    })
    .rpc();
```

- Here we are using `.methods` to access the instructions like before
- `.vote()` is used with a `{sol: true}` object as a parameter. `sol` comes from the `VoteOperation` enum we defined in our program.
- We don't mention `signers` like in the case of creating a poll because the `newPoll` keypair was needed to initialise the account.

This comprises of a vote for Solana. We do the same below that for Ethereum. After voting:
```ts
// Confirm transaction
await pg.connection.confirmTransaction(txEthHash);

// Fetch the poll account
const pollAccount = await pg.program.account.poll.fetch(newPoll.publicKey);

console.log("ethereum:", pollAccount.ethereum.toString());
assert(pollAccount.ethereum.toString(), "1");

console.log("solana:", pollAccount.solana.toString());
assert(pollAccount.solana.toString(), "1");

console.log("polygon:", pollAccount.polygon.toString());
assert(pollAccount.polygon.toString(), "0");
```

- We first confirm the transaction which was signed and sent using `.rpc()` earlier.
- We fetch the `poll` account using the `newPoll` pubkey
- Once the `poll` account is fetched, we can access its data: `.solana`, `.ethereum` and `.polygon`. We however need to convert it to a string as its in the `BN` data type.
- As we have voted once each for Solana and Ethereum, we do the assertions accordingly.

Our final unittest file looks like this:

```ts

// No imports needed: web3, anchor, pg and more are globally available

describe("Test Poll Program", async () => {
  // Generate the poll account
  const newPoll = web3.Keypair.generate();

  it("createPoll", async () => {
    // Send transaction
    const txHash = await pg.program.methods
      .create()
      .accounts({
        poll: newPoll.publicKey,
        user: pg.wallet.publicKey,
      })
      .signers([newPoll])
      .rpc();
    console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

    // Confirm transaction
    await pg.connection.confirmTransaction(txHash);

    // Fetch the created account
    const pollAccount = await pg.program.account.poll.fetch(newPoll.publicKey);

    assert(pollAccount.solana.toString(), "0");
    assert(pollAccount.ethereum.toString(), "0");
    assert(pollAccount.polygon.toString(), "0");
  });

  it("vote", async () => {
    // Send transaction
    const txSolHash = await pg.program.methods
      .vote("sol")
      .accounts({
        poll: newPoll.publicKey,
        user: pg.wallet.publicKey,
      })
      .rpc();

    // Confirm transaction
    await pg.connection.confirmTransaction(txSolHash);

    // Send transaction
    const txEthHash = await pg.program.methods
      .vote("eth")
      .accounts({
        poll: newPoll.publicKey,
        user: pg.wallet.publicKey,
      })
      .rpc();

    // Confirm transaction
    await pg.connection.confirmTransaction(txEthHash);

    // Fetch the poll account
    const pollAccount = await pg.program.account.poll.fetch(newPoll.publicKey);

    console.log("ethereum:", pollAccount.ethereum.toString());
    assert(pollAccount.ethereum.toString(), "1");

    console.log("solana:", pollAccount.solana.toString());
    assert(pollAccount.solana.toString(), "1");

    console.log("polygon:", pollAccount.polygon.toString());
    assert(pollAccount.polygon.toString(), "0");
  });
});

```

Let's go ahead and figure out how to run these tests!