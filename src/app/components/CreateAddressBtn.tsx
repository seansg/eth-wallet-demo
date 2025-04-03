import API from "@/app/apis"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react";

const CreateAddressBtn = ({
	setSelectedWallet,
	fetchWallets
}: {
	setSelectedWallet: (address: string) => void,
	fetchWallets: () => void
}) => {
	const handleCreateAddress = async () => {
		const newWallet = await API.createWallet();
		setSelectedWallet(newWallet.address);
		await fetchWallets();
		alert("地址已新增");
	}

	return (
		<Button onClick={handleCreateAddress}>
			<PlusCircle className="w-5 h-5 mr-1" />
			Create
		</Button>
	)
}

export default CreateAddressBtn
