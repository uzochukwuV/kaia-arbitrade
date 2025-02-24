"use client"
import { useContext, useEffect, useState } from "react";
import { NFTCardProps, NFTMetaData } from "~~/types/nft";
import { useNFTData } from "./NFTdata";
import { MarketNFTCARD } from "./MarketNftCard";
import { nftContext } from "~~/app/explore/page";

export function MarketNFTState({ id }: { id: string }) {
    const [nft, setNFt] = useState<NFTCardProps | null>(null);
    const { marketplaceData, metadata, isLoading: nftLoading } = useNFTData(id);
    const {nfts, setNft} = useContext(nftContext)
  
    useEffect(() => {
      setNFt({ ...marketplaceData, ...metadata, id: id });
      setNft([...nfts!, { ...marketplaceData, ...metadata, id: id }])
    }, [nftLoading, id, marketplaceData]);
  
    return (
      <MarketNFTCARD
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
    );
  }
  