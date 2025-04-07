import API from "@/app/apis"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react";
import { useCallback } from "react";

const CreateAddressBtn = ({
	setWallet,
	fetchWallets
}: {
	setWallet: (address: string) => void,
	fetchWallets: () => void
}) => {
	const handleCreateAddress = useCallback(async () => {
		const newWallet = await API.createWallet();
		setWallet(newWallet.address);
		await fetchWallets();
		alert("地址已新增");
	}, [setWallet, fetchWallets]);

	return (
		<Button onClick={handleCreateAddress}>
			<PlusCircle className="w-5 h-5 mr-1" />
			Create
		</Button>
	)
}

export default CreateAddressBtn
