const AppError = require('../../../utils/appError');
const catchAsync = require('../../../utils/catchAsync');
const ethers = require('ethers');

exports.getBalance = catchAsync(async (req, res, next) => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.INFURA_RINKEBY
  );
  const balance = await provider.getBalance(req.params.address);
  const balanceInEth = ethers.utils.formatEther(balance);
  res.status(200).json({
    message: 'success',
    data: [
      {
        _id: '632ec44d3ac7b7bab246d2b1',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        chainId: 4,
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        logoUrl:
          'https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png',
        balance: balanceInEth,
      },
    ],
  });
});
