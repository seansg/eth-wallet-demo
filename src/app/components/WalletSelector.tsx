import { Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CreateAddressBtn from "@/app/components/CreateAddressBtn";

interface WalletSelectorProps {
  wallets: { address: string }[];
  fetchWallets: () => void;
  selectedWallet: string;
  setSelectedWallet: (address: string) => void;
}

const WalletSelector = ({
  wallets,
  fetchWallets,
  selectedWallet,
  setSelectedWallet
}: WalletSelectorProps) => {

  const handleCopy = () => {
    if (selectedWallet) {
      navigator.clipboard.writeText(selectedWallet);
      alert("地址已複製");
    }
  };

  return (
    <div className="flex space-x-2 w-full p-4">
      <Select onValueChange={setSelectedWallet} defaultValue={selectedWallet}>
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

      <Button variant="outline" size="icon" onClick={handleCopy}>
        <Clipboard className="w-5 h-5" />
      </Button>

      <CreateAddressBtn
        fetchWallets={fetchWallets}
        setSelectedWallet={setSelectedWallet}
      />
    </div>
  );
}

export default WalletSelector