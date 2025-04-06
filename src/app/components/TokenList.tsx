import { useState, useEffect } from "react";
import API from "@/app/apis"
import { useWalletContext } from "@/app/contexts/useWalletContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface AssetType {
  symbol: string;
  holdingAmount: string,
  averageCost: number,
  currentPrice: number,
  pnl: number
}

const TokenList = () => {
  const { wallet } = useWalletContext();
	const [assets, setAssets] = useState<AssetType[]>([]);

	const fetchWalletBalance = async () => {
		API.fetchWalletBalance(wallet).then(walletAsset => {
      setAssets(walletAsset.assets)
    }).catch(error => {
			console.error(error)
		});
	}

	useEffect(() => {
		fetchWalletBalance()
	}, [])

  if (assets.length === 0) {
    return (
      <div className="text-gray-400">No tokens found</div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Token</TableHead>
          <TableHead>持有數量</TableHead>
          <TableHead>成本價（平均）</TableHead>
          <TableHead>現價</TableHead>
          <TableHead className="text-right">損益</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          assets.map((asset) => (
            <TableRow key={asset.symbol}>
              <TableCell className="font-medium">{asset.symbol}</TableCell>
              <TableCell>{asset.holdingAmount}</TableCell>
              <TableCell>{asset.averageCost}</TableCell>
              <TableCell>{asset.currentPrice}</TableCell>
              <TableCell className="text-right">{parseFloat(asset.pnl.toFixed(6))}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}

export default TokenList
