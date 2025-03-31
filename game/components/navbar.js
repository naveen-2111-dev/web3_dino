"use client";

import { Coins, Gamepad2 } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import useDinoBalance from "@/hooks/useDinoBalance";
import { useEffect, useState } from "react";
import { addTokenToWallet } from "@/utility/avail";
import Cookies from "js-cookie";

export default function Navbar() {
  const { balance, loading } = useDinoBalance();
  const [tokenAvail, setTokenAvail] = useState(false);

  useEffect(() => {
    const handleTokenAdd = async () => {
      const isTokenAdded = Cookies.get("TokenAdded");
      if (isTokenAdded === "true") {
        setTokenAvail(true);
        return;
      }

      if (balance === null || balance === 0) {
        setTokenAvail(false);
        return;
      } else {
        setTokenAvail(true);
      }
    };
    handleTokenAdd();
  }, [balance]);

  return (
    <>
      <nav className="w-full flex items-center justify-between px-4 md:px-6 py-3 bg-indigo-900/80 backdrop-filter backdrop-blur-md border-b-2 border-cyan-500/50 fixed top-0 left-0 z-50 dino-nav-glow">
        <div className="flex items-center space-x-2 group">
          <Gamepad2
            size={28}
            className="text-cyan-400 group-hover:text-fuchsia-400 transition-colors duration-300"
          />
          <span className="text-xl font-dino-display text-cyan-300 group-hover:text-fuchsia-300 transition-colors duration-300 dino-text-shimmer">
            Web3 Dino
          </span>
        </div>
        <div className="flex justify-center items-center gap-5 font-dino-text">
          <ConnectButton label="connect" showBalance={false} />
          {tokenAvail ? (
            <div className="flex justify-center items-center gap-3">
              <Image
                src="/sdino.png"
                alt="Dino"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h1 className="text-white">
                {loading ? "Loading..." : balance !== null ? balance : "N/A"} SDINO
              </h1>
            </div>
          ) : (
            <>
              <button
                className="px-4 py-2 text-xs sm:text-sm cursor-pointer font-semibold bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-md transition-all duration-300 relative overflow-hidden shadow-md hover:shadow-lg hover:shadow-cyan-400/50 group-hover:brightness-125 glowing-border flex items-center gap-2"
                onClick={addTokenToWallet}
              >
                <Coins size={16} /> Add Token
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="h-16 w-full"></div>

      <style jsx global>{`
        /* Navbar specific styles */
        .dino-nav-glow {
          box-shadow: 0 0 15px rgba(79, 209, 197, 0.3),
            0 4px 6px rgba(0, 0, 0, 0.4);
        }

        /* These font classes should already be defined in your global styles,
           but including them here for completeness */
        .font-dino-text {
          font-family: "Chakra Petch", sans-serif;
          letter-spacing: 0.05em;
        }

        .font-dino-display {
          font-family: "Audiowide", cursive;
          letter-spacing: 0.02em;
        }

        /* Animation for shimmer effect on navbar text */
        @keyframes dino-nav-shimmer {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }

        /* Connect Button overrides (these should complement your existing styles) */
        nav .ConnectButton {
          font-family: "Chakra Petch", sans-serif !important;
          letter-spacing: 0.05em !important;
          background: linear-gradient(to right, #4eeaff, #ff49e1) !important;
          color: white !important;
          border: none !important;
          border-radius: 0.5rem !important;
          padding: 0.5rem 1.25rem !important;
          font-weight: 600 !important;
          box-shadow: 0 0 10px rgba(79, 209, 197, 0.4) !important;
          transition: all 0.3s ease !important;
        }

        nav .ConnectButton:hover {
          box-shadow: 0 0 15px rgba(79, 209, 197, 0.7) !important;
          transform: translateY(-2px) !important;
        }

        @media (max-width: 640px) {
          nav .ConnectButton {
            padding: 0.4rem 1rem !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </>
  );
}
