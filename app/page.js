import dayjs from "dayjs"
import "dayjs/locale/it"
import relativeTime from "dayjs/plugin/relativeTime"
import SiteGraph from "@components/SiteGraph"
import {
	extractWeeklyData,
	buildMainGraphSeries,
	buildMainGraphOptions,
	getAgenasData,
} from "@utils/utilities"
import CircularIndicator from "@components/CircularIndicator"
import { BeakerIcon } from "@heroicons/react/24/outline"
import RegionsMap from "@components/RegionsMap"
import WeeklyComment from "@components/WeeklyComment"
import SummaryWidgets from "@components/SummaryWidgets"

export default async function Page({ props, searchParams }) {
	/*
		Data fetching
	*/
	const {
		props: { cleanedDailyData, cleanedDailyNotes, cleanedDailyRegions },
	} = await fetchHomeData()
	const cleanedDailyAgenas = getAgenasData()

	const {
		props: { allNews },
	} = await fetchNews()

	/*
		Get weekly series
	*/
	const latestAvailableDate = dayjs(
		cleanedDailyData[cleanedDailyData?.length - 1].data
	)

	const lastWeekArray = cleanedDailyData.filter(
		(item) => dayjs(item.data).diff(latestAvailableDate, "days") > -7
	)
	const lastWeekData = extractWeeklyData(lastWeekArray, cleanedDailyData, 8)

	const pastWeekArray = cleanedDailyData.filter(
		(item) =>
			dayjs(item.data).diff(latestAvailableDate, "days") > -14 &&
			dayjs(item.data).diff(latestAvailableDate, "days") <= -7
	)

	const pastWeekData = extractWeeklyData(pastWeekArray, cleanedDailyData, 15)

	/*
		Utilities
	*/
	const popolazione_italiana = process.env.NEXT_PUBLIC_ITALIAN_POPULATION // updated Jan 2021
	dayjs.extend(relativeTime)

	let ultimo_aggiornamento =
		cleanedDailyData[cleanedDailyData?.length - 1]?.data || "n/a"

	let totale_posti_anc = cleanedDailyAgenas["totali"]
		? cleanedDailyAgenas["totali"].totale_posti_anc
		: 0
	let totale_posti_ti = cleanedDailyAgenas["totali"]
		? cleanedDailyAgenas["totali"].totale_posti_ti
		: 0
	let totale_posti_ti_extra = cleanedDailyAgenas["totali"]
		? cleanedDailyAgenas["totali"].totale_posti_ti_extra
		: 0

	/*
		Graphs
	*/

	//Graph data series
	const graph_trending_series = buildMainGraphSeries(cleanedDailyData)

	//Graph settings - Main
	const graph_trending_options = buildMainGraphOptions()

	return (
		<>
			<div className="container max-w-screen-2xl px-4 xl:px-8 mx-auto">
				{/* Summary Widgets */}
				<div className="grid grid-cols-12 gap-4 my-8 lg:my-24">
					<div className="col-span-12 text-center mb-12">
						<span className="relative border border-governor-bay-100 rounded-2xl p-2 text-xs text-governor-bay-100 uppercase tracking-wide">
							Aggiornamento:{" "}
							<strong>
								{dayjs(ultimo_aggiornamento)
									.locale("it")
									.format("DD MMMM YYYY")}
							</strong>
						</span>
					</div>

					<div className="col-span-12 text-center">
						<SummaryWidgets
							lastWeekArray={lastWeekArray}
							lastWeekData={lastWeekData}
							pastWeekArray={pastWeekArray}
							pastWeekData={pastWeekData}
							cleanedDailyData={cleanedDailyData}
							popolazione_italiana={popolazione_italiana}
						/>
					</div>
				</div>

				{/* Hospital pressure */}
				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-12 xl:col-span-3 min-h-96 md:min-h-48 card-shadow rounded-2xl p-2 bg-cover bg-bottom relative overflow-hidden">
						<div className="absolute inset-0 bg-governor-bay-200">
							<div className="absolute rounded-full z-0 w-[26rem] h-[26rem] top-2 right-6 bg-[50%_-60%] bg-[length:90%_auto] bg-[url('/ospedale.jpg')] translate-y-[-50%] translate-x-[50%]"></div>
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
					<div className="col-span-12 lg:col-span-6 xl:col-span-4 bg-governor-bay-700 rounded-2xl p-6">
						<h2 className="text-3xl text-white font-bold">
							Carichi ospedalieri
						</h2>
						<div className="mt-8 flex">
							<CircularIndicator
								showRawValue
								showAnimation
								value={Number(
									(cleanedDailyData[
										cleanedDailyData?.length - 1
									].terapia_intensiva *
										100) /
										totale_posti_ti
								).toFixed(1)}
								size="lg"
								primary="#e3e9fc"
								secondary="#393679"
							/>
							<div className="ml-6 justify-center items-start flex flex-col">
								<h4 className="text-base lg:text-lg font-bold text-white">
									Occupazione Terapie intensive
								</h4>
								<p className="text-sm lg:text-base text-governor-bay-200">
									<strong>
										{totale_posti_ti.toLocaleString("it")}
									</strong>{" "}
									tot. posti in T.I. +{" "}
									<strong>
										{totale_posti_ti_extra.toLocaleString(
											"it"
										)}
									</strong>{" "}
									attivabili
								</p>
							</div>
						</div>
						<div className="mt-8 flex">
							<CircularIndicator
								showRawValue
								showAnimation
								value={Number(
									(cleanedDailyData[
										cleanedDailyData?.length - 1
									].ricoverati_con_sintomi *
										100) /
										totale_posti_anc
								).toFixed(1)}
								size="lg"
								primary="#e3e9fc"
								secondary="#393679"
							/>
							<div className="ml-6 justify-center items-start flex flex-col">
								<h4 className="text-base lg:text-lg font-bold text-white">
									Occupazione Reparti
								</h4>
								<p className="text-sm lg:text-base text-governor-bay-200">
									<strong>
										{totale_posti_anc.toLocaleString("it")}
									</strong>{" "}
									tot. posti in area non critica
								</p>
							</div>
						</div>
						<p className="mt-8 text-xs text-governor-bay-100">
							Carichi calcolati su dati Agenas
						</p>
					</div>
					<div className="col-span-12 lg:col-span-6 xl:col-span-5 bg-governor-bay-800 rounded-2xl p-6">
						<h2 className="text-3xl text-white font-bold">
							Analisi dei dati
						</h2>
						<p className="text-white mt-6 text-sm lg:text-base">
							<WeeklyComment
								lastWeekPositives={lastWeekData?.nuovi_positivi}
								pastWeekPositives={pastWeekData?.nuovi_positivi}
								lastWeekSwabs={lastWeekData?.tamponi}
								pastWeekSwabs={pastWeekData?.tamponi}
								lastWeekDeads={lastWeekData?.deceduti}
								pastWeekDeads={pastWeekData?.deceduti}
								lastWeekHospitalized={
									lastWeekArray[lastWeekArray.length - 1]
										?.ricoverati_con_sintomi
								}
								pastWeekHospitalized={
									pastWeekArray[pastWeekArray.length - 1]
										?.ricoverati_con_sintomi
								}
								lastWeekIcu={
									lastWeekArray[lastWeekArray.length - 1]
										?.terapia_intensiva
								}
								pastWeekIcu={
									pastWeekArray[pastWeekArray.length - 1]
										?.terapia_intensiva
								}
								lastWeekIncidence={Math.round(
									(lastWeekData.nuovi_positivi /
										popolazione_italiana) *
										100000
								)}
								pastWeekIncidence={Math.round(
									(pastWeekData.nuovi_positivi /
										popolazione_italiana) *
										100000
								)}
							/>
						</p>
						<p className="mt-6 text-xs text-governor-bay-100">
							<BeakerIcon className="w-4 inline mr-1" /> Commento
							generato dall'Intelligenza Artificiale
						</p>
					</div>
				</div>

				{/* Graph and Metrics */}
				<div className="grid grid-cols-12 gap-4 mt-4">
					<div className="col-span-12 lg:col-span-9 rounded-2xl bg-white min-h-96 relative">
						<span className="absolute top-6 left-6">
							<h2 className="text-3xl font-bold text-black">
								Dati ultimo mese
							</h2>
						</span>
						<div id="chart-timeline" className="w-full">
							<SiteGraph
								options={graph_trending_options}
								series={graph_trending_series}
								type="area"
								height={"430"}
							/>
						</div>
					</div>
					<div className="col-span-12 lg:col-span-3 rounded-2xl min-h-96 overflow-hidden bg-governor-bay-900 relative bg-cover bg-[url('/side_img.jpg')]">
						<div className="absolute inset-0 bg-gradient-to-b from-transparent to-governor-bay-900">
							<div className="h-full flex rounded-2xl">
								<div className="leading-none p-6 rounded-2xl mt-auto mb-2 text-3xl font-semibold drop-shadow-sm tracking-tight text-white">
									Segui l'evoluzione settimanale della
									pandemia.
								</div>
							</div>
						</div>
					</div>
				</div>

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
					<div className="col-span-12 lg:col-span-8 rounded-2xl bg-governor-bay-800 p-6">
						<h2 className="text-3xl font-bold text-white">News</h2>
						<ul className="mt-4">
							{allNews
								? allNews.map((item, index) => (
										<li
											className="flex mb-4 lg:mb-2"
											key={"news-" + index}
										>
											<div
												className="newsImageLazyLoad h-20 w-20 min-w-20 float-right my-2 mr-4 overflow-hidden rounded-md relative"
												//data-img-url={newsImageUrl.uri}
												style={{
													backgroundColor: "#d7e7f7",
													backgroundImage:
														"url(" +
														item.image +
														")",
													backgroundPosition:
														"center",
													backgroundSize: "cover",
													backgroundRepeat:
														"no-repeat",
												}}
											>
												<a
													target="_blank"
													rel="noopener nofollow"
													className="block absolute top-0 left-0 w-full h-full"
													aria-label={item.title}
													href={item.link}
												></a>
											</div>

											<div className="flex flex-col justify-center">
												<a
													target="_blank"
													rel="noopener nofollow"
													className="block"
													href={item.link}
												>
													<h3 className="text-sm lg:text-lg font-bold text-white">
														{item.title}
													</h3>
												</a>
												<span className="w-full text-xs text-governor-bay-200 mt-1">
													{item.source +
														" - " +
														dayjs(item.date)
															.locale("it")
															.fromNow()}
												</span>
											</div>
										</li>
								  ))
								: null}
						</ul>
					</div>
					<div className="col-span-12 lg:col-span-4 rounded-2xl bg-governor-bay-100 p-6">
						<h2 className="text-3xl font-bold text-black">
							Situazione Regionale
						</h2>

						<RegionsMap cleanedDailyRegions={cleanedDailyRegions} />
						<p className="text-slate-600 text-sm">
							Le regioni con il maggior numero di nuovi casi sono:{" "}
							{cleanedDailyRegions
								.sort(
									(a, b) =>
										b.nuovi_positivi - a.nuovi_positivi
								)
								.slice(0, 3)
								.map(
									(item, index) =>
										item.denominazione_regione +
										" (" +
										item.nuovi_positivi +
										")" +
										(index <
										cleanedDailyRegions.slice(0, 3).length -
											1
											? ", "
											: ".")
								)}
							<br />
							<br />I dati nella mappa sono riferiti alla giornata
							del{" "}
							<strong>
								{dayjs(ultimo_aggiornamento)
									.locale("it")
									.format("DD MMMM YYYY")}
							</strong>
							. Per le regioni non è stato possibile elaborare i
							dati settimanali.
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

async function fetchHomeData() {
	const data = await fetch(
		process.env.NEXT_PUBLIC_SITE_URL + "/api/fetch-covid-data"
		//"https://raw.githubusercontent.com/pierantonioromano/bollettinocovid_data/main/test_latest_covid_data.json",
		// {
		// 	//cache: "no-store",
		// 	//next: { revalidate: 10 },
		// }
	).then((res) => res.json())

	return {
		props: {
			cleanedDailyData: data?.results?.cleanedDailyData || null,
			cleanedDailyNotes: data?.results?.cleanedDailyNotes || null,
			cleanedDailyRegions: data?.results?.cleanedDailyRegions || null,
		},
	}
}

async function fetchNews() {
	const data = await fetch(
		process.env.NEXT_PUBLIC_SITE_URL + "/api/fetch-covid-news"
		//"https://raw.githubusercontent.com/pierantonioromano/bollettinocovid_data/main/test_latest_covid_news.json",
		// {
		// 	//cache: "no-store",
		// 	//next: { revalidate: 10 },
		// }
	).then((res) => res.json())

	return {
		props: {
			allNews: data?.results?.allNews || null,
		},
	}
}

export const metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
	title: "Bollettino Covid-19",
	description:
		"Scopri l'andamento della pandemia in Italia: nuovi contagi, carichi ospedalieri, andamento della campagna vaccinale, news.",
	openGraph: {
		images: "/share_img.png",
	},
}
