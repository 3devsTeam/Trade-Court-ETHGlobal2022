import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './polyfills';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

import { store } from './store/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.rinkeby, chain.polygon, chain.optimism],
  [
    // alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID }),
    infuraProvider({ apiKey: import.meta.env.VITE_INFURA_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Trade Court',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      modalSize={'wide'}
      showRecentTransactions={true}
      chains={chains}
      coolMode={true}
      theme={lightTheme({
        accentColor: '#AE8AEF',
        accentColorForeground: 'white',
        borderRadius: 'large',
        fontStack: 'rounded',
        overlayBlur: 'small',
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
);
