//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "./CropNft.sol";
import "./CropCoin.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CropMarketplace {
    address public immutable owner;
    string public name = "CropSwap";
    CropNft public nft;
    IERC20 public coin;
    IERC20 public governanceToken;
    mapping(uint128 => AssetData) public assets;
    uint256 private totalGovernanceToken = 0;
    uint256 private totalMarketToken = 0;
    uint256 public minResolvers = 5;

    mapping(uint128 => Dispute) public disputes;
    uint128[] public disputeIds;
    mapping(address => bool) public isResolver;
    mapping(address => uint128) public resolverReward;
    uint256 public resolverStakeRequirement = 1000 * 10 ** 18; // Example stake required
    mapping(address => uint256) public resolverStake;
    uint256 xfiToCrop =  1;

    struct AssetData {
        address owner;
        uint128 price;
        bool payedFor;
        bool booked;
        address buyer; // buyer
        bool buyerChecked;
        bool sellerChecked; // seller error
        bool disputed;
    }

    struct Dispute {
        uint256 id;
        uint128 nftId;
        address buyer;
        address seller;
        bool resolved;
        address[] resolvers;
        mapping(address => bool) votes; // true = favor buyer, false = favor seller
        uint8 buyerVotes;
        uint8 sellerVotes;
    }

    struct userGovData {
        bool isResolver;
        uint256 staked;
        uint128 reward;
    }

    event PaymentWithdrawn(uint128 indexed nftId, address indexed seller, uint256 amount);
    event Listed(uint128 indexed nftId, address indexed lister, uint128 price);
    event PaymentReceived(uint128 indexed nftId, address indexed buyer, uint128 price);
    event ItemDelivered(uint128 indexed nftId, address indexed confirmer, bool isBuyer);

    event DisputeOpened(uint128 indexed nftId, address indexed disputer, bool isBuyer);
    event DisputeVoted(uint128 indexed nftId, address indexed resolver, bool voteForBuyer);
    event DisputeResolved(uint128 indexed nftId, bool voteForBuyer);
     event TokenUpdated(string tokenType, address oldAddress, address newAddress);

    // nfts
    uint128[] public assetIds;

    bool internal locked;

    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }
    modifier onlyResolver(uint128 nftId) {
        require(isResolver[msg.sender], "NOT_RESOLVER");
        require(!disputes[nftId].votes[msg.sender], "ALREADY_VOTED");
        _;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "NOT_RESOLVER");
        _;
    }

    // constructor
    constructor(address _nftAddress, address _coinAddress, address _governanceTokenAddress, address _owner) {
        owner = _owner;
        nft = CropNft(_nftAddress);
        coin = IERC20(_coinAddress);
        governanceToken = IERC20(_governanceTokenAddress);
    }

    function updateNFTAddress(address _newNFT) external onlyOwner {
        emit TokenUpdated("NFT", address(nft), _newNFT);
        nft = CropNft(_newNFT);
    }

    function updateCoinAddress(address _newCoin) external onlyOwner {
        emit TokenUpdated("Coin", address(coin), _newCoin);
        coin = IERC20(_newCoin);
    }

    function updateGovernanceTokenAddress(address _newGovToken) external onlyOwner {
        emit TokenUpdated("GovernanceToken", address(governanceToken), _newGovToken);
        governanceToken = IERC20(_newGovToken);
    }


    //

    function mintNFT(address to, string memory uri) external onlyOwner {
        // Optional: Add access control if needed
        nft.safeMint(to, uri);
        // Assuming you add totalSupply to CropNft
    }

    // Function to get NFT metadata
    function getNFTMetadata(uint256 tokenId) external view returns (string memory) {
        return nft.tokenURI(tokenId);
    }

    // Function to get user's NFTs
    function getUserNFTs(address user) external view returns (uint[] memory) {
        return nft.getAllUserNFT(user);
    }
    //

    function list_for_sale(uint128 nftId, uint128 price) external noReentrant returns (bool) {
        require(nft.ownerOf(nftId) == msg.sender, "NOT_OWNED");
        require(
            nft.isApprovedForAll(msg.sender, address(this)) || nft.getApproved(nftId) == address(this),
            "NOT_APPROVED"
        );

        nft.transferFrom(msg.sender, address(this), nftId);

        AssetData memory data = AssetData(msg.sender, price, false, false, address(0), false, false, false);
        assets[nftId] = data;

        // add nft
        assetIds.push(nftId);
        emit Listed(nftId, msg.sender, price);
        return true;
    }

    function get_listings(uint start, uint end) public view returns (uint[] memory) {
        uint[] memory ids = new uint[](end - start);

        uint counter = 0;
        for (uint i = start; i < assetIds.length && i < end; i++) {
            if (!assets[assetIds[i]].payedFor) {
                ids[counter] = assetIds[i];
                counter++;
            }
        }
        return ids;
    }
    function get_stock_data(uint128 nftId) public view returns (AssetData memory) {
        AssetData storage assetData = assets[nftId];
        return assetData;
    }

    function user_govern_data(address user) public view returns (userGovData memory) {
        userGovData memory assetData = userGovData(isResolver[user], resolverStake[user], resolverReward[user]);
        return assetData;
    }

    function payForStock(uint128 nftId, bool withXfi) external noReentrant payable returns (bool) {
        AssetData storage assetData = assets[nftId];
        require(assetData.price > 0, "INVALID_PRICE");
        require(assetData.owner != msg.sender, "CANT_BUY_YOUR_PRODCT");

        // Ensure buyer has approved the contract to spend the amount
        if(withXfi){
            require(msg.value >= assetData.price , "NOT_ENOUGH_XFI");

            assetData.payedFor = true;
            assetData.buyer = msg.sender;

            emit PaymentReceived(nftId, msg.sender, assetData.price);
            return true;
        }else {
            require(coin.allowance(msg.sender, address(this)) >= assetData.price, "INSUFFICIENT_ALLOWANCE");

            bool success = coin.transferFrom(msg.sender, address(this), assetData.price);
            require(success, "TRANSFER_FAILED");

            assetData.payedFor = true;
            assetData.buyer = msg.sender;

            emit PaymentReceived(nftId, msg.sender, assetData.price);
            return true;
        }
    }

    function mark_as_delivered(uint128 nftId, bool isBuyer) external noReentrant {
        AssetData storage assetData = assets[nftId];
        require(assetData.payedFor, "NOT_PAYED_FOR");
        if (isBuyer) {
            require(assetData.buyer == msg.sender, "NOT_Buyer");
            require(assetData.buyerChecked == false, "ALREADY_CHECKED");
            assetData.buyerChecked = true;
        } else {
            require(assetData.owner == msg.sender, "NOT_SELLER");
            require(assetData.sellerChecked == false, "ALREADY_CHECKED");
            assetData.sellerChecked = true;
        }
        emit ItemDelivered(nftId, msg.sender, isBuyer);
    }

    function get_payment(uint128 nftId) external noReentrant {
        AssetData storage assetData = assets[nftId];
        require(assetData.payedFor, "NOT_PAYED_FOR");
        require(assetData.owner == msg.sender, "NOT_OWNER");
        require(assetData.buyerChecked, "BUYER_NOT_VERIFIED");
        require(assetData.sellerChecked, "SELLER_NOT_VERIFIED");
        uint128 price = uint128((assetData.price * 9) / 10);

        bool success = coin.transfer(msg.sender, price);
        require(success, "TRANSFER_FAILED");
        nft.safeTransferFrom(address(this), assetData.buyer, nftId);

        delete assets[nftId];
        emit PaymentWithdrawn(nftId, msg.sender, price);
    }

    function get_user_listing(uint128 limit, address user) public view returns (uint128[] memory) {
        uint128[] memory ids = new uint128[](limit);
        uint step = 0;
        for (uint128 i = 0; i < assetIds.length; i++) {
            if (i >= limit) {
                break;
            }
            AssetData storage assetData = assets[assetIds[i]];
            if (assetData.owner == user) {
                ids[step] = assetIds[i];
                step++;
            }
        }
        return ids;
    }


    function get_user_purchase(uint128 limit, address user) public view returns (uint128[] memory) {
        uint128[] memory ids = new uint128[](limit);
        uint step = 0;
        for (uint128 i = 0; i < assetIds.length; i++) {
            if (i >= limit) {
                break;
            }
            AssetData storage assetData = assets[assetIds[i]];
            if (assetData.buyer == user) {
                ids[step] = assetIds[i];
                step++;
            }
        }
        return ids;
    }

    function openDispute(uint128 nftId) external {
        AssetData storage asset = assets[nftId];
        require(asset.payedFor, "PAYMENT_NOT_MADE");
        require(asset.buyer == msg.sender || asset.owner == msg.sender, "NOT_INVOLVED");

        Dispute storage dispute = disputes[nftId];
        require(!dispute.resolved, "ALREADY_RESOLVED");
        disputeStartTime[nftId] = block.timestamp;

        disputeIds.push(nftId);
        asset.disputed = true;
        dispute.nftId = nftId;
        dispute.buyer = asset.buyer;
        dispute.seller = asset.owner;
        dispute.id = disputeIds.length - 1;
        bool isBuyer = asset.buyer == msg.sender;

        emit DisputeOpened(nftId, msg.sender, isBuyer);
    }
    uint256 public constant RESOLUTION_PERIOD = 7 days;
    mapping(uint128 => uint256) public disputeStartTime;
    mapping(uint128 => mapping(address => bool)) public hasVoted;

    function voteOnDispute(uint128 nftId, bool voteForBuyer) external onlyResolver(nftId) {
        Dispute storage dispute = disputes[nftId];
        require(!dispute.resolved, "ALREADY_RESOLVED");
        require(!hasVoted[nftId][msg.sender], "ALREADY_VOTED");

        dispute.votes[msg.sender] = voteForBuyer;
        dispute.resolvers.push(msg.sender);
        if (voteForBuyer) {
            dispute.buyerVotes++;
        } else {
            dispute.sellerVotes++;
        }
        hasVoted[nftId][msg.sender] = true;
        emit DisputeVoted(nftId, msg.sender, voteForBuyer);
    }

    //     struct RewardHistory {
    //     uint256 timestamp;
    //     uint256 amount;
    //     uint128 disputeId;
    // }

    // mapping(address => RewardHistory[]) public resolverRewardHistory;

    // function _addRewardHistory(address resolver, uint256 amount, uint128 disputeId) internal {
    //     resolverRewardHistory[resolver].push(RewardHistory({
    //         timestamp: block.timestamp,
    //         amount: amount,
    //         disputeId: disputeId
    //     }));
    // }

    function resolveDispute(uint128 nftId) external {
        Dispute storage dispute = disputes[nftId];
        require(!dispute.resolved, "ALREADY_RESOLVED");
        require(dispute.resolvers.length >= minResolvers, "NOT_ENOUGH_REOLVERS");

        require(block.timestamp <= disputeStartTime[nftId] + RESOLUTION_PERIOD, "RESOLUTION_PERIOD_EXPIRED");
        require(dispute.buyerVotes + dispute.sellerVotes >= minResolvers, "NOT_ENOUGH_VOTES");

        uint128 refund_or_payment = (assets[nftId].price * 9) / 10;
        uint128 totalRewardForResolvers = assets[nftId].price - refund_or_payment;

        bool buyerwins = dispute.buyerVotes > dispute.sellerVotes;
        if (buyerwins) {
            // Refund buyer
            bool success = coin.transferFrom(address(this), dispute.buyer, assets[nftId].price);

            require(success, "REFUND_FAILED");
            totalMarketToken -= assets[nftId].price;
        } else {
            // Release payment to seller
            bool success = coin.transferFrom(address(this), dispute.seller, assets[nftId].price);

            require(success, "PAYMENT_FAILED");
            totalMarketToken -= assets[nftId].price;
        }
        // Calculate and distribute resolver rewards
        uint256 validResolverCount = 0;
        for (uint i = 0; i < dispute.resolvers.length; i++) {
            if (dispute.votes[dispute.resolvers[i]] == buyerwins) {
                validResolverCount++;
            }
        }

        require(validResolverCount > 0, "NO_ELIGIBLE_RESOLVERS");
        uint128 rewardPerResolver = uint128(totalRewardForResolvers / validResolverCount);

        for (uint i = 0; i < dispute.resolvers.length; i++) {
            address resolver = dispute.resolvers[i];
            if (dispute.votes[resolver] == buyerwins) {
                resolverReward[resolver] += rewardPerResolver;
            } else {
                // Slash incorrect voters
                slashResolver(resolver);
            }
        }

        dispute.resolved = true;
        emit DisputeResolved(nftId, dispute.buyerVotes > dispute.sellerVotes);
    }

    function registerResolver() external {
        uint256 allowance = governanceToken.allowance(msg.sender, address(this));

        // Then check if the allowance is sufficient
        bool isAllowed = allowance >= resolverStakeRequirement;
        require(isAllowed, "NOT_APPROVED");
        require(governanceToken.transferFrom(msg.sender, address(this), resolverStakeRequirement), "STAKE_FAILED");
        isResolver[msg.sender] = true;
        resolverStake[msg.sender] = resolverStakeRequirement;
        totalGovernanceToken += resolverStakeRequirement;
    }

    function slashResolver(address resolver) internal {
        require(isResolver[resolver], "NOT_RESOLVER");
        uint256 penalty = resolverStake[resolver] / 2; // Example: 50% slashing
        resolverStake[resolver] -= penalty;
        governanceToken.transfer(address(this), penalty); // Send to contract owner or DAO
        totalGovernanceToken += penalty;
    }

    function rewardResolver(address resolver, uint128 amount) internal {
        require(resolver != address(0), "NOT_RESOLVER");
        require(isResolver[resolver], "NOT_RESOLVER");

        resolverReward[resolver] += amount;
    }

    event ResolverRewardClaimed(address indexed resolver, uint256 amount);

    // Add function to check available resolver reward
    function getAvailableResolverReward(address resolver) public view returns (uint128) {
        return resolverReward[resolver];
    }

    function claimResolverReward() external noReentrant {
        require(isResolver[msg.sender], "NOT_RESOLVER");
        uint128 reward = resolverReward[msg.sender];
        require(reward > 0, "NO_REWARD_AVAILABLE");

        // Reset reward before transfer to prevent reentrancy
        resolverReward[msg.sender] = 0;

        // Transfer reward
        bool success = coin.transfer(msg.sender, reward);
        require(success, "TRANSFER_FAILED");

        emit ResolverRewardClaimed(msg.sender, reward);
    }

    function getAllDisputes() external view returns (uint128[] memory) {
        return disputeIds;
    }

    function getDisputeData(
        uint128 nftId
    ) external view returns (uint256, uint128, address, address, bool, uint128, uint128) {
        Dispute storage dispute = disputes[nftId];
        return (
            dispute.id,
            dispute.nftId,
            dispute.buyer,
            dispute.seller,
            dispute.resolved,
            dispute.buyerVotes,
            dispute.sellerVotes
        );
    }

    function getTotalGovernanceToken() external view onlyOwner returns (uint256) {
        return totalGovernanceToken;
    }
    function getTotaltotalMarketToken() external view onlyOwner returns (uint256) {
        return totalMarketToken;
    }

    receive() external payable {}
}
