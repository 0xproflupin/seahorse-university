# Built with Seahorse v0.2.4
#
# On-chain, persistent Counter!

from seahorse.prelude import *

declare_id('C8ZXZXQuCKidMC1bjQduPjvSmkZqTBXukZbVxmGc9JAR')

class Counter(Account):
    count: u64
    user: Pubkey

@instruction
def create(counter: Empty[Counter], user: Signer):
    counter = counter.init(
        payer=user,
        seeds=["counter", user]
    )
    counter.user = user.key()

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