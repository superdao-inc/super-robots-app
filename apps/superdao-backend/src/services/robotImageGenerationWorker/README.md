# Robot image generation CRON worker

## What is it?

This is a separately launched application that rakes up a pool of messages every N time (Redis sorted set is used to implement the pool) and processes them: it takes an entry with information about the token, checks whether the image generation is needed, generates it and saves it to the cloud, then looks if it is necessary whether the given token must be refreshed or minted and shifts entry into the appropriate pools, such a solution is fault-tolerant and stable

- [More info](./../../../../../README.md)