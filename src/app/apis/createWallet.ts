import axios from "axios";

const createWallet = async () => {
	try {
		const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/wallets/create`);
		return res.data;
	} catch (error) {
		console.error("創建錢包失敗:", error);
	}
}

export default createWallet