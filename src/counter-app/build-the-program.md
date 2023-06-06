# Built the Program

- Build the program using Seahorse CLI like we did before:

```
seahorse build
```

- This time it should take only a few seconds to build the program and make rust artifacts in `programs/counter/src/lib.rs`.
- This command also produces an IDL file. IDL is an acronym for "Interface Description Language". It's essentially a JSON file that comprises all the specifics of our Solana program. This includes details about its instructions, the parameters these instructions demand, the accounts created by the program, and so forth.
- The purpose of this IDL file is to feed it to our JS client later on so we can interact with our Counter program in a structured manner, like we did for the Poll program.
