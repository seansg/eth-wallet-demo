import { useState, useCallback, useEffect } from "react";
import API from "@/app/apis"
import { useWalletContext } from "@/app/contexts/useWalletContext";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toCurrency } from "@/app/utils"

interface HistoryType {
  id: string;
  fromAddress: string,
  toAddress: string,
  symbol: string,
  amount: string,
  explorerUrl: string,
  createdAt: string
}

const TransactionList = () => {
  const { wallet } = useWalletContext();
	const [histories, setHistories] = useState<HistoryType[]>([]);

	const fetchWalletHistory = useCallback(async () => {
		API.fetchWalletHistory(wallet).then(walletHistory => {
      setHistories(walletHistory.transactions)
    }).catch(error => {
			console.error(error)
		});
	}, [wallet]);

  const parseDatetime = useCallback((datetime: string) => {
    return new Date(datetime).toLocaleString();
  }, []);

  const shortAddress = useCallback((fromAddress: string, toAddress: string) => {
    const method = txMethod(fromAddress, toAddress);
    const address = method === 'S' ? toAddress : fromAddress;
    return method ? `${address.slice(0, 4)}...${address.slice(-4)}` : '';
  }, []);

  const txMethod = useCallback((fromAddress: string, toAddress: string) => {
    if (fromAddress === wallet) {
      return 'S';
    } else if (toAddress === wallet) {
      return 'R';
    }
    return 'T';
  }, [wallet]);

	useEffect(() => {
		fetchWalletHistory()
	}, [wallet])

  if (histories.length === 0) {
    return (
      <div className="text-gray-400 flex items-center justify-center py-8">No history found</div>
    )
  }

  return (
    <div className="mx-4">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      <Card className="py-0 my-4 mb-20">
        <CardContent className="space-y-2 divide-y divide-gray-200">
          {
            histories.map((history) => (
              <a href={history.explorerUrl} target="_blank" key={history.id} className="flex items-center gap-2 py-4">
                <div className="flex items-center justify-center rounded-full !w-10 h-10 border border-gray-200">
                  {txMethod(history.fromAddress, history.toAddress)}
                </div>
                <div className="grow">
                  <div className="font-medium">{txMethod(history.fromAddress, history.toAddress) === 'S' ? 'Send' : txMethod(history.fromAddress, history.toAddress) === 'R' ? 'Receive' : 'Transfer'}</div>
                  <div className="text-sm text-muted-foreground">{shortAddress(history.fromAddress, history.toAddress)}</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="font-medium">{toCurrency(history.amount)} {history.symbol}</div>
                  <div className="text-sm text-muted-foreground">{parseDatetime(history.createdAt)}</div>
                </div>
              </a>
            ))
          }
        </CardContent>
      </Card>
    </div>
  );
}

export default TransactionList
