"use client";

import Layout from '@/app/components/Layout'
import Content from '@/app/components/Content'
import Footer from '@/app/components/Footer'
import TransactionList from '@/app/components/TransactionList';

const History = () => {
  return (
    <>
      <Layout>
        <Content>
          <TransactionList />
          <Footer active="history" />
        </Content>
      </Layout>
    </>
  );
}

export default History
