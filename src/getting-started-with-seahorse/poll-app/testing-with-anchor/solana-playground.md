# Solana Playground
Solana Playground is browser based application that will let you write, build, and deploy on chain Solana programs, all from your browser. This is very useful if we don't want to deal with a million dependancies and quickly want to bootsrap our Seahorse programs. It even has an inbuilt burner wallet so you won't have to worry about connecting external wallets or approving transactions.

## Getting Started with SolPG

- Go to [Solana Playground](https://beta.solpg.io/) and make a new Seahorse Project, and name it **Poll**. This will create a Seahorse project for you and you won't have to worry about any dependancies.
- In `poll.py`, replace the code with our Poll program.
- In the terminal at the bottom of the screen, **airdrop** 4-5 SOL to the burner wallet on devnet:
```
solana airdrop 2
```
> Don't airdrop more than 2 SOL at once due to RPC limits on devnet airdrops

- **Build** the program to make Rust artifacts of your Seahorse program. This is similar to doing `seahorse build` locally.
- **Deploy** the program: this will publish your program on-chain and provide you with an IDL json file which we will use later on for building the frontend. Deployment usually costs around 3-4 SOL depending on how computationally heavy your program is.

> ### Interface Definition Language (IDL)
> In Solana programming, an Interface Definition Language (IDL) specifies a program's public interface. It defines a Solana program's account structures, instructions, and error codes. IDLs are `.json` files used to generate client-side code, allowing users to easily interact with a Solana program

Once you deploy your program successfully, you will notice that the program ID in `declare_id` will change to the actual deployed program ID.
You will also see something like this on the SolPG terminal:
```
Deploying... This could take a while depending on the program size and network conditions.
Deployment successful. Completed in 33s.
```

You will also get a Solana Explorer notification to check the deployement transaction which will be similar to the following:
<https://explorer.solana.com/tx/2FAiWj1iBDm1BncVd6JzwkGKc9fcvw9DdQAkgHSqMUquigF62YPN5jgsXeX6KZGPcemRRMT23c9Fv6zTJD5a4HFQ?cluster=devnet>

Congrats! Your first Solana Program is on-chain.