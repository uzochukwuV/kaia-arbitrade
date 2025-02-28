"use client";

import { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useNFTData } from "~~/components/ui/NFTdata";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { NFTCardProps } from "~~/types/nft";

export default function Dashboard() {
  enum TabState {
    Listings,
    Purchases,
  }

  const [tab, setTab] = useState<TabState>(TabState.Listings);

  const { address: userAddress } = useAccount();
  const { data: trade, isFetching: tradeLoading } = useScaffoldReadContract({
    contractName: "KaiMarket",
    functionName: "get_user_listing",
    args: [BigInt(10), userAddress],
  });

  const { data: purchase, isFetching } = useScaffoldReadContract({
    contractName: "KaiMarket",
    functionName: "get_user_purchase",
    args: [BigInt(10), userAddress],
  });

  const { data:crop, isFetching: cropBalFetching } = useScaffoldReadContract({
        contractName: "KaiCoin",
        functionName: "balanceOf",
        args: [userAddress],
      });


  const { data: result, isPending, writeContractAsync } = useScaffoldWriteContract({ contractName: "KaiMarket" });

  const handleopenDispute = async (id:string) => {
    if (writeContractAsync) {
      try {
        await writeContractAsync(
          {
            functionName: "openDispute",
            args: [BigInt(id)],
          },
          {
            onBlockConfirmation: txnReceipt => {
              console.log("📦 Transaction blockHash", txnReceipt.blockHash);
            },
          },
        );
      } catch (e: any) {
        console.error("⚡️ ~ file: WriteOnlyFunctionForm.tsx:handleWrite ~ error", e);
      }
    }
  };

  const handleConfirmDelivery= async (id:string, isPayer:boolean) => {
    if (writeContractAsync) {
      try {
        await writeContractAsync(
          {
            functionName: "mark_as_delivered",
            args: [BigInt(id),isPayer ],
          },
          {
            onBlockConfirmation: txnReceipt => {
              console.log("📦 Transaction blockHash", txnReceipt.blockHash);
            },
          },
        );
      } catch (e: any) {
        console.error("⚡️ ~ file: WriteOnlyFunctionForm.tsx:handleWrite ~ error", e);
      }
    }
  };

  return (
    <div>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Digital Marketplace Dashboard</h1>
          <p className="text-muted-foreground">Manage your digital assets, purchases, and sales</p>
          <div>
            <div className="text-sm text-black">
              Balance: {cropBalFetching || crop == undefined ? <LoaderIcon /> : formatEther(crop! as bigint)} Credits
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Listed Items</h3>
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
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{trade?.length + purchase?.length}</div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Pending Deliveries</h3>
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
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{trade?.length}</div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Active Orders</h3>
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
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{purchase?.length}</div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Support Tickets</h3>
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
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">0</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4 bg-slate-100 p-4 rounded-lg">
            <button
              onClick={() => setTab(TabState.Listings)}
              className={`px-4 py-2 rounded-md transition-all ${
                tab === TabState.Listings ? 'bg-white shadow-sm text-primary' : 'text-gray-600'
              }`}
            >
              My Sales
            </button>
            <button
              onClick={() => setTab(TabState.Purchases)}
              className={`px-4 py-2 rounded-md transition-all ${
                tab === TabState.Purchases ? 'bg-white shadow-sm text-primary' : 'text-gray-600'
              }`}
            >
              My Purchases
            </button>
          </div>

          {tab === TabState.Listings ? (
            <ActiveListing 
              data={trade} 
              isLoading={tradeLoading} 
              handleConfirmDelivery={handleConfirmDelivery}  
              handleopenDispute={handleopenDispute} 
            />
          ) : (
            <Purchases 
              data={purchase} 
              isLoading={isFetching} 
              handleConfirmDelivery={handleConfirmDelivery} 
              handleopenDispute={handleopenDispute} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Purchases({ data, isLoading, handleopenDispute, handleConfirmDelivery }: {
  handleConfirmDelivery: any, 
  data: readonly bigint[] | undefined; 
  isLoading: boolean, 
  handleopenDispute: any 
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">My Purchases</h3>
        <p className="text-sm text-gray-500">Track your orders and delivery status</p>
      </div>
      <div className="p-6 pt-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {!isLoading &&
                data?.map(i => {
                  if (i == BigInt(0)) return null;
                  return (
                    <PurchaseNFts 
                      id={i.toString()} 
                      key={i.toString()} 
                      handleopenDispute={handleopenDispute} 
                      handleConfirmDelivery={handleConfirmDelivery} 
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PurchaseNFts({ id, handleopenDispute, handleConfirmDelivery }: { id: string, handleopenDispute:any, handleConfirmDelivery:any }) {
  const [nft, setNFt] = useState<NFTCardProps | null>(null);
  const { marketplaceData, metadata, isLoading: nftLoading } = useNFTData(id);
  const { address } = useAccount();

 
  useEffect(() => {
    console.log({ ...marketplaceData, ...metadata });
    setNFt({ ...marketplaceData, ...metadata, id: id });
  }, [nftLoading, id, marketplaceData]);
  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">#{id}</td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {nft?.price?.toString() && formatEther(nft?.price) || ""} CROP
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {nft?.buyerChecked && nft?.sellerChecked ? (
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground bg-green-50">
        Delivered
        </div>
      ) : (
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
        Pending Delivery
        </div>
      )}
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 space-x-2">
      {nft?.payedFor && !nft.buyerChecked && address == nft.buyer && (
        <button 
        onClick={() => handleConfirmDelivery(id, true)}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
        >
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
          className="lucide lucide-circle-check h-4 w-4 mr-2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
        Confirm Delivery
        </button>
      )}

      {nft?.payedFor && !nft.disputed && !nft.buyerChecked && address == nft.buyer && (
        <button
        onClick={() => handleopenDispute(id)}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
        >
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
          className="lucide lucide-circle-alert h-4 w-4 mr-2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" x2="12" y1="8" y2="12"></line>
          <line x1="12" x2="12.01" y1="16" y2="16"></line>
        </svg>
        Open Dispute
        </button>
      )}

      {nft?.disputed && (
        <div className="inline-flex items-center bg-red-500 text-white justify-center gap-2 whitespace-nowrap text-sm font-medium px-3 py-2 rounded-md">
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
          className="lucide lucide-circle-alert h-4 w-4 mr-2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" x2="12" y1="8" y2="12"></line>
          <line x1="12" x2="12.01" y1="16" y2="16"></line>
        </svg>
        Dispute Opened
        </div>
      )}
      </td>
    </tr>
  );
}

function ActiveListing({ data, isLoading, handleopenDispute,handleConfirmDelivery }: {handleConfirmDelivery:any, data: readonly bigint[] | undefined; isLoading: boolean, handleopenDispute:any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">Active Listings</h3>
        <p className="text-sm text-gray-500">Manage your listed NFTs and their status</p>
      </div>
      <div className="p-6 pt-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NFT ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {!isLoading &&
                data?.map(i => {
                  if (i == BigInt(0)) return null;
                  return (
                    <ListingNFt 
                      id={i.toString()} 
                      key={i.toString()} 
                      handleopenDispute={handleopenDispute} 
                      handleConfirmDelivery={handleConfirmDelivery}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ListingNFt({ id,handleopenDispute,handleConfirmDelivery }: { id: string,handleopenDispute:any ,handleConfirmDelivery:any}) {
  const [nft, setNFt] = useState<NFTCardProps | null>(null);
  const { marketplaceData, metadata, isLoading: nftLoading } = useNFTData(id);
  const { address } = useAccount();

  const { data: result, isPending, writeContractAsync } = useScaffoldWriteContract({ contractName: "CropMarketplace" });

  const getPayment = async () => {
    if (writeContractAsync) {
      try {
        await writeContractAsync(
          {
            functionName: "get_payment",
            args: [BigInt(id)],
          },
          {
            onBlockConfirmation: txnReceipt => {
              console.log("📦 Transaction blockHash", txnReceipt.blockHash);
            },
          },
        );
      } catch (e: any) {
        console.error("⚡️ ~ file: WriteOnlyFunctionForm.tsx:handleWrite ~ error", e);
      }
    }
  };

 

  useEffect(() => {
    console.log({ ...marketplaceData, ...metadata });
    setNFt({ ...marketplaceData, ...metadata, id: id });
  }, [nftLoading, id, marketplaceData, metadata]);

  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">#{id}</td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        {" "}
        {nft?.price?.toString() && formatEther(nft?.price) || ""} CROP
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        {nft?.payedFor ? (
          <div
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground bg-green-50"
            data-v0-t="badge"
          >
            paid
          </div>
        ) : (
          <div
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground bg-green-50"
            data-v0-t="badge"
          >
            not paid
          </div>
        )}
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 space-x-2">
        {nft?.payedFor && nft.buyer == address && !nft.buyerChecked ? (
          <button 
          onClick={() => handleConfirmDelivery(id, address == nft?.buyer)}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
              
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
              className="lucide lucide-circle-check h-4 w-4 mr-2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
            Confirm Delivery
          </button>
        ) : ( nft?.payedFor &&
          !nft?.sellerChecked? (
            <button
              onClick={() => handleConfirmDelivery(id, address == nft?.buyer)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
            >
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
                className="lucide lucide-circle-check h-4 w-4 mr-2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              Confirm Delivery
            </button>):
          <p className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-gray-500">Still In Listing</p>
        )}
        {nft?.payedFor && nft.buyerChecked && nft.sellerChecked ? (
          <button
            onClick={getPayment}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
              className="lucide lucide-dollar-sign h-4 w-4 mr-2"
            >
              <line x1="12" x2="12" y1="2" y2="22"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            Withdraw Payment
          </button>
        ) : (
          nft?.payedFor && (
            <button
              disabled
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
            >
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
                className="lucide lucide-dollar-sign h-4 w-4 mr-2"
              >
                <line x1="12" x2="12" y1="2" y2="22"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              Awaiting nft Release
            </button>
          )
        )}
        {
          nft?.payedFor && nft.owner == address && !nft.buyerChecked || nft?.payedFor && nft.buyer == address && !nft.sellerChecked && (<button
            onClick={() => handleopenDispute(id)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
          >
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
              className="lucide lucide-circle-alert h-4 w-4 mr-2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
            Open Dispute
          </button>)
        }
      </td>
    </tr>
  );
}
