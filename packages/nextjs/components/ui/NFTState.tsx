import { useEffect, useState } from "react";
import { useNFTData } from "~~/app/explore/page";
import { NFTCardProps } from "~~/types/nft";
import NFTCard from "./NFTCard";

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
      payer={nft?.payer}
      payedFor={nft?.payedFor}
      booked={nft?.booked}
      payerChecked={nft?.payerChecked}
      buyerChecked={nft?.buyerChecked}
      quantity={nft?.quantity}
      harvestDate={nft?.harvestDate}
    />
    </>
  );
}