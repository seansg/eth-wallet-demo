import Burger from "@/app/images/icons/burger.svg"
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container-wrapper">
				<div className="container flex h-14 items-center gap-2 md:gap-4">

					<Link className="mx-4 flex items-center gap-2 lg:mx-6" href="/">
						<span className="font-bold inline-block">Wallet Demo</span>
					</Link>

					<div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end pr-2">
						<nav className="flex items-center gap-0.5">
							<button type="button" className="text-default lg:hidden rounded-lg hover:bg-hover" aria-label="Menu">
								<Image src={Burger} alt={""} width={24} height={24}/>
							</button>
						</nav>
					</div>
				</div>
			</div>
		</header>
  )
}

export default Nav
