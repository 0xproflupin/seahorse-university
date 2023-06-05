# Frontend

In this section, we will go through building a frontend for the Solana Poll Dapp using React.

## Initialise React App

- Install Node.js and npm using the following guide:
[https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

We will use CRA (Create-React-App) to quickly bootstrap our ReactJS application.

- Install Create React App
```
npm install -g create-react-app
```

- Create new react app
```
create-react-app poll-app
```

- It should take a few seconds to complete the bootstrapping. Once done, you should see `Happy hacking!` on the console.

- Enter the `poll-app` and open it on a text editor like VSCode

```
cd poll-app
```

- You should see the following directory structure
```
|\_ node_modules
|\_ public
|\_ src
    |\_ App.js
    |\_ App.css
    |\_ index.js
    |\_ index.css
    .
    .
|\_ package-lock.json
|\_ package.json
|\_ README.md
```

We will be editing the `src/App.js` file and puting our frontend code there.

Voila, we can now get started with writing the frontend code!

