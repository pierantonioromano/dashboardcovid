"use client"

import Image from "next/image"
import { LifebuoyIcon, ArrowPathIcon } from "@heroicons/react/24/outline"
import ShareModal from "./ShareModal"

export default function SiteHeader() {
	return (
		<>
			<header role="banner" className="w-full py-4 ">
				<div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-24">
					<div className="flex items-center justify-items-center h-16">
						<div className="flex-shrink-0 md:block">
							<div className="mt-1">
								<a href="/">
									<span className="inline-block align-middle bg-white rounded-full p-2">
										<Image src="/mask.png" alt="Bollettino Covid-19" width={36} height={36} />
									</span>
									<h1 className="inline-block align-middle ml-3 text-xl lg:text-3xl -mt-1.5 font-bold text-white">Bollettino Covid</h1>
								</a>
							</div>
						</div>
						{/* hidden lg:block lg */}
						<div className="flex-grow">
							<div className="mt-0 md:mt-0 ml-0 flex items-baseline justify-end">
								<ShareModal />
								<a
									href="https://www.paypal.com/donate/?hosted_button_id=8QWX9XSU854MA"
									target="_blank"
									className="hidden md:inline-block rounded-full border border-white bg-white hover:bg-governor-bay-700 hover:text-white py-2 px-2 md:px-4 ease-linear transition-all duration-150 ml-2"
								>
									<LifebuoyIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" />
									<span className="hidden md:inline-block">Supporta</span>
								</a>
								<a
									href="#"
									onClick={(e) => {
										e.preventDefault()
										if (typeof document !== undefined) document.location.reload()
									}}
									className="inline-block md:hidden rounded-full border border-white bg-white hover:bg-governor-bay-700 hover:text-white py-2 px-2 md:px-4 ease-linear transition-all duration-150 ml-2"
								>
									<ArrowPathIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}
