const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: '../../../config.env' });
const Web3 = require('web3');
const mongoose = require('mongoose');
const { BigNumber } = require('ethers');
const Crypto = require('../../../models/cryptoModel');
const {
  Web3ProviderConnector,
  MultiCallService,
  GasLimitService,
} = require('@1inch/multicall');
const web3 = new Web3(process.env.ALCHEMY_OPTIMISM);
const provider = new Web3ProviderConnector(
  new Web3(process.env.ALCHEMY_OPTIMISM)
);

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     console.log('connected');
//   });

const tokens = require('./tokenList.json');
const getRate = async () => {
  const { OffChainOracleAbi } = require('../ABI');

  const contractAddress = process.env.OPTIMISM_BALANCE_CONTRACT;
  // const tokens = tokenList.tokens;
  const offChainOracleAddress = process.env.OPTIMISM_OFF_CHAIN_ORACLE;
  const offChainOracleContract = new web3.eth.Contract(OffChainOracleAbi);

  const gasLimitService = new GasLimitService(provider, contractAddress);
  const multiCallService = new MultiCallService(provider, contractAddress);

  const balanceOfGasUsage = 30_000;
  // const tmp = await Crypto.find().select('-__v');
  // const tokens = JSON.parse(JSON.stringify(tmp));
  const requests = tokens.map((token) => {
    return {
      to: offChainOracleAddress,
      data: offChainOracleContract.methods
        .getRateToEth(
          token.address,
          true // use wrapper
        )
        .encodeABI(),
      gas: balanceOfGasUsage,
    };
  });

  const gasLimit = gasLimitService.calculateGasLimit();

  const params = {
    maxChunkSize: 50,
    retriesLimit: 3,
    blockNumber: 'latest',
    gasBuffer: 3000000,
    maxGasLimit: 150000000,
  };
  const getRate = multiCallService
    .callByGasLimit(requests, gasLimit, params)
    .then((response) => {
      const prices = {};
      for (let i = 0; i < response.length; i++) {
        if (response[i] !== '0x') {
          const decodedRate = BigNumber.from(response[i]);
          const numerator = BigNumber.from(10).pow(tokens[i].decimals);
          const denominator = BigNumber.from(10).pow(18); // eth decimals
          const price = BigNumber.from(decodedRate)
            .mul(numerator)
            .div(denominator);
          prices[tokens[i].address] = price.toString();
        } else {
          prices[tokens[i].address] = '0';
        }
      }

      fs.writeFileSync('./tokenRate.json', JSON.stringify(prices), (err) => {
        if (err) console.log(err);
        else {
          console.log('File written successfully');
        }
      });
    });
};
console.log('token rate is running');
setInterval(getRate, process.env.TOKEN_RATE_TIMEOUT * 60 * 1000); //TODO: divide for timout setup
