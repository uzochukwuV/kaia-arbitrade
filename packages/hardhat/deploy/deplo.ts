import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "AgriMarketplace" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const market: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
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

  // await deploy("KaiCoin", {
  //   from: deployer,
  //   // Contract constructor arguments
  //   args: [deployer, "KaiCoin", "KrC"],
  //   log: true,
  //   // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
  //   // automatically mining the contract deployment transaction. There is no effect on live networks.
  //   autoMine: true,
  // });

  // await deploy("KaiNFT", {
  //   from: deployer,
  //   // Contract constructor arguments
  //   args: [deployer],
  //   log: true,
  //   // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
  //   // automatically mining the contract deployment transaction. There is no effect on live networks.
  //   autoMine: true,
  // });
  // const kaiCoin = await hre.ethers.getContract<Contract>("KaiCoin", deployer);
  // const kaiNft = await hre.ethers.getContract<Contract>("CropNft", deployer);

  // const coinAddr = await kaiCoin.getAddress();
  // const nftAddr = await kaiNft.getAddress();

  await deploy("KaiMarket", {
    from: deployer,
    // Contract constructor arguments
    args: [
      deployer,
      "0x5972098A9de3CeA8d46f2A773B37260c22B8Ec7B",
      "0x947B6EC2Ed9d900b0F6a5F5EF6E3Dc93Dd521243",
      "0x947B6EC2Ed9d900b0F6a5F5EF6E3Dc93Dd521243"
    ],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });


  // Get the deployed contract to interact with it after deploying.
  const KaiMarket = await hre.ethers.getContract<Contract>("KaiMarket", deployer);
  console.log("👋 Initial greeting:", await KaiMarket.get_listings(0, 9));


};

export default market;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags KaiMarket
market.tags = ["KaiMarket", "kaiCoin", "kaiNft"];
