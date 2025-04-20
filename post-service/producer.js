const { Kafka } = require('kafkajs');
const kafka = new Kafka({ clientId: 'post-service', brokers: [process.env.KAFKA_BROKER] });
const producer = kafka.producer();

async function initProducer() {
  await producer.connect();
}

async function publishPost(post) {
  await producer.send({
    topic: 'post-topic',
    messages: [{ value: JSON.stringify(post) }]
  });
}

module.exports = { initProducer, publishPost };
