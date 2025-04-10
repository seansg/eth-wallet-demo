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
        <div className="hidden md:flex items-center gap-2 py-4 md:gap-10">
          <div className="grow md:flex md:flex-row md:gap-10 md:grow-0">
            <div className="font-medium md:w-20">Token</div>
            <div className="flex items-center gap-2 md:gap-10">
              <div className="font-medium md:w-20">Avg Cost</div>
              <div className="font-medium md:w-20">PNL</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-end md:items-center md:gap-10">
            <div className="font-medium md:w-20">Amount</div>
            <div className="font-medium md:w-20">Price</div>
          </div>
        </div>
        {
          assets.map((asset) => (
            <div key={asset.symbol} className="flex items-center gap-2 py-4 md:gap-10">
              <Avatar className="md:hidden">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grow md:flex md:flex-row md:gap-10 md:grow-0">
                <div className="font-medium md:w-20">{asset.symbol}</div>
                <div className="flex items-center gap-2 md:gap-10">
                  <span className="text-sm md:text-base text-muted-foreground md:text-black md:w-20">$ {toCurrency(asset.averageCost)}</span>
                  <span className={`text-sm md:text-base md:w-20 self-end ${Number(asset.pnl) > 0 ? 'text-green-500' : 'text-red-500'}`}>{Number(asset.pnl).toFixed(2)} %</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-end md:items-center md:gap-10">
                <div className="font-medium md:w-20">{toCurrency(asset.holdingAmount)}</div>
                <div className="text-sm md:text-base text-muted-foreground md:text-black md:w-20">$ {toCurrency(asset.currentPrice)}</div>
              </div>
            </div>
          ))
        }
      </CardContent>
    </Card>
  );
}

export default TokenList
