import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./polyfills";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { store } from "./store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider({ apiKey: `${import.meta.env.VITE_ALCHEMY_ID}` }),
    publicProvider(),
  ]
);
export const { connectors } = getDefaultWallets({
  appName: "Trade Court",
  chains,
});
export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      modalSize={"wide"}
      showRecentTransactions={true}
      chains={chains}
      coolMode={true}
      theme={lightTheme({
        accentColor: "#AE8AEF",
        accentColorForeground: "white",
        borderRadius: "large",
        fontStack: "system",
        overlayBlur: "small",
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
