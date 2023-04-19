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

class VoteOperation(Enum):
  ETH = 0
  SOL = 1
  POL = 2

@instruction
def create(poll: Empty[Poll], user: Signer):
    poll = poll.init(
        payer=user
    )

@instruction
def vote(user: Signer, poll: Poll, vote_op: VoteOperation):
    if vote_op == VoteOperation.ETH:
      poll.ethereum += 1
    elif vote_op == VoteOperation.SOL:
      poll.solana += 1
    elif vote_op == VoteOperation.POL:
      poll.polygon += 1
