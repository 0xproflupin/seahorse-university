# Frontend

In this section, we will go through building a frontend for the Solana Poll Dapp using React.

## Import Libraries and Set Up Constants
First, we will import the necessary libraries and components for our application.

```js
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  useWallet,
  useAnchorWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import * as anchor from "@coral-xyz/anchor";
import { useMemo, useState } from "react";
import "./App.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
  clusterApiUrl,
  PublicKey,
} from '@solana/web3.js';
import React, { useEffect } from 'react';
import idl from "./idl.json";
```

Next, we will set up some constants related to the poll program and the Solana network. The `programID` is the public key of our program. The network is the URL of Solana devnet that includes an API key for access. The opts object contains the `preflightCommitment` option, which will determine how transactions are confirmed.

```js
const programID = new PublicKey("5MgjVvaSLj6zmxuYhSST1M4LBiXoiSMrJPDZTRPQoiw8");
const network =
  "https://rpc-devnet.helius.xyz/?api-key=7f4fa7e5-09f2-4f01-a440-8938c172c52f";
const opts = {
  preflightCommitment: "processed",
};
```

## Creating Provider and Program Functions
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

## Context Component
The `Context` component sets up the necessary context for the wallet and connection. This component wraps the `ConnectionProvider`, `WalletProvider`, and `WalletModalProvider` components to set up the wallet and connection.

```js
const Context = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
```

The `network` constant is set to `WalletAdapterNetwork.Devnet`. The `endpoint` constant uses the `useMemo` hook to create the Solana connection endpoint based on the `network`. We also create an empty array `wallets` using `useMemo` to initialize an empty wallets array.

## Content Component
The `Content` component contains the main logic of the dapp. We first set up several `useState` hooks for handling the poll, votes, and wallet states.

```js
const Content = () => {
  const { publicKey } = useWallet();
  const [poll, setPoll] = useState(null);
  const [votes, setVotes] = useState({
    solana: 0,
    ethereum: 0,
    polygon: 0,
  });
  const wallet = useAnchorWallet();
  const program = getProgram(wallet);
}
```

We use the `useWallet` hook to get the public key of the connected wallet. The `useAnchorWallet` hook retrieves the wallet object required for the Anchor provider and program instances. We call the `getProgram` function to create the program instance with the wallet.

Next, we use two `useEffect` hooks to fetch the poll and votes information. The first `useEffect` fetches the poll information and stores it in the `poll` state variable. The second `useEffect` fetches the votes for each Dapp and stores them in the `votes` state variable. These hooks will run whenever the `wallet` or `poll` states change.

```js
useEffect(() => {
  const fetchPoll = async () => {
    const fetchedAccounts = await program.account.poll.all();
    setPoll(fetchedAccounts[0]);
  }
  fetchPoll();
}, []);

useEffect(() => {
  const fetchVotes = async () => {
    if (!wallet) return;
    try {        
      setVotes({
        ethereum: parseInt(poll.account.ethereum.toString()),
        solana: parseInt(poll.account.solana.toString()),
        polygon: parseInt(poll.account.polygon.toString()),
      });
      console.log("Poll fetched.");
      console.log(``);
    } catch (e) {
      setVotes({
        ethereum: 0,
        solana: 0,
        polygon: 0,
      });
      console.log("Poll is not initialised!");
    }
  }
  fetchVotes();
}, [wallet, poll]);
```

## Creating the Poll
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

## Voting Functionality
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

## Rendering the UI
The final part of the `Content` component renders the UI elements.

```js
return (
  <div className="App">
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 30,
      }}
    >
      <WalletMultiButton />
    </div>
    {publicKey ? (
      <>
        <h1>Seahorse Poll App</h1>
        <h3>Vote for your favorite blockchain</h3>
        <h2>Ethereum: {votes.ethereum} | Solana: {votes.solana} | Polygon: {votes.polygon}</h2>
        <button onClick={() => vote(0)}>
          Vote Ethereum
        </button>
        <button onClick={() => vote(1)}>
          Vote Solana
        </button>
        <button onClick={() => vote(2)}>
          Vote Polygon
        </button>
        <h3>Wallet Address</h3>
        <p>
          {publicKey.toString()}
        </p>
        <h3>Poll Address</h3>
        <p>
          {poll ? poll.publicKey.toString() : ''}
        </p>
      </>
    ) : (
      <p>Please connect your wallet</p>
    )}
  </div>
);
```

The UI consists of a wallet connection button, the poll information, vote buttons, and wallet and poll addresses. The vote buttons are connected to the `vote` function, which allows users to vote for their favorite Dapp.

## App Component and Export
Finally, we have the `App` component, which wraps the `Context` and `Content` components.

```js
const App = () => {
  return (
    <Context>
      <Content />
    </Context>
  );
};
export default App;
```

That's it! We now have a complete frontend for our Solana poll Dapp!