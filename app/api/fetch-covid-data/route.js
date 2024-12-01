import { NextResponse } from "next/server"
import dayjs from "dayjs"

export async function GET(request) {
	try {
		const dataSources = [
			"https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json",
			"https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-note.json",
			"https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json",
		]

		const data = await Promise.all(
			dataSources.map((url) => fetch(url, { cache: "no-store" }))
		).then(async (res) =>
			Promise.all(
				res.map(async (data) => {
					const parsedData = await data.json()
					const actualDate = dayjs()

					const slicedData = parsedData.filter(
						(item, index) =>
							dayjs(item.data).diff(actualDate, "month") > -1
					)

					return slicedData
				})
			)
		)

		if (data) {
			return NextResponse.json(
				{
					status: "OK",
					results: {
						cleanedDailyData: data[0],
						cleanedDailyNotes: data[1],
						cleanedDailyRegions: data[2],
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
