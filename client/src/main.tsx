import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./polyfills";
import { WagmiConfig } from "wagmi";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiClient } from "./connectors";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <WagmiConfig client={wagmiClient}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </WagmiConfig>
);
