import Dino from "@/contract/dino.token.abi.json";
import Cookies from "js-cookie";
import { ethers } from "ethers";

const TOKEN_ADDRESS = "0x0ED834fc69b230A0D679Bf36fc56Abc0EeC594D6";

export const addTokenToWallet = async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const senderAddress = await signer.getAddress();

    const Userprovider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
    );
    const Usersigner = new ethers.Wallet(
      process.env.NEXT_PUBLIC_PRIVATE_KEY,
      Userprovider
    );

    const DinoConto = new ethers.Contract(TOKEN_ADDRESS, Dino.abi, Usersigner);

    const wasAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: TOKEN_ADDRESS,
          symbol: "SDINO",
          decimals: 18,
        },
      },
    });

    if (wasAdded) {
      alert("Token added to wallet! Sending 2 SDINO...");
      Cookies.set("TokenAdded", true, { expires: 365 * 10 });
      const recipient = senderAddress;
      const amount = ethers.parseUnits("2", 18);

      const tx = await DinoConto.sendTokens(recipient, amount);
      await tx.wait();

      alert("Successfully sent 2 SDINO tokens!");
    } else {
      alert("Failed to add token to wallet.");
    }
  } catch (error) {
    console.error("Error adding token or sending SDINO:", error);
    alert("Transaction failed!");
  }
};
