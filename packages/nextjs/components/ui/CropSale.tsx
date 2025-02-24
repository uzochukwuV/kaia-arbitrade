function CropSale() {
  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Featured Stocks</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/*  */}
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm group relative overflow-hidden transition-all hover:shadow-lg"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Code Refactoring Assistant</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Improve your code quality with smart refactoring suggestions.
                  </p>
                </div>
                <div
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  data-v0-t="badge"
                >
                  Programming
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <div className="flex items-center gap-1 text-yellow-500">
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
                  className="lucide lucide-star h-4 w-4 fill-current"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span className="text-sm font-medium">4.7</span>
              </div>
            </div>
            <div className="p-6 pt-0 flex justify-between items-center">
              <span className="text-lg font-bold">0.15 ETH</span>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CropSale;

function Crop() {
  return (
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm group relative overflow-hidden transition-all hover:shadow-lg"
      data-v0-t="card"
    >
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-semibold leading-none tracking-tight">SEO Content Optimizer</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Create SEO-optimized content that ranks well on search engines.
            </p>
          </div>
          <div
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
            data-v0-t="badge"
          >
            Marketing
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="flex items-center gap-1 text-yellow-500">
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
            className="lucide lucide-star h-4 w-4 fill-current"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span className="text-sm font-medium">4.9</span>
        </div>
      </div>
      <div className="p-6 pt-0 flex justify-between items-center">
        <span className="text-lg font-bold">0.08 ETH</span>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Buy Now
        </button>
      </div>
    </div>
  );
}
