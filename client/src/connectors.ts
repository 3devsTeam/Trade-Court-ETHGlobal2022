import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, provider } = configureChains(
	[chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
	[alchemyProvider({ apiKey: `${import.meta.env.VITE_ALCHEMY_ID}` }), publicProvider()]
)
export const { connectors } = getDefaultWallets({
	appName: 'My RainbowKit App',
	chains
})
export const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider
})
