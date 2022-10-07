import { useEffect } from 'react'
import { BigNumber } from 'ethers'
import { useQuery } from 'wagmi'
import { TokenService } from '../api/tokens.services'
import { useAccount, useNetwork } from 'wagmi'
import { IToken } from '../models/models'
import { useActions } from "../hooks/useActions";

export const useTokens = () => {

	console.log('use tokens')

    const { setCrypto } = useActions()

	const { chain } = useNetwork()

	const chainName = chain?.name.toLowerCase()

    const { address } = useAccount()
	//console.log('address', address)

	const { data: tokens, isSuccess: successGetTokens } = useQuery(
		[`get ${chainName} tokens`],
		() => TokenService.getTokens(address!, chainName!),
		{
			select: (data) => data.data.data,
			refetchOnWindowFocus: true
		}
	)

	const { data: exchangeRate, isSuccess: successGetExchangeTokens } = useQuery(
		[`get exchange ${chainName} token rate`],
		() => TokenService.getExchangeRate(chainName!),
		{ select: (data) => data.data.data, refetchOnWindowFocus: true,
			//  refetchInterval: 3000
			 }
	)

	const { data: ethUsdRate, isSuccess: successGetEthUsdRate } = useQuery(
		[`get ${chainName} usd rate`],
		() => TokenService.getEthUsdRate(chainName!),
		{ 
			select: (data) => 
			chainName === 'polygon'
			 ? data.data['matic-network'].usd 
			 :
			  data.data.ethereum.usd,  
			  refetchOnWindowFocus: true,
			//   refetchInterval: 3000
		}

	)

	const isSuccessRequest = successGetTokens && successGetExchangeTokens && successGetEthUsdRate


	const zero = BigNumber.from(0)
	const div36 = BigNumber.from(10).pow(36)
	const div15 = BigNumber.from(10).pow(15)

	if (isSuccessRequest) {
		
		//tokens.forEach((t: any, i: number) => console.info(i, t)) 
		tokens.forEach((el: any, i: number) => {
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
					 //console.log(el)

				} else {
					el.balance = 0
					el.tokenAmount = 0
				}
			} catch (err) {
				console.log('error bignumber token list')
			}
		})
	}

	return { tokens, isSuccessRequest }
        
}