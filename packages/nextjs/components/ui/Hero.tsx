import React from 'react'

function Hero() {
    return (
        <div>
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-950 dark:to-indigo-950">
                </div><div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8"><div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Buy and Sell AI Prompts Securely on the Blockchain</h1>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">Discover high-quality AI prompts, sell your own creations, and join a thriving community of prompt engineers.</p><div className="mt-10 flex items-center justify-center gap-x-6">
                        <a href="/browse">
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-full">Browse Prompts</button>
                        </a><a href="/sell"><button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 rounded-full">Sell Prompts
                        </button></a>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Hero