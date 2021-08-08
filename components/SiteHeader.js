import Image from 'next/image'
import { CollectionIcon, BeakerIcon, NewspaperIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import Link from 'next/link';

const navigation = [
	{ id:1 , label: 'Oggi', link: '/', icon: <CollectionIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" aria-hidden="true" /> },
	{ id:2 , label: 'Vaccini', link: '/vaccini', icon: <BeakerIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" aria-hidden="true" /> },
	//{ id:3 , label: 'Mondo', link: '/mondo', icon: <GlobeIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" aria-hidden="true" /> },
	{ id:4 , label: 'News', link: '/news', icon: <NewspaperIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" aria-hidden="true" /> }
]

export default function SiteHeader() {

	const router = useRouter();

	return (
		<>
			<nav className="w-full h-14 sticky top-0 left-0 z-10 bg-white border-b border-indigo-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-items-center h-14">
						<div className="flex-shrink-0 hidden md:block">
							<div className="mt-1">
								<a href="/">
									<Image
										src="/mask.png"
										alt="Covid-19 Dashboard"
										width={36}
										height={36}
									/>
								</a>
							</div>
						</div>
						<div className="flex-grow">
							<div className="mt-0 md:mt-0 ml-0 md:ml-10 flex items-baseline space-x-4 justify-center md:justify-start">
								{navigation.map((item) =>
									router.pathname == item.link ? (
										<Link href={item.link} prefetch={false}>
											<a  className="text-center md:text-left text-blue-600 px-3 py-3 md:py-3.5 text-base font-normal md:border-b-2 md:border-blue-600">{item.icon} {item.label}</a>
										</Link>
									) : (
										<Link href={item.link} prefetch={false}>
											<a className="opacity-80  md:opacity-100 text-center md:text-left md:text-black hover:text-blue-600 px-3 py-4 md:py-3.5 text-base font-normal">{item.icon} {item.label}</a>
										</Link>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
  )
}
