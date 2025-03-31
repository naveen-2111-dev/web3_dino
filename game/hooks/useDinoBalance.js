import { useState, useEffect } from "react";
import { readContract } from "viem/actions";
import { useAccount } from "wagmi";
import sDino from "@/contract/dino.token.abi.json";
import { ethers } from "ethers";

export default function useDinoBalance() {
  const { address } = useAccount();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!address) return;

      const Provider = new ethers.BrowserProvider(window.ethereum);

      setLoading(true);
      try {
        const sDinoBalance = new ethers.Contract(
          sDino.address,
          sDino.abi,
          Provider
        );

        const DinoBalance = await sDinoBalance.balanceOf(address);
        setBalance(ethers.formatUnits(DinoBalance, 18));
      } catch (err) {
        console.error("Error fetching Dino balance:", err);
        setBalance(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [address]);

  return { balance, loading };
}
