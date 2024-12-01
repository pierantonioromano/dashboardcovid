import { NextResponse } from "next/server"
import dayjs from "dayjs"

export async function GET(request) {
	try {
		let Parser = require("rss-parser")
		let parser = new Parser({
			customFields: {
				item: [
					["media:content", "media:content", { keepArray: false }],
					["description", "description", { keepArray: true }],
				],
			},
		})

		const dataSources = [
			"https://www.ilfattoquotidiano.it/tag/coronavirus/feed/",
			//"https://www.ilpost.it/tag/coronavirus/feed/",
			"https://www.open.online/temi/coronavirus/feed/",
		]

		const data = await Promise.all(
			dataSources.map((url) => fetch(url, { cache: "no-store" }))
		).then(async (res) =>
			Promise.all(
				res.map(async (data) => {
					const feedBody = await data.text()
					const feed = await parser.parseString(feedBody)

					let slicedData = []

					for (const feedItem of feed.items) {
						let itemImage = ""

						if (feedItem["media:content"])
							itemImage = feedItem["media:content"]["$"]["url"]
						else if (feedItem.description) {
							const desc = feedItem.description[0]

							const imgTags = desc.match(
								/<img [^>]*src="[^"]*"[^>]*>/gm
							)

							if (Array.isArray(imgTags)) {
								itemImage = imgTags.map((x) =>
									x.replace(/.*src="([^"]*)".*/, "$1")
								)[0]
							} else itemImage = ""
						}

						slicedData.push({
							date: feedItem.pubDate || null,
							title: feedItem.title,
							link: feedItem.link,
							image: itemImage || null,
							source:
								feedItem.link.indexOf("ilfattoquotidiano") !==
								-1
									? "Il Fatto quotidiano"
									: "Open",
						})
					}

					return slicedData
				})
			)
		)

		//console.log("data", data)

		if (data) {
			//Sort and slice before sending to the client
			const IFQ = data[0]
				.sort(
					(a, b) =>
						new Date(b.date).getTime() - new Date(a.date).getTime()
				)
				.slice(0, 3)
			const OPEN = data[1]
				.sort(
					(a, b) =>
						new Date(b.date).getTime() - new Date(a.date).getTime()
				)
				.slice(0, 3)
			const ALLNEWS = IFQ.concat(OPEN)
			const ALLNEWS_SORTED = ALLNEWS.sort(
				(a, b) =>
					new Date(b.date).getTime() - new Date(a.date).getTime()
			)

			return NextResponse.json(
				{
					status: "OK",
					results: {
						allNews: ALLNEWS_SORTED,
					},
				},
				{ status: 200 }
			)
		} else {
			return NextResponse.json(
				{ status: "KO", msg: "Error: No data found." },
				{ status: 404 }
			)
		}
	} catch (error) {
		console.error("Error in response API:", error)
		return NextResponse.json(
			{
				status: "KO",
				msg: "Error: An error occurred while processing the request.",
			},
			{ status: 500 }
		)
	}
}

export async function POST() {
	return NextResponse.json(
		{ status: "KO", msg: "Error: Method not allowed." },
		{ status: 405 }
	)
}
