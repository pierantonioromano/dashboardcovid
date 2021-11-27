
import { ArrowSmRightIcon } from "@heroicons/react/outline"

export default function Custom404() {

	return (

		<div className="w-screen h-screen fixed top-0 left-0 justify-center items-center bg-black flex" style={{ backgroundImage: 'url(pablo.jpeg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
			<div className="w-96 bg-white bg-opacity-70 p-0 rounded-lg">
				<h1 className="inline-block text-2xl font-bold border-r border-gray-400 p-2 pr-4 m-4 mr-0 align-middle">404</h1>
				<span className="inline-block text-sm p-2 pl-4 m-4 ml-0 align-middle">Ooops, abbiamo un problema!<br/>La pagina è stata spostata o rimossa.</span>
				<a className="p-4 block w-full bg-opacity-95 bg-blue-500 hover:bg-blue-600 text-center text-white rounded-b-lg font-bold" href="/">Torna alla home page <ArrowSmRightIcon className="w-4 inline ml-1" /></a>
			</div>
		</div>
	)
}