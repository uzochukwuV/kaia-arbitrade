//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Pausable } from "@openzeppelin/contracts/utils/Pausable.sol";

contract CropCoin is ERC20, Ownable, ERC20Permit, Pausable {
    // Constants
    uint256 public constant AIRDROP_AMOUNT = 10000 * 10 ** 18;
    uint256 public constant INITIAL_SUPPLY = 20000 * 10 ** 18;
    uint256 public constant MAX_SUPPLY = 1000000 * 10 ** 18;

    // State variables
    uint256 public immutable max_airdrop;
    uint256 public airdrop_counter;

    mapping(address => bool) public airdropers;
    mapping(address => bool) public minters;

    // Events
    event AirdropClaimed(address indexed recipient, uint256 amount);
    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);

    constructor(
        address initialOwner,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) Ownable(initialOwner) ERC20Permit(_name) {
        max_airdrop = 1000000 * 10 ** decimals();
        _mint(initialOwner, INITIAL_SUPPLY);
    }

    modifier onlyMinter() {
        require(minters[msg.sender] || msg.sender == owner(), "Not authorized to mint");
        _;
    }

    function addMinter(address minter) external onlyOwner {
        minters[minter] = true;
        emit MinterAdded(minter);
    }

    function removeMinter(address minter) external onlyOwner {
        minters[minter] = false;
        emit MinterRemoved(minter);
    }

    function safeMint(address to, uint256 amount) public onlyMinter whenNotPaused {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
    }

    function getAirdrop() external whenNotPaused {
        require(!airdropers[msg.sender], "Already claimed airdrop");
        require(airdrop_counter < max_airdrop, "Airdrop limit reached");

        airdropers[msg.sender] = true;
        airdrop_counter += AIRDROP_AMOUNT;

        _mint(msg.sender, AIRDROP_AMOUNT);
        emit AirdropClaimed(msg.sender, AIRDROP_AMOUNT);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
