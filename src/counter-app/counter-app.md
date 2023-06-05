# Counter App

The Poll app was pretty easy. But it taught us some nice lessons about the Solana account model and Seahorse lang. The next program that we'll build is a Counter app. This app will be a very simple one, where a user can make a counter, and increment & decrement the counter. The counter stores the current state, ie, the count.

The core difference in the poll program and the counter program will be the usage of **PDAs**, or **Program Derived Addresses**. They are a very important feature in the Solana Account Model and we'll use them to build our program. More on that as we build it.

One more difference while building the program will be that we won't be using Solana Playground anymore. We will use the Seahorse CLI to natively write, build and publish the program. This is a very important step towards becoming a Seahorse pro!

Let us start with getting acquantied to the Seahorse CLI.