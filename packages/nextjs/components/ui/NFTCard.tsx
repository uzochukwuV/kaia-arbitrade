import { FC } from "react";
import Image from "next/image";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { NFTCardProps } from "~~/types/nft";

const NFTCard: FC<NFTCardProps> = ({
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
  onClick,
}) => {
  const { writeContractAsync } = useScaffoldWriteContract({ contractName: "CropMarketplace" });
  const { address: connectedAddress } = useAccount();
  const { writeContractAsync: Approve } = useScaffoldWriteContract({ contractName: "CropCoin" });
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
  };

  const handleCollectPayment = async () => {
    if (writeContractAsync) {
      try {
        await writeContractAsync(
          {
            functionName: "get_payment",
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
  };

  const handleMarkasDelivered = async () => {
    const isPayer = payer == connectedAddress;
    if (writeContractAsync) {
      try {
        await writeContractAsync(
          {
            functionName: "mark_as_delivered",
            args: [BigInt(id), isPayer],
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
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden" data-v0-t="card">
      <div className=" aspect-square relative bg-muted">
        <Image
          src={image!}
          width={800}
          height={1000}
          objectFit="cover"
          alt={name || ""}
          className="absolute inset-0  aspect-square bg-cover bg-center "
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {description && (
                <p className="text-sm text-base-content/70 leading-relaxed line-clamp-2">
                  {description} {tags}
                </p>
              )}
            </p>
          </div>
          {price && <span className="text-sm font-semibold text-black">{formatEther(price)} Crop</span>}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <div
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
            data-v0-t="badge"
          >
            Organic
          </div>
          <div
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
            data-v0-t="badge"
          >
            Premium
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {payedFor && <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">Paid</span>}
          {booked && <span className="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs">Booked</span>}
          {payerChecked && (
            <span className="px-2 py-1 bg-info/20 text-info rounded-full text-xs">Payer Verified ✓</span>
          )}
          {buyerChecked && (
            <span className="px-2 py-1 bg-info/20 text-info rounded-full text-xs">Buyer Verified ✓</span>
          )}
          {payerChecked && !buyerChecked && (
            <span className="px-2 py-1 bg-info/20 text-info rounded-full text-xs">Awaiting Owner Confirmation</span>
          )}
          {!payerChecked && buyerChecked && (
            <span className="px-2 py-1 bg-info/20 text-info rounded-full text-xs">Awaiting Buyer Confirmation</span>
          )}
        </div>
      </div>
      <div className="items-center p-4 pt-0 flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
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
            className="lucide lucide-star h-4 w-4 mr-1 fill-yellow-400 stroke-yellow-400"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          {quantity}
        </div>

        {!payedFor && price && owner != connectedAddress && (
          <button
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Buy Now ({formatEther(price)} ETH)
          </button>
        )}
        {payer == connectedAddress && price && !payerChecked && payedFor && (
          <button
            onClick={handleMarkasDelivered}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Mark as Delivered ✓
          </button>
        )}
        {owner == connectedAddress && price && !buyerChecked && payedFor && (
          <button
            onClick={handleMarkasDelivered}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Mark as Delivered ✓
          </button>
        )}
        {(payerChecked && !buyerChecked) ||
          (!payerChecked && buyerChecked && (
            <button
              onClick={() => {console.log("dispute")}}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Dispute
            </button>
          ))}
        {payerChecked && buyerChecked && owner == connectedAddress && (
          <button
            onClick={handleCollectPayment}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Collect Payment
          </button>
        )}
      </div>
    </div>
  );
};

export default NFTCard;
