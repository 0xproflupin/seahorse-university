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
  SystemProgram,
} from '@solana/web3.js';
import React, { useEffect } from 'react';
import idl from "./idl.json";

// const programID = new PublicKey("DTWbi1MaDqinPBJF4JZ7mVHgFfoSeD51VruTG7ud41Ec");
const programID = new PublicKey("C8ZXZXQuCKidMC1bjQduPjvSmkZqTBXukZbVxmGc9JAR");
const network =
  "https://rpc-devnet.helius.xyz/?api-key=7f4fa7e5-09f2-4f01-a440-8938c172c52f";
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
  const [counter, setCounter] = useState({
    account: null,
    accountBump: null,
  });
  const [count, setCount] = useState(0);
  const wallet = useAnchorWallet();
  const program = getProgram(wallet);
  console.log(`Counter program: ${program.programId}`);
  console.log(`Connected wallet: ${wallet?.publicKey}`);
  console.log(`Counter account: ${counter.account}`);
  console.log(`Counter account bump: ${counter.accountBump}`);
  console.log(`Current count: ${count}`);
  console.log(``);

  useEffect(() => {
    const fetchCounter = async () => {
      if (!wallet) return;
      const [account, accountBump] = PublicKey.findProgramAddressSync(
        [Buffer.from("counter"), wallet.publicKey.toBuffer()],
        programID
      );
      setCounter({ account, accountBump });
    }
    fetchCounter();
  }, [wallet, publicKey]);

  useEffect(() => {
    const fetchCount = async () => {
      if (!wallet) return;
      try {
        const counterAccount = await program.account.counter.fetch(counter.account);
        setCount(counterAccount.count?.toNumber());
        console.log("Counter initialised / updated.");
        console.log(``);
      } catch (e) {
        setCount(0);
        console.log("Counter is not initialised!");
        console.log(``);
      }
    }
    fetchCount();
  }, [counter, program.account.counter, wallet, publicKey]);
  

  const createOrResetCounter = async () => {
    if (!wallet) {
      return alert("Connect your wallet first.");
    }
    const method = count === 0
      ? program.methods
        .create(new anchor.BN(counter.accountBump))
        .accounts({
          user: wallet.publicKey,
          counter: counter.account,
          systemProgram: SystemProgram.programId,
        })
      : program.methods
        .reset()
        .accounts({
          counter: counter.account,
          user: wallet.publicKey,
        });
    await method.rpc();
    const counterAccount = await program.account.counter.fetch(counter.account);
    setCount(counterAccount.count?.toNumber());
  };

  const changeCounter = async (func) => {
    if (!wallet) {
      return alert("Connect your wallet first.");
    }
    try {
      await program.account.counter.fetch(counter.account);
    } catch (e) {
      return alert("Create a new counter first.");
    }
    const method = func === "increment" ? program.methods.increment() : program.methods.decrement();
    await method
      .accounts({
        counter: counter.account,
        user: wallet.publicKey,
      })
      .rpc();
    
    const counterAccount = await program.account.counter.fetch(counter.account);
    setCount(counterAccount.count?.toNumber());
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
          <h1>Seahorse Counter App</h1>
          <h3>Counter</h3>
          <h1>{count}</h1>
          <button onClick={createOrResetCounter}>
            New/Reset Counter
          </button>
          <button onClick={() => changeCounter("increment")}>
            Increment Counter
          </button>
          <button onClick={() => changeCounter("decrement")}>
            Decrement Counter
          </button>
          <h3>Wallet Address</h3>
          <p>
            {publicKey.toString()}
          </p>
          <h3>Counter Address</h3>
          <p>
            {counter.account ? counter.account.toString() : ''}
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
