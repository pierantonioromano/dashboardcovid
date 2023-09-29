import Head from "next/head"
import React, { Fragment } from "react"
import SiteHeader from "../components/SiteHeader.js"
import SiteFooter from "../components/SiteFooter.js"
import dayjs from "dayjs"
import "dayjs/locale/it"
import relativeTime from "dayjs/plugin/relativeTime"
import PullToRefresh from "react-simple-pull-to-refresh"
import Router from "next/router"
import fetch from "node-fetch"

const NO_POST_IMAGE_ICON = "/mask.png"

class News extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loadImages: false,
		}
	}

	componentDidMount() {
		this.setState({ loadImages: true })
	}

	handleRefresh = () => {
		return Promise.resolve(Router.reload(window.location.pathname))
	}

	renderNewsItem = (item, i) => {
		let newsImageUrl = {
			uri:
				item.i != null
					? this.props.cleanedCovidNewsData.sources[item.s].imgPath +
					  item.i
					: NO_POST_IMAGE_ICON,
		}
		let newsTitle = item.t
		let newsSource = this.props.cleanedCovidNewsData.sources[item.s].label
			? this.props.cleanedCovidNewsData.sources[item.s].label
			: ""

		return (
			<Fragment key={i}>
				<div className="bg-white hover:bg-gray-50 col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 rounded-md relative p-4 pb-12">
					<div
						className="newsImageLazyLoad h-16 w-16 float-right my-2 mx-2 overflow-hidden rounded-md relative"
						data-img-url={newsImageUrl.uri}
						style={{
							backgroundColor: "#d7e7f7",
							backgroundImage:
								"url(" +
								(this.state.loadImages
									? newsImageUrl.uri
									: NO_POST_IMAGE_ICON) +
								")",
							backgroundPosition: "center",
							backgroundSize: this.state.loadImages
								? "cover"
								: "80%",
							backgroundRepeat: "no-repeat",
						}}
					>
						<a
							target="_blank"
							rel="noopener"
							className="block absolute top-0 left-0 w-full h-full"
							aria-label={item.t}
							href={item.l}
						></a>
					</div>

					<a
						target="_blank"
						rel="noopener"
						className="block"
						href={item.l}
					>
						<h3 className="text-base font-bold text-black pb-2">
							{newsTitle}
						</h3>
					</a>
					<span className="absolute bottom-0 left-0 w-full text-xs text-gray-400 px-4 pb-4 pt-0">
						{newsSource}{" "}
						{item.d
							? " - " +
							  dayjs
									.unix(item.d)
									.locale("it")
									.fromNow()
									.replace("' ", "'")
							: ""}
					</span>
				</div>
			</Fragment>
		)
	}

	render() {
		//Screen values
		let ultimo_aggiornamento = this.props.cleanedCovidNewsData
			? this.props.cleanedCovidNewsData.last_build
			: "-"
		dayjs.extend(relativeTime)

		return (
			<div className="min-h-screen pb-0 bg-indigo-50">
				<SiteHeader />

				<Head>
					<title>Bollettino Covid-19 - News</title>
					<meta
						name="description"
						content="Aggiornamenti sul Covid-19 e sulle misure di contenimento attualmente previste in Italia."
					/>
					<meta
						property="og:title"
						content="Bollettino Covid-19 - News"
					/>
					<meta
						property="og:description"
						content="Aggiornamenti sul Covid-19 e sulle misure di contenimento attualmente previste in Italia."
					/>
					<meta property="og:type" content="website" />
					<meta property="og:image" content="/share_img.png" />
				</Head>

				<PullToRefresh
					pullDownThreshold={100}
					maxPullDownDistance={150}
					pullingContent=""
					onRefresh={this.handleRefresh}
				>
					<div className="container max-w-screen-xl px-4 mx-auto">
						<div className="relative my-4">
							<h1 className="text-2xl md:text-3xl mb-2 md:mb-0 mt-20 md:mt-24 font-bold">
								News
							</h1>
							<span className="relative md:absolute md:right-0 md:top-2 bg-indigo-100 rounded-md p-2 text-xs text-gray-700 uppercase tracking-wide">
								Aggiornamento:{" "}
								<strong>
									{dayjs(ultimo_aggiornamento)
										.locale("it")
										.format("DD MMMM HH:mm")}
								</strong>
							</span>
						</div>

						<div className="grid grid-cols-12 gap-4">
							{this.props.cleanedCovidNewsData.items.map(
								(item, i) => this.renderNewsItem(item, i)
							)}
						</div>
					</div>

					<SiteFooter />
				</PullToRefresh>
			</div>
		)
	}
}

export default News

// add getStaticProps() function
export async function getStaticProps() {
	//const fetch = require('node-fetch');

	//Fetch Covid News
	const covidNewsData = await fetch(
		"https://raw.githubusercontent.com/pierantonioromano/bollettinocovid_data/main/latest_covid_news.json"
	)
	const cleanedCovidNewsData = await covidNewsData.json()

	return {
		props: {
			cleanedCovidNewsData,
		},
		revalidate: 3400,
	}
}
