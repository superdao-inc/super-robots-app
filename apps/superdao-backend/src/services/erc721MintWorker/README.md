# Robot NFT Mint CRON worker

## What is it?

This is a separately launched application that rakes up a pool of messages every N time (Redis sorted set is used to implement the pool) and processes them: it takes an entry with information about the token, validates the data and, if necessary, mint the token, this solution allows you to solve the problem of wallet nonce management, is fault-tolerant and guarantees a good gas price, sending speed and delivery of strictly 1 token per 1 wallet

- [More info](./../../../../../README.md)