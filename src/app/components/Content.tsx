"use client"

import { useContext } from 'react'
import { WalletContext } from '@/app/contexts/useWalletContext'

const Content = ({ children }: { children: React.ReactNode }) => {
  const { wallet } = useContext(WalletContext)

  if (!wallet) {
    return <div className="p-4">請選擇錢包</div>
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default Content