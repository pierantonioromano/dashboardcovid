import React, { useState } from 'react';
import { ClipboardCheckIcon, ShareIcon, XIcon, ClipboardIcon } from '@heroicons/react/outline';
import Facebook from 'react-share-icons/lib/Facebook'
import Twitter from 'react-share-icons/lib/Twitter'
import Whatsapp from 'react-share-icons/lib/Whatsapp'
import Telegram from 'react-share-icons/lib/Telegram'

export default function ShareModal() {

	const [showModal, setShowModal] = useState(false);
	const [copiedUrl, setCopiedUrl] = useState(false);
	const shareDescription = typeof document !== 'undefined' ? document.querySelector("meta[property='og:description']").content : '';
	const shareText = typeof document !== 'undefined' && document.title ? document.title + ' - ' + shareDescription : '';
	const shareUrl = typeof window !== 'undefined' && window.location.href ? window.location.href : '';

	//Create sharing url
	function createShareUrl(socialType, sharedUrl, sharedText, sharedImage, sharedTitle, sharedCaption)
	{
		//try to fetch image from opengraph property
		/*if(!sharedImage || sharedImage == "")
			sharedImage = window.location.protocol + "/" + window.location.hostname + document.querySelector("meta[property='og:image']").content;*/

		//build share url
		switch(socialType)
		{
			case "facebook":
				var socialShareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + sharedUrl + "&title=" + sharedTitle + "&caption=" + sharedCaption + "&description=" + sharedText + "&picture=" + sharedImage;
				window.open(socialShareUrl,'Facebook','width=550,height=400,menubar=1,status=0,toolbar=0,scrollbars=1');
				break;

			case "twitter":
				//var socialShareUrl = "http://twitter.com/share?url=" + sharedUrl + "&image=" + sharedImage + "&text=" + sharedText;
				var socialShareUrl = "https://twitter.com/intent/tweet?text=" + sharedText + "&url=" + sharedUrl; 
				window.open(socialShareUrl,'Twitter','width=550,height=400,menubar=1,status=0,toolbar=0,scrollbars=1');
				break;

			case "whatsapp":
				var socialShareUrl = "https://api.whatsapp.com/send?text=" + shareText + " " + shareUrl;
				window.open(socialShareUrl,'WhatsApp','width=550,height=400,menubar=1,status=0,toolbar=0,scrollbars=1');
				break;

			case "telegram":
				var socialShareUrl = "https://t.me/share/url?url=" + shareText + " " + shareUrl;
				window.open(socialShareUrl,'Telegram','width=550,height=400,menubar=1,status=0,toolbar=0,scrollbars=1');
				break;

			case "pinterest":
				var socialShareUrl = "https://pinterest.com/pin/create/button/?url=" + sharedUrl + "&media=" + sharedImage + "&description=" + sharedText;
				window.open(socialShareUrl,'Pinterest','width=550,height=400,menubar=1,status=0,toolbar=0,scrollbars=1');
				break;
				
			case "linkedin":
				var socialShareUrl = "https://www.linkedin.com/shareArticle?mini=true&url=" + sharedUrl + "&title=" + sharedTitle + "&summary=" + sharedText + "&source=" + sharedCaption;
				window.open(socialShareUrl,'Linkedin','width=550,height=400,menubar=1,status=0,toolbar=0,scrollbars=1');
				break;
		}
	}

	return(

			<>
				<a href="#" onClick={(e) => { e.preventDefault(); setCopiedUrl(false); setShowModal(true); }} className="rounded-full bg-indigo-50 hover:bg-indigo-100 py-2 px-4 inline-block ease-linear transition-all duration-150">
					<ShareIcon className="md:mr-1 h-6 w-6 md:h-4 md:w-4 inline align-middle md:-mt-1" /> Condividi
				</a>

				{ showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-full my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								
								{/*header*/}
								<div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
									<h3 className="text-2xl font-bold">
									Ti piace questo sito? Condividilo!
									</h3>
									<button
									className="p-1 ml-auto bg-transparent border-0 text-black opacity-60 hover:opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
									onClick={() => setShowModal(false)}
									>
										<XIcon className="w-6" />
									</button>
								</div>

								{/*body*/}
								<div className="relative p-6 flex-auto">
									
									<div className="grid grid-cols-12 gap-3 mt-3">
										<div className="col-span-4">
											<span className="block w-full mb-4 text-xs uppercase font-semibold text-gray-500 tracking-widest">CONDIVIDI SUI SOCIAL</span>

											<a href="javascript:void(0)" onClick={() => createShareUrl('facebook', shareUrl, '', '', '', '')}>
												<Facebook className="shares-facebook -ml-2 w-14 inline" />
											</a>
											<a href="javascript:void(0)" onClick={() => createShareUrl('twitter', shareUrl, shareText, '', '', '')}>
												<Twitter className="shares-twitter w-14 inline" />
											</a>
											<a href="javascript:void(0)" onClick={() => createShareUrl('whatsapp', shareUrl, shareText, '', '', '')}>
												<Whatsapp className="shares-whatsapp w-14 inline" />
											</a>
											<a href="javascript:void(0)" onClick={() => createShareUrl('telegram', shareUrl, shareText, '', '', '')}>
												<Telegram className="shares-telegram w-14 inline" />
											</a>
										</div>
										<div className="col-span-8">
											<span className="block w-full mb-4 text-xs uppercase font-semibold text-gray-500 tracking-widest">COPIA LINK</span>
											
											<div className="container flex justify-left items-center">
												<div className="relative w-full">
													<div className="absolute top-4 left-3"> 
														{ copiedUrl ? 
															<ClipboardCheckIcon className="w-6 copied-url-done"/> 
														:
															<ClipboardIcon className="w-6 copied-url-icon" />
														}
													</div> 
													<input type="text" class="bg-indigo-50 h-14 w-full pl-12 pr-30 rounded-lg z-0 focus:shadow focus:outline-none" value={shareUrl} />
													<div className="absolute top-2 right-2"> 
														<button className={ copiedUrl ? 'h-10 w-20 text-white rounded-lg  bg-green-500 hover:bg-green-600' : 'h-10 w-20 text-white rounded-lg  bg-blue-500 hover:bg-blue-600' } onClick={() => { setCopiedUrl(true); navigator.clipboard.writeText(shareUrl); }}>{ copiedUrl ? 'Copiato!' : 'Copia' }</button> 
													</div>
												</div>
											</div>
										</div>
									</div>

								</div>

								{/*footer*/}
								{/* <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
									<button
									className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
									type="button"
									onClick={() => setShowModal(false)}
									>
									Close
									</button>
									<button
									className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
									type="button"
									onClick={() => setShowModal(false)}
									>
									Save Changes
									</button>
								</div> */}
							</div>
						</div>
					</div>
					<div className="modalOverlay opacity-75 fixed top-0 left-0 inset-0 z-40 bg-black"></div>
				</>
				) : null}
			</>

		)
}
