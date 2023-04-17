# counter
# Built with Seahorse v0.2.4

from seahorse.prelude import *

declare_id('Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS')

class Counter(Account):
  owner: Pubkey
  count: i64

@instruction
def init_counter(owner: Signer, counter: Empty[Counter]):
  # Initialize the counter and set the owner
  counter = counter.init(
    payer = owner,
    seeds = ['Calculator', owner]
  )
  counter.owner = owner.key()
  print(owner.key(), 'initialised', counter.key())

@instruction
def reset_counter(owner: Signer, counter: Counter):
  print(owner.key(), 'is resetting', counter.key())

  # Verify owner
  assert owner.key() == counter.owner, 'This is not your counter!'
  counter.count = 0

@instruction
def increment_counter(owner: Signer, counter: Counter):
  print(owner.key(), 'is incrementing', counter.key())

  # Verify owner
  assert owner.key() == counter.owner, 'This is not your counter!'
  counter.count += 1

  print('Count for', counter.key, 'is', counter.count)

@instruction
def decrement_counter(owner: Signer, counter: Counter):
  print(owner.key(), 'is decrementing', counter.key())

  # Verify owner
  assert owner.key() == counter.owner, 'This is not your counter!'
  counter.count -= 1

  print('Count for', counter.key, 'is', counter.count)


