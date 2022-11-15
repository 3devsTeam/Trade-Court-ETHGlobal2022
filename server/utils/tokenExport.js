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
const importData = async (chainId) => {
  try {
    const data = JSON.parse(
      fs.readFileSync(`${__dirname}/../data/${chainId}/tokenList.json`, 'utf-8')
    );
    await Crypto.create(data);
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
  importData(process.argv[3]);
} else if (process.argv[2] === '--delete') {
  deleteData();
}
