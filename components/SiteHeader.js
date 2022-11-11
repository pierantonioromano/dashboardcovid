import Image from 'next/image'
import { CollectionIcon, BeakerIcon, NewspaperIcon, PaperAirplaneIcon, GiftIcon, SupportIcon, ShareIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import Link from 'next/link';
import ShareModal from './ShareModal';

const navigation = [
	{ id:1 , label: 'Settimana', link: '/', icon: <CollectionIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" aria-hidden="true" /> },
	{ id:2 , label: 'Vaccini', link: '/vaccini', icon: <BeakerIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" aria-hidden="true" /> },
	//{ id:3 , label: 'Mondo', link: '/mondo', icon: <GlobeIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" aria-hidden="true" /> },
	{ id:4 , label: 'News', link: '/news', icon: <NewspaperIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" aria-hidden="true" /> }
]

export default function SiteHeader() {

	const router = useRouter();

	return (
		<>
			<nav className="w-full h-16 sticky top-0 left-0 z-10 bg-white border-b border-indigo-50">
				<div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-4">
					<div className="flex items-center justify-items-center h-16">
						<div className="flex-shrink-0 hidden md:block">
							<div className="mt-1">
								<a href="/">
									<span className="inline-block align-middle">
										<Image
											src="/mask.png"
											alt="Bollettino Covid-19"
											width={36}
											height={36}
										/>
									</span>
									<h1 className="md:inline-block align-middle ml-3 text-3xl -mt-1.5 font-bold text-blue-600">Bollettino Covid</h1>
								</a>
								
							</div>
						</div>
						<div className="flex-grow">
							<div className="mt-0 md:mt-0 ml-0 md:ml-12 flex items-baseline space-x-4 justify-center md:justify-start">
								{navigation.map((item) =>
									router.pathname == item.link ? (
										<a key={item.id} href={item.link} onClick={(e) => { e.preventDefault(); router.push(item.link); }} className="text-center md:text-left text-blue-600 px-3 py-3 md:py-3.5 text-base font-normal ">{item.icon} {item.label}</a>
									) : (
										<a key={item.id}  href={item.link} onClick={(e) => { e.preventDefault(); router.push(item.link); }} className="opacity-80 md:opacity-100 text-center md:text-left md:text-black hover:text-blue-600 px-3 py-4 md:py-3.5 text-base font-normal">{item.icon} {item.label}</a>
									)
								)}
							</div>
						</div>

						<div className="hidden lg:block lg:flex-grow">
							<div className="mt-0 md:mt-0 ml-0 flex items-baseline space-x-2 justify-end">
								<ShareModal />
								<a href="https://www.paypal.com/donate/?hosted_button_id=8QWX9XSU854MA" target="_blank" className="rounded-full bg-purple-50 hover:bg-purple-100 py-2 px-4 inline-block ease-linear transition-all duration-150">
									<SupportIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" /> Supporta
								</a>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
  )
}
