"use client";

import { useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { useAccount } from "wagmi";
import { useWriteContract } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useTransactor } from "~~/hooks/scaffold-eth";

export default function NFTMintingForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [havestDate, setHavestDate] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const { address: connectedAddress } = useAccount();
  const writeTxn = useTransactor();

  const { writeContractAsync } = useWriteContract();

  const createListNFT = async () => {
    try {
      if (!image) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", image);
      data.set("name", name);
      data.set("description", description);
      data.set("quantity", quantity);
      data.set("tags", tags);
      data.set("harvestDate", havestDate);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const ipfsUrl = await uploadRequest.json();

      setUploading(false);
      return ipfsUrl.jsonurl;
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
      return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = await createListNFT();

    if (url == "") {
      toast("Unable to Stage Image, check your internet connection");
      return;
    }
    if (writeContractAsync) {
      try {
        const makeWriteWithParams = () =>
          writeContractAsync({
            address: DeployedContracts[1001].KaiCoin.address,
            abi: DeployedContracts[1001].KaiCoin.abi,
            functionName: "safeMint",
            args: [connectedAddress!, url],
          });
        await writeTxn(makeWriteWithParams);
      } catch (e: any) {
        console.error("⚡️ ~ file: WriteOnlyFunctionForm.tsx:handleWrite ~ error", e);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl  p-8 backdrop-blur-xl  bg-slate-100 my-9 ">
      <h1 className="text-3xl font-bold text-[#222] mb-6 text-center">Mint Your Stock NFT</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#222] mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-slate-200 bg-opacity-20 text-[#222] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter NFT name"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[#222] mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-slate-200 bg-opacity-20 text-[#222] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter NFT description"
            rows={3}
            required
          />
        </div>
        <div>
          <label htmlFor="Quantity" className="block text-sm font-medium text-[#222] mb-1">
            Quantity
          </label>
          <input
            id="Quantity"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-slate-200 bg-opacity-20 text-[#222] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter NFT Quantity"
            type="number"
            required
          />
        </div>
        <div>
          <label htmlFor="Quantity" className="block text-sm font-medium text-[#222] mb-1">
            Tags
          </label>
          <input
            id="tags"
            value={tags}
            onChange={e => setTags(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-slate-200 bg-opacity-20 text-[#222] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter NFT Tag seperated by comma"
            type="text"
            required
          />
        </div>
        <div>
          <label htmlFor="havestDate" className="block text-sm font-medium text-[#222] mb-1">
            Date
          </label>
          <input
            id="date"
            value={havestDate}
            onChange={e => setHavestDate(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-slate-200 bg-opacity-20 text-[#222] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter NFT havestDate"
            type="date"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-[#222] mb-1">
            Image
          </label>
          <div className="relative">
            <input
              type="file"
              id="image"
              onChange={e => setImage(e.target.files?.[0] || null)}
              className="hidden"
              accept="image/*"
              required
            />
            <label
              htmlFor="image"
              className="w-full px-4 py-2 rounded-xl bg-slate-200 bg-opacity-20 text-[#222] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center cursor-pointer"
            >
              {image ? image.name : "Upload Image"}
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-green-800 text-[#222] font-semibold hover:from-green-700 hover:to-green-700 focus:outline-none focus:ring-2 disabled:opacity-25 focus:ring-green-500 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Mint NFT
          {uploading && <LoaderIcon />}
        </button>
      </form>
    </div>
  );
}
