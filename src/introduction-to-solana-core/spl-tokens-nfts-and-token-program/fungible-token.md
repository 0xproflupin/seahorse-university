# Fungible Tokens

Fungible tokens are based on the [Solana Program Library (SPL)](https://spl.solana.com/) and are supported by SOL the same way ERC-20 tokens are supported by ETH. These tokens can be held in any quantity and can be freely mixed with others of the same mint, just like SOL, BTC, ETH and other cryptocurrencies.

SPL-tokens and their associated metadata can be generated on the CLI using [Metaboss](https://metaboss.rs/create.html)

```plaintext
metaboss create fungible -d <decimals> -m <metadata_file>
```

What sets the SPL-tokens apart are their characteristic of having:

1. `supply` &gt; 1
    
2. `decimal places` &gt; 0
    

We can see an example of such a token on Solscan as well. Lets check out [DUST Protocol](https://solscan.io/token/DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ), which is a Fungible token on Solana.

![dust protocol](https://cdn.hashnode.com/res/hashnode/image/upload/v1665560084716/_wNdfxdpK.png align="left")

On the **Profile Summary**, we can see the token's name and address. We can also see that this account is owned by the **Token Program**, indicating that this is a Mint Account. Furthermore, we can see the `authority` of the token as well as the number of decimal places. On the **Market Overview**, we can see the supply which is &gt; 1. The supply and decimal combination shows that the given token is a Fungible token.