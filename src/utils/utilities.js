//Parse weekly data
export const extractWeeklyData = (inputArray, cleanedDailyData, backDays) => {
	const retVal = inputArray
		.map((item, index) => {
			//Some values are calculated with difference on the day before...

			//Dead people
			const deadDayBefore =
				inputArray[index - 1]?.deceduti ||
				cleanedDailyData[cleanedDailyData.length - backDays]?.deceduti
			const deadDay = item.deceduti

			//Swabs
			const swabsDayBefore =
				inputArray[index - 1]?.tamponi ||
				cleanedDailyData[cleanedDailyData.length - backDays]?.tamponi
			const swabsDay = item.tamponi

			//Hospitalized
			const hospitalizedDayBefore =
				inputArray[index - 1]?.ricoverati_con_sintomi ||
				cleanedDailyData[cleanedDailyData.length - backDays]
					?.ricoverati_con_sintomi
			const hospitalizedDay = item.ricoverati_con_sintomi

			//ICU
			const icuDayBefore =
				inputArray[index - 1]?.terapia_intensiva ||
				cleanedDailyData[cleanedDailyData.length - backDays]
					?.terapia_intensiva
			const icuDay = item.terapia_intensiva

			return {
				...item,
				deceduti: deadDay - deadDayBefore,
				tamponi: swabsDay - swabsDayBefore,
				ricoverati_con_sintomi: hospitalizedDay - hospitalizedDayBefore,
				terapia_intensiva: icuDay - icuDayBefore,
			}
		})
		.reduce((accumulator, item) => {
			Object.keys(item).forEach((key) => {
				if (!isNaN(item[key]) && item[key] !== null) {
					accumulator[key] = parseInt(
						(accumulator[key] || 0) + item[key]
					)
				}
			})

			return accumulator
		}, {})

	return retVal
}

//Build Main graph series
export const buildMainGraphSeries = (cleanedDailyData) => {
	const graph_trending_series = [
		{
			name: "Nuovi casi",
			type: "area",
			data: cleanedDailyData
				? cleanedDailyData.map((item) => [
						new Date(item.data).getTime(),
						item.nuovi_positivi,
				  ])
				: null,
		},
		{
			name: "T.I. totali",
			type: "area",
			data: cleanedDailyData
				? cleanedDailyData.map((item) => [
						new Date(item.data).getTime(),
						item.terapia_intensiva,
				  ])
				: null,
		},
		{
			name: "Ricoveri totali",
			type: "area",
			data: cleanedDailyData
				? cleanedDailyData.map((item) => [
						new Date(item.data).getTime(),
						item.totale_ospedalizzati,
				  ])
				: null,
		},
	]

	return graph_trending_series
}

//Build Main graph options
export const buildMainGraphOptions = () => {
	const mainGraphOptions = {
		chart: {
			id: "area-datetime",
			type: "area",
			height: "100%",
			zoom: {
				autoScaleYaxis: true,
			},
			toolbar: {
				show: false,
			},
			sparkline: {
				enabled: true,
			},
		},
		grid: {
			borderColor: "#ededed",
			padding: {
				left: 0,
				right: 0,
				bottom: 0,
				top: 100,
			},
		},
		dataLabels: {
			enabled: false,
		},
		markers: {
			size: 0,
			style: "hollow",
		},
		xaxis: {
			type: "datetime",
			tickAmount: "dataPoints",
			tickPlacement: "on",
			// labels: {
			// 	formatter: function (val) {
			// 		if (val)
			// 			return dayjs(val).locale("it").format("DD MMM - dddd")
			// 		else return ""
			// 	},
			// },
		},
		tooltip: {
			x: {
				format: "dd MMM yyyy",
			},
		},
		fill: {
			type: "solid",
			opacity: 0.1,
			//colors: ['#E1E8FF', '#c00']
		},
		colors: ["#2664EC", "#EC4899", "#8B5CF6"],
		legend: {
			show: true,
			position: "top",
			horizontalAlign: "right",
			itemMargin: { vertical: 10 },
		},
	}

	return mainGraphOptions
}

//Static AGENAS Data - the repository is no more updated!
export const getAgenasData = () => {
	const agenasData = {
		ITF1: {
			totale_posti_anc: "1382",
			totale_posti_ti: "181",
			totale_posti_ti_extra: "0",
		},
		ITF5: {
			totale_posti_anc: "338",
			totale_posti_ti: "79",
			totale_posti_ti_extra: "13",
		},
		ITF6: {
			totale_posti_anc: "944",
			totale_posti_ti: "166",
			totale_posti_ti_extra: "0",
		},
		ITF3: {
			totale_posti_anc: "3868",
			totale_posti_ti: "575",
			totale_posti_ti_extra: "0",
		},
		ITH5: {
			totale_posti_anc: "9001",
			totale_posti_ti: "889",
			totale_posti_ti_extra: "0",
		},
		ITH4: {
			totale_posti_anc: "1277",
			totale_posti_ti: "175",
			totale_posti_ti_extra: "0",
		},
		ITI4: {
			totale_posti_anc: "6421",
			totale_posti_ti: "943",
			totale_posti_ti_extra: "243",
		},
		ITC3: {
			totale_posti_anc: "1580",
			totale_posti_ti: "218",
			totale_posti_ti_extra: "12",
		},
		ITC4: {
			totale_posti_anc: "10457",
			totale_posti_ti: "1810",
			totale_posti_ti_extra: "0",
		},
		ITI3: {
			totale_posti_anc: "983",
			totale_posti_ti: "230",
			totale_posti_ti_extra: "48",
		},
		ITF2: {
			totale_posti_anc: "176",
			totale_posti_ti: "39",
			totale_posti_ti_extra: "26",
		},
		ITH1: {
			totale_posti_anc: "500",
			totale_posti_ti: "100",
			totale_posti_ti_extra: "20",
		},
		ITH2: {
			totale_posti_anc: "517",
			totale_posti_ti: "90",
			totale_posti_ti_extra: "0",
		},
		ITC1: {
			totale_posti_anc: "6794",
			totale_posti_ti: "628",
			totale_posti_ti_extra: "99",
		},
		ITF4: {
			totale_posti_anc: "2735",
			totale_posti_ti: "405",
			totale_posti_ti_extra: "0",
		},
		ITG2: {
			totale_posti_anc: "1602",
			totale_posti_ti: "204",
			totale_posti_ti_extra: "16",
		},
		ITG1: {
			totale_posti_anc: "3263",
			totale_posti_ti: "785",
			totale_posti_ti_extra: "0",
		},
		ITI1: {
			totale_posti_anc: "5033",
			totale_posti_ti: "570",
			totale_posti_ti_extra: "13",
		},
		ITI2: {
			totale_posti_anc: "662",
			totale_posti_ti: "86",
			totale_posti_ti_extra: "41",
		},
		ITC2: {
			totale_posti_anc: "67",
			totale_posti_ti: "13",
			totale_posti_ti_extra: "21",
		},
		ITH3: {
			totale_posti_anc: "6000",
			totale_posti_ti: "1000",
			totale_posti_ti_extra: "0",
		},
		totali: {
			totale_posti_anc: 63600,
			totale_posti_ti: 9186,
			totale_posti_ti_extra: 552,
		},
	}

	return agenasData
}
