'use client';
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import NFTCard from "~~/components/ui/NFTCard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { NFTCardProps, NFTMetaData } from "~~/types/nft";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";


export default function ExplorePage() {
    const { data, isFetching } = useScaffoldReadContract({
        contractName: "CropMarketplace",
        functionName: "get_listings",
        args: [BigInt(0), BigInt(10)]
    })

    return (
        <>
            {/*  */}
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Explore Market</h1>
                            <p className="text-muted-foreground">Discover and trade agricultural products</p>
                        </div>
                        <div className="flex items-center gap-2"><button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground h-10 w-10 bg-accent">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-grid2x2 h-4 w-4">
                                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                                <path d="M3 12h18"></path>
                                <path d="M12 3v18"></path>
                            </svg></button><button
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-list h-4 w-4">
                                    <line x1="8" x2="21" y1="6" y2="6"></line>
                                    <line x1="8" x2="21" y1="12" y2="12"></line>
                                    <line x1="8" x2="21" y1="18" y2="18"></line>
                                    <line x1="3" x2="3.01" y1="6" y2="6"></line>
                                    <line x1="3" x2="3.01" y1="12" y2="12"></line>
                                    <line x1="3" x2="3.01" y1="18" y2="18"></line>
                                </svg></button><button
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 md:hidden"
                                    type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r0:"
                                    data-state="closed">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="lucide lucide-filter h-4 w-4 mr-2">
                                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                                </svg>Filters</button></div>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center mb-8">
                        <div className="relative flex-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-search absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </svg><input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                                placeholder="Search products..." /></div><button type="button" role="combobox"
                                    aria-controls="radix-:r5:" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed"
                                    className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 w-[180px]">
                            <span
                            >Latest Listed
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                                aria-hidden="true">
                                <path d="m6 9 6 6 6-6"></path>
                            </svg></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                        <div className="hidden md:block">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="font-semibold">Price Range</div>
                                    <span dir="ltr" data-orientation="horizontal"
                                        aria-disabled="false" className="relative flex touch-none select-none items-center w-full"
                                    >
                                        <span
                                            data-orientation="horizontal"
                                            className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                                            <span
                                                data-orientation="horizontal" className="absolute left-0 right-0 h-full bg-primary"
                                            >
                                            </span>
                                        </span>
                                        <span
                                            className=" -translate-x-[50%] absolute left-0"
                                        >
                                            <span
                                                role="slider" tabIndex={0}
                                                className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

                                            >
                                            </span>
                                        </span>
                                    </span>
                                    <div className="flex items-center justify-between text-sm">
                                        <span>$0

                                        </span>
                                        <span>$1000
                                        </span></div>
                                </div>
                                <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
                                <div className="space-y-4">
                                    <div className="font-semibold">Categories</div>
                                    <div dir="ltr" className="relative overflow-hidden h-[200px]"
                                    >

                                        <div data-radix-scroll-area-viewport="" className="h-full overflow-x-hidden overflow-y-scroll w-full rounded-[inherit]"
                                        >
                                            <div className=" min-h-[100%] table" >
                                                <div className="space-y-2">
                                                    <label
                                                        className="flex items-center space-x-2 cursor-pointer"><button type="button"
                                                            role="checkbox" aria-checked="false" data-state="unchecked" value="on"
                                                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                                            id="Grains &amp; Cereals">

                                                        </button>
                                                        <span className="text-sm">Grains &amp;
                                                            Cereals

                                                        </span>

                                                    </label>
                                                    <label
                                                        className="flex items-center space-x-2 cursor-pointer"><button type="button"
                                                            role="checkbox" aria-checked="false" data-state="unchecked" value="on"
                                                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                                            id="Fruits &amp; Vegetables"></button>
                                                        <span className="text-sm">Fruits &amp;
                                                            Vegetables
                                                        </span>

                                                    </label><label
                                                        className="flex items-center space-x-2 cursor-pointer"><button type="button"
                                                            role="checkbox" aria-checked="false" data-state="unchecked" value="on"
                                                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                                            id="Livestock &amp; Dairy"></button>
                                                        <span className="text-sm">Livestock
                                                            &amp; Dairy
                                                        </span>

                                                    </label><label
                                                        className="flex items-center space-x-2 cursor-pointer"><button type="button"
                                                            role="checkbox" aria-checked="false" data-state="unchecked" value="on"
                                                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                                            id="Seeds &amp; Seedlings"></button>
                                                        <span className="text-sm">Seeds &amp;
                                                            Seedlings

                                                        </span>
                                                    </label>
                                                    <label
                                                        className="flex items-center space-x-2 cursor-pointer"><button type="button"
                                                            role="checkbox" aria-checked="false" data-state="unchecked" value="on"
                                                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                                            id="Organic Produce"></button>
                                                        <span className="text-sm">Organic
                                                            Produce
                                                        </span>

                                                    </label><label
                                                        className="flex items-center space-x-2 cursor-pointer"><button type="button"
                                                            role="checkbox" aria-checked="false" data-state="unchecked" value="on"
                                                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                                            id="Specialty Crops"></button>
                                                        <span className="text-sm">Specialty
                                                            Crops
                                                        </span>
                                                    </label></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
                                <div className="space-y-4">
                                    <div className="font-semibold">Certification</div>
                                    <div className="space-y-2"><label className="flex items-center space-x-2 cursor-pointer"><button
                                        type="button" role="checkbox" aria-checked="false" data-state="unchecked" value="on"
                                        className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                        id="Organic"></button>
                                        <span className="text-sm">Organic
                                        </span>
                                    </label><label
                                        className="flex items-center space-x-2 cursor-pointer"><button type="button" role="checkbox"
                                            aria-checked="false" data-state="unchecked" value="on"
                                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                            id="Fair Trade"></button>
                                            <span className="text-sm">Fair Trade
                                            </span>
                                        </label><label
                                            className="flex items-center space-x-2 cursor-pointer"><button type="button" role="checkbox"
                                                aria-checked="false" data-state="unchecked" value="on"
                                                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                                id="Non-GMO"></button>
                                            <span className="text-sm">Non-GMO
                                            </span>
                                        </label><label
                                            className="flex items-center space-x-2 cursor-pointer"><button type="button" role="checkbox"
                                                aria-checked="false" data-state="unchecked" value="on"
                                                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                                id="Kosher"></button>
                                            <span className="text-sm">Kosher
                                            </span>
                                        </label><label
                                            className="flex items-center space-x-2 cursor-pointer"><button type="button" role="checkbox"
                                                aria-checked="false" data-state="unchecked" value="on"
                                                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                                id="Halal"></button>
                                            <span className="text-sm">Halal
                                            </span>
                                        </label></div>
                                </div>
                                <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
                                <div className="space-y-4">
                                    <div className="font-semibold">Quality Grade</div>
                                    <div className="space-y-2"><label className="flex items-center space-x-2 cursor-pointer"><button
                                        type="button" role="checkbox" aria-checked="false" data-state="unchecked" value="on"
                                        className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                        id="Premium"></button>
                                        <span className="text-sm">Premium
                                        </span>
                                    </label><label
                                        className="flex items-center space-x-2 cursor-pointer"><button type="button" role="checkbox"
                                            aria-checked="false" data-state="unchecked" value="on"
                                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                            id="Standard"></button>
                                            <span className="text-sm">Standard
                                            </span>
                                        </label><label
                                            className="flex items-center space-x-2 cursor-pointer"><button type="button" role="checkbox"
                                                aria-checked="false" data-state="unchecked" value="on"
                                                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                                id="Economy"></button>
                                            <span className="text-sm">Economy
                                            </span>
                                        </label></div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-2">
                                <div className="rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-1"
                                    data-v0-t="badge">Price: $0 - $1000
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round"
                                        className="lucide lucide-x h-3 w-3 cursor-pointer">
                                        <path d="M18 6 6 18"></path>
                                        <path d="m6 6 12 12"></path>
                                    </svg></div>
                                <div className="rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-1"
                                    data-v0-t="badge">Organic
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round"
                                        className="lucide lucide-x h-3 w-3 cursor-pointer">
                                        <path d="M18 6 6 18"></path>
                                        <path d="m6 6 12 12"></path>
                                    </svg></div>
                                <div className="rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-1"
                                    data-v0-t="badge">Premium
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round"
                                        className="lucide lucide-x h-3 w-3 cursor-pointer">
                                        <path d="M18 6 6 18"></path>
                                        <path d="m6 6 12 12"></path>
                                    </svg></div>
                            </div>
                            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {/*  */}

                                {isFetching ? (
                                    <div className="flex justify-center items-center h-64">
                                        <LoaderIcon />
                                    </div>
                                ) : (


                                    data?.map((i: any) => {
                                        if (i == BigInt(0)) return;
                                        return <MarketNFTState key={i} id={i.toString()} />
                                    })


                                )}
                                {data?.length === 0 && (
                                    <div className="text-center py-10">
                                        <p className="text-gray-500">No farm produce NFTs available</p>
                                    </div>
                                )}

                                {/* end */}
                                {/* <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
                        data-v0-t="card">
                        <div className="">
                            <div className="aspect-square relative bg-muted">
                                <div
                                    className="absolute inset-0 bg-[url('/placeholder.svg?height=200&amp;width=200')] bg-cover bg-center">
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold">Premium Wheat Harvest</h3>
                                        <p className="text-sm text-muted-foreground">Grade A Quality</p>
                                    </div>
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                                        data-v0-t="badge">1000 CROP</div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                        data-v0-t="badge">Organic</div>
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                        data-v0-t="badge">Premium</div>
                                </div>
                            </div>
                            <div className="items-center p-4 pt-0 flex justify-between">
                                <div className="flex items-center text-sm text-muted-foreground">
                                <svg
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-star h-4 w-4 mr-1 fill-yellow-400 stroke-yellow-400">
                                        <polygon
                                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                                        </polygon>
                                    </svg>4.9 (128)</div><button
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">View
                                    Details</button>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
                        data-v0-t="card">
                        <div className="">
                            <div className="aspect-square relative bg-muted">
                                <div
                                    className="absolute inset-0 bg-[url('/placeholder.svg?height=200&amp;width=200')] bg-cover bg-center">
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold">Premium Wheat Harvest</h3>
                                        <p className="text-sm text-muted-foreground">Grade A Quality</p>
                                    </div>
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                                        data-v0-t="badge">1000 CROP</div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                        data-v0-t="badge">Organic</div>
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                        data-v0-t="badge">Premium</div>
                                </div>
                            </div>
                            <div className="items-center p-4 pt-0 flex justify-between">
                                <div className="flex items-center text-sm text-muted-foreground">
                                <svg
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-star h-4 w-4 mr-1 fill-yellow-400 stroke-yellow-400">
                                        <polygon
                                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                                        </polygon>
                                    </svg>4.9 (128)</div><button
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">View
                                    Details</button>
                            </div>
                        </div>
                    </div> */}


                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </>
    );
}

