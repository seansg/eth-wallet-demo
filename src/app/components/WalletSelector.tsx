import { useCallback, useEffect } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CreateAddressBtn from "@/app/components/CreateAddressBtn";
import { useWalletContext } from '@/app/contexts/useWalletContext'
import API from "@/app/apis"

const WalletSelector = () => {
  const { wallets, setWallets, wallet, setWallet } = useWalletContext();

  const fetchWallets = useCallback(async () => {

    await API.fetchWallets().then(wallets => {
      setWallets(wallets)
    }).catch(error => {
      console.error(error)
    });
  }, [setWallets]);

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  return (
    <div className="flex space-x-2 w-full p-4">
      <Select onValueChange={setWallet} defaultValue={wallet}>
        <SelectTrigger className="flex-1 truncate">
          <SelectValue placeholder="選擇錢包" />
        </SelectTrigger>
        <SelectContent>
          {wallets.map((wallet, index) => (
            <SelectItem key={index} value={wallet.address}>
              {wallet.address}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <CreateAddressBtn
        fetchWallets={fetchWallets}
        setWallet={setWallet}
      />
    </div>
  );
}

export default WalletSelector