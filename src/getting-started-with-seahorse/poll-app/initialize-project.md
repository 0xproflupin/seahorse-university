# Initializing the project

We will initialise the project using the seahorse CLI:
```
seahorse init poll
```

This will create a directory `poll` which will contain a bunch of directories and files with the following structure:

```
poll
|\_ app
|\_ migrations
|\_ node_modules
|\_ programs
|\_ programs_py
    |\_ seahorse
    |\_ poll.py
    :
|\_ target
|\_ tests
```

- `app`: will contain our front-end code
- `programs_py`: will contain our Seahorse programs
- `programs`: will contain our generated intermediate Rust artifacts for our Seahorse program
- `target`: will contain the auto-generates TypeScript types for our program
- `tests`: will contain our Anchor tests

Now let's build our seahorse project:
```
cd poll
seahorse build
```

This should take some time for the first time, but now you'll notice some generated code in `programs/calculator/src/lib.rs` which is the Rust artificat of the code in `programs_py/poll.py`.

Let's focus on `poll.py` file in `programs_py` and edit it to build our program.