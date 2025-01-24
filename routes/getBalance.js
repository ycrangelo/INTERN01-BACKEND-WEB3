const { Router } = require('express');
const router = Router();
const Moralis = require("moralis").default;

router.get("/balance/:walletAddress", async (req, res) => {
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

module.exports =router