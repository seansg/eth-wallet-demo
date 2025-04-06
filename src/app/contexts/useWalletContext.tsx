import { createContext, useState, useContext } from 'react';

interface WalletContextType {
  wallets: { address: string }[];
  setWallets: React.Dispatch<React.SetStateAction<{ address: string }[]>>;
  wallet: string;
  setWallet: React.Dispatch<React.SetStateAction<string>>;
}

export const WalletContext = createContext<WalletContextType>({} as WalletContextType);

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
