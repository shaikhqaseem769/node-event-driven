const express = require("express");
const { initProducer, publishPost } = require("./producer");
require("dotenv").config({
  path: "./.env",
});

const app = express();
app.use(express.json());

app.post("/post", async (req, res) => {
  await publishPost(req.body);
  res.send({ status: "Post published" });
});

app.listen(3000, async () => {
  await initProducer();
  console.log("Post Service running at http://localhost:3001");
});
