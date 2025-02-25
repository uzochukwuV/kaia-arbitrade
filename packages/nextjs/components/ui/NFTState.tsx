"use client"
import { useEffect, useState } from "react";

import { NFTCardProps } from "~~/types/nft";
import NFTCard from "./NFTCard";
import { useNFTData } from "./NFTdata";

export function NFTState({ id }: { id: string }) {
  const [nft, setNFt] = useState<NFTCardProps | null>(null);
  const { marketplaceData, metadata, isLoading: nftLoading } = useNFTData(id);

  useEffect(() => {
    setNFt({ ...marketplaceData, ...metadata, id: id });
  }, [nftLoading, id, marketplaceData]);

  return (
    <>
    <NFTCard
      key={nft?.id}
      id={nft?.id.toString() || ""}
      name={nft?.name}
      description={nft?.description}
      price={BigInt(nft?.price || 0)}
      image={nft?.image}
      owner={nft?.owner}
      buyer={nft?.buyer}
      payedFor={nft?.payedFor}
      booked={nft?.booked}
      sellerChecked={nft?.sellerChecked}
      buyerChecked={nft?.buyerChecked}
      quantity={nft?.quantity}
      harvestDate={nft?.harvestDate}
    />
    </>
  );
}