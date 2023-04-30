# Poll Program

On this page we'll build our first Solana program using Seahorse. If you've gone through the optional chapter [**Introduction to Solana Core**](../introduction-to-solana-core/introduction-to-solana-core.md), you probably already know the very basics of the Solana account model. But if not, that is completely fine as we'll go through those concepts as we build our program.

Here are some of the concepts we'll touch upon:
1. Accounts
2. Instructions
3. Programs
4. Transactions
5. Testing using Anchor

A point to note for this page: we'll go though the entire process of making a full stack Solana app in great detail. You might already be aware of how to build react frontends but we'll go through the process nevertheless to make sure new Solana programmers are cognizant of how the chain interacts with the frontend and how can one bootstrap a Solana dapp easily. 

Let's get started!

## The Blockchain Poll App
The idea is to make a poll which lets users choose their favorite Blockchain (we know Solana is the best but whatever). The app should show the current status of the poll, ie, the votes given to each chain and also let the users vote.

###### Image to show the basic functionality

## Initializing the project

We will initialise the project using the seahorse CLI:
```
seahorse init poll
```

This will create a directory `poll` which will contain a bunch of directories and files with the following structure:

```
poll
|\_ app
|\_ migrations
|\_ node_modules
|\_ programs
|\_ programs_py
    |\_ seahorse
    |\_ poll.py
    :
|\_ target
|\_ tests
```

- `app`: will contain our front-end code
- `programs_py`: will contain our Seahorse programs
- `programs`: will contain our generated intermediate Rust artifacts for our Seahorse program
- `target`: will contain the auto-generates TypeScript types for our program
- `tests`: will contain our Anchor tests

Now let's build our seahorse project:
```
cd poll
seahorse build
```

This should take some time for the first time, but now you'll notice some generated code in `programs/calculator/src/lib.rs` which is the Rust artificat of the code in `programs_py/poll.py`.

Let's focus on `poll.py` file in `programs_py` and edit it to build our program.

## Add Accounts
> As mentioned in the [accounts section](../introduction-to-solana-core/accounts.md), decentralised apps need to track the current state: number of tokens, NFTs transferred, current highest bidder in an auction, orders for a token on a dex etc. These states need to be saved in data storing units on-chain, called `accounts`.

As you'd have imagined already, we will have to store the state of the poll at a given time somewhere. To store this state, we will create and use an account.

Open `programs_py/poll.py` and you will see this:
```

from seahorse.prelude import *

declare_id('Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS')

```

We will discuss what `declare_id` does when we discuss `Programs`

In Seahorse, accounts are represented by classes derived from the `Account` base class. 
Let's add a `Poll` account to the `poll.py` file which will represent the poll state.

```py

class Poll(Account):
  ethereum: u64
  solana: u64
  polygon: u64

```

The individual fields of the class represent the data which will be stored in the account. In our case these fields are `ethereum`, `solana` and `polygon` that represent the number of votes given to these chains respectively. We use the unsigned `u64` data type to store votes as votes can never be negative.

Now that we know that accounts will be used to store the poll state on-chain, how can one interact with them to write or modify data?

Instructions!

## Add Instructions
> As mentioned earlier in the [instructions and transactions section](../introduction-to-solana-core/instructions-and-transactions.md), **Instructions** are the basic operational units on Solana. Instructions are commands that can be bundled up together to form **Transactions**. These transactions can then be executed by a **Program** to read and/or write data from one or more **Accounts**. The instructions that form the transaction are executed atomically, or one-by-one in the order in which they were added to form the transaction.

To make instances of polls, and write/modify the data stored in these polls, we will need to write instructions for our program.

### Initialising Poll

Instructions in Seahorse are written using functions with the `@instruction` decorator. Let's add a `create_poll` instruction to our program:

```py

# Initialises the poll account
@instruction
def create_poll(poll: Empty[Poll], user: Signer):
    poll = poll.init(
        payer=user
    )

```

From the first look, this may seem a little weird if you've never seen a statically typed language before like TypeScript.

```py
def create_poll(poll: Empty[Poll], user: Signer)
```

In Python, it is not necessary to declare the type of variables, but in Seahorse its necessary to do so to determine at compile time what account type does the variable belong to.

There are two new account types mentioned here: `Empty` and `Signer`. These are Seahorse native account types.

1. `Empty`: `Empty[Poll]` indicates that `poll` is an empty account of type `poll`. This means that `poll` has not yet been initialised and has no data stored.
2. `Signer`: In any blockchain, users need to sign the transactions to modify state of accounts (write/modify data). In our case as well, for a user to initialise a `poll` account, or vote for their favorite chain and hence change the state of the account, they will have to sign a transaction. `Signer` represents the type of account `user` which will sign the transaction which will contain given intruction (`create_poll`).

```py
poll = poll.init(
  payer=user
)
```
In the above codeblock, we are using `.init()` on the `Empty` `poll` account. We use the `payer` argument to choose the `user` account to pay for the instruction. Solana transactions involve a cost, and the `payer` account needs to be assigned for the individual instruction which will be debited some SOL when the transaction is processed.

We get back the initialised `poll` account from `.init()` which we will use later to modify poll state.


### Voting

