import { Wallet, Clock } from "lucide-react";
import Link from 'next/link'

interface FooterProps {
  active: string;
}

const Footer = ({ active }: FooterProps) => {
  return (
    <div className="flex md:hidden items-center justify-around py-4 fixed bottom-0 w-full bg-background/95 divide-x divide-gray-200">
      <Link href="/" className={`w-full flex flex-col items-center ${active === 'wallet' ? 'text-blue-500' : 'text-muted-foreground'}`} >
				<Wallet className="w-6 h-6" />
				<span className="text-sm">Wallet</span>
			</Link>
			<Link href="/history" className={`w-full flex flex-col items-center ${active === 'history' ? 'text-blue-500' : 'text-muted-foreground'}`}>
				<Clock className="w-6 h-6" />
				<span className="text-sm">History</span>
			</Link>
    </div>
  )
}

export default Footer
