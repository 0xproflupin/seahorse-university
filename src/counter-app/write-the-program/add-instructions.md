# Add Instructions

## Adding the Create Counter Instruction

Add the following code below:

```py

@instruction
def create(counter: Empty[Counter], user: Signer):
    counter = counter.init(
        payer=user,
        seeds=["counter", user]
    )
    counter.user = user.key()

```

Let's take this step by step.

```py
create(counter: Empty[Counter], user: Signer)`
```

- `@instruction` is the decorator that tells Seahorse that the proceeding function is an Instruction defination
- `create` instuction has two parameters:
    - `counter`: of type `Empty[Counter]`, to initialise an account of type `Counter` by this instruction.
    - `user`: of type `Signer`

```py
counter = counter.init(
    payer=user,
    seeds=["counter", user]
)
```

- Invoking the `.init()` function on an Empty account initiates it. It requires two parameters:
    - `payer`: the account responsible for covering the rental costs of the newly initialized account
    - `seeds`: these are the seeds used for the program-derived address (PDA).

- The `.init()` function returns the newly created account, which can now be utilized as a Counter

```py
counter.user = user.key()
```
- The next step is to define the `owner` field. To retrieve the public key of the user who signed the instruction, we user the `.key()` method on it.

> ## PDAs
> Program-Derived Addresses (PDAs) are covered in great detail in the [PDAs section](../introduction-to-solana-core/spl-tokens-nfts-and-token-program/token-metadata-program.md). When you create an account through your program, it requires a unique list of identifiers to differentiate it from all other accounts created by your program. In the context of Seahorse, these identifiers can either be string literals or different accounts. PDAs are useful as they do not have private keys, hence key management becomes really easy - developers do not have to store keys.

## Adding Reset, Incement and Decrement Instructions

Add the following code to the file:

```py

@instruction
def reset(user: Signer, counter: Counter):
    assert user.key() == counter.user, "Unauthorized"
    counter.count = 0

@instruction
def increment(user: Signer, counter: Counter):
    assert user.key() == counter.user, "Unauthorized"
    counter.count += 1

@instruction
def decrement(user: Signer, counter: Counter):
    assert user.key() == counter.user, "Unauthorized"
    counter.count -= 1

```

- These three instuctions are pretty similar in what they are trying to achieve - to change the state of our Counter PDA.
- All three take two args: `user` and `counter` which represent the user who owns the Counter, and the Counter PDA itself, respectively.
- We use `assert` to check if the `user.key()` is same as the `counter.user`.
    - What this means is that we want to check if the user which is triggering and signing the instruction is same as the user who owns the Counter PDA.
    - If not, we program log `"Unauthorized"` to make sure unauthorised personnel can't access and change the state of our Counter.

Voila! We are done with our program. The full program code can be found [here](https://github.com/0xproflupin/seahorse-university/blob/main/programs/counter/programs_py/counter.py).
