/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 require("@nomiclabs/hardhat-waffle");
 require("@nomiclabs/hardhat-ethers");
 require("@nomiclabs/hardhat-truffle5");
 require("@nomiclabs/hardhat-etherscan");
 require("hardhat-deploy");
 require('@openzeppelin/hardhat-upgrades');
 require("hardhat-gas-reporter");
 //require('@openzeppelin/contracts');
 
 //require("dotenv").config();

 
 const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || process.env.ALCHEMY_MAINNET_RPC_URL || "";
 const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "";
 const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL || "";
 const MNEMONIC = process.env.MNEMONIC || "";
 const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
 // optional
 const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
 
 module.exports = {
     defaultNetwork: "hardhat",
     networks: {
         hardhat: {
             // // If you want to do some forking, uncomment this
             // forking: {
             //   url: MAINNET_RPC_URL
             // }
         },
         localhost: {},
         rinkeby: {
             url: 'https://eth-rinkeby.alchemyapi.io/v2/xxx',
             accounts: ['xxx'],
             // accounts: {
             //     mnemonic: MNEMONIC,
             // },
             saveDeployments: true,
         },
         mainnet: {
             url: MAINNET_RPC_URL,
             accounts: ['xxx'],
             // accounts: {
             //     mnemonic: MNEMONIC,
             // },
             saveDeployments: true,
         },
         polygon: {
             url: "https://polygon-mainnet.g.alchemy.com/v2/xxx",
             accounts: ['xxx'],
             // accounts: {
             //     mnemonic: MNEMONIC,
             // },
             saveDeployments: true,
         },
         OptimismGoerly: {
            url: "https://goerli.optimism.io",
            accounts: ['xxx'],
            // accounts: {
            //     mnemonic: MNEMONIC,
            // },
            saveDeployments: true,
        },
        goerli: {
            url: "https://goerli.infura.io/v3/xxx",
            accounts: ['xxx'],
            // accounts: {
            //     mnemonic: MNEMONIC,
            // },
            saveDeployments: true,
        },
        AuroraTestnet: {
            url: "https://aurora-testnet.infura.io/v3/xxx",
            accounts: ['xxx'],
            // accounts: {
            //     mnemonic: MNEMONIC,
            // },
            saveDeployments: true,
        },
     },
     etherscan: {
         apiKey: 'xxx'
     },
     namedAccounts: {
         deployer: {
             default: 0, // here this will by default take the first account as deployer
             1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
         },
         feeCollector: {
             default: 1,
         },
     },
     solidity: {
         compilers: [
             {
                 version: "0.8.4",
             },
             {
                 version: "0.7.0",
             },
             {
                 version: "0.6.6",
             },
             {
                 version: "0.4.24",
             },
         ],
         settings: {
            optimizer: {
              runs: 200,
              enabled: true
            }
          }
     },
     mocha: {
         timeout: 100000,
     },

     gasReporter: {
        enabled: false,
        gasPrice: 10,
        currency: 'USD',
        coinmarketcap: '2f0fe43a-0f3d-40a6-8558-ddd3625bfd6b',
    },
 };
