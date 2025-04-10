import axios from "axios"

const fetchWalletBalance = async (address: string) => {
	try {
		const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/wallets/assets/${address}`);
		return res.data;
	} catch (error) {
		console.error("獲取錢包失敗:", error);
	}
}

export default fetchWalletBalance