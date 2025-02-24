"use client";

import type { NextPage } from "next";


import FootBar from "~~/components/ui/FootBar";
import Link from "next/link";

const Home: NextPage = () => {

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
    <div className="relative overflow-hidden">
        <div
            className="absolute inset-0 bg-[url('/placeholder.svg?height=600&amp;width=1200')] bg-cover bg-center opacity-10">
        </div>
        <div className="container mx-auto px-4 py-20 relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800 hover:bg-green-100 px-4 py-1 text-sm"
                    data-v0-t="badge">Welcome to the Future of Agricultural Trading</div>
                <h1
                    className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Decentralized Crop Trading, Reimagined</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Trade agricultural assets securely with
                    NFTs,
                    backed by a robust governance system and decentralized dispute resolution.</p>
                <div className="flex gap-4 justify-center">
                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-11 rounded-md px-8 bg-green-600 hover:bg-green-700">Start
                        Trading<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-5 w-5">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </button>
                    <Link href={"/airdrop"}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8">
                         Go to Airdrop
                    </Link>
                </div>
            </div>
        </div>
    </div>
    <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rounded-lg border text-card-foreground border-none shadow-md bg-white/50 backdrop-blur"
                data-v0-t="card">
                <div className="p-6">
                    <div className="text-3xl font-bold">$2.4M</div>
                    <div className="text-sm text-muted-foreground">Total Volume</div>
                </div>
            </div>
            <div className="rounded-lg border text-card-foreground border-none shadow-md bg-white/50 backdrop-blur"
                data-v0-t="card">
                <div className="p-6">
                    <div className="text-3xl font-bold">1,234</div>
                    <div className="text-sm text-muted-foreground">Active Listings</div>
                </div>
            </div>
            <div className="rounded-lg border text-card-foreground border-none shadow-md bg-white/50 backdrop-blur"
                data-v0-t="card">
                <div className="p-6">
                    <div className="text-3xl font-bold">8,392</div>
                    <div className="text-sm text-muted-foreground">Successful Trades</div>
                </div>
            </div>
            <div className="rounded-lg border text-card-foreground border-none shadow-md bg-white/50 backdrop-blur"
                data-v0-t="card">
                <div className="p-6">
                    <div className="text-3xl font-bold">156</div>
                    <div className="text-sm text-muted-foreground">Active Resolvers</div>
                </div>
            </div>
        </div>
    </div>
    <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose CropSwap?</h2>
            <p className="text-muted-foreground">A revolutionary platform combining traditional agriculture with
                blockchain
                technology</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg border text-card-foreground border-none shadow-lg bg-white" data-v0-t="card">
                <div className="p-6 space-y-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="lucide lucide-sprout h-12 w-12 text-green-600">
                        <path d="M7 20h10"></path>
                        <path d="M10 20c5.5-2.5.8-6.4 3-10"></path>
                        <path
                            d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z">
                        </path>
                        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z">
                        </path>
                    </svg>
                    <h3 className="text-xl font-semibold">NFT-Based Trading</h3>
                    <p className="text-muted-foreground">Convert your agricultural assets into NFTs for secure and
                        transparent trading</p>
                </div>
            </div>
            <div className="rounded-lg border text-card-foreground border-none shadow-lg bg-white" data-v0-t="card">
                <div className="p-6 space-y-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="lucide lucide-shield h-12 w-12 text-green-600">
                        <path
                            d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z">
                        </path>
                    </svg>
                    <h3 className="text-xl font-semibold">Secure Transactions</h3>
                    <p className="text-muted-foreground">Built-in escrow system ensures safe transactions between buyers
                        and
                        sellers</p>
                </div>
            </div>
            <div className="rounded-lg border text-card-foreground border-none shadow-lg bg-white" data-v0-t="card">
                <div className="p-6 space-y-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="lucide lucide-users h-12 w-12 text-green-600">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <h3 className="text-xl font-semibold">Community Governance</h3>
                    <p className="text-muted-foreground">Decentralized dispute resolution system powered by community
                        resolvers</p>
                </div>
            </div>
        </div>
    </div>
    <div className="bg-green-50 py-20">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center space-y-4">
                    <div
                        className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto text-xl font-bold">
                        1</div>
                    <h3 className="text-xl font-semibold">List Your Crops</h3>
                    <p className="text-muted-foreground">Convert your agricultural assets into NFTs</p>
                </div>
                <div className="text-center space-y-4">
                    <div
                        className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto text-xl font-bold">
                        2</div>
                    <h3 className="text-xl font-semibold">Set Your Terms</h3>
                    <p className="text-muted-foreground">Define pricing and trading conditions</p>
                </div>
                <div className="text-center space-y-4">
                    <div
                        className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto text-xl font-bold">
                        3</div>
                    <h3 className="text-xl font-semibold">Secure Trading</h3>
                    <p className="text-muted-foreground">Trade with confidence using our escrow system</p>
                </div>
                <div className="text-center space-y-4">
                    <div
                        className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto text-xl font-bold">
                        4</div>
                    <h3 className="text-xl font-semibold">Complete Delivery</h3>
                    <p className="text-muted-foreground">Confirm delivery and release payment</p>
                </div>
            </div>
        </div>
    </div>
    <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold">Trusted by Farmers Worldwide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-2 text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-check h-5 w-5 text-green-600">
                        <path d="M20 6 9 17l-5-5"></path>
                    </svg><span>Transparent dispute resolution</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-check h-5 w-5 text-green-600">
                        <path d="M20 6 9 17l-5-5"></path>
                    </svg><span>Secure payment system</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-check h-5 w-5 text-green-600">
                        <path d="M20 6 9 17l-5-5"></path>
                    </svg><span>Verified traders</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-check h-5 w-5 text-green-600">
                        <path d="M20 6 9 17l-5-5"></path>
                    </svg><span>Community governance</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-check h-5 w-5 text-green-600">
                        <path d="M20 6 9 17l-5-5"></path>
                    </svg><span>Real-time tracking</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-check h-5 w-5 text-green-600">
                        <path d="M20 6 9 17l-5-5"></path>
                    </svg><span>24/7 support</span></div>
            </div>
            <div className="pt-8"><button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-11 rounded-md px-8 bg-green-600 hover:bg-green-700">Join
                    CropSwap Today<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-leaf ml-2 h-5 w-5">
                        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z">
                        </path>
                        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                    </svg></button></div>
        </div>
    </div>
    <div className="bg-gradient-to-t from-green-50 to-white py-20">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Recent Listings</h2><button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">View
                    All<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-arrow-right ml-2 h-4 w-4">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </svg></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
                    data-v0-t="card">
                    <div className="aspect-video relative bg-green-100">
                        <div
                            className="absolute inset-0 bg-[url('/placeholder.svg?height=200&amp;width=400')] bg-cover bg-center">
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-semibold">Premium Wheat Harvest</h3>
                                <p className="text-sm text-muted-foreground">Grade A Quality</p>
                            </div>
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                                data-v0-t="badge">1000 CROP</div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round" className="lucide lucide-bar-chart3 h-4 w-4">
                                <path d="M3 3v18h18"></path>
                                <path d="M18 17V9"></path>
                                <path d="M13 17V5"></path>
                                <path d="M8 17v-3"></path>
                            </svg><span>High Demand</span></div>
                    </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
                    data-v0-t="card">
                    <div className="aspect-video relative bg-green-100">
                        <div
                            className="absolute inset-0 bg-[url('/placeholder.svg?height=200&amp;width=400')] bg-cover bg-center">
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-semibold">Premium Wheat Harvest</h3>
                                <p className="text-sm text-muted-foreground">Grade A Quality</p>
                            </div>
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                                data-v0-t="badge">1000 CROP</div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round" className="lucide lucide-bar-chart3 h-4 w-4">
                                <path d="M3 3v18h18"></path>
                                <path d="M18 17V9"></path>
                                <path d="M13 17V5"></path>
                                <path d="M8 17v-3"></path>
                            </svg><span>High Demand</span></div>
                    </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
                    data-v0-t="card">
                    <div className="aspect-video relative bg-green-100">
                        <div
                            className="absolute inset-0 bg-[url('/placeholder.svg?height=200&amp;width=400')] bg-cover bg-center">
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-semibold">Premium Wheat Harvest</h3>
                                <p className="text-sm text-muted-foreground">Grade A Quality</p>
                            </div>
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                                data-v0-t="badge">1000 CROP</div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round" className="lucide lucide-bar-chart3 h-4 w-4">
                                <path d="M3 3v18h18"></path>
                                <path d="M18 17V9"></path>
                                <path d="M13 17V5"></path>
                                <path d="M8 17v-3"></path>
                            </svg><span>High Demand</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

      <FootBar />
    </>
  );
};

export default Home;
