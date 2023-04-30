# Blocks, Validators and Proof of History:

![blockchain](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eew1z489grqv0o9t6i7h.jpeg align="left")

Without going into the depths of the jargon ocean, a blockchain is simply a digitally distributed database. The key difference between a typical database and a blockchain is how the stored data is structured.

A blockchain stores and manages data into small groups known as **Blocks**. A block usually stores important information like input and output hashes, number of transactions and the event it contains. When a block is filled with data or "created" by a blockchain node, it is linked to the previous blocks. This forms a chain of blocks, or a blockchain.

In the case of Solana, when a node claims to have created a block, the other nodes strive to verify this claim. The node that generated the block is known as the **Leader** and the nodes that verify the claim are known as **Validators**.

How does this validation, or consensus work on Solana? The answer is something called **Proof of History (PoH)**

![vdf](https://cdn.hashnode.com/res/hashnode/image/upload/v1665563303831/hBJ5wyvJ8.png align="left")

> *"Proof of History is exactly what the name suggests: a proof of historical events*", Anatoly Yakovenko.

> PoH is a [SHA-256](https://www.movable-type.co.uk/scripts/sha256.html) hashed, [**verifiable delay function (VDF)**](https://adlrocha.substack.com/p/adlrocha-a-gentle-introduction-to): this function guarantees the following: when the output hash is validated for an input hash, it is by the nature of PoH that we can confirm that some time has passed since we provided the input. This very nature of the VDFs insures the super fast speeds of the Solana blockchain.

> This is exactly what makes Solana unique. Its extremely easy, fast and cheap-to-use nature allows itself to be named the world's first web-scale blockchain.

Coming back to how **Validators** prove that the **Leader** node is the node that generated the block: the **Validators** run the above **PoH VDF** on a number of transactions existing on the block to be verified. The outputs of the VDF are then compared with the outputs provided by the **Leader** node. Once proven, the Leader is then confirmed to have created the block and rewards for validation are distributed to all the validators, including the Leader.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/egcwo3s9emyxcjrids37.png align="left")

In the above view of a given block #154616344, we can see a variety of information.

* **Block Hash**: The SHA-256 hash (reference number) for a given block on chain.
    
* **Leader**: The block hash of the node that created the given block.
    
* **Previous Block Hash**: The parent block's # of the given block.
    
* **Reward**: The total rewards distributed to the Validators.
    
* **Transactions**: The total number of transactions (successful + unsuccessful) executed in the given block.
    

Now, if you click on one of the hashes in the **By** column of the **Transactions** section, we land on a page which gives a detailed overview of the Account with hash [GFDmfhoPtZZATNxw8zyZPVYKkBZutf1zoZTbRbxDjh5E](https://solscan.io/account/GFDmfhoPtZZATNxw8zyZPVYKkBZutf1zoZTbRbxDjh5E).

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/96rdkpxvrpjibrfcfbjl.png align="left")

Let us first go through some theory and after which we can truly understand the account page and all its components.