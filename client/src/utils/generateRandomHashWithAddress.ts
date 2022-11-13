import keccak256 from 'keccak256'

export const generateRandomHashWithAddress = (address: string) => {
  return keccak256(address).toString('hex')
}
