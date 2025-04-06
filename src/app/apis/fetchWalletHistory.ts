import axios from "axios"

const fetchWalletHistory = async (address: string) => {
	try {
		const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/wallets/history/${address}`);
		return res.data;
	} catch (error) {
		console.error("獲取錢包歷史失敗:", error);
	}
}

export default fetchWalletHistory