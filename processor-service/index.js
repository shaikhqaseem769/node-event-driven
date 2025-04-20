const { runConsumer } = require('./consumer');
runConsumer().then(() => console.log("Processor Service is running"));
