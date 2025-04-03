"use client";

import { useState, useEffect } from "react";
import API from "@/app/apis"
import Nav from "@/app/components/Nav";
import WalletSelector from '@/app/components/WalletSelector'

export default function Home() {
  const [wallets, setWallets] = useState<{ address: string; }[]>([]);
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]?.address || "");

  const fetchWallets = async () => {
    API.fetchWallets().then(wallets => setWallets(wallets)).catch(error => {
      console.error(error)
    });
  }

  useEffect(() => {
    fetchWallets();
  }, []);

  return (
    <div>
      <Nav />
      <div className="flex justify-center h-screen w-full">
        <WalletSelector
          wallets={wallets}
          fetchWallets={fetchWallets}
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
        />
      </div>
    </div>
  );
}
