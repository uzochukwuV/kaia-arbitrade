"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "react-hot-toast";
import { parseEther } from "viem";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { NFTMetaData } from "~~/types/nft";

export function Crop({ id }: { id: bigint }) {
  const [nft, setNFt] = useState<NFTMetaData | null>();
  const { data: connectedAddressNFT, isLoading: isConnectedAddressCounterLoading } = useScaffoldReadContract({
    contractName: "CropNft",
    functionName: "tokenURI",
    args: [BigInt(id)],
  });
  const [price, setPrice] = useState("0.2");

  const { data: nftData, refetch, isLoading } = useNFT({ id: connectedAddressNFT || "" });

  useEffect(() => {
    if (connectedAddressNFT && !nft) {
      refetch();
    }
    console.log(nftData);
    if (nftData?.error) {
      refetch();
    }
    if (nftData?.data) {
      setNFt(nftData?.data?.data);
    }
  }, [isConnectedAddressCounterLoading, isLoading, connectedAddressNFT, nft]);
  const { writeContractAsync } = useScaffoldWriteContract({ contractName: "CropMarketplace" });
  const { writeContractAsync: Approve } = useScaffoldWriteContract({ contractName: "CropNft" });
  // const { writeContractAsync:ApproveCoin } = useScaffoldWriteContract({contractName:"CropCoin"});
  // try {
  //   await ApproveCoin(
  //     {
  //       functionName: "approve",
  //       args: [DeployedContracts[31337].CropMarketplace.address, parseEther("200")],
  //     },
  //     {
  //       onBlockConfirmation: txnReceipt => {
  //         console.log("📦 Transaction blockHash", txnReceipt.blockHash);
  //       },
  //     },
  //   );
  // } catch (e) {
  //   console.error("Error setting greeting", e);
  // }

  const handleListSale = async () => {
    try {
      await Approve(
        {
          functionName: "approve",
          args: [DeployedContracts[31337].CropMarketplace.address, id],
        },
        {
          onBlockConfirmation: txnReceipt => {
            console.log("📦 Transaction blockHash", txnReceipt.blockHash);
          },
        },
      );
    } catch (e) {
      console.error("Error setting greeting", e);
    }

    try {
      await writeContractAsync(
        {
          functionName: "list_for_sale",
          args: [id, parseEther(price)],
        },
        {
          onBlockConfirmation: txnReceipt => {
            console.log("📦 Transaction blockHash", txnReceipt.blockHash);
          },
        },
      );
    } catch (e) {
      console.error("Error setting greeting", e);
    }
  };

  if (isConnectedAddressCounterLoading || isLoading) {
    return <LoaderIcon />;
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden" data-v0-t="card">
      <div className="aspect-square relative bg-muted">
        <Image
          src={nft?.image!}
          alt=""
          width={100}
          height={100}
          className=" h-full w-full top-0 bottom-0 rounded-md  bg-cover bg-center absolute"
        />
      </div>
      <div className="p-4 flex justify-end flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold">
              {nft?.name || "NFT Name"} #{id.toString()}
            </h3>
            <p className="text-sm text-muted-foreground">{nft?.description || "NFT Description"}</p>
          </div>
          {/* <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10"
            type="button" id="radix-:r16:" aria-haspopup="menu" aria-expanded="false"
            data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round"

              className="lucide lucide-ellipsis-vertical h-4 w-4">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg></button> */}
        </div>
        <div className="mt-4 flex items-center gap-2"></div>
      </div>
      <div className="flex items-center p-4 pt-0">
        <div
          onClick={handleListSale}
          className="flex cursor-pointer  bg-green-300 py-2 px-6 rounded items-center gap-2 text-sm text-muted-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="round"
            className="lucide lucide-package h-4 w-4"
          >
            <path d="m7.5 4.27 9 5.15"></path>
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
            <path d="m3.3 7 8.7 5 8.7-5"></path>
            <path d="M12 22V12"></path>
          </svg>
          List for Sale
        </div>
      </div>
    </div>
  );
}

export function useNFT({ id }: { id: string }) {
  return useQuery({
    queryKey: [id],
    queryFn: async (): Promise<any> => {
      if (!id) return;
      const response = await fetch("api/nft", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      return await response.json();
    },
  });
}
