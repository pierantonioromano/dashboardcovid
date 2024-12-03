import { FaceSmileIcon } from "@heroicons/react/24/outline"

export default function SiteFooter() {
	return (
		<footer role="contentinfo">
			<div className="w-full mt-3 mb-12">
				<div className="container max-w-screen-2xl px-4 xl:px-8 mx-auto">
					<div className="grid grid-cols-12 gap-1 rounded-3xl bg-black">
						<div className="col-span-12 p-6">
							<h1 className="text-2xl md:text-3xl mb-4 font-bold text-white">Fonti e precisazioni</h1>
							<FaceSmileIcon className="text-white h-16 w-16 float-right ml-4" />
							<p className="text-md text-white">
								I contenuti presenti su questo sito sono elaborati a partire dai dataset forniti dal Ministero della Salute, dalla Protezione Civile Italiana o da altre organizzazioni
								internazionali. Le informazioni qui contenute non costituiscono un documento ufficiale sull'andamento della pandemia e non sostituiscono i provvedimenti legislativi
								ufficiali.
							</p>
						</div>
						<div className="col-span-12 md:col-span-6 pt-4 pb-0 md:py-4 px-6">
							<p className="text-sm text-gray-500">
								Sito creato da{" "}
								<a className="text-gray-400 hover:text-white" target="_blank" rel="noopener" href="https://www.pierantonioromano.com">
									Pier Antonio Romano
								</a>
							</p>
						</div>
						<div className="col-span-12 md:col-span-6 pt-0 pb-6 md:py-6 px-6 text-left md:text-right">
							<p className="text-sm text-gray-500">
								powered by{" "}
								<a className="text-gray-400 hover:text-white" target="_blank" rel="noopener" href="https://www.nextjs.org">
									NextJS
								</a>{" "}
								&{" "}
								<a className="text-gray-400 hover:text-white" target="_blank" rel="noopener" href="https://www.vercel.com">
									Vercel
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
