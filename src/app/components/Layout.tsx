import Nav from "@/app/components/Nav";
import WalletSelector from '@/app/components/WalletSelector'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
		<>
			<Nav />
			<div className="flex flex-col">
				<WalletSelector />
				{children}
			</div>
		</>
  )
}

export default Layout
