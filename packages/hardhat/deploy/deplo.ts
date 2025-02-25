import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "AgriMarketplace" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployAgriMarketplace: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` or `yarn account:import` to import your
    existing PK which will fill DEPLOYER_PRIVATE_KEY_ENCRYPTED in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // await deploy("CropCoin", {
  //   from: deployer,
  //   // Contract constructor arguments
  //   args: ["0x29Ff5f41Ad7c7E9947136B1CF3E7664F465CC0eF", "CropCoin", "CrC"],
  //   log: true,
  //   // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
  //   // automatically mining the contract deployment transaction. There is no effect on live networks.
  //   autoMine: true,
  // });

  // await deploy("CropNft", {
  //   from: deployer,
  //   // Contract constructor arguments
  //   args: [deployer],
  //   log: true,
  //   // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
  //   // automatically mining the contract deployment transaction. There is no effect on live networks.
  //   autoMine: true,
  // });
  // const AgriCoin = await hre.ethers.getContract<Contract>("CropCoin", deployer);
  // // const AgriNft = await hre.ethers.getContract<Contract>("CropNft", deployer);

  // const coinAddr = await AgriCoin.getAddress();
  // const nftAddr = await AgriNft.getAddress();

  await deploy("CropMarketplace", {
    from: deployer,
    // Contract constructor arguments
    args: [
      deployer,
    ],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // "0xCD8a1C3ba11CF5ECfa6267617243239504a98d90",
  // "0xb7278A61aa25c888815aFC32Ad3cC52fF24fE575",
  // "0xb7278A61aa25c888815aFC32Ad3cC52fF24fE575",

  // Get the deployed contract to interact with it after deploying.
  const AgriMarketplace = await hre.ethers.getContract<Contract>("CropMarketplace", deployer);
  console.log("👋 Initial greeting:", await AgriMarketplace.get_listings(0, 9));

  // console.log("👋 Initial greeting:", await AgriCoin.approve(nftAddr, 100000000000) );
};

export default deployAgriMarketplace;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags AgriMarketplace
deployAgriMarketplace.tags = ["CropMarketplace", "CropCoin", "CropNft"];
