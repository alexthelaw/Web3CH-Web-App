import React, {FC, PropsWithChildren} from 'react';
import {WagmiConfig, createConfig, configureChains, Chain} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';
import {InjectedConnector} from '@wagmi/connectors/injected';
import {MetaMaskConnector} from '@wagmi/connectors/metaMask';

const BIT = {
  name: 'BIT',
  symbol: 'BIT',
  decimals: 18
};
const MantleRPCUrl = 'https://rpc.testnet.mantle.xyz';
export const MantleChain: Chain = {
  id: 5001,
  name: 'Mantle Testnet',
  network: 'Mantle Testnet',
  nativeCurrency: BIT,
  rpcUrls: {
    main: {
      http: [MantleRPCUrl],
      webSocket: [MantleRPCUrl]
    },
    default: {
      http: [MantleRPCUrl],
      webSocket: [MantleRPCUrl]
    },
    public: {
      http: [MantleRPCUrl],
      webSocket: [MantleRPCUrl]
    }
  },

  testnet: true
};

const {publicClient, webSocketPublicClient} = configureChains(
  [MantleChain],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({chains: [MantleChain]}),
    new InjectedConnector({
      chains: [MantleChain],
      options: {
        name: 'Injected',
        shimDisconnect: true
      }
    })
  ],
  publicClient,
  webSocketPublicClient
});


export const Wagmi: FC<PropsWithChildren> = ({children}) => {
  return (
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  );
};
