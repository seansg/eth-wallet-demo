"use client"

import { useContext } from 'react'
import { WalletContext } from '@/app/contexts/useWalletContext'
import TokenList from "@/app/components/TokenList"
import TransactionList from "@/app/components/TransactionList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Content = () => {
  const { wallet } = useContext(WalletContext)

  if (!wallet) {
    return <div className="p-4">請選擇錢包</div>
  }

  return (
    <Tabs defaultValue="tokens" className="p-4">
      <TabsList className="grid w-full grid-cols-2 cursor-pointer">
        <TabsTrigger value="tokens" className="cursor-pointer">Tokens</TabsTrigger>
        <TabsTrigger value="transactions" className="cursor-pointer">Transactions</TabsTrigger>
      </TabsList>
      <TabsContent value="tokens">
        <Card>
          <CardHeader>
            <CardTitle>
              <h3 className="text-lg font-bold">Tokens</h3>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TokenList />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="transactions">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold">Transactions</h3>
          </CardHeader>
          <CardContent>
            <TransactionList />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default Content