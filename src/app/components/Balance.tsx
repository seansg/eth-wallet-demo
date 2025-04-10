import { useMemo, useEffect } from "react";
import { useWalletContext } from "../contexts/useWalletContext";

const Balance = () => {
	const { assets, fetchWalletAssets } = useWalletContext();
	const assetsStringify = JSON.stringify(assets);

	const totalBalance = useMemo(() => {
		return assets.reduce((total, asset) => total + (Number(asset.holdingAmount)) * asset.currentPrice, 0);
	}, [assetsStringify, assets]);

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

