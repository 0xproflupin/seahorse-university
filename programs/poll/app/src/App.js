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

const programID = new PublicKey("5MgjVvaSLj6zmxuYhSST1M4LBiXoiSMrJPDZTRPQoiw8");
const network =
  `https://rpc-devnet.hellomoon.io/${process.env.REACT_APP_HELLOMOON_API}`;
const opts = {
  preflightCommitment: "processed",
};
  
export const getProvider = (wallet) => {
  /* create the provider and return it to the caller */
  /* network set to local network for now */

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
  console.log(`Poll program: ${program.programId}`);
  console.log(`Connected wallet: ${wallet?.publicKey}`);
  console.log(`Poll account: ${poll?.publicKey}`);
  console.log(`Current poll status: Ethereum=${votes.ethereum} | Solana=${votes.solana} | Polygon=${votes.polygon}`);
  console.log(``);

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

  const vote = async (candidate) => {
    if (!wallet) {
      return alert("Connect your wallet first.");
    } else if (!poll) {
      return alert("Create a new poll first.");
    }
    let vote = {};
    if (candidate === 0) {
      vote = "eth";
    } else if (candidate === 1) {
      vote = "sol";
    } else if (candidate === 2) {
      vote = "pol";
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
          <button onClick={() => createPoll()}>
            Create New Poll
          </button>
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
};

const App = () => {
  return (
    <Context>
      <Content />
    </Context>
  );
};
export default App;
