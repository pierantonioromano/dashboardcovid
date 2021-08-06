/* This example requires Tailwind CSS v2.0+ */
import Head from 'next/head'
import Image from 'next/image'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { CollectionIcon, BeakerIcon, GlobeIcon, NewspaperIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useRouter } from "next/router"
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share"
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share'

const navigation = [
	{ id:1 , label: 'Oggi', link: '/', icon: <CollectionIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" aria-hidden="true" /> },
	{ id:2 , label: 'Vaccini', link: '/vaccini', icon: <BeakerIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" aria-hidden="true" /> },
	//{ id:3 , label: 'Mondo', link: '/mondo', icon: <GlobeIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" aria-hidden="true" /> },
	{ id:4 , label: 'News', link: '/news', icon: <NewspaperIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" aria-hidden="true" /> }
]

const share_url = "https://www.pierantonioromano.com";
const share_text = "Covid-19 Dashboard - Tutte le informazioni sul covid";
const share_separator = " - ";

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function SiteHeader() {
	const router = useRouter();

  return (
	<>
	<Head>
		<html lang="it" />
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
		<link rel="manifest" href="/site.webmanifest" />
		<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
		<meta name="msapplication-TileColor" content="#ffffff" />
		<meta name="theme-color" content="#ffffff" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
	</Head>
    <div className="w-full fixed top-0 left-0 z-10">
      <Disclosure as="nav" className="bg-white border-b border-indigo-50">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14">
                <div className="flex items-center">
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
                  <div className="md:block">
                    <div className="mt-1 md:mt-0 ml-2 md:ml-10 flex items-baseline space-x-4">
                      {navigation.map((item, itemIdx) =>
                        router.pathname == item.link ? (
                          <Fragment key={item.id}>
                            <a href={item.link} className="text-center md:text-left text-blue-600 px-3 py-4 md:py-4 text-sm md:text-base font-normal md:border-b-2 md:border-blue-600">
                              {item.icon} {item.label}
                            </a>
                          </Fragment>
                        ) : (
                          <a
                            key={item.id}
                            href={item.link}
                            className="text-center md:text-left text-black-800 hover:text-blue-600 px-3 py-4 md:py-4 text-sm md:text-base font-normal"
                          >
                            {item.icon} {item.label}
                          </a>
                        )
                      )}
                    </div>
                  </div>

                </div>

				{/* <div className="-mr-2 flex hidden md:block">
					<FacebookShareButton url={share_url} quote={share_text} className="mr-2 mt-1" >
						<FacebookIcon size={32} round />
					</FacebookShareButton>
					<TwitterShareButton url={share_url} quote={share_text} className="mr-2 mt-1">
						<TwitterIcon size={32} round />
					</TwitterShareButton>
					<WhatsappShareButton url={share_url} title={share_text} separator={share_separator} className="mt-1">
						<WhatsappIcon size={32} round />
					</WhatsappShareButton>
				</div> */}

                {/* <div className="-mr-2 flex md:hidden">
                  
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black focus:outline-none ">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div> */}

              </div>
            </div>

			{/* Mobile menu dropdown */}
			<Disclosure.Panel className="sm:hidden">
            	<div className="px-2 pt-2 pb-3 space-y-1">
				{navigation.map((item, itemIdx) =>
                        router.pathname == item.link ? (
                          <Fragment key={item.id}>
                            <a href={item.link} className="block w-full text-blue-600 px-3 py-2 text-base font-medium antialiased">
                              {item.icon} {item.label}
                            </a>
                          </Fragment>
                        ) : (
                          <a
                            key={item.id}
                            href={item.link}
                            className="block w-full text-black-800 hover:text-blue-600 px-3 py-2 text-base font-medium antialiased"
                          >
                            {item.icon} {item.label}
                          </a>
                        )
                      )}
            	</div>
          	</Disclosure.Panel>

          </>
        )}
      </Disclosure>


    </div>
	</>
  )
}
