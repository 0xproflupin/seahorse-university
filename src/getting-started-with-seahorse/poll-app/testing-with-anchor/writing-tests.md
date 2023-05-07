# Writing Unit Tests

The test will be written in Typescipt (a superset of Javascript). Don't worry if you've not interacted with the langauge before. We will go through each step of writing tests in great detail.

We'll start by removing all the code from the `tests/seahorse.test.ts` file, and replacing it with:
```ts

describe("Test Poll Program", async () => {
    // All tests will go in here

    //
}

```

This adds a `describe` function and supply a string value describing the test suite. Additionally, it’s a good idea to add individual describe methods for each test or set of test cases within the group. While it’s not mandatory, grouping related logic is quite useful and makes tests easier to maintain.

## Generate Account Keypair

Inside this function, add:
```ts

    // Generate the poll account
    const newPoll = web3.Keypair.generate();

```
This uses `solana-web3.js` library to generate a new keypair. We will use to initialise our Poll state account which we talked about in the [adding accounts section](../poll-program/add-accounts.md).

## Add Unit Test for Poll Creation

We will now add our first unit test for testing the `create_poll` instruction. Add this within the `describe` function:
```ts

    it("test createPoll instruction", async () => {
        // Send transaction
        const txHash = await pg.program.methods
            // instuction name
            .createPoll()
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
    .createPoll()
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
- The `create_poll` instruction is accessed in camelCase: `.createPoll()`.
- We then specify all accounts that the `create_poll` instruction uses using `.accounts()`. This includes `poll`: which is the public key of our newly generated poll account keypair, and `user`: which is the wallet being used to sign the transaction (and in our case it is the SolPG burner wallet access by `pg.wallet`).
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

## Add Unit Test for Voting
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
- `.vote()` is used with a `{sol: true}` object as a parameter. The `sol` here comes from the `VoteOperation` enum we defined in our program (Anchor turns the)