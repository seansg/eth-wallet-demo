import axios from "axios"

const sendETH = async (params: { fromAddress: string, toAddress: string, amount: string }) => {
	try {
		const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/wallets/sendETH`, params);
		return res.data;
	} catch (error) {
		console.error("發送失敗:", error);
		throw new Error("發送失敗");

	}
}

export default sendETH