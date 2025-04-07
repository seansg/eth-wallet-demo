interface WalletCardProps {
  address: string;
  balance: string;
}

const WalletCard = ({ address, balance }: WalletCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold">錢包資訊</h2>
      <p className="mt-2 text-gray-600">地址: <span className="font-mono break-all">{address}</span></p>
      <p className="mt-2 text-gray-600">餘額: <span className="font-bold">{balance} ETH</span></p>
    </div>
  );
}

export default WalletCard