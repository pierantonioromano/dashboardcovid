import Image from "next/image"
import {
	RectangleStackIcon,
	BeakerIcon,
	NewspaperIcon,
	PaperAirplaneIcon,
	GiftIcon,
	LifebuoyIcon,
	ShareIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import ShareModal from "./ShareModal"

const navigation = [
	{
		id: 1,
		label: "Trend",
		link: "/",
		icon: (
			<RectangleStackIcon
				className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1"
				aria-hidden="true"
			/>
		),
	},
	// { id:2 , label: 'Vaccini', link: '/vaccini', icon: <BeakerIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" aria-hidden="true" /> },
	//{ id:3 , label: 'Mondo', link: '/mondo', icon: <GlobeIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" aria-hidden="true" /> },
	{
		id: 4,
		label: "News",
		link: "/news",
		icon: (
			<NewspaperIcon
				className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1"
				aria-hidden="true"
			/>
		),
	},
]

export default function SiteHeader() {
	return (
		<>
			<nav className="w-full py-4 ">
				<div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-24">
					<div className="flex items-center justify-items-center h-16">
						<div className="flex-shrink-0 md:block">
							<div className="mt-1">
								<a href="/">
									<span className="inline-block align-middle bg-white rounded-full p-2">
										<Image
											src="/mask.png"
											alt="Bollettino Covid-19"
											width={36}
											height={36}
										/>
									</span>
									<h1 className="inline-block align-middle ml-3 text-2xl lg:text-3xl -mt-1.5 font-bold text-white">
										Bollettino Covid
									</h1>
								</a>
							</div>
						</div>
						<div className="flex-grow">
							<div className="mt-0 md:mt-0 ml-0 md:ml-12 flex items-baseline space-x-4 justify-center md:justify-start">
								{/* {navigation.map((item) =>
									router.pathname == item.link ? (
										<a
											key={item.id}
											href={item.link}
											onClick={(e) => {
												e.preventDefault()
												router.push(item.link)
											}}
											className="text-center md:text-left text-blue-600 px-3 py-3 md:py-3.5 text-base font-normal "
										>
											{item.icon} {item.label}
										</a>
									) : (
										<a
											key={item.id}
											href={item.link}
											onClick={(e) => {
												e.preventDefault()
												router.push(item.link)
											}}
											className="opacity-80 md:opacity-100 text-center md:text-left md:text-black hover:text-blue-600 px-3 py-4 md:py-3.5 text-base font-normal"
										>
											{item.icon} {item.label}
										</a>
									)
								)} */}
							</div>
						</div>

						<div className="hidden lg:block lg:flex-grow">
							<div className="mt-0 md:mt-0 ml-0 flex items-baseline space-x-2 justify-end">
								<ShareModal />
								<a
									href="https://www.paypal.com/donate/?hosted_button_id=8QWX9XSU854MA"
									target="_blank"
									className="rounded-full border border-white bg-white hover:bg-governor-bay-700 hover:text-white py-2 px-4 inline-block ease-linear transition-all duration-150"
								>
									<LifebuoyIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" />{" "}
									Supporta
								</a>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}
