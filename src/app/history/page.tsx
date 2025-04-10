"use client";

import Layout from '@/app/components/Layout'
import Content from '@/app/components/Content'
import Footer from '@/app/components/Footer'
import TransactionList from '@/app/components/TransactionList';
import Balance from '@/app/components/Balance'
import Buttons from '@/app/components/Buttons'
import Link from 'next/link'

const History = () => {
  return (
    <>
      <Layout>
        <Content>
          <div className="flex flex-col md:flex-row md:items-center md:px-4 md:justify-between">
            <Balance />
            <Buttons />
          </div>
          <div className="hidden md:flex bg-alternative top-0 z-10 overflow-hidden static space-x-3 border-b border-muted mb-4" role="tablist" aria-orientation="horizontal">
            <Link href="/" className="p-2 mx-2 font-medium border-b-2 border-transparent text-default focus:outline-none focus:ring-0 whitespace-nowrap lg:px-4 xl:px-12">Tokens</Link>
            <Link href="/history" className="p-2 mx-2 font-medium border-b-2 text-primary-default border-primary-default focus:outline-none focus:ring-0 whitespace-nowrap lg:px-4 xl:px-12">Transactions</Link>
          </div>
          <TransactionList />
          <Footer active="history" />
        </Content>
      </Layout>
    </>
  );
}

export default History
