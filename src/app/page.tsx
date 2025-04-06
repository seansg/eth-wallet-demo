"use client";

import Nav from "@/app/components/Nav";
import { WalletProvider } from "@/app/contents/useWalletContext";
import WalletSelector from '@/app/components/WalletSelector'
import Content from '@/app/components/Content'

export default function Home() {

  return (
    <WalletProvider>
      <Nav />
      <div className="flex flex-col px-4">
        <WalletSelector />
        <Content />
      </div>
    </WalletProvider>
  );
}
