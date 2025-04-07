"use client";

import Nav from "@/app/components/Nav";
import { WalletProvider } from "@/app/contexts/useWalletContext";
import WalletSelector from '@/app/components/WalletSelector'
import Content from '@/app/components/Content'
import Buttons from '@/app/components/Buttons'

export default function Home() {

  return (
    <>
      <Nav />
      <WalletProvider>
        <div className="flex flex-col">
          <WalletSelector />
          <Buttons />
          <Content />
        </div>
      </WalletProvider>
    </>
  );
}