export function MarketNFTState({ id }: { id: string }) {
    const [nft, setNFt] = useState<NFTCardProps | null>(null)
    const { marketplaceData, metadata, isLoading: nftLoading } = useNFTData(id);

    useEffect(() => {
        console.log({ ...marketplaceData, ...metadata })
        setNFt({ ...marketplaceData, ...metadata, id: id })
    }, [nftLoading, id, marketplaceData])

    return (
        <MarketNFTCARD
            key={nft?.id}
            id={nft?.id.toString()!}
            name={nft?.name}
            description={nft?.description}
            price={BigInt(nft?.price! || 0)}
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
    )
}



export function NFTState({ id }: { id: string }) {
    const [nft, setNFt] = useState<NFTCardProps | null>(null)
    const { marketplaceData, metadata, isLoading: nftLoading } = useNFTData(id);

    useEffect(() => {
        console.log({ ...marketplaceData, ...metadata })
        setNFt({ ...marketplaceData, ...metadata, id: id })
    }, [nftLoading, id, marketplaceData])

    return (
        <NFTCard
            key={nft?.id}
            id={nft?.id.toString()!}
            name={nft?.name}
            description={nft?.description}
            price={BigInt(nft?.price! || 0)}
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
    )
}






export function useNFTData(nftId: string) {
    const { data: tokenUri } = useScaffoldReadContract({
        contractName: "CropNft",
        functionName: "tokenURI",
        args: [BigInt(nftId)],
    });

    const { data: marketplaceData } = useScaffoldReadContract({
        contractName: "CropMarketplace",
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
                    body: JSON.stringify({ id: tokenUri })
                });
                const data = await response.json();
                console.log(data)
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
        error
    };
}





