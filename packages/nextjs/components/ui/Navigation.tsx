import Link from "next/link";
import { FaucetButton, RainbowKitCustomConnectButton } from "../scaffold-eth";
import { hardhat } from "viem/chains";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";

function Navigation() {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  //   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  //   const burgerMenuRef = useRef<HTMLDivElement>(null);

  //   useOutsideClick(
  //     burgerMenuRef,
  //     useCallback(() => setIsDrawerOpen(false), []),
  //   );
  return (
    <div className=" mx-auto">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">PromptMarket</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/explore" className="transition-colors hover:text-foreground/80 text-foreground">
                Browse
              </Link>
              <Link href="/governance" className="transition-colors hover:text-foreground/80 text-foreground">
                Governance
              </Link>
              <Link href="/mint" className="transition-colors hover:text-foreground/80 text-foreground">
                Mint
              </Link>
              <Link href="/profile" className="transition-colors hover:text-foreground/80 text-foreground">
                Profile
              </Link>
              <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground">
                Dashboard
              </Link>
            </nav>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-10 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r0:"
            data-state="closed"
          >
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
              className="lucide lucide-menu h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </button>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
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
                  className="lucide lucide-search absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8 md:w-[300px] lg:w-[400px]"
                  placeholder="Search prompts..."
                />
              </div>
            </div>
            <RainbowKitCustomConnectButton />
            {isLocalNetwork && <FaucetButton />}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navigation;
