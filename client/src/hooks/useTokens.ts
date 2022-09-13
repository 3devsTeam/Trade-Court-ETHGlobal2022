import { BigNumber } from 'ethers'
import { useQuery } from 'wagmi'
import { TokenService } from '../services/tokens.services'
import { useAccount } from 'wagmi'
import { IToken } from '../models/models'

export const useTokens = () => {


    const { address } = useAccount()

	const { data: tokens, isSuccess } = useQuery(
		['get tokens'],
		() => TokenService.getTokens(address!),
		{
			select: (data) => data.data.data
		}
	)

	const { data: exchangeRate } = useQuery(
		['get exchange token rate erc20'],
		() => TokenService.getExchangeRateERC20(),
		{ select: (data) => data.data.data }
	)

	const { data: ethUsdRate } = useQuery(
		['get eth usd rate'],
		() => TokenService.getEthUsdRate(),
		{ select: (data) => data.data.ethereum.usd }
	)

	const zero = BigNumber.from(0)
	const div36 = BigNumber.from(10).pow(36)
	const div15 = BigNumber.from(10).pow(15)

	if (isSuccess) {
		
		//tokens.forEach((t: any, i: number) => console.info(i, t)) 
		tokens.forEach((el: any, i: any) => {
			try {
				const weiBalance = BigNumber.from(el.balance)
				if (!weiBalance.eq(zero)) {
					//console.info('wei balance', weiBalance.toString())
					const weiExchangeRate = BigNumber.from(exchangeRate[`${el.address}`])
					const usdRate = BigNumber.from(ethUsdRate * 100)
					//console.log('usd rate', usdRate.toString())
					const weiPrice = weiBalance
					 	.mul(weiExchangeRate)
					 	.mul(usdRate)
					 	.div(div36)
					 const result = parseInt(weiPrice.toString()) / 100
					 //console.log('result', result)
					 el.balance = result
					 el.tokenAmount = parseInt(weiBalance.div(div15).toString()) / 1000 
					// console.log(el)
				} else {
					el.balance = 0
					el.tokenAmount = 0
				}
			} catch (err) {
				console.log(err)
			}
		})
	}

	return { tokens }
        
}