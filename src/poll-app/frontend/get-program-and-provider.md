# Creating Provider and Program Functions

In this section, we will create two functions to handle the connection to the program: `getProvider` and `getProgram`. Both functions accept a wallet object as input.

```js
export const getProvider = (wallet) => {
  const connection = new anchor.web3.Connection(
    network,
    opts.preflightCommitment
  );

  const provider = new anchor.AnchorProvider(
    connection,
    wallet,
    opts.preflightCommitment
  );
  return provider;
};

export const getProgram = (wallet) => {
  const provider = getProvider(wallet);
  const program = new anchor.Program(
    idl,
    programID,
    provider
  );

  return program;
};
```

The `getProvider` function creates a new `anchor.web3.Connection` with the network `URL` and `preflightCommitment` option. It then creates an `anchor.AnchorProvider` using the `connection`, `wallet`, and `preflightCommitment` option, and returns it.

The `getProgram` function first calls `getProvider` to get an Anchor provider. It then creates a new `anchor.Program` instance with the IDL (Interface Description Language) JSON file, the program ID, and the provider. This `anchor.Program` instance will be used to interact with the deployed program.