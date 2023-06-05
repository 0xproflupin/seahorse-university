# Context and Content Components

## Context Component
The `Context` component sets up the necessary context for the wallet and connection. This component wraps the `ConnectionProvider`, `WalletProvider`, and `WalletModalProvider` components to set up the wallet and connection.

```html
const Context = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
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
