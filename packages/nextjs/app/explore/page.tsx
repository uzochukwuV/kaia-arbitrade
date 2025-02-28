"use client";

import { LoaderIcon } from "react-hot-toast";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { MarketNFTState } from "~~/components/ui/MarketNftState";
import { useState } from "react";
import { nftContext } from "~~/utils/context";

export default function MarketplacePage() {
  const [filter, setFilter] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data, isFetching } = useScaffoldReadContract({
    contractName: "KaiMarket",
    functionName: "get_listings",
    args: [BigInt(0), BigInt(10)],
  });

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement>, value: string, value1: string) => {
    e.preventDefault(); // Prevent default button behavior
    if (!value || !value1) return; // Guard clause for empty values

    e.currentTarget.classList.toggle("bg-primary");
    
    setFilter((prev) => {
      const value1Lower = value1.toLowerCase();
      const valueLower = value.toLowerCase();
      
      // Check if either value exists in current filters
      const valueExists = prev.some(filter => 
        filter === valueLower || filter === value1Lower
      );

      if (valueExists) {
        // Remove both values if they exist
        return prev.filter(filter => 
          filter !== valueLower && filter !== value1Lower
        );
      } else {
        // Add both values if they don't exist
        return [...prev, valueLower, value1Lower];
      }
    });
  };

  return (
    <nftContext.Provider value={{ filter, setFilter }}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Digital Marketplace</h1>
              <p className="text-muted-foreground text-lg">Discover unique digital assets</p>
            </div>
            
            {/* View Toggle Buttons */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-background'}`}
                aria-label="Grid View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-background'}`}
                aria-label="List View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search and Sort Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <input
                type="search"
                placeholder="Search items..."
                className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            
            <select className="h-12 px-4 rounded-lg border border-gray-200 bg-white min-w-[200px]">
              <option value="recent">Recently Added</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            {/* Filters Panel */}
            <aside className="hidden md:block space-y-6 sticky top-4">
              {/* ... Your existing filter components ... */}
            </aside>

            {/* Items Grid */}
            <main>
              {isFetching ? (
                <div className="flex justify-center items-center h-64">
                  <LoaderIcon className="w-8 h-8 animate-spin" />
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {data?.map((i: any) => {
                    if (i == BigInt(0)) return null;
                    return <MarketNFTState key={i} id={i.toString()} />;
                  })}
                </div>
              )}
              
              {data?.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">No items available</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </nftContext.Provider>
  );
}
