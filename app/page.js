import dayjs from "dayjs"
import "dayjs/locale/it"
import SiteGraph from "@components/SiteGraph"
import { extractWeeklyData, buildMainGraphSeries, buildMainGraphOptions, getAgenasData } from "@utils/utilities"
import CircularIndicator from "@components/CircularIndicator"
import { BeakerIcon, ChartPieIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import RegionsMap from "@components/RegionsMap"
import WeeklyComment from "@components/WeeklyComment"
import SummaryWidgets from "@components/SummaryWidgets"
import NewsCard from "@components/NewsCard"

export default async function Page({ props, searchParams }) {
	/*
		Data fetching
	*/
	// const {
	// 	props: { cleanedDailyData, cleanedDailyNotes, cleanedDailyRegions }
	// } = await fetchHomeData()
	// const cleanedDailyAgenas = getAgenasData()

	const {
		props: { allNews }
	} = await fetchNews()

	/*
		Get weekly series
	*/
	// const latestAvailableDate = dayjs(cleanedDailyData[cleanedDailyData?.length - 1].data)

	// const lastWeekArray = cleanedDailyData.filter((item) => dayjs(item.data).diff(latestAvailableDate, "days") > -7)
	// const lastWeekData = extractWeeklyData(lastWeekArray, cleanedDailyData, 8)

	// const pastWeekArray = cleanedDailyData.filter((item) => dayjs(item.data).diff(latestAvailableDate, "days") > -14 && dayjs(item.data).diff(latestAvailableDate, "days") <= -7)

	// const pastWeekData = extractWeeklyData(pastWeekArray, cleanedDailyData, 15)

	/*
		Utilities
	*/
	// const popolazione_italiana = process.env.NEXT_PUBLIC_ITALIAN_POPULATION // updated Jan 2021
	// const nfObject = new Intl.NumberFormat("it-IT")

	// let ultimo_aggiornamento = cleanedDailyData[cleanedDailyData?.length - 1]?.data || "n/a"

	// let totale_posti_anc = cleanedDailyAgenas["totali"] ? cleanedDailyAgenas["totali"].totale_posti_anc : 0
	// let totale_posti_ti = cleanedDailyAgenas["totali"] ? cleanedDailyAgenas["totali"].totale_posti_ti : 0
	// let totale_posti_ti_extra = cleanedDailyAgenas["totali"] ? cleanedDailyAgenas["totali"].totale_posti_ti_extra : 0

	let ultimo_aggiornamento = allNews[0]?.date || "n/a"

	/*
		Graphs
	*/

	// //Graph data series
	// const graph_trending_series = buildMainGraphSeries(cleanedDailyData)

	// //Graph settings - Main
	// const graph_trending_options = buildMainGraphOptions()

	return (
		<main role="main">
			<div className="container max-w-screen-2xl px-4 xl:px-8 mx-auto">
				{/* Summary Widgets */}
				<div className="grid grid-cols-12 gap-4 my-8 lg:my-24">
					<div className="col-span-12 text-center mb-12 lg:mb-0">
						<span className="relative border border-governor-bay-100 rounded-2xl p-2 text-xs text-governor-bay-100 uppercase tracking-wide">
							Aggiornato al: <strong>{dayjs(ultimo_aggiornamento).locale("it").format("D MMMM YYYY")}</strong>
						</span>

						<div className="mt-12 text-center text-white max-w-xl mx-auto">
							<ExclamationTriangleIcon className="w-12 mx-auto mb-4 text-yellow-200" />
							<p>
								A partire dal mese di gennaio 2025 è stata sospesa la pubblicazione su GitHub dei dati settimanali relativi all'evoluzione del COVID-19 in Italia. La visualizzazione
								dei dati settimanali è quindi momentaneamente sospesa, e il sito verrà dismesso nei prossimi mesi.
							</p>
						</div>
					</div>

					{/* <div className="col-span-12 text-center">
						<SummaryWidgets
							lastWeekArray={lastWeekArray}
							lastWeekData={lastWeekData}
							pastWeekArray={pastWeekArray}
							pastWeekData={pastWeekData}
							cleanedDailyData={cleanedDailyData}
							popolazione_italiana={popolazione_italiana}
						/>
					</div> */}
				</div>

				{/* Hospital pressure */}
				{/* <div className="grid grid-cols-12 gap-4">
					<div className="col-span-12 xl:col-span-3 min-h-72 md:min-h-48 card-shadow rounded-2xl p-2 bg-cover bg-bottom relative overflow-hidden">
						<div className="absolute inset-0 bg-governor-bay-200">
							<div className="absolute rounded-full z-0 w-[20rem] h-[20rem] md:w-[26rem] md:h-[26rem] top-2 right-6 bg-[50%_-60%] bg-[length:90%_auto] bg-[url('/ospedale.jpg')] translate-y-[-50%] translate-x-[50%]"></div>
							<div className="absolute rounded-full w-[22rem] h-[22rem] top-2 right-6 border-[25px] border-governor-bay-200 translate-y-[-50%] translate-x-[50%]"></div>
							<div className="absolute rounded-full w-[14rem] h-[14rem] top-2 right-6 border-[25px] border-governor-bay-200 translate-y-[-50%] translate-x-[50%]"></div>
							<div className="h-full flex">
								<div className="leading-none p-6 rounded-2xl mt-auto mb-2 text-3xl font-semibold drop-shadow-sm tracking-tight">
									{" "}
									Dati sulla
									<br />{" "}
									<span className="text-governor-bay-600">
										pressione ospedaliera
										<br />
									</span>{" "}
									aggiornati.
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-12 lg:col-span-6 xl:col-span-4 bg-governor-bay-700 rounded-2xl p-6 flex flex-col justify-between">
						<h2 className="text-3xl text-white font-bold">Carichi ospedalieri</h2>
						<div className="mt-8 flex">
							<CircularIndicator
								showRawValue
								showAnimation
								value={Number((cleanedDailyData[cleanedDailyData?.length - 1].terapia_intensiva * 100) / totale_posti_ti).toFixed(1)}
								size="lg"
								primary="#e3e9fc"
								secondary="#393679"
							/>
							<div className="ml-6 justify-center items-start flex flex-col">
								<h3 className="text-lg font-bold text-white">Terapie intensive</h3>
								<p className="text-sm lg:text-base text-governor-bay-200">
									<strong>{nfObject.format(cleanedDailyData[cleanedDailyData?.length - 1].terapia_intensiva)}</strong> su <strong>{nfObject.format(totale_posti_ti)}</strong>{" "}
									disponibili
								</p>
							</div>
						</div>
						<div className="mt-8 flex">
							<CircularIndicator
								showRawValue
								showAnimation
								value={Number((cleanedDailyData[cleanedDailyData?.length - 1].ricoverati_con_sintomi * 100) / totale_posti_anc).toFixed(1)}
								size="lg"
								primary="#e3e9fc"
								secondary="#393679"
							/>
							<div className="ml-6 justify-center items-start flex flex-col">
								<h3 className="text-lg font-bold text-white">Reparti</h3>
								<p className="text-sm lg:text-base text-governor-bay-200">
									<strong>{nfObject.format(cleanedDailyData[cleanedDailyData?.length - 1].ricoverati_con_sintomi)}</strong> su <strong>{nfObject.format(totale_posti_anc)}</strong>{" "}
									disponibili
								</p>
							</div>
						</div>
						<p className="mt-8 text-xs text-governor-bay-100">
							<ChartPieIcon className="w-4 inline mr-1" /> Carichi calcolati su dati Agenas
						</p>
					</div>
					<div className="col-span-12 lg:col-span-6 xl:col-span-5 bg-governor-bay-800 rounded-2xl p-6 flex flex-col justify-between">
						<h2 className="text-3xl text-white font-bold">Analisi dei dati</h2>
						<p className="text-white mt-6 text-base">
							<WeeklyComment
								lastWeekPositives={lastWeekData?.nuovi_positivi}
								pastWeekPositives={pastWeekData?.nuovi_positivi}
								lastWeekSwabs={lastWeekData?.tamponi}
								pastWeekSwabs={pastWeekData?.tamponi}
								lastWeekDeads={lastWeekData?.deceduti}
								pastWeekDeads={pastWeekData?.deceduti}
								lastWeekHospitalized={lastWeekArray[lastWeekArray.length - 1]?.ricoverati_con_sintomi}
								pastWeekHospitalized={pastWeekArray[pastWeekArray.length - 1]?.ricoverati_con_sintomi}
								lastWeekIcu={lastWeekArray[lastWeekArray.length - 1]?.terapia_intensiva}
								pastWeekIcu={pastWeekArray[pastWeekArray.length - 1]?.terapia_intensiva}
								lastWeekIncidence={Math.round((lastWeekData.nuovi_positivi / popolazione_italiana) * 100000)}
								pastWeekIncidence={Math.round((pastWeekData.nuovi_positivi / popolazione_italiana) * 100000)}
							/>
						</p>
						<p className="mt-6 text-xs text-governor-bay-100">
							<BeakerIcon className="w-4 inline mr-1" /> Commento generato dall'Intelligenza Artificiale
						</p>
					</div>
				</div> */}

				{/* Graph and Metrics */}
				{/* <div className="grid grid-cols-12 gap-4 mt-4">
					<div className="col-span-12 lg:col-span-9 rounded-2xl bg-governor-bay-100 min-h-96 relative overflow-hidden">
						<span className="absolute top-6 left-6">
							<h2 className="text-3xl font-bold text-black">Ultimi 30 giorni</h2>
						</span>
						<div id="chart-timeline" className="w-full -mb-[2px]">
							<SiteGraph options={graph_trending_options} series={graph_trending_series} type="area" height={"430"} />
						</div>
					</div>
					<div className="col-span-12 lg:col-span-3 rounded-2xl min-h-96 overflow-hidden bg-governor-bay-900 relative bg-cover bg-[url('/side_img.jpg')]">
						<div className="absolute inset-0 bg-gradient-to-b from-transparent to-governor-bay-900">
							<div className="h-full flex rounded-2xl">
								<div className="leading-none p-6 rounded-2xl mt-auto mb-2 text-3xl font-semibold drop-shadow-sm tracking-tight text-white">
									Segui l'evoluzione settimanale della pandemia.
								</div>
							</div>
						</div>
					</div>
				</div> */}

				{/* Notes */}
				{/* {cleanedDailyNotes && cleanedDailyNotes[0].note ? (
					<>
						<div className="bg-governor-bay-700 mt-3 rounded-2xl p-6">
							<h2 className="text-3xl text-white font-bold">
								Note
							</h2>
							<p className="text-white text-base mt-3">
								{cleanedDailyNotes[0].note}
							</p>
						</div>
					</>
				) : null} */}

				{/* News and Regions */}
				<div className="grid grid-cols-12 gap-4 mt-4">
					<div className="col-span-12 rounded-2xl bg-governor-bay-800 p-6">
						<h2 className="text-3xl font-bold text-white">Ultime notizie</h2>
						<ul className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
							{allNews
								? allNews.map((item, index) => (
										<li className="inline-flex mb-6 lg:mb-2" key={"news-" + index}>
											<NewsCard title={item.title} image={item.image} link={item.link} date={item.date} source={item.source} />
										</li>
								  ))
								: null}
						</ul>
					</div>
					{/* <div className="col-span-12 lg:col-span-4 rounded-2xl bg-governor-bay-100 p-6">
						<h2 className="text-3xl font-bold text-black">Situazione Regionale</h2>

						<RegionsMap cleanedDailyRegions={cleanedDailyRegions} />
						<p className="text-slate-600 text-base">
							Le regioni con il maggior numero di nuovi casi sono:{" "}
							{cleanedDailyRegions
								.sort((a, b) => b.nuovi_positivi - a.nuovi_positivi)
								.slice(0, 3)
								.map((item, index) => item.denominazione_regione + " (" + item.nuovi_positivi + ")" + (index < cleanedDailyRegions.slice(0, 3).length - 1 ? ", " : "."))}
							<br />
							<br />I dati nella mappa sono riferiti alla giornata del <strong>{dayjs(ultimo_aggiornamento).locale("it").format("D MMMM YYYY")}</strong>. Per le regioni non è stato
							possibile elaborare i dati settimanali.
						</p>
					</div> */}
				</div>
			</div>
		</main>
	)
}

async function fetchHomeData() {
	const data = await fetch(
		process.env.NEXT_PUBLIC_SITE_URL + "/api/fetch-covid-data"
		//"https://raw.githubusercontent.com/pierantonioromano/bollettinocovid_data/main/test_latest_covid_data.json",
	).then((res) => res.json())

	return {
		props: {
			cleanedDailyData: data?.results?.cleanedDailyData || null,
			cleanedDailyNotes: data?.results?.cleanedDailyNotes || null,
			cleanedDailyRegions: data?.results?.cleanedDailyRegions || null
		}
	}
}

async function fetchNews() {
	const data = await fetch(
		process.env.NEXT_PUBLIC_SITE_URL + "/api/fetch-covid-news"
		//"https://raw.githubusercontent.com/pierantonioromano/bollettinocovid_data/main/test_latest_covid_news.json",
	).then((res) => res.json())

	return {
		props: {
			allNews: data?.results?.allNews || null
		}
	}
}

export const metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
	title: "Bollettino Covid-19",
	description: "Scopri l'andamento della pandemia in Italia: nuovi contagi, carichi ospedalieri, andamento della campagna vaccinale, news.",
	openGraph: {
		images: "/share_img.png"
	}
}
