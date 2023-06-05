# Seahorse Installation

## Rust
Language which is used to code Solana programs.
Go [here](https://www.rust-lang.org/tools/install) to install Rust.

## Solana Toolkit
Go here to install Solana and then run `solana-keygen new` to create a Solana keypair/wallet at the default location. This wallet will be used later for testing our Seahorse programs.

## Node.js
Node.js can be installed by visiting [here](https://nodejs.org/en/download).

## Yarn
Go [here](https://yarnpkg.com/getting-started/install) to install Yarn.

## Anchor
Install `avm` using Cargo. Note this will replace your `anchor` binary if you had one installed.
```
cargo install --git https://github.com/project-serum/anchor avm --locked --force
```

On Linux systems you may need to install additional dependencies if cargo install fails. E.g. on Ubuntu:
```
sudo apt-get update && sudo apt-get upgrade && sudo apt-get install -y pkg-config build-essential libudev-dev
```

Install the latest version of the CLI using avm, and then set it to be the version to use.
```
avm install latest
avm use latest
```

Verify the installation.
```
anchor --version
```

## Rustfmt
Seahorse uses rustfmt to help generate better-looking Rust code.
Installation instructions [here](https://github.com/rust-lang/rustfmt).

## Seahorse
Cargo install the `seahorse` binary:
```
cargo install seahorse-lang
```

Verify the installation.
```
seahorse -V
```

Now that we've gone past the boring stuff, lets get started with coding our second Solana Program using Seahorse!