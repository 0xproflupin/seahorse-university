# Initializing the project

We will initialise the project using the seahorse CLI:
```
seahorse init counter
```

This will create a directory `counter` which will contain a bunch of directories and files with the following structure:

```
counter
|\_ app
|\_ migrations
|\_ node_modules
|\_ programs
|\_ programs_py
    |\_ seahorse
    |\_ counter.py
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
cd counter
seahorse build
```

This should take some time for the first time, but now you'll notice some generated code in `programs/counter/src/lib.rs` which is the Rust artificat of the code in `programs_py/counter.py`.

Let's focus on `counter.py` file in `programs_py` and edit it to build our program.