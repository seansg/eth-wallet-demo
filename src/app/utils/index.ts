export const toCurrency = (amount: string | number) => {
	return new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(Number(amount));
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));