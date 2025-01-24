const { Router } = require('express');
const router = Router();
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const Moralis = require("moralis").default;

router.get("/nft/:walletAddress", async (req, res) => {
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



module.exports =router