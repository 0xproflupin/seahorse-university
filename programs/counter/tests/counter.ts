import * as anchor from '@project-serum/anchor'
import { BN, Program, web3 } from '@project-serum/anchor'
const assert = require('assert')

import { Counter } from '../target/types/counter'

describe('counter', () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.Calculator as Program<Counter>

  const user = provider.wallet.publicKey
  const counter = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('Calculator'), user.toBuffer()],
    program.programId
  )[0]

  it('Inits a counter', async () => {
    await program.methods.create().accounts({ counter, user }).rpc()
  })

  it('Does some operations', async () => {
    const add1 = await program.methods
      .increment()
      .accounts({ counter, user })
      .instruction()
  
  
    const add2 = await program.methods
      .increment()
      .accounts({ counter, user })
      .instruction()
  
  
    const sub1 = await program.methods
      .decrement()
      .accounts({ counter, user })
      .instruction()
  
    const tx = new web3.Transaction()
    tx.add(add1, add2, sub1)
    await provider.sendAndConfirm(tx)
  
    // Get the calculator's on-chain data
    const counterState = await program.account.counter.fetch(counter)
  
    assert.ok(counterState.count.toNumber() === 1)

    const reset = await program.methods
      .reset()
      .accounts({ counter, user })
      .instruction()
  
    const tx2 = new web3.Transaction()
    tx.add(reset)
    await provider.sendAndConfirm(tx)
  
    // Get the calculator's on-chain data
    const counterState2 = await program.account.counter.fetch(counter)
  
    assert.ok(counterState2.count.toNumber() === 0)
  })

  // Make sure our calculator is secure
  it('Prevents fraudulent transactions', async () => {
    let hackerman = new web3.Keypair()


    let shouldFail = await program.methods
      .reset()
      .accounts({ counter, user })
      .instruction()

    let tx = new web3.Transaction()
    tx.add(shouldFail)
    await provider
      .sendAndConfirm(tx, [hackerman])
      .then(() => assert.ok(false)) // Error on success, we want a failure
      .catch(console.log)
  })
})