"use client";
import { useState, useEffect } from "react";
import { Wallet2, Gamepad2 } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  const [connected, setConnected] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-[#111] text-white shadow-lg fixed top-0 left-0 z-50">
      <div className="flex items-center space-x-2">
        <Gamepad2 size={32} className="text-cyan-400" />
        <span className="text-xl font-bold">Web3 Dino</span>
      </div>

      {isMounted && <ConnectButton />}
    </nav>
  );
}
