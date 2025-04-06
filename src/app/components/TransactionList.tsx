import { useState, useEffect } from "react";
import API from "@/app/apis"
import { useWalletContext } from "@/app/contexts/useWalletContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import LinkSvg from "@/app/images/icons/link.svg"

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

	const fetchWalletHistory = async () => {
		API.fetchWalletHistory(wallet).then(walletHistory => {
      setHistories(walletHistory.transactions)
    }).catch(error => {
			console.error(error)
		});
	}

  const parseDatetime = (datetime: string) => {
    return new Date(datetime).toLocaleString();
  }

	useEffect(() => {
		fetchWalletHistory()
	}, [])

  if (histories.length === 0) {
    return (
      <div className="text-gray-400">No history found</div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Datetime</TableHead>
          <TableHead className="w-[100px]">Token</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Explorer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          histories.map((history) => (
            <TableRow key={history.id}>
              <TableCell className="font-medium">{parseDatetime(history.createdAt)}</TableCell>
              <TableCell className="font-medium">{history.symbol}</TableCell>
              <TableCell>{history.fromAddress}</TableCell>
              <TableCell>{history.toAddress}</TableCell>
              <TableCell>{history.amount}</TableCell>
              <TableCell className="text-right">
                <a href={history.explorerUrl} target="_blank" rel="noopener noreferrer">
                  <Image src={LinkSvg} alt="link" width={24} height={24} />
                </a>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}

export default TransactionList
