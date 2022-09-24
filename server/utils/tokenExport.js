const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Crypto = require('../models/cryptoModel');
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
    await Crypto.create(ethereum);
    await Crypto.create(polygon);
    await Crypto.create(optimism);
    console.log('OK 🤡');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Crypto.deleteMany();
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
