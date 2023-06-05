# Rendering the UI
The final part of the `Content` component renders the UI elements.

```html
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

```html
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
The final `App.js` code can be found [here](https://github.com/0xproflupin/seahorse-university/blob/main/programs/poll/app/src/App.js)
