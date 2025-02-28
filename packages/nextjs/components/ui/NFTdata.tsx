"use client"
import { useEffect, useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { NFTMetaData } from "~~/types/nft";

export function useNFTData(nftId: string) {
    const { data: tokenUri } = useScaffoldReadContract({
      contractName: "KaiNFT",
      functionName: "tokenURI",
      args: [BigInt(nftId)],
    });
  
    const { data: marketplaceData } = useScaffoldReadContract({
      contractName: "KaiMarket",
      functionName: "get_stock_data",
      args: [BigInt(nftId)],
    });
  
    const [metadata, setMetadata] = useState<NFTMetaData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const fetchMetadata = async () => {
        if (!tokenUri) return;
        try {
          const response = await fetch("api/nft", {
            method: "POST",
            body: JSON.stringify({ id: tokenUri }),
          });
          const data = await response.json();
          console.log(data);
          setMetadata(data.data.data as NFTMetaData);
        } catch (err) {
          setError(err as Error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchMetadata();
    }, [tokenUri]);
  
    return {
      metadata,
      marketplaceData,
      isLoading,
      error,
    };
  }