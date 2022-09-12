const fs = require('fs');
const request = require('request');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Crypto = require('../models/cryptoModel');
const Fiat = require('../models/fiatModel');
const { exit } = require('process');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connected');
  });

const download = function (uri, route, filename, callback) {
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(`${route}${filename}`));
  });
};

//---------------ERC20---------------//
const importErc20 = async () => {
  const tmp = await Crypto.find();
  const tokenList = JSON.parse(JSON.stringify(tmp));

  if (!fs.existsSync('./data/erc20TokenImg')) {
    fs.mkdirSync('./data/erc20TokenImg');
  }
  tokenList.forEach((el) => {
    download(el.logoUrl, './data/erc20TokenImg/', `${el.address}.png`);
  });
  console.log('done');
};
const deleteErc20 = () => {
  fs.rm('./data/erc20TokenImg', { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });
  console.log('done');
};

//---------------FIAT---------------//
const importFiat = async () => {
  try {
    const tmp = await Fiat.find();
    const fiatList = JSON.parse(JSON.stringify(tmp));
    if (!fs.existsSync('./data/fiatImg')) {
      fs.mkdirSync('./data/fiatImg');
    }
    fiatList.forEach((el) => {
      download(el.logoUrl, './data/fiatImg', `${el.address}.png`);
    });
    console.log('done');
  } catch (err) {
    console.log(err);
  }
};
const deleteFiat = () => {
  fs.rm('./data/fiatImg', { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });
  console.log('done');
};

if (process.argv[2] === '--import') {
  if (process.argv[3] === '--erc20') importErc20();
  if (process.argv[3] === '--fiat') importFiat();
} else if (process.argv[2] === '--delete') {
  if (process.argv[3] === '--erc20') deleteErc20();
  if (process.argv[3] === '--fiat') deleteFiat();
}
