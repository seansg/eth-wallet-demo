import { useEffect } from 'react';
import useWalletAssets from "../hooks/useWalletAssets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { toCurrency } from "@/app/utils"

const TokenList = () => {
	const { assets, fetchWalletAssets } = useWalletAssets();

  useEffect(() => {
    fetchWalletAssets();
  }, [fetchWalletAssets]);

  if (assets.length === 0) {
    return (
      <div className="text-gray-400 flex items-center justify-center py-8">No tokens found</div>
    )
  }

  return (
    <Card className="mx-4 py-0 my-4 mb-20">
      <CardContent className="space-y-2 divide-y divide-gray-200">
        {
          assets.map((asset) => (
            <div key={asset.symbol} className="flex items-center gap-2 py-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grow">
                <div className="font-medium">{asset.symbol}</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">$ {toCurrency(asset.averageCost)}</span>
                  <span className={`text-sm self-end ${Number(asset.pnl) > 0 ? 'text-green-500' : 'text-red-500'}`}>{Number(asset.pnl).toFixed(2)} %</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="font-medium">{toCurrency(asset.holdingAmount)}</div>
                <div className="text-sm text-muted-foreground">$ {toCurrency(asset.currentPrice)}</div>
              </div>
            </div>
          ))
        }
      </CardContent>
    </Card>
  );
}

export default TokenList
