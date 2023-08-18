# Robot image generation broker CRON worker

## What is it?

This is a separately launched application that rakes up a pool of messages every N time (to implement the pool, not a Redis sorted set is used, as in the old version, but a RabbitMQ (new version)) and processes them: takes an entry with information about the token, checks whether generation is needed images, generates it and saves it to the cloud, such a solution to the CPU-intensive task is highly horizontally scalable

- [More info](./../../../../../README.md)