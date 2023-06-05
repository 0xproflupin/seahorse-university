# Add accounts

Open `programs_py/counter.py` and replace the code there with the following:

```py

from seahorse.prelude import *

declare_id('11111111111111111111111111111111')

class Counter(Account):
    count: u64
    user: Pubkey

```

This is similar to the Poll program:
- `from seahorse.prelude import *` imports the necessary libraries
- `declare_id('11111111111111111111111111111111')`: Default ID - every Solana program starts with this ID, this is not your program's unique ID yet. This is needed to make sure your program knows its own key.

> ## Directives
> While your program doesn't support the use of any kind of top-level statement, there are a few special types of statements, referred to as directives, which provide you with greater control over the compiler beyond just the code generation. Currently, the sole directive available is 'declare_id', but future versions of Seahorse will introduce more.

- `Counter` is the name of our account, which is derived from the in-built base class `Account`
- We define three data types, for which we need to define their type by using type-annotated fields with no default value.
    - `count`: the current count of the counter
    - `user`: the user that owns the counter
