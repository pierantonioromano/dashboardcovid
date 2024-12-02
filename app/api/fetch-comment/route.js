import { NextResponse } from "next/server"

export async function POST(request) {
	try {
		const res = await request.json() // res now contains body

		const { GoogleGenerativeAI } = require("@google/generative-ai")

		const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY)
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

		const prompt =
			"Considerando i seguenti dati: " +
			res.lastWeekPositives +
			" nuovi positivi questa settimana su " +
			res.lastWeekSwabs +
			" (precedente: " +
			res.pastWeekPositives +
			" nuovi positivi su " +
			res.pastWeekSwabs +
			" tamponi), " +
			res.lastWeekDeads +
			" decessi nell'ultima settimana (precedente: " +
			res.pastWeekDeads +
			" decessi), " +
			res.lastWeekDeads +
			" decessi nell'ultima settimana (precedente: " +
			res.pastWeekDeads +
			"), " +
			res.lastWeekHospitalized +
			" ricoverati in ospedale (precedente: " +
			res.pastWeekHospitalized +
			"), " +
			res.lastWeekIcu +
			" in terapia intensiva (precedente: " +
			res.pastWeekIcu +
			"), " +
			res.lastWeekIncidence +
			"% incidenza settimanale su 100.000 abitanti (precedente: " +
			res.pastWeekIncidence +
			"%); scrivi un breve testo riassuntivo in italiano che riepiloghi l'andamento dei parametri epidemiologici della pandemia e le differenze rispetto alla scorsa settimana, calcolando anche incrementi e decrementi in percentuale."

		const data = await model.generateContent(prompt)

		if (data) {
			return NextResponse.json(
				{
					status: "OK",
					results: {
						comment: data.response.text(),
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

export async function GET() {
	return NextResponse.json(
		{ status: "KO", msg: "Error: Method not allowed." },
		{ status: 405 }
	)
}
