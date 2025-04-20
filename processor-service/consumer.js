const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "processor-service",
  brokers: [process.env.KAFKA_BROKER],
});
const consumer = kafka.consumer({ groupId: "post-group" });

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "post-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const post = JSON.parse(message.value.toString());
      console.log("Received post in processor service:", post);
    },
  });
}

module.exports = { runConsumer };
