"use client";

import { useAccount } from "wagmi";
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGameStart = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/stake");
    }, 800);
  };

  const [dynamicStats, setDynamicStats] = useState({
    bestRun: "0",
    tokens: "0",
    rank: "ROOKIE",
  });

  useEffect(() => {
    if (isConnected) {
      const timer = setTimeout(() => {
        setDynamicStats({
          bestRun: Math.floor(Math.random() * 500).toString(),
          tokens: Math.floor(Math.random() * 100).toString(),
          rank: ["ROOKIE", "EXPLORER", "CHAMPION", "LEGEND"][
            Math.floor(Math.random() * 4)
          ],
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-950 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          <div className="dino-stars-sm"></div>
          <div className="dino-stars-md"></div>
          <div className="dino-stars-lg"></div>
        </div>

        <div className="absolute inset-0 dino-grid-overlay"></div>

        <div className="absolute bottom-0 w-full h-64 md:h-96 dino-terrain bg-repeat-x"></div>
      </div>

      <Navbar />

      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen relative z-10">
        <div className="mb-8 md:mb-12 text-center max-w-4xl w-full px-2">
          <p className="font-dino-text text-cyan-300 mt-2 md:mt-4 text-sm sm:text-base md:text-xl tracking-widest">
            <span className="dino-text-flicker">SURVIVE</span> ·
            <span className="px-2 dino-text-flicker-delay">EVOLVE</span> ·
            <span className="dino-text-flicker-long">EARN</span>
          </p>
        </div>

        <div className="bg-opacity-20 backdrop-filter backdrop-blur-md bg-indigo-900/30 rounded-2xl border-2 border-cyan-500/50 dino-card-glow p-4 sm:p-6 md:p-8 max-w-md sm:max-w-lg md:max-w-2xl w-full mb-6 md:mb-8 transition-all duration-300 hover:bg-indigo-900/40 hover:border-cyan-400/60">
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 relative group">
              <Image
                src="/image copy.png"
                alt="Dino"
                width={128}
                height={128}
              />

              <div className="absolute inset-0 bg-cyan-500 opacity-20 blur-xl rounded-full dino-glow-pulse"></div>
            </div>
          </div>

          <div className="text-center mb-6">
            {isConnected ? (
              <div className="space-y-2">
                <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-indigo-800/50 rounded-full border border-cyan-500/30 dino-address-tag">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400 mr-2 sm:mr-3 animate-pulse"></div>
                  <span className="font-dino-text text-xs sm:text-sm text-gray-200 truncate max-w-xs">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                </div>
                <p className="font-dino-text text-lg sm:text-xl text-cyan-300 mt-2 sm:mt-3 dino-text-shimmer">
                  READY TO ENTER THE GRID?
                </p>
              </div>
            ) : (
              <div className="py-2">
                <p className="font-dino-text text-lg sm:text-xl text-cyan-100 dino-text-shimmer">
                  CONNECT WALLET TO ENTER THE GRID
                </p>
              </div>
            )}
          </div>

          {isConnected && (
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-indigo-800/30 rounded-lg p-2 sm:p-3 text-center border border-cyan-500/20 dino-stat-panel">
                <p className="text-xs text-cyan-200 font-dino-text mb-1 truncate">
                  BEST RUN
                </p>
                <p className="text-xl sm:text-2xl font-dino-text text-white">
                  {dynamicStats.bestRun} <span className="text-xs">M</span>
                </p>
              </div>
              <div className="bg-indigo-800/30 rounded-lg p-2 sm:p-3 text-center border border-cyan-500/20 dino-stat-panel">
                <p className="text-xs text-cyan-200 font-dino-text mb-1 truncate">
                  $SDINO
                </p>
                <p className="text-xl sm:text-2xl font-dino-text text-white">
                  {dynamicStats.tokens}
                </p>
              </div>
              <div className="bg-indigo-800/30 rounded-lg p-2 sm:p-3 text-center border border-cyan-500/20 dino-stat-panel">
                <p className="text-xs text-cyan-200 font-dino-text mb-1 truncate">
                  RANK
                </p>
                <p className="text-xl sm:text-2xl font-dino-text text-white dino-rank-text">
                  {dynamicStats.rank}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            {isConnected ? (
              <button
                onClick={handleGameStart}
                disabled={isLoading}
                className="font-dino-text px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white text-base sm:text-xl rounded-lg transition-all duration-300 dino-button-glow relative overflow-hidden group disabled:opacity-70"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      LOADING...
                    </>
                  ) : (
                    "START RUN"
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-fuchsia-400 opacity-0 group-hover:opacity-30 transition-opacity"></span>
                <span className="absolute -inset-1 rounded-lg border border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
            ) : (
              <div className="font-dino-text transform hover:scale-105 transition-all duration-300 dino-connect-button-wrapper">
                <ConnectButton
                  label="CONNECT WALLET"
                  chainStatus="none"
                  showBalance={false}
                  accountStatus="address"
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-opacity-10 backdrop-filter backdrop-blur-sm bg-indigo-900/20 rounded-lg border border-cyan-500/30 p-3 sm:p-4 max-w-xs sm:max-w-sm md:max-w-md w-full transition-all duration-300 hover:bg-indigo-900/30">
          <div className="flex justify-around">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 sm:mb-2 flex items-center justify-center rounded bg-indigo-800/50 border border-cyan-500/20 dino-control-key">
                <span className="font-dino-text text-sm sm:text-base text-cyan-400">
                  ↑
                </span>
              </div>
              <p className="text-xs font-dino-text text-gray-300">JUMP</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 sm:mb-2 flex items-center justify-center rounded bg-indigo-800/50 border border-cyan-500/20 dino-control-key">
                <span className="font-dino-text text-sm sm:text-base text-cyan-400">
                  ↓
                </span>
              </div>
              <p className="text-xs font-dino-text text-gray-300">DUCK</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 sm:mb-2 flex items-center justify-center rounded bg-indigo-800/50 border border-cyan-500/20 dino-control-key">
                <span className="font-dino-text text-sm sm:text-base text-cyan-400">
                  P
                </span>
              </div>
              <p className="text-xs font-dino-text text-gray-300">PAUSE</p>
            </div>
          </div>
        </div>

        {/* Version tag */}
        <div className="mt-4 text-xs text-cyan-500/60 font-dino-text">
          v1.0.3
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;700&family=Audiowide&display=swap");

        /* Properly named font classes */
        .font-dino-text {
          font-family: "Chakra Petch", sans-serif;
          letter-spacing: 0.05em;
        }

        .font-dino-display {
          font-family: "Audiowide", cursive;
          letter-spacing: 0.02em;
        }

        .dino-character {
          stroke: #2d3748;
          stroke-width: 2;
          animation: dinoBounce 0.8s infinite alternate;
        }

        @keyframes dinoBounce {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-5px);
          }
        }

        @media (hover: hover) {
          .dino-character {
            animation: dinoBounce 0.4s infinite alternate;
          }
        }

        /* Background elements with specific naming */
        .dino-terrain {
          height: 10rem;
          background-image: linear-gradient(
              transparent 50%,
              rgba(76, 29, 149, 0.5) 80%
            ),
            repeating-linear-gradient(
              115deg,
              rgba(14, 16, 45, 0.5) 0px,
              rgba(38, 20, 72, 0.5) 7px,
              rgba(76, 29, 149, 0.5) 10px
            );
          mask-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 1) 30%,
            rgba(0, 0, 0, 0.5) 60%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        .dino-grid-overlay {
          background-image: linear-gradient(
              rgba(59, 130, 246, 0.03) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(59, 130, 246, 0.03) 1px,
              transparent 1px
            );
          background-size: 30px 30px;
          opacity: 0.5;
        }

        /* Stars animations with properly named classes */
        .dino-stars-sm,
        .dino-stars-md,
        .dino-stars-lg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
              1px 1px at 10% 10%,
              white,
              transparent
            ),
            radial-gradient(1px 1px at 20% 20%, white, transparent),
            radial-gradient(1px 1px at 30% 30%, white, transparent),
            radial-gradient(1px 1px at 40% 40%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 60% 60%, white, transparent),
            radial-gradient(1px 1px at 70% 70%, white, transparent);
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.5;
        }

        .dino-stars-md {
          background-size: 300px 300px;
          opacity: 0.6;
          animation: dino-stars-scroll 150s linear infinite;
        }

        .dino-stars-lg {
          background-size: 400px 400px;
          opacity: 0.8;
          animation: dino-stars-scroll 100s linear infinite;
        }

        @keyframes dino-stars-scroll {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(1000px);
          }
        }

        /* Special visual effects with proper naming */
        .dino-card-glow {
          box-shadow: 0 0 20px rgba(79, 209, 197, 0.3),
            0 0 40px rgba(79, 209, 197, 0.1);
        }

        .dino-button-glow {
          box-shadow: 0 0 15px rgba(79, 209, 197, 0.4);
        }

        .dino-button-glow:hover {
          box-shadow: 0 0 25px rgba(79, 209, 197, 0.6);
          transform: translateY(-2px) scale(1.02);
        }

        .dino-title-glow {
          filter: drop-shadow(0 0 8px rgba(79, 209, 197, 0.6));
        }

        .dino-glow-pulse {
          animation: dino-pulse 3s ease-in-out infinite;
        }

        .dino-character {
          fill: url(#dinoGradient);
          transform-origin: center;
          animation: dino-float 5s ease-in-out infinite;
        }

        @keyframes dino-pulse {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        @keyframes dino-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .dino-text-shimmer {
          background: linear-gradient(
            90deg,
            rgba(56, 189, 248, 0) 0%,
            rgba(56, 189, 248, 0.8) 20%,
            rgba(139, 92, 246, 0.8) 45%,
            rgba(236, 72, 153, 0.8) 65%,
            rgba(56, 189, 248, 0) 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: dino-text-shimmer 8s linear infinite;
          text-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
        }

        @keyframes dino-text-shimmer {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }

        .dino-text-flicker {
          animation: dino-text-flicker 5s linear infinite;
        }

        .dino-text-flicker-delay {
          animation: dino-text-flicker 5s linear 0.5s infinite;
        }

        .dino-text-flicker-long {
          animation: dino-text-flicker 7s linear 1s infinite;
        }

        @keyframes dino-text-flicker {
          0%,
          100% {
            opacity: 1;
          }
          3%,
          5% {
            opacity: 0.3;
          }
          7% {
            opacity: 1;
          }
          9%,
          11% {
            opacity: 0.3;
          }
          13% {
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
        }

        .dino-stat-panel {
          transition: all 0.3s ease;
        }

        .dino-stat-panel:hover {
          background-color: rgba(79, 70, 229, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 0 10px rgba(79, 209, 197, 0.2);
        }

        .dino-rank-text {
          background: linear-gradient(90deg, #4eeaff, #ff49e1);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .dino-control-key {
          transition: all 0.2s ease;
        }

        .dino-control-key:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 8px rgba(79, 209, 197, 0.4);
          border-color: rgba(56, 189, 248, 0.5);
        }

        .dino-title-hover:hover {
          text-shadow: 0 0 15px rgba(56, 189, 248, 0.7);
        }

        .dino-address-tag {
          transition: all 0.3s ease;
        }

        .dino-address-tag:hover {
          background-color: rgba(79, 70, 229, 0.4);
          border-color: rgba(56, 189, 248, 0.5);
        }

        /* Rainbow Kit Button overrides */
        .ConnectButton {
          font-family: "Chakra Petch", sans-serif !important;
          letter-spacing: 0.05em !important;
          background: linear-gradient(to right, #4eeaff, #ff49e1) !important;
          color: white !important;
          border: none !important;
          border-radius: 0.5rem !important;
          padding: 0.75rem 1.5rem !important;
          font-weight: 600 !important;
          box-shadow: 0 0 15px rgba(79, 209, 197, 0.5) !important;
          transition: all 0.3s ease !important;
        }

        .ConnectButton:hover {
          box-shadow: 0 0 20px rgba(79, 209, 197, 0.8) !important;
          transform: translateY(-2px) !important;
        }

        /* Responsive adjustments for different screen sizes */
        @media screen and (max-width: 640px) {
          .ConnectButton {
            padding: 0.5rem 1rem !important;
            font-size: 0.875rem !important;
          }

          .dino-title-glow {
            filter: drop-shadow(0 0 5px rgba(79, 209, 197, 0.5));
          }
        }

        @media screen and (min-width: 1024px) {
          .dino-card-glow {
            box-shadow: 0 0 30px rgba(79, 209, 197, 0.3),
              0 0 60px rgba(79, 209, 197, 0.1);
          }

          .dino-terrain {
            height: 12rem;
          }
        }
      `}</style>
    </div>
  );
}