const MarketNFTCARD: FC<NFTCardProps> = ({
    id,
    name,
    image,
    price,
    owner,
    description,
    payer,
    payedFor,
    booked,
    payerChecked,
    buyerChecked,
    quantity,
    harvestDate,
    tags,
    onClick
}) => {

    const { data: result, isPending, writeContractAsync } = useScaffoldWriteContract({ contractName: "CropMarketplace" });
    const { address: connectedAddress } = useAccount()
    const { writeContractAsync: Approve, isPending: pendingApprove } = useScaffoldWriteContract({ contractName: "CropCoin" });
    const handleSubmit = async () => {
        try {
            await Approve(
                {
                    functionName: "approve",
                    args: [DeployedContracts[31337].CropMarketplace.address, parseEther("2.5")],
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
        if (writeContractAsync) {
            try {
                await writeContractAsync(
                    {
                        functionName: "payForStock",
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
    }
    return (

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
            data-v0-t="card">
            <div className="">
                <div className="aspect-square relative bg-muted">
                    {

                        image && <Image src={image} width={800} height={1000} objectFit="cover" alt={name || ""}
                            className={`absolute inset-0  aspect-square bg-cover bg-center`} />

                    }
                </div>
            </div>
            <div className="flex-1">
                <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            <h3 className="font-semibold">{name}</h3>
                            <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                            data-v0-t="badge">{formatEther(price!)} CROP</div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {
                            tags && tags.split(",").map((i) => {
                                return <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    data-v0-t="badge">{i}</div>
                            })
                        }
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            data-v0-t="badge">Premium</div>
                    </div>
                </div>
                <div className="items-center p-4 pt-0 flex justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">

                        <svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-star h-4 w-4 mr-1 fill-yellow-400 stroke-yellow-400">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                            </polygon>
                        </svg>
                        {harvestDate} {quantity}
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">

                        Buy
                    </button>
                </div>
            </div>
        </div>

    )
}

