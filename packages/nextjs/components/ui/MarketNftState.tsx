"use client"
import { useContext, useEffect, useState } from "react";
import { NFTCardProps } from "~~/types/nft";
import { useNFTData } from "./NFTdata";
import { MarketNFTCARD } from "./MarketNftCard";
import { nftContext } from "~~/utils/context";


export function MarketNFTState({ id }: { id: string }) {
    const [nft, setNFt] = useState<NFTCardProps | null>(null);
    const { marketplaceData, metadata, isLoading: nftLoading } = useNFTData(id);
    const {filter, setFilter} = useContext(nftContext)
  
    useEffect(() => {
      
      setNFt({ ...marketplaceData, ...metadata, id: id , tags:metadata?.tags});
     
    }, [nftLoading, id, marketplaceData, metadata]);

    if(filter.length > 0 && nft?.tags && nft?.tags.split(',').some((tag) => filter.some((f) =>{
      console.log(tag, f)
      return !tag.includes(f) || !f.includes(tag)
    }))){
      return ""
    }
  
    return (
      <MarketNFTCARD
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
        date={nft?.date}
        tags={nft?.tags}
      />
    );
  }
  