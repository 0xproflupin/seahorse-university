# poll
# Built with Seahorse v0.2.4
#
# On-chain, persistent Poll!

from seahorse.prelude import *

declare_id('5MgjVvaSLj6zmxuYhSST1M4LBiXoiSMrJPDZTRPQoiw8')

class Poll(Account):
  ethereum: u64
  solana: u64
  polygon: u64

@instruction
def create(poll: Empty[Poll], user: Signer):
  poll = poll.init(
    payer=user
  )

# vote_op can be an enum too, but its broken on solpg
@instruction
def vote(user: Signer, poll: Poll, vote_op: str):
  if vote_op == "eth":
    poll.ethereum += 1
  elif vote_op == "sol":
    poll.solana += 1
  elif vote_op == "pol":
    poll.polygon += 1
