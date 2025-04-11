import axios from "axios"

const estimateGas = async (params: { fromAddress: string, toAddress: string, amount: string }) => {
	try {
		const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/wallets/estimateGas`, params);
		return res.data;
	} catch (error) {
		console.error("預估 gas 失敗:", error);
	}
}

export default estimateGas