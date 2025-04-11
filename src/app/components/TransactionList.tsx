import { useCallback, useEffect } from "react";
import { useWalletContext } from "@/app/contexts/useWalletContext";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { toCurrency } from "@/app/utils"
import { Button } from "@/components/ui/button"
import { SquareArrowOutUpRight } from "lucide-react"

const TransactionList = () => {
  const { wallet, histories, fetchWalletHistory } = useWalletContext();

  const parseDatetime = useCallback((datetime: string) => {
    return new Date(datetime).toLocaleString();
  }, []);

  const shortAddress = useCallback((address: string, length: number) => {
    return `${address.slice(0, length)}...${address.slice(-length)}`
  }, []);

  const displayAddress = useCallback((fromAddress: string, toAddress: string) => {
    const method = txMethod(fromAddress, toAddress);
    const address = method === 'S' ? toAddress : fromAddress;
    return method ? shortAddress(address, 4) : '';
  }, []);

  const txMethod = useCallback((fromAddress: string, toAddress: string) => {
    if (fromAddress === wallet) {
      return 'S';
    } else if (toAddress === wallet) {
      return 'R';
    }
    return 'T';
  }, []);

	useEffect(() => {
		fetchWalletHistory()
	}, [wallet])

  if (histories.length === 0) {
    return (
      <div className="text-gray-400 flex items-center justify-center py-8">No history found</div>
    )
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      <Card className="py-0 my-4 mb-20">
        <CardContent className="space-y-2 divide-y divide-gray-200">
          <div className="hidden md:flex items-center gap-2 py-4">
            <div className="grow flex items-center gap-10">
              <div className="font-medium md:w-20">Method</div>
              <div className="font-medium md:w-50">From</div>
              <div className="font-medium md:w-50">To</div>
            </div>
            <div className="flex flex-col items-end md:flex-row md:gap-10 md:w-80">
              <div className="font-medium md:w-20">Amount</div>
              <div className="font-medium">Date</div>
            </div>
            <div className="hidden md:block md:w-20">Etherscan</div>
          </div>
          {
            histories.map((history) => (
              <a href={history.explorerUrl} target="_blank" key={history.id} className="flex items-center gap-2 py-4">
                <div className="md:hidden flex items-center justify-center rounded-full !w-10 h-10 border border-gray-200">
                  {txMethod(history.fromAddress, history.toAddress)}
                </div>
                <div className="grow md:flex md:gap-10">
                  <div className="font-medium md:w-20">{txMethod(history.fromAddress, history.toAddress) === 'S' ? 'Send' : txMethod(history.fromAddress, history.toAddress) === 'R' ? 'Receive' : 'Transfer'}</div>
                  <div className="md:hidden text-sm text-muted-foreground">{displayAddress(history.fromAddress, history.toAddress)}</div>
                  <div className="hidden md:block md:w-50 truncate">{shortAddress(history.fromAddress, 6)}</div>
                  <div className="hidden md:block md:w-50 truncate">{shortAddress(history.toAddress, 6)}</div>
                </div>
                <div className="flex flex-col items-end md:flex-row md:gap-10 md:w-80">
                  <div className="font-medium md:w-20">{toCurrency(history.amount)} {history.symbol}</div>
                  <div className="text-sm text-muted-foreground md:text-base md:text-black">{parseDatetime(history.createdAt)}</div>
                </div>
                <div className="hidden md:flex md:justify-center md:w-20">
                  <Button className="" size="icon" variant="outline">
                    <SquareArrowOutUpRight />
                  </Button>
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
