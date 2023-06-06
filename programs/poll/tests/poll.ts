// No imports needed: web3, anchor, pg and more are globally available
// This won't run locally: only meant for Solana Playground

describe("Test Poll Program", async () => {
  // Generate the poll account
  const newPoll = web3.Keypair.generate();

  it("createPoll", async () => {
    // Send transaction
    const txHash = await pg.program.methods
      .create()
      .accounts({
        poll: newPoll.publicKey,
        user: pg.wallet.publicKey,
      })
      .signers([newPoll])
      .rpc();
    console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

    // Confirm transaction
    await pg.connection.confirmTransaction(txHash);

    // Fetch the created account
    const pollAccount = await pg.program.account.poll.fetch(newPoll.publicKey);

    assert(pollAccount.solana.toString(), "0");
    assert(pollAccount.ethereum.toString(), "0");
    assert(pollAccount.polygon.toString(), "0");
  });

  // Make sure our calculator is secure
  it("Prevent re-init for same poll", async () => {
    let hackerman = new web3.Keypair();

    let shouldFail = await pg.program.methods
      .create()
      .accounts({
        poll: newPoll.publicKey,
        user: pg.wallet.publicKey,
      })
      .instruction();

    let tx = new web3.Transaction();
    tx.add(shouldFail);
    await web3
      .sendAndConfirmTransaction(pg.connection, tx, [newPoll])
      .then(() => assert.ok(false)) // Error on success, we want a failure
      .catch(console.log);
  });

  it("vote", async () => {
    // Send transaction
    const txSolHash = await pg.program.methods
      .vote("sol")
      .accounts({
        poll: newPoll.publicKey,
        user: pg.wallet.publicKey,
      })
      .rpc();

    // Confirm transaction
    await pg.connection.confirmTransaction(txSolHash);

    // Send transaction
    const txEthHash = await pg.program.methods
      .vote("eth")
      .accounts({
        poll: newPoll.publicKey,
        user: pg.wallet.publicKey,
      })
      .rpc();

    // Confirm transaction
    await pg.connection.confirmTransaction(txEthHash);

    // Fetch the poll account
    const pollAccount = await pg.program.account.poll.fetch(newPoll.publicKey);

    console.log("ethereum:", pollAccount.ethereum.toString());
    assert(pollAccount.ethereum.toString(), "1");

    console.log("solana:", pollAccount.solana.toString());
    assert(pollAccount.solana.toString(), "1");

    console.log("polygon:", pollAccount.polygon.toString());
    assert(pollAccount.polygon.toString(), "0");
  });
});
