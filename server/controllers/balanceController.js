const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Web3 = require('web3');
const { BigNumber } = require('ethers');
const {
  Web3ProviderConnector,
  MultiCallService,
  GasLimitService,
} = require('@1inch/multicall');
// const Crypto = require('../models/cryptoModel');
const { ERC20ABI } = require('../data/ABI');
const tokenList = require('../data/erc20TokenList');

exports.getERC20Balances = catchAsync(async (req, res, next) => {
  const web3 = new Web3(process.env.ALCHEMY_HTTP_LEO);
  const provider = new Web3ProviderConnector(
    new Web3(process.env.ALCHEMY_HTTP_LEO)
  );
  if (!req.params.address) {
    console.log(req.params);
    return new AppError('Address is empty', 400);
  }
  // const tmp = await Crypto.find().select('-__v');
  // const tokenList = JSON.parse(JSON.stringify(tmp));
  const gasLimitService = new GasLimitService(
    provider,
    process.env.BALANCE_CONTRACT_ADDRESS
  );
  const multiCallService = new MultiCallService(
    provider,
    process.env.BALANCE_CONTRACT_ADDRESS
  );
  const balanceOfGasUsage = 30_000;
  const requests = tokenList.map((el) => {
    return {
      to: el.address,
      data: provider.contractEncodeABI(ERC20ABI, el.address, 'balanceOf', [
        req.params.address,
      ]),
      gas: balanceOfGasUsage,
    };
  });

  const gasLimit = gasLimitService.calculateGasLimit();
  const params = {
    maxChunkSize: 500,
    retriesLimit: 3,
    blockNumber: 'latest',
    gasBuffer: 3000000,
    maxGasLimit: 150000000,
  };
  const response = await multiCallService.callByGasLimit(
    requests,
    gasLimit,
    params
  );
  ethBalance = await web3.eth.getBalance(req.params.address);
  tokenList.forEach((el, index) => {
    const address = el['address'].toString();
    let balance = 0;
    if (address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      balance = ethBalance;
    } else {
      if (response[index] !== '0x') {
        const decodedRate = BigNumber.from(response[index]);
        const numerator = BigNumber.from(10).pow(18);
        const denominator = BigNumber.from(10).pow(el.decimals); // eth decimals
        const price = BigNumber.from(decodedRate)
          .mul(numerator)
          .div(denominator);
        balance = price.toString();
      }
    }
    el['balance'] = balance;
  });
  //TODO: add sort
  res.status(200).json({
    msg: 'success',
    data: tokenList,
  });
});
