import { useMemo, useEffect } from "react";
import useWalletAssets from "@/app/hooks/useWalletAssets";

const Balance = () => {
	const { assets, fetchWalletAssets } = useWalletAssets();
	const assetsStringify = JSON.stringify(assets);

	const totalBalance = useMemo(() => {
		return assets.reduce((total, asset) => total + (Number(asset.holdingAmount)) * asset.currentPrice, 0);
	}, [assetsStringify]);

	useEffect(() => {
		fetchWalletAssets();
	}, [fetchWalletAssets]);

	return (
		<div className="flex items-end justify-center text-4xl py-4 font-bold gap-2">
			$ {totalBalance.toFixed(2)}
			<span className="text-xs text-muted-foreground">USDT</span>
		</div>
	)
}

export default Balance

