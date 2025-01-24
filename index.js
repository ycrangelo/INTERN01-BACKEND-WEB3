const express = require("express");
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
require('dotenv').config();
const getBalance = require("./routes/getBalance")
const getNfts = require("./routes/getNfts")

const app = express();
const port = process.env.PORT;

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

app.use("/", getBalance)
app.use("/", getNfts)

const startServer = async () => {
 //start the server with mortalis
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startServer();