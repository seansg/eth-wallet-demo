import { useCallback, useState }	from 'react';
import API from "@/app/apis"
import { useWalletContext } from "@/app/contexts/useWalletContext";

export interface AssetType {
  symbol: string;
  holdingAmount: string;
  averageCost: number;
  currentPrice: number;
  pnl: number;
}

const useWalletAssets = () => {
  const { wallet } = useWalletContext();
  const [assets, setAssets] = useState<AssetType[]>([]);

  const fetchWalletAssets = useCallback(async () => {
    API.fetchWalletBalance(wallet).then(walletAsset => {
      setAssets(walletAsset.assets)
    }).catch(error => {
      console.error(error)
    });
  }, [wallet]);

  return {
		assets,
		fetchWalletAssets
	};
}

export default useWalletAssets