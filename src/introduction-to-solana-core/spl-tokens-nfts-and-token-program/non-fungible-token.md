# Non-Fungible tokens (NFTs)

These tokens are the ones which have gained a lot of traction in this past year. NFTs are tokens that are non-replaceable / interchangeable. What this means is that there can not be more than one specimen of a given token. Every token is unique and can't be fractionalised. Here are their properties:

1. `supply` = 1
    
2. `decimal places` = 0
    

NFTs are usually represented by a visual asset: it could either be an image, video or gif. The asset could also be an mp3 file thus allowing the possibilities of music NFTs.

An example of an NFT on Solana can be seen here: [Token Address `HRFCfME6TpoiRMQ9bC3Peb7X9Suk5jeZZV15GYg5QGqM`](https://solscan.io/token/HRFCfME6TpoiRMQ9bC3Peb7X9Suk5jeZZV15GYg5QGqM).

![NFT](https://cdn.hashnode.com/res/hashnode/image/upload/v1665561279211/BBg6-_Hli.png align="left")

This NFT belongs to the well known **DeGods Collection**. In the NFT Overview section, we can see a **Royalty** set by the creator. This is a fee which is paid to the original creator of the NFT, on every trade of the given NFT. Recently DeGods creators have reduced their royalties from 10% to 0%. We can also see a **Creators** tab, which lists the addresses of the original creators of the collection and their corresponding percentages out of the total royalties they receive. On the **Attributes** tab, we can see some specific attributes of the NFT. These attributes vary across NFTs in the collection and hence give uniqueness to each NFT depending on the specific combinations of the attributes. In the Profile Summary, we can also see that the supply is 1, hence ensuring that its an NFT.

Let's check out the **Metadata** tab of the NFT which showcases some interesting information. There are two sets of metadata that we can see in this tab: **on-chain** and **off-chain** metadata.

Here's the on-chain metadata: https://solscan.io/token/HRFCfME6TpoiRMQ9bC3Peb7X9Suk5jeZZV15GYg5QGqM#metadata

We can quickly see that the on-chain metadata points to an off-chain json URI which is the off-chain metadata for the NFT:

```json
{
   "name":"DeGod #6641",
   "symbol":"DGOD",
   "description":"10,000 of the most degenerate gods in the universe.",
   "seller_fee_basis_points":999,
   "image":"https://metadata.degods.com/g/6640-dead.png",
   "external_url":"https://degods.com/",
   "attributes":[
      {
         "trait_type":"background",
         "value":"Purple"
      },
      {
         "trait_type":"skin",
         "value":"Lavender Stripe"
      },
      {
         "trait_type":"specialty",
         "value":"Mythic Wings"
      },
      {
         "trait_type":"clothes",
         "value":"God Scout Uniform"
      },
      {
         "trait_type":"neck",
         "value":"None"
      },
      {
         "trait_type":"head",
         "value":"Bed Head"
      },
      {
         "trait_type":"eyes",
         "value":"Neon Shades"
      },
      {
         "trait_type":"mouth",
         "value":"None"
      },
      {
         "trait_type":"version",
         "value":"DeadGod"
      },
      {
         "trait_type":"y00t",
         "value":"Claimed"
      }
   ],
   "collection":{
      "name":"DeGods",
      "family":"Godplex"
   },
   "properties":{
      "files":[
         {
            "uri":"https://metadata.degods.com/g/6640-dead.png",
            "type":"image/png"
         }
      ],
      "category":"image",
      "creators":[
         {
            "address":"AxFuniPo7RaDgPH6Gizf4GZmLQFc4M5ipckeeZfkrPNn",
            "share":100
         }
      ]
   }
}
```

One can read more about how to mint an NFT and set the metadata for the NFTs on [Metaplex docs](https://docs.metaplex.com/programs/candy-machine/).
