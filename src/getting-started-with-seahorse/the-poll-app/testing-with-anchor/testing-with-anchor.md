# Testing with Anchor

Although we've written the program, we have no clue if the logic works as expected.

We can test it using the Anchor framework. Don't worry, you won't require any Anchor expertise here, just some basic Javascript knowledge will do!

## Building our Program

Before we can start testing the program, we need to build it make Rust artifacts for our program which will be used in our Anchor tests.

Although we can to build the program locally using `seahorse build`, I will use this tutorial to introduce you to [Solana Playground](https://beta.solpg.io/)!


## Solana Playground
Solana Playground is browser based application that will let you write, build, and deploy on chain Solana programs, all from your browser. This is very useful if we don't want to deal with a million dependancies and quickly want to bootsrap our Seahorse programs. It even has an inbuilt burner wallet so you won't have to worry about connecting external wallets or approving transactions.

### Getting Started with SolPG

- Go to [Solana Playground](https://beta.solpg.io/) and make a new Seahorse Project, and name it **Poll**. This will create a Seahorse project for you and you won't have to worry about any dependancies.
- In `poll.py`, replace the code with our Poll program.
- In the terminal at the bottom of the screen, **airdrop** 4-5 SOL to the burner wallet on devnet:
```
solana airdrop 2
```
> Don't airdrop more than 2 SOL at once due to RPC limits on devnet airdrops

- **Build** the program to make Rust artifacts of your Seahorse program. This is similar to doing `seahorse build` locally.
- **Deploy** the program: this will publish your program on-chain and provide you with an IDL json file which we will use later on for building the frontend. Deployment usually costs around 3-4 SOL depending on how computationally heavy your program is.

> #### Interface Definition Language (IDL)
> In Solana programming, an Interface Definition Language (IDL) specifies a program's public interface. It defines a Solana program's account structures, instructions, and error codes. IDLs are `.json` files used to generate client-side code, allowing users to easily interact with a Solana program

### Writing Tests
