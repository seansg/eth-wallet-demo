import axios from "axios"

const fetchWallets = async () => {
	try {
		const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/wallets`);
		return res.data.wallets;
	} catch (error) {
		console.error("獲取錢包失敗:", error);
	}
}

export default fetchWallets