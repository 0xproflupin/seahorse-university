import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Poll } from "../target/types/poll";

describe("poll", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Poll as Program<Poll>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
