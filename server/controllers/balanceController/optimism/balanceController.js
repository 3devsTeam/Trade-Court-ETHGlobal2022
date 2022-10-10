const AppError = require('../../../utils/appError');
const catchAsync = require('../../../utils/catchAsync');
const Crypto = require('../../../models/cryptoModel');
const Web3 = require('web3');
const fs = require('fs');
const { BigNumber } = require('ethers');
const {
  Web3ProviderConnector,
  MultiCallService,
  GasLimitService,
} = require('@1inch/multicall');
const { ERC20ABI } = require('./ABI');
const tokenList = require('./tokenList');

exports.listTokens = catchAsync(async (req, res, next) => {
  const tokens = await Crypto.find({ chainId: 10 })
    .sort({ name: 1 })
    .select('name symbol logoUrl');
  res.status(200).json({
    message: 'success',
    tokens,
  });
});

exports.getRate = catchAsync(async (req, res, next) => {
  console.log(__dirname);
  const prices = fs.readFileSync(`${__dirname}/tokenRate.json`, 'utf-8');
  res.status(200).json({
    message: 'success',
    data: JSON.parse(prices),
  });
});

exports.getTokenImg = catchAsync(async (req, res, next) => {
  fs.readFile(`./tokenImg/${req.params.url}.png`, function (err, content) {
    if (err) {
      res.writeHead(400, { 'Content-type': 'text/html' });
      console.log(err);
      res.end('No such image');
    } else {
      res.writeHead(200, { 'Content-type': 'image/jpg' });
      res.end(content);
    }
  });
});

exports.getBalance = catchAsync(async (req, res, next) => {
  const web3 = new Web3(process.env.ALCHEMY_OPTIMISM);
  const provider = new Web3ProviderConnector(
    new Web3(process.env.ALCHEMY_OPTIMISM)
  );
  if (!req.params.address) {
    return new AppError('Address is empty', 400);
  }
  const gasLimitService = new GasLimitService(
    provider,
    process.env.OPTIMISM_BALANCE_CONTRACT
  );
  const multiCallService = new MultiCallService(
    provider,
    process.env.OPTIMISM_BALANCE_CONTRACT
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
  nativeBalance = await web3.eth.getBalance(req.params.address);
  tokenList.forEach((el, index) => {
    const address = el['address'].toString();
    let balance = 0;
    if (address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      balance = nativeBalance;
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
  tokenList.sort((a, b) => {
    const arg0 = BigNumber.from(a.balance);
    const arg1 = BigNumber.from(b.balance);
    const zero = BigNumber.from('0');
    if (arg0.eq(zero) && arg1.eq(zero)) {
      //TODO: shit refactor!!!!!
      if (a.symbol.toLowerCase() > b.symbol.toLowerCase()) {
        return 1;
      } else if (a.symbol.toLowerCase() < b.symbol.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    } else if (arg0.gt(zero) && arg1.eq(zero)) {
      return -1;
    } else if (arg0.gt(arg1)) {
      return -1;
    } else if (arg0.lt(arg1)) {
      return 1;
    } else {
      return 0;
    }
  }); //TODO: add aplphabetic sort after amount sort
  res.status(200).json({
    message: 'success',
    data: tokenList,
  });
});
