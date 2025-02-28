"use client";

import Link from "next/link";
import type { NextPage } from "next";
import FootBar from "~~/components/ui/FootBar";

const Home: NextPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&amp;width=1200')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto px-4 py-20 relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100 px-4 py-1 text-sm">
                Welcome to the Future of Digital Commerce
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Digital Marketplace, Reimagined
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Buy and sell digital products securely with blockchain technology, verified sellers, and
                automated transactions.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/marketplace"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-11 rounded-md px-8 bg-blue-600 hover:bg-blue-700"
                >
                  Start Shopping
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 h-5 w-5"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
                <Link
                  href="/sell"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8"
                >
                  Start Selling
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard title="$2.4M" subtitle="Total Volume" />
            <StatsCard title="1,234" subtitle="Active Listings" />
            <StatsCard title="8,392" subtitle="Completed Sales" />
            <StatsCard title="156" subtitle="Verified Sellers" />
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Marketplace?</h2>
            <p className="text-muted-foreground">
              A secure platform for buying and selling digital products
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="shield"
              title="Secure Transactions"
              description="Every transaction is protected by blockchain technology"
            />
            <FeatureCard
              icon="verify"
              title="Verified Sellers"
              description="All sellers are verified to ensure quality products"
            />
            <FeatureCard
              icon="instant"
              title="Instant Delivery"
              description="Receive your digital products immediately after purchase"
            />
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-blue-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StepCard number="1" title="Create Account" description="Sign up and verify your identity" />
              <StepCard number="2" title="List or Browse" description="Upload products or browse listings" />
              <StepCard number="3" title="Purchase" description="Buy securely with cryptocurrency" />
              <StepCard number="4" title="Delivery" description="Instant digital delivery" />
            </div>
          </div>
        </div>

        {/* Recent Listings */}
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Add your product cards here */}
          </div>
        </div>
      </div>

      <FootBar />
    </>
  );
};

// Helper Components
const StatsCard = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="rounded-lg border text-card-foreground border-none shadow-md bg-white/50 backdrop-blur">
    <div className="p-6">
      <div className="text-3xl font-bold">{title}</div>
      <div className="text-sm text-muted-foreground">{subtitle}</div>
    </div>
    </div>
);

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="rounded-lg border text-card-foreground border-none shadow-lg bg-white p-6 space-y-4">
    <div className="h-12 w-12 text-blue-600">{icon}</div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="text-center space-y-4">
    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto text-xl font-bold">
      {number}
    </div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Home;
