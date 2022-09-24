const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Ethereum = require('../models/cryptoModels/ethereumModel');
const Optimism = require('../models/cryptoModels/optimismModel');
const Polygon = require('../models/cryptoModels/polygonModel');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connected');
  });

const importData = async () => {
  try {
    const eth = await Ethereum.find();
    fs.writeFileSync(
      `${__dirname}/../controllers/balanceController/ethereum/tokenList.json`,
      JSON.stringify(eth),
      'utf-8'
    );
    const poly = await Polygon.find();
    fs.writeFileSync(
      `${__dirname}/../controllers/balanceController/polygon/tokenList.json`,
      JSON.stringify(poly),
      'utf-8'
    );
    const opt = await Optimism.find();
    fs.writeFileSync(
      `${__dirname}/../controllers/balanceController/optimism/tokenList.json`,
      JSON.stringify(opt),
      'utf-8'
    );
    console.log('OK 🤡');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Ethereum.deleteMany();
    await Polygon.deleteMany();
    await Optimism.deleteMany();
    console.log('Deleted 🤡');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
