# Our First Solana App

In this section we'll build our first Solana program using Seahorse. If you've gone through the optional chapter [**Introduction to Solana Core**](../introduction-to-solana-core/introduction-to-solana-core.md), you probably already know the very basics of the Solana account model. But if not, that is completely fine as we'll go through those concepts as we build our program.

Here are some of the concepts we'll touch upon:
1. Accounts
2. Instructions
3. Programs
4. Transactions
5. Testing using Anchor

A point to note for this page: we'll go though the entire process of making a full stack Solana app in great detail. You might already be aware of how to build react frontends but we'll go through the process nevertheless to make sure new Solana programmers are cognizant of how the chain interacts with the frontend and how can one bootstrap a Solana dapp easily. 

Before we dive into writing the program, lets understand what we are trying to build.

# The Blockchain Poll App
The idea is to make a poll which lets users choose their favorite Blockchain (we know Solana is the best but whatever). The app should show the current status of the poll, ie, the votes given to each chain and also let the users vote.

###### Image to show the basic functionality