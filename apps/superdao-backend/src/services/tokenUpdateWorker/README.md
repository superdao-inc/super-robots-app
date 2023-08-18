# Updating NFT Robot Metadata CRON worker

## What is it?

Technically the solution is quite simple:
it's just a separately launched application that every N time rakes up a pool of messages (Redis sorted set is used to implement the pool) and processes them: takes an entry with information about the token, requests the page of the token, receives the necessary data and updates its metadata, then updates token synchronization status inside the platform

- [More info](./../../../../../README.md)