# Accounts

Solana's **Account model** is very unique and is partially responsible for why it's so fun to build apps on it.

On any blockchain, decentralised apps need to track the current state: number of tokens, NFTs transferred, current highest bidder in an auction, orders for a token on a dex etc. These states need to be saved in data storing units on-chain, called `accounts`.

On EVM, smart contracts are executable pieces of code or programs. They are accounts themselves and store their own data. The code inside the smart contract defines how the data within the account is going to be modified.

On Solana, **Accounts** and on-chain programs interact differently. On-chain executable programs are stored in **completely immutable** accounts, whereas data that the executable programs interact with is stored in **mutable** accounts.

All accounts on Solana are assigned a **Program** as the **owner** and only these owners are allowed to make changes to the data (or debit SOL) from a given account. Important to note here: anyone can credit funds permissionless-ly to an account.

A developer coming from the EVM space might find this state-less Account Model to be a little confusing and complex. But this model allows something which is not possible in other chains: **Transaction parallelisation**. We are going to talk more about this in the following section.

On Solscan's page for account `GFDmfhoPtZZATNxw8zyZPVYKkBZutf1zoZTbRbxDjh5E`, we can see that the account holds some SOL and has some tokens. We'll discuss what tokens are later. But for now lets check out the section for **Transactions**. If you click on any one of the `Signatures` of these transactions, we'll land on a new page which shows some Transaction details. Before we dive deep into this, let's understand what transactions are.