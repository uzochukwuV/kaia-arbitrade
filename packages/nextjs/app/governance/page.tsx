"use client"
import React, { useEffect, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'
import { useAccount, useWriteContract } from 'wagmi'
import { useScaffoldReadContract, useTargetNetwork } from '~~/hooks/scaffold-eth'
import DeployedContracts from "~~/contracts/deployedContracts";


function Governance() {
    enum TabState {
        Dashboard,
        Dispute,
        History
    }

    const [tab, setTab] = useState<TabState>(TabState.Dashboard)
    return (
        <div>
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">CropSwap Governance</h1>
                    <p className="text-muted-foreground">Participate in dispute resolution and earn rewards</p>
                </div>
                <div dir="ltr" data-orientation="horizontal" className="space-y-4">
                    <div role="tablist" aria-orientation="horizontal"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 outline-none text-muted-foreground"
                        tabIndex={0} data-orientation="horizontal" >
                        <button onClick={() => setTab(TabState.Dashboard)} type="button" role="tab"
                            aria-selected="true" aria-controls="radix-:r0:-content-resolver" data-state="active"
                            id="radix-:r0:-trigger-resolver"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                            tabIndex={0} data-orientation="horizontal" data-radix-collection-item="">Resolver
                            Dashboard
                        </button>
                        <button onClick={() => setTab(TabState.Dispute)} type="button" role="tab" aria-selected="false"
                            aria-controls="radix-:r0:-content-disputes" data-state="inactive" id="radix-:r0:-trigger-disputes"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                            tabIndex={-1} data-orientation="horizontal" data-radix-collection-item="">Active
                            Disputes
                        </button>
                        <button onClick={() => setTab(TabState.History)} type="button" role="tab" aria-selected="false"
                            aria-controls="radix-:r0:-content-history" data-state="inactive" id="radix-:r0:-trigger-history"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                            tabIndex={-1} data-orientation="horizontal" data-radix-collection-item="">
                            History
                        </button>
                    </div>

                    {
                        tab === TabState.Dashboard ? <Dashboard /> : tab === TabState.Dispute ? <ActiveDispute /> : <History />
                    }

                    <div data-state="inactive" data-orientation="horizontal" role="tabpanel"
                        aria-labelledby="radix-:r0:-trigger-disputes" id="radix-:r0:-content-disputes" tabIndex={0}
                        className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4"
                    ></div>
                    <div data-state="inactive" data-orientation="horizontal" role="tabpanel"
                        aria-labelledby="radix-:r0:-trigger-history" id="radix-:r0:-content-history" tabIndex={0}
                        className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4"
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default Governance



function ActiveDispute() {
    return (
        <div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Active Disputes</h3>
                    <p className="text-sm text-muted-foreground">Vote on open disputes to earn rewards</p>
                </div>
                <div className="p-6 pt-0">
                    <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-triangle-alert h-4 w-4 text-yellow-500">
                                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                                    <path d="M12 9v4"></path>
                                    <path d="M12 17h.01"></path>
                                </svg><span className="font-medium">Dispute #123</span></div>
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                                    data-v0-t="badge">Open for Voting</div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">NFT ID: #456 | Amount: 1000 CROP</p>
                                <div className="flex gap-2"><button
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">Vote
                                    for Buyer</button><button
                                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">Vote
                                        for Seller</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




function History() {
    return (
        <div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Resolution History</h3>
                    <p className="text-sm text-muted-foreground">Your past dispute resolutions and rewards</p>
                </div>
                <div className="p-6 pt-0">
                    <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-gavel h-4 w-4 text-green-500">
                                    <path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"></path>
                                    <path d="m16 16 6-6"></path>
                                    <path d="m8 8 6-6"></path>
                                    <path d="m9 7 8 8"></path>
                                    <path d="m21 11-8-8"></path>
                                </svg><span className="font-medium">Dispute #122</span></div>
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground bg-green-50"
                                    data-v0-t="badge">Resolved</div>
                            </div>
                            <p className="text-sm text-muted-foreground">Voted: Buyer | Outcome: Buyer Won | Reward: 50 CROP</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function Dashboard() {

    const { address: userAddress } = useAccount()
    const { targetNetwork } = useTargetNetwork();

    const { data, error, isFetching, isLoading } = useScaffoldReadContract({
        contractName: "CropMarketplace",
        functionName: "user_govern_data",
        args: [userAddress],
    })
    useEffect(() => {
        console.log(data)
    })
    const { isPending, writeContractAsync } = useWriteContract();

    const handleBecomeResolver = async () => {
        if (writeContractAsync) {
            try {
                const makeWriteWithParams = () =>
                    writeContractAsync({
                        address: DeployedContracts[31337].CropMarketplace.address,
                        abi: DeployedContracts[31337].CropMarketplace.abi,
                        functionName: "registerResolver",
                    });
                await writeTxn(makeWriteWithParams);

            } catch (e: any) {
                console.error("⚡️ ~ file: WriteOnlyFunctionForm.tsx:handleWrite ~ error", e);
            }
        }
    }
    return (
        <div>
            <div data-state="active" data-orientation="horizontal" role="tabpanel"
                aria-labelledby="radix-:r0:-trigger-resolver" id="radix-:r0:-content-resolver" tabIndex={0}
                className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4"
            >
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium">Resolver Status</h3><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-shield h-4 w-4 text-muted-foreground">
                                <path
                                    d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z">
                                </path>
                            </svg>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="flex items-center gap-2">
                                {isFetching ? <LoaderIcon /> :
                                    data?.isResolver ? <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                                        data-v0-t="badge">Registered</div> : <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                                            data-v0-t="badge">Not Registered</div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium">Staked Amount</h3><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-award h-4 w-4 text-muted-foreground">
                                <path
                                    d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526">
                                </path>
                                <circle cx="12" cy="8" r="6"></circle>
                            </svg>
                        </div>
                        <div className="p-6 pt-0">

                            {isFetching ? <LoaderIcon /> :
                                <div className="text-2xl font-bold">{data?.staked.toString()} CROP</div>
                            }
                            <p className="text-xs text-muted-foreground">Minimum Required: 1000 CROP</p>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium">Earned Rewards</h3><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-award h-4 w-4 text-muted-foreground">
                                <path
                                    d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526">
                                </path>
                                <circle cx="12" cy="8" r="6"></circle>
                            </svg>
                        </div>
                        <div className="p-6 pt-0">
                            {isFetching ? <LoaderIcon /> :
                                <div className="text-2xl font-bold">{data?.reward.toString()} CROP</div>
                            }
                            <p className="text-xs text-muted-foreground">From successful resolutions</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="text-2xl font-semibold leading-none tracking-tight">Become a Resolver</h3>
                        <p className="text-sm text-muted-foreground">Stake CROP tokens to participate in dispute resolution and
                            earn rewards</p>
                    </div>
                    <div className="p-6 pt-0 space-y-4">
                        <div className="space-y-2"><input
                            onClick={handleBecomeResolver}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Amount to stake (min. 1000 CROP)" type="number" /><button
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">Register
                                as Resolver</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
function writeTxn(makeWriteWithParams: () => Promise<`0x${string}`>) {
    throw new Error('Function not implemented.')
}

