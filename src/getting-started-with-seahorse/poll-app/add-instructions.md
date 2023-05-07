# Add Instructions
> As mentioned in the [instructions and transactions section](../introduction-to-solana-core/instructions-and-transactions.md), **Instructions** are the basic operational units on Solana. Instructions are commands that can be bundled up together to form **Transactions**. These transactions can then be executed by a **Program** to read and/or write data from one or more **Accounts**. The instructions that form the transaction are executed atomically, or one-by-one in the order in which they were added to form the transaction.

To make instances of polls, and write/modify the data stored in these polls, we will need to write instructions for our program.

## Initialising Poll

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


## Voting
As of now, we have added an instruction to our program to initialise a `poll` account. Now its time to add an instruction to let users vote for their favorite blockchain.

Let's add the following code to the `poll.py` file:

```py

class VoteOperation(Enum):
  ETH = 0
  SOL = 1
  POL = 2

@instruction
def vote(user: Signer, poll: Poll, vote_op: VoteOperation):
  if vote_op == VoteOperation.ETH:
    poll.ethereum += 1
  elif vote_op == VoteOperation.SOL:
    poll.solana += 1
  elif vote_op == VoteOperation.POL:
    poll.polygon += 1

```

We have declared a new class `VoteOperation` with the `ENUM` base class. Enums provide an easy way to parse data when there are multiple options of the same type. The numbers 0, 1, 2 have no significance, and are present just to seperate out the 3 types of candidates. We can now use this enum in our `vote` instruction.

We add the following as instruction parameters:
1. `user` account of type `Signer`
2. `poll` account of type `Poll`
3. `vote_op` enum of type `VoteOperation`

> For the already-trained in Anchor, the above might look strange as we are essentially adding accounts and other data as instruction parameters together. This is way simpler than Anchor where data and accounts have to be handled differently.

The rest of the instruction is pretty straight-forward as we are simply incrementing the dedicated chain fields in the `poll` account depending on the type of `vote_op` provided.

As `poll` is essentially a Python object, the individual fields: `ethereum`, `solana` and `polygon` can be fetched simply by `.` notation: `poll.solana`.

Voila, we are done with our first Solana Program thanks to Seahorse!

