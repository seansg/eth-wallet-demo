"use client";

import Buttons from '@/app/components/Buttons'
import Balance from '@/app/components/Balance'
import Layout from '@/app/components/Layout'
import Content from '@/app/components/Content'
import Footer from '@/app/components/Footer'
import TokenList from '@/app/components/TokenList';

const Home = () => {
  return (
    <>
      <Layout>
        <Content>
          <Balance />
          <Buttons />
          <TokenList />
          <Footer active="wallet" />
        </Content>
      </Layout>
    </>
  );
}

export default Home
