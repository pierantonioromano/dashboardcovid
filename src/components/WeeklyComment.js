import { Suspense } from "react"

async function WeeklyComment({
	lastWeekPositives,
	pastWeekPositives,
	lastWeekSwabs,
	pastWeekSwabs,
	lastWeekDeads,
	pastWeekDeads,
	lastWeekHospitalized,
	pastWeekHospitalized,
	lastWeekIcu,
	pastWeekIcu,
	lastWeekIncidence,
	pastWeekIncidence,
}) {
	const serviceParams = {
		lastWeekPositives: lastWeekPositives,
		pastWeekPositives: pastWeekPositives,
		lastWeekSwabs: lastWeekSwabs,
		pastWeekSwabs: pastWeekSwabs,
		lastWeekDeads: lastWeekDeads,
		pastWeekDeads: pastWeekDeads,
		lastWeekHospitalized: lastWeekHospitalized,
		pastWeekHospitalized: pastWeekHospitalized,
		lastWeekIcu: lastWeekIcu,
		pastWeekIcu: pastWeekIcu,
		lastWeekIncidence: lastWeekIncidence,
		pastWeekIncidence: pastWeekIncidence,
	}
	const serviceCallOptions = {
		method: "POST",
		body: JSON.stringify(serviceParams),
		next: { revalidate: 3600 },
	}
	const serviceResponse = await fetch(
		process.env.NEXT_PUBLIC_SITE_URL + "/api/fetch-comment",
		//"https://raw.githubusercontent.com/pierantonioromano/bollettinocovid_data/main/test_fetch_comment.json",
		serviceCallOptions,
		serviceParams
	).then((res) => res.json())

	return (
		<>
			<Suspense fallback={<p>Loading feed...</p>}>
				{serviceResponse.results.comment || null}
			</Suspense>
		</>
	)
}

export default WeeklyComment
