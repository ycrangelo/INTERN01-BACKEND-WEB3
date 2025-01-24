const express = require("express");
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

app.get("/balance/:walletAddress", async (req, res) => {
 const { walletAddress } = req.params;
 try {
   if (!walletAddress) {
      return res.status(400).json({ error: "Wallet address is required" });
    }
 const response = await Moralis.EvmApi.balance.getNativeBalance({
    "chain": "0x1",
    "address": walletAddress
 });
   res.status(200).json(response);
 }
 catch (error) {
   console.error("Error wallet Balance:", error);
    res.status(500).json({ error: error.message });
 }
})

app.get("/nft/:walletAddress", async (req, res) => {
  const { walletAddress } = req.params;
try {
    // Validate the wallet address
    if (!walletAddress) {
      return res.status(400).json({ error: "Wallet address is required" });
    }

    // Define the blockchain network (Ethereum in this case)
    const chain = EvmChain.ETHEREUM;

    // Fetch NFTs for the given wallet address
    const nftsBalances = await Moralis.EvmApi.nft.getWalletNFTs({
      address: walletAddress,
      chain,
      limit: 50, // You can increase or decrease the limit
    });

    // Format the output to include NFT name, amount, and metadata
    const nfts = nftsBalances.result.map((nft) => ({
      name: nft.result.name || "Unnamed NFT",
      amount: nft.result.amount,
      metadata: nft.result.metadata,
    }));

    // Send the formatted data as the response
    res.status(200).json({ walletAddress, nfts });
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    res.status(500).json({ error: error.message });
  }
  });


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