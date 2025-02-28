"use client";

import React from "react";
import { useAccount, useWriteContract } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useTargetNetwork, useTransactor } from "~~/hooks/scaffold-eth";

function Page() {
  const { address: userAddress } = useAccount();
  const writeTxn = useTransactor();
  const {targetNetwork} = useTargetNetwork();
  // getAirdropYAR
  const { writeContractAsync } = useWriteContract();

  const handleGetAirdrop = async () => {
    if (writeContractAsync) {
      try {
        const makeWriteWithParams = () =>
          writeContractAsync({
            address: DeployedContracts[1001].KaiCoin.address,
            abi: DeployedContracts[1001].KaiCoin.abi,
            functionName: "getAirdrop",
          });
        await writeTxn(makeWriteWithParams);
      } catch (e: any) {
        console.error("⚡️ ~ file: WriteOnlyFunctionForm.tsx:handleWrite ~ error", e);
      }
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
      <div
        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100"
        data-v0-t="badge"
      >
        Airdrop Live
      </div>
      <h1 className="text-4xl font-bold mb-4">KAI Token Airdrop</h1>
      <p className="text-xl text-muted-foreground">Claim your KAI tokens</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm md:col-span-1" data-v0-t="card">
        <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Claim Your KAI Tokens</h3>
        <p className="text-sm text-muted-foreground">
        Connect your wallet and claim your tokens
        </p>
        </div>
        <div className="p-6 pt-0 space-y-6">
        <div className="space-y-4">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-wallet h-5 w-5 text-muted-foreground"
          >
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
          <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
          </svg>
          <span>Connect Wallet</span>
        </div>
        {userAddress ? (
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-blue-500 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Connected
          </button>
        ) : (
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Connect
          </button>
        )}
        </div>
        <div className="pt-4">
        <button
          onClick={handleGetAirdrop}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-11 rounded-md px-8 w-full bg-blue-600 hover:bg-blue-700"
        >
          Claim KAI Tokens
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-right h-5 w-5 ml-2"
          >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
        </div>
        </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Page;
