import axios from "axios"

const transfer = async (params: { fromAddress: string, toAddress: string, amount: string }) => {
	try {
		const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/wallets/transfer`, params);
		return res.data;
	} catch (error) {
		console.error("轉帳失敗:", error);
		throw new Error("轉帳失敗");

	}
}

export default transfer