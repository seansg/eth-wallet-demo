"use client";

import { createContext, useState, useContext, useCallback } from 'react';
import API from "@/app/apis"

type WalletContextType = {
  wallets: { address: string }[];
  setWallets: (wallets: { address: string }[]) => void;
  wallet: string;
  setWallet: (address: string) => void;
  assets: AssetType[];
  fetchWalletAssets: () => void;
}

export interface AssetType {
  symbol: string;
  holdingAmount: string;
  averageCost: number;
  currentPrice: number;
  pnl: number;
}

export const WalletContext = createContext<WalletContextType>({
  wallets: [],
  setWallets: () => {},
  wallet: "",
  setWallet: () => {},
  assets: [],
  fetchWalletAssets: () => {}
});

export const useWalletContext = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallets, setWallets] = useState<{ address: string }[]>([]);
  const [wallet, setWallet] = useState<string>("");
  const [assets, setAssets] = useState<AssetType[]>([]);

  const fetchWalletAssets = useCallback(async () => {
      API.fetchWalletBalance(wallet).then(walletAsset => {
        setAssets(walletAsset.assets)
      }).catch(error => {
        console.error(error)
      });
    }, [wallet]);

  return (
    <WalletContext
      value={{
        wallets,
        setWallets,
        wallet,
        setWallet,
        assets,
        fetchWalletAssets
      }}
    >
      {children}
    </WalletContext>
  );
};
