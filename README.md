# CrossFi - Decentralized Web3 Marketplace

CrossFi is a fully decentralized Web3 marketplace built on the **CrossFi Blockchain**. It allows users to create on-chain stores, tokenize products as NFTs (both physical and digital), and utilize an escrow-based payment system for secure transactions. Governance-driven dispute resolution ensures fairness and trust in every trade.


[![CrossFi Marketplace Demo](https://img.youtube.com/vi/f5GrkS01lNY/0.jpg)](https://www.youtube.com/watch?v=f5GrkS01lNY)

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Smart Contract Deployment](#smart-contract-deployment)
- [User Flow](#user-flow)
- [Governance & Dispute Resolution](#governance--dispute-resolution)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Features 🚀
- **On-Chain Store Creation**: Merchants can deploy their own NFT-based stores on CrossFi.
- **Product Tokenization**: Products are minted as NFTs, representing both physical and digital assets.
- **Escrow Payment System**: Buyer funds are held in escrow until both parties confirm the transaction.
- **Decentralized Dispute Resolution**: Community resolvers stake funds and get rewarded for correct dispute resolutions.
- **CrossFi Blockchain Integration**: Ensures scalability, security, and transparency.
- **Multi-Wallet Support**: Works with MetaMask, WalletConnect, and other EVM-compatible wallets.
- **CrossFi Governance**: Token holders can participate in key decisions affecting the marketplace.

## Tech Stack 🛠
- **Blockchain**: CrossFi Blockchain
- **Smart Contracts**: Solidity
- **Frontend**: Next.js, Wagmi, ethers.js, TailwindCSS
- **Backend**: Node.js, IPFS for decentralized storage
- **Wallet Support**: MetaMask, WalletConnect
- **Governance**: Snapshot for voting

## Getting Started 💻

### Prerequisites
Ensure you have the following installed:
- Node.js v18+
- Hardhat
- MetaMask or another EVM-compatible wallet

### Installation
```sh
git clone https://github.com/uzochukwuv/crossfi-marketplace.git
cd crossfi-marketplace
yarn install
```

## Smart Contract Deployment
### Deploy Contracts
```sh
yarn   compile
yarn  deploy --network crossfitest
```

### Smart Contract Addresses
| Contract      | Address |
|--------------|----------------------------------|
| **COIN**      | `0xb7278A61aa25c888815aFC32Ad3cC52fF24fE575` |
| **Marketplace** | `0x7969c5eD335650692Bc04293B07F5BF2e7A673C0` |
| **NFT**      | `0xCD8a1C3ba11CF5ECfa6267617243239504a98d90` |

## User Flow 🔄
### **1. NFT  Creation**
| Step | Action |
|------|--------|
| 🏪 **User mints product as nft** | `mint` |
| 🛠 **User lists products** | `list` |

### **2. Buying & Selling**
| Step | Action |
|------|--------|
| 🛍️ **Buyer selects NFT product** | `` |
| 💰 **Buyer initiates purchase** | `` |
| ⏳ **Funds held in escrow** | `` |
| ✅ **Transaction finalized** | `` |

### **3. Dispute & Governance**
| Step | Action |
|------|--------|
| 🚨 **Buyer/Seller raises dispute** | `` |
| 🎭 **Resolvers vote on outcome** | `` |
| 🏆 **Dispute resolved, funds released** | `` |
| ⚖️ **DAO intervention for large disputes** | `` |

## Governance & Dispute Resolution ⚖️
CrossFi uses a decentralized governance model where token holders can participate in dispute resolution and platform decisions.

### **Voting & Governance**
- **Snapshot Proposals**: CrossFi holders can vote on platform changes using Snapshot.
- **Staking for Dispute Resolution**: Community members stake tokens to participate in dispute resolution and earn rewards.
- **DAO Governance**: Major updates and economic policies are decided via DAO governance.

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
