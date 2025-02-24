# CrossFi - Decentralized Web3 Marketplace

CrossFi is a fully decentralized Web3 marketplace built on the **CrossFi Blockchain**. It allows users to create on-chain stores, tokenize products as NFTs (both physical and digital), and utilize an escrow-based payment system for secure transactions. Governance-driven dispute resolution ensures fairness and trust in every trade.

## Features 🚀
- **On-Chain Store Creation**: Merchants can deploy their own NFT-based stores on CrossFi.
- **Product Tokenization**: Products are minted as NFTs, representing both physical and digital assets.
- **Escrow Payment System**: Buyer funds are held in escrow until both parties confirm the transaction.
- **Decentralized Dispute Resolution**: Community resolvers stake funds and get rewarded for correct dispute resolutions.
- **CrossFi Blockchain Integration**: Ensures scalability, security, and transparency.

## Tech Stack 🛠
- **Blockchain**: CrossFi Blockchain
- **Smart Contracts**: Solidity
- **Frontend**: Next.js, Wagmi, ethers.js, TailwindCSS
- **Backend**: Node.js, IPFS for decentralized storage
- **Wallet Support**: MetaMask, WalletConnect

## Getting Started 💻

### Prerequisites
Ensure you have the following installed:
- Node.js v18+
- Hardhat
- MetaMask or another EVM-compatible wallet

### Installation
```sh
git clone https://github.com/your-repo/crossfi-marketplace.git
cd crossfi-marketplace
npm install
```

### Deploy Smart Contracts
```sh
npx hardhat compile
npx hardhat deploy --network crossfi
```

### Run the Frontend
```sh
npm run dev
```



## **🚀 App Dispute UX Flow**
| Step | Action |
|------|--------|
| 🛍️ **Buyer purchases NFT** | `payForStock(nftId)` |
| 🚨 **Buyer/Seller raises dispute** | `openDispute(nftId)` |
| 🎭 **Resolvers vote on outcome** | `voteOnDispute(nftId, voteForBuyer)` |
| 🔔 **User gets notified of updates** | `PushAPI.channels.sendNotification()` |
| 🏆 **Dispute resolved, funds released** | `resolveDispute(nftId)` |
| ⚖️ **DAO intervention for large disputes** | `submitDisputeToDAO(nftId)` |



## Roadmap 🛣
- ✅ MVP with on-chain stores and NFT products
- 🔄 Cross-chain payment support
- 🤝 More wallet integrations
- 🏛 DAO-based governance for dispute resolution
- 📈 Marketplace analytics dashboard

## Contributing 🤝
We welcome contributions! Feel free to open an issue or submit a pull request.

## License 📜
This project is licensed under the MIT License.

---
Built with ❤️ on CrossFi Blockchain.

