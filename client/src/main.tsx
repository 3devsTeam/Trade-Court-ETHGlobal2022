import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { wagmiClient, chains } from './connectors'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				modalSize={'compact'}
				showRecentTransactions={true}
				chains={chains}
				coolMode={true}
				theme={lightTheme({
					accentColor: '#AE8AEF',
					accentColorForeground: 'white',
					borderRadius: 'large',
					fontStack: 'system',
					overlayBlur: 'small'
				})}
			>
				<Provider store={store}>
					<QueryClientProvider client={queryClient}>
						<App />
						{/* <ReactQueryDevtools initialIsOpen={false} /> */}
					</QueryClientProvider>
				</Provider>
			</RainbowKitProvider>
		</WagmiConfig>
	</React.StrictMode>
)
