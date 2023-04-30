# Seahorse University
A very gentle introduction to Solana programming through Seahorse Lang

A path to becoming a program (smart-contract) developer on Solana for Python developers. You don't need any degree or web 3.0 experience.

## About this course

This course provides an introduction to the uninitiated in web3 to Solana development. Solana development has a steep learning curve because:

1. Solana Programming Model: Solana account model is not for the faint hearted. But once one gets the hang of it, it’s one of the most excited frameworks to work with.
2. Rust Lang: the language used to code programs or smart contracts on Solana. Rust is not the easiest language to learn.

Seahorse lang is built to bypass one of these two barriers, more specifically the latter.

Developers gain Python's ease-of-use, while still having the same safety guarantees as every Rust program on the Solana chain. Low-level memory problems are handled by default, letting you worry about the important stuff.

## What you'll learn

- [x]  Gain an immersive understanding of the Solana account model
- [x]  Understand how to write Solana programs using Python and Seahorse lang
- [x]  Learn how to make full-stack decentralised applications using Python and Typescript
- [x]  Learn the very basics of Anchor and Rust using Seahorse lang

## Prerequisites
- Python programming skills
- Solana basics

## Syllabus
### Chapter 0 [optional]: Introduction to Solana Core
This chapter contains a glossary of important topics/words that readers should ideally know before proceeding to chapter 1.
- **Primer on Blockchain and Solana**
    - Intro to blockchain
    - Blocks
    - Leader
    - Validators
    - Proof of History (PoH) VDF
- **Account Model**
    - Intro to Accounts
    - Mutable / Immutable
    - Transaction parallelisation
    - Program Derived Addresses (PDAs)
- ****Instructions and Transactions****
    - Instructions
    - Anatomy of intructions
    - Transactions
    - Anatomy of transactions
    - Vote vs Non-vote transactions
    - Versioned transactions
    - Lookup Tables
- **Programs**
    - Introduction to programs
    - State
    - Data
    - Native
    - SPL
- **Solana Program Library (SPL)**
    - Token Program
    - spl-token-cli
    - Associated Token Account Program
    - Mint Account
    - Token Metadata Program
    - Fungible Tokens
    - Fungible assets
    - Non-Fungible tokens (NFTs)
- **Data**
    - Common Types
    - Serialization/Deserialization
- **Cross-Program Invocation**

### Chapter 1: On-Hands Introduction to Seahorse Lang
This Chapter will go through the processes of Writing Programs using Seahorse and testing them with prebuilt frontends in TypeScript ( I will be briefly taking the users over making 1-2 frontends and providing relevant links to learn react). This will enable readers to focus their attention on learning how to write and test Seahorse programs. The difficulty and technical complexity of the programs will increase incrementally.

- What is SeaHorse lang?
- Installation
    - Dependencies
    - SeaHorse installation
- SeaHorse CLI

 

Here are the programs that I will demo from scratch during this course:

1. Poll
2. Counter
3. Escrow
4. Cold to Hot Wallet Delegation
5. Token Minting and Trasfer
6. Solana Twitter Program

Each of the above will comprise of the following:

- Writing the Program
    - Adding Accounts
    - Adding Instructions
    - Modularising programs
    - Testing program on Solana Playground
- Frontend
    - Initialise react app
    - Make frontend
    - Call program

### Chapter 2: Diving deep into Seahorse Lang

- Limitations
- Seahorse Prelude
- Python constructs and built-ins
- Scripts vs Modules
- Directives

### Chapter 3 [optional]: Testing with Anchor
This Chapter will cover the depths of testing your Seahorse Programs!