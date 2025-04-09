"use client";

import { createContext, useState, useContext } from 'react';

type WalletContextType = {
  wallets: { address: string }[];
  setWallets: (wallets: { address: string }[]) => void;
  wallet: string;
  setWallet: (address: string) => void;
}

export const WalletContext = createContext<WalletContextType>({
  wallets: [],
  setWallets: () => {},
  wallet: "",
  setWallet: () => {}
});

export const useWalletContext = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallets, setWallets] = useState<{ address: string }[]>([]);
  const [wallet, setWallet] = useState<string>("");

  return (
    <WalletContext
      value={{
        wallets,
        setWallets,
        wallet,
        setWallet
      }}
    >
      {children}
    </WalletContext>
  );
};
