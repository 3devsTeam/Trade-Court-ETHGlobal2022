import { ethers } from "ethers"

export const parseEther = (value: string): ethers.BigNumber => {
    return ethers.utils.parseEther(value)
}