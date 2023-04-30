# Token Program

Solana's Token program is responsible for defining the common implementation for all tokens on Solana.

The `spl-token-cli` is a part of the Token program and allows the generation of tokens using command line:

```plaintext
spl-token create-token
```

You can follow the [following](https://spl.solana.com/token#reference-guide) reference guide to play around with the CLI but we won't go too deep into the specifics in this tutorial.

To fully understand how tokens work on Solana, its important to understand the account model of the Token program.

![token program](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7yttg7xmt5275t0ptlmt.png align="left")

In the image above we can see 3 accounts: `Wallet Account`, `Token Account` and the `Mint Account`. The `Wallet Account` is owned by the native `System Program` and represents a user's wallet. The `Token Account` and the `Mint Account` are owned by the `Token Program`.

1. The `Mint Account` is responsible for storing global information regarding the Token, like current supply, `Authority` (the account address which has the authority to make changes to the given Account), token name, decimals, number of holders etc.
    
2. The `Token Account` is responsible for storing the relationship between the `Wallet Account` and the `Mint Account`. This account stores data like the number of tokens held by the wallet etc.

> ## Associated Token Account Program

> While discussing Token Accounts, its important to mention about the [**Associated Token Accounts**](https://spl.solana.com/associated-token-account). Why are these needed?

> There can be more than 1 token accounts for a given token in a wallet. When a user sends a token from wallet A to wallet B, the user does not know which token account to specify as the destination token account. To solve this problem, associated token accounts are used to deterministically derive a token account address from a user's **System Account** (wallet) and the mint address.

While the `Mint Account` stores some global information regarding tokens, it is not capable of storing enough data to be able to be standardised and used globally by dapps and wallets. Here's where Metaplex's Token Metadata Program comes in.
