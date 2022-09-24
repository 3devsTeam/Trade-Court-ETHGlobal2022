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
const ethereum = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../controllers/balanceController/ethereum/tokenList.json`,
    'utf-8'
  )
);
const polygon = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../controllers/balanceController/polygon/tokenList.json`,
    'utf-8'
  )
);
const optimism = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../controllers/balanceController/optimism/tokenList.json`,
    'utf-8'
  )
);

const importData = async () => {
  try {
    await Ethereum.create(ethereum);
    await Polygon.create(polygon);
    await Optimism.create(optimism);
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
