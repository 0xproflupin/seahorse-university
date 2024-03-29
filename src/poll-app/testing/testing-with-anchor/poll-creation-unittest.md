# Unit Test for Poll Creation

We will now add our first unit test for testing the `create` instruction. Add this within the `describe` function:
```ts

    it("test createPoll instruction", async () => {
        // Send transaction
        const txHash = await pg.program.methods
            // instuction name
            .create()
            // add all accounts used by the instruction
            .accounts({
                poll: newPoll.publicKey,
                user: pg.wallet.publicKey,
            })
            // add all signer ketpairs
            .signers([newPoll])
            // call .rpc() to sign and send the transaction
            .rpc();
        console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

        // Confirm transaction
        await pg.connection.confirmTransaction(txHash);

        // Fetch the initialised poll account
        const pollAccount = await pg.program.account.poll.fetch(newPoll.publicKey);

        assert(pollAccount.solana.toString(), "0");
        assert(pollAccount.ethereum.toString(), "0");
        assert(pollAccount.polygon.toString(), "0");
    });

```

The first part of this unittest is to interact with our program:
```ts

const txHash = await pg.program.methods
    // instuction name
    .create()
    // add all accounts used by the instruction
    .accounts({
        poll: newPoll.publicKey,
        user: pg.wallet.publicKey,
    })
    // add all signer ketpairs
    .signers([newPoll])
    // call .rpc() to sign and send the transaction
    .rpc();

```
- Here we are using the preloaded program (thanks to SolPG) and using the `.methods` to access all instructions we had defined in the program earlier.
- The `create` instruction is accessed in camelCase: `.create()`.
- We then specify all accounts that the `create` instruction uses using `.accounts()`. This includes `poll`: which is the public key of our newly generated poll account keypair, and `user`: which is the wallet being used to sign the transaction (and in our case it is the SolPG burner wallet access by `pg.wallet`).
- We will now include all signers of the instruction using `signers()`. Anchor tests by default already includes the user's wallet as a signer so we don't explicitly have to mention it. We will however include the `newPoll` keypair we generated earlier to instantiate the poll account.
- Finally we call the `.rpc()` method to sign and send the transaction. If we were using an extension wallet like [Phantom](https://phantom.app/), we would have seen a popup to sign the transaction.

The next part of the unittest is to fetch the instantiated account and do some assertions:
```ts

// Confirm transaction
await pg.connection.confirmTransaction(txHash);

// Fetch the initialised poll account
const pollAccount = await pg.program.account.poll.fetch(newPoll.publicKey);

assert(pollAccount.solana.toString(), "0");
assert(pollAccount.ethereum.toString(), "0");
assert(pollAccount.polygon.toString(), "0");

```

- We are first using `connection.confirmTransaction` to ensure that the transaction has been confirmed.
- The next step is to fetch the instantiated poll account. Here you might notice that we are able to do something like `program.account.poll`. This is because of the IDL that got generated while deploying are program. It allows anchor to access the structure of the program and its accounts & instructions. We then use `.fetch()` to fetch the account by mentioning the actual public key of the account which is `newPoll.publicKey`.
- Once the poll account is fetched using Anchor, we can access its different data fields that the account owns: `solana`, `ethereum` and `polygon` which represent the number of votes the 3 chains have got respectively. We will however need to convert it into a string as Anchor by default converts integers to BigNum or [BN](https://github.com/indutny/bn.js/).
- We finally do the assertions to check if the values are currently 0.

Our unittest file currently looks like this:

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
}

```
