# Import Libraries and Set Up Constants

To import libraries in our file, we'll first need to install them. We can do so by adding them to the `package.json` file. Replace the contents with this:

```JSON
{
  "name": "poll-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@coral-xyz/anchor": "^0.27.0",
    "@solana/wallet-adapter-base": "^0.9.18",
    "@solana/wallet-adapter-phantom": "^0.9.20",
    "@solana/wallet-adapter-react": "^0.15.21-rc.9",
    "@solana/wallet-adapter-wallets": "^0.19.11",
    "@solana/wallet-adapter-react-ui": "^0.9.23",
    "@solana/web3.js": "^1.70.1",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

- Next, rrun the following command:

```
npm install
```

- This will install all the libraries under `dependencies`. These will be important for us to build the app and interact with the Solana chain.

- Next, we will import the necessary libraries and components for our application.

```js
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  useWallet,
  useAnchorWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import * as anchor from "@coral-xyz/anchor";
import { useMemo, useState } from "react";
import "./App.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
  clusterApiUrl,
  PublicKey,
} from '@solana/web3.js';
import React, { useEffect } from 'react';
```

- Remember we downloaded the IDL in while [building and deploying](../build-and-deploy.md) the IDL? Move the IDL to this folder and import it.

```js
import idl from "./idl.json";
```

- Next, we will set up some constants related to the poll program and the Solana network. The `programID` is the public key of our program. The `network` is the URL for single Solana-hosted, devnet api node which is rate-limited. The opts object contains the `preflightCommitment` option, which will determine how transactions are confirmed.

- Copy the Program ID from `src/poll.py` in `declare_id('xxx')` and paste it below:

```js
const programID = new PublicKey("5MgjVvaSLj6zmxuYhSST1M4LBiXoiSMrJPDZTRPQoiw8");
const network = "https://api.devnet.solana.com";
const opts = {
  preflightCommitment: "processed",
};
```
