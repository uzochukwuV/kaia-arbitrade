"use client"
import { useQuery } from '@tanstack/react-query';

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast';

import {  parseEther } from 'viem';
import { useAccount } from 'wagmi'
import { Crop } from '~~/components/ui/Crop';

import NFTMintingForm from '~~/components/ui/Mint';
import DeployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldReadContract, useScaffoldWriteContract, useTargetNetwork } from '~~/hooks/scaffold-eth';
import { NFTMetaData } from '~~/types/nft';
import { getParsedError, notification } from '~~/utils/scaffold-eth';
import { NFTState } from '../explore/page';

function Profile() {
    const {address:userAddress} = useAccount()
    const { targetNetwork } = useTargetNetwork();
    const [totalNft, setTotalNft] = useState(0)

    const {data, error, isFetching, isLoading }= useScaffoldReadContract({
        contractName: "CropNft",
        functionName:  "getAllUserNFT",
        args:[userAddress],
    })

    const {data:trade , isFetching:tradeLoading }= useScaffoldReadContract({
      contractName: "CropMarketplace",
      functionName:  "get_user_listing",
      args:[BigInt(10), userAddress],
  })

  const {data:purchase , isFetching:purchaseLoading }= useScaffoldReadContract({
    contractName: "CropMarketplace",
    functionName:  "get_user_purchase",
    args:[BigInt(10), userAddress],
})

    function toStriped(list:readonly  BigInt[]) {
        if(!list) return [];
        let x:BigInt[] = []
        for (let i = 0; i<list.length ; i++){
            if(list[i] == BigInt(0)){
                continue
            }
            x.push(list[i])
        }
        return x;
    }


     useEffect(() => {
        if (error) {
          const parsedError = getParsedError(error);
          notification.error(parsedError);
        }else{
            console.log(data)
            setTotalNft((prv)=> data?.length! + toStriped(trade!).length + toStriped(purchase!).length)
        }
      }, [error, isFetching, isLoading,data]);

   if (isFetching) {
    return <LoaderIcon  />
   }

   if (!userAddress) {
    return <div className=' text-center'><>Please connect wallet</></div>
   }

  return (<>

<div className="container mx-auto px-4 py-8 font-['Inter']">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold mb-2">My NFTs</h1>
            <p className="text-muted-foreground">Manage your agricultural assets and listings</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground px-4 py-1"
                data-v0-t="badge"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeLinecap="round" stroke-linecap="round" stroke-linejoin="round"
                    className="lucide lucide-package h-4 w-4 mr-2">
                    <path d="m7.5 4.27 9 5.15"></path>
                    <path
                        d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z">
                    </path>
                    <path d="m3.3 7 8.7 5 8.7-5"></path>
                    <path d="M12 22V12"></path>
                </svg>Total NFTs: {totalNft}</div>
            <div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground px-4 py-1"
                data-v0-t="badge"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeLinecap="round" stroke-linecap="round" stroke-linejoin="round"
                    className="lucide lucide-store h-4 w-4 mr-2">
                    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
                    <path d="M2 7h20"></path>
                    <path
                        d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7">
                    </path>
                </svg>Listed: {toStriped(trade!).length}</div>
                <div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground px-4 py-1"
                data-v0-t="badge"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeLinecap="round" stroke-linecap="round" stroke-linejoin="round"
                    className="lucide lucide-store h-4 w-4 mr-2">
                    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
                    <path d="M2 7h20"></path>
                    <path
                        d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7">
                    </path>
                </svg>In Stock: {toStriped(purchase!).length}</div>
        </div>
    </div>
    <div dir="ltr" data-orientation="horizontal" className="space-y-6">
        <div role="tablist" aria-orientation="horizontal"
            className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground"
            tabIndex={0} data-orientation="horizontal" ><button type="button" role="tab"
                aria-selected="true" aria-controls="radix-:r0:-content-owned" data-state="active"
                id="radix-:r0:-trigger-owned"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                tabIndex={0} data-orientation="horizontal" data-radix-collection-item="">Owned NFTs</button><button
                type="button" role="tab" aria-selected="false" aria-controls="radix-:r0:-content-listed"
                data-state="inactive" id="radix-:r0:-trigger-listed"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                tabIndex={-1} data-orientation="horizontal" data-radix-collection-item="">Listed</button><button
                type="button" role="tab" aria-selected="false" aria-controls="radix-:r0:-content-sold"
                data-state="inactive" id="radix-:r0:-trigger-sold"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                tabIndex={-1} data-orientation="horizontal" data-radix-collection-item="">Sold</button></div>
        <div data-state="active" data-orientation="horizontal" role="tabpanel"
            aria-labelledby="radix-:r0:-trigger-owned" id="radix-:r0:-content-owned" tabIndex={0}
            className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6"
           >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               
               {/*  */}
               {!isFetching &&
                    data?.map((i)=> <Crop id={i} key={i} />)
                }

                {!tradeLoading &&
                    trade?.map((i)=>{
                      if(i==BigInt(0)){
                        return ""
                      }
                      
                      return  <NFTState id={i.toString()} key={i} />
                    })
                }

                {!purchaseLoading &&
                    purchase?.map((i)=>{
                      if(i==BigInt(0)){
                        return ""
                      }
                      
                      return  <NFTState id={i.toString()} key={i} />
                    })
                }
               
            </div>
        </div>
        <div data-state="inactive" data-orientation="horizontal" role="tabpanel"
            aria-labelledby="radix-:r0:-trigger-listed" id="radix-:r0:-content-listed" tabIndex={0}
            className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6"
            ></div>
        <div data-state="inactive" data-orientation="horizontal" role="tabpanel"
            aria-labelledby="radix-:r0:-trigger-sold" id="radix-:r0:-content-sold" tabIndex={0}
            className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6"
            ></div>
    </div>
</div>
    
    </>
  )
}

export default Profile



