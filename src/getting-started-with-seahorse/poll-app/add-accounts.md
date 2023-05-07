# Add Accounts
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