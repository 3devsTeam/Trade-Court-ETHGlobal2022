//const { ethers } = require("ethers");
const { ethers } = require("hardhat");
const fs = require('fs')

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {


    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()



    console.log("----------------------------------------------------")
    const SVGNFT = await deploy('TO_FIAT', {
        from: deployer,
        log: true,
    })
    console.log(`You have deployed an contract to ${SVGNFT.address}`)
    const svgNFTContract = await ethers.getContractFactory("TO_FIAT")
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    const svgNFT = new ethers.Contract(SVGNFT.address, svgNFTContract.interface, signer)

    console.log(`Verify with:\n npx hardhat verify --network goerli ${svgNFT.address}`);

    console.log('done')
}

module.exports.tags = ['all', 'to_fiat']