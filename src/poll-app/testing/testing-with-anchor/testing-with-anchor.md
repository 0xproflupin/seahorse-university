# Testing With Anchor

## Making a Test Suite

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

Next up, we'll write some unit tests in our test suite.
