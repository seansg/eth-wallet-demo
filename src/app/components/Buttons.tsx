import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import TransferForm from "./TransferForm";
import { Clipboard, RefreshCcw } from "lucide-react";
import useWalletAssets from "../hooks/useWalletAssets";
import { useWalletContext } from "@/app/contexts/useWalletContext";
import Loading from "./Loading";
import { sleep } from "@/app/utils";

const Buttons = () => {
	const { wallet } = useWalletContext();
	const { fetchWalletAssets } = useWalletAssets();
	const [loading, setLoading] = useState(false);

	const handleCopy = useCallback(() => {
		if (wallet) {
			navigator.clipboard.writeText(wallet);
			alert("地址已複製");
		}
	}, [wallet]);

	const reloadWallet = useCallback(async () => {
		if (loading) return;

		setLoading(true);
		await fetchWalletAssets();
		await sleep(500);
		setLoading(false);
	}, [fetchWalletAssets, loading]);

	return (
		<div className="grid grid-cols-3 gap-x-2 px-4">
			<TransferForm />
			<Button variant="outline" onClick={handleCopy}>
        <Clipboard className="w-5 h-5" />
				<span>Copy</span>
      </Button>
			{
				loading ?
					<Button variant="outline">
						<Loading />
					</Button> :
					<Button variant="outline" onClick={reloadWallet}>
						<RefreshCcw className="w-5 h-5" />
						<span>Reload</span>
					</Button>
			}
		</div>
	)
}

export default Buttons