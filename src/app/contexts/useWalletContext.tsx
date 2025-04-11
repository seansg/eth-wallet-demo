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
  histories: HistoryType[];
  fetchWalletHistory: () => void;
  updateWallet: () => void;
}

export interface AssetType {
  symbol: string;
  holdingAmount: string;
  averageCost: number;
  currentPrice: number;
  pnl: number;
}

export interface HistoryType {
  id: string;
  fromAddress: string,
  toAddress: string,
  symbol: string,
  amount: string,
  explorerUrl: string,
  createdAt: string
}

export const WalletContext = createContext<WalletContextType>({
  wallets: [],
  setWallets: () => {},
  wallet: "",
  setWallet: () => {},
  assets: [],
  fetchWalletAssets: () => {},
  histories: [],
  fetchWalletHistory: () => {},
  updateWallet: () => {},
});

export const useWalletContext = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallets, setWallets] = useState<{ address: string }[]>([]);
  const [wallet, setWallet] = useState<string>("");
  const [assets, setAssets] = useState<AssetType[]>([]);
  const [histories, setHistories] = useState<HistoryType[]>([]);

  const fetchWalletAssets = useCallback(async () => {
    API.fetchWalletBalance(wallet).then(walletAsset => {
      setAssets(walletAsset.assets)
    }).catch(error => {
      console.error(error)
    });
  }, [wallet]);

  const fetchWalletHistory = useCallback(async () => {
		API.fetchWalletHistory(wallet).then(walletHistory => {
      setHistories(walletHistory.transactions)
    }).catch(error => {
			console.error(error)
		});
	}, [wallet]);

  const updateWallet = useCallback(async () => {
    await fetchWalletAssets();
    await fetchWalletHistory();
  }, [fetchWalletAssets, fetchWalletHistory]);


  return (
    <WalletContext
      value={{
        wallets,
        setWallets,
        wallet,
        setWallet,
        assets,
        fetchWalletAssets,
        histories,
        fetchWalletHistory,
        updateWallet,
      }}
    >
      {children}
    </WalletContext>
  );
};
