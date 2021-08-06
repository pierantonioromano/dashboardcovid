import Head from 'next/head'
import React, { Fragment } from 'react'
import SiteHeader from '../components/SiteHeader.js'
import SiteFooter from '../components/SiteFooter.js'
import CalculateIncrements from '../components/CalculateIncrements.js'
import CalculatePressure from '../components/CalculatePressure.js'
import { format } from 'date-fns'
import { getTime } from 'date-fns'
import { it } from 'date-fns/locale'
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });


class Home extends React.Component {

	constructor(props) {
		super(props);
	
		this.state = {};
	}

	render() {
		
		//console.log(cleanedDailyRegions);

		const todayIndex = Array.isArray(this.props.cleanedDailyData) ? (this.props.cleanedDailyData.length - 1) : 2;
		const yesterdayIndex = Array.isArray(this.props.cleanedDailyData) ? (this.props.cleanedDailyData.length - 2) : 1;
		const twoDaysAgoIndex = Array.isArray(this.props.cleanedDailyData) ? (this.props.cleanedDailyData.length - 3) : 0;
		const oneWeekAgoIndex = Array.isArray(this.props.cleanedDailyData) ? (this.props.cleanedDailyData.length - 8) : 0;
		const oneWeekPlusOneAgoIndex = Array.isArray(this.props.cleanedDailyData) ? (this.props.cleanedDailyData.length - 9) : 0;
		const oneWeekPlusTwoAgoIndex = Array.isArray(this.props.cleanedDailyData) ? (this.props.cleanedDailyData.length - 10) : 0;

		const popolazione_italiana = 59258384; // updated Jan 2021

		//Screen values
		let ultimo_aggiornamento = this.props.cleanedDailyData[todayIndex] ? this.props.cleanedDailyData[todayIndex].data : 'n/a';
		let ultimo_aggiornamento_regioni = this.props.cleanedDailyRegions[todayIndex] ? this.props.cleanedDailyRegions[todayIndex].data : 'n/a';

		let nuovi_positivi_oggi = this.props.cleanedDailyData[todayIndex] ? Number(this.props.cleanedDailyData[todayIndex].nuovi_positivi) : 0;
		//let nuovi_positivi_ieri = this.props.cleanedDailyData[yesterdayIndex] ? Number(this.props.cleanedDailyData[yesterdayIndex].nuovi_positivi) : 0;
		let tamponi_oggi = this.props.cleanedDailyData[todayIndex] ? Number(this.props.cleanedDailyData[todayIndex].tamponi - this.props.cleanedDailyData[yesterdayIndex].tamponi) : 0;
		//let tamponi_ieri = this.props.cleanedDailyData[twoDaysAgoIndex] ? Number(this.props.cleanedDailyData[yesterdayIndex].tamponi - this.props.cleanedDailyData[twoDaysAgoIndex].tamponi) : 0;

		let nuovi_positivi_7gg = this.props.cleanedDailyData[oneWeekAgoIndex] ? Number(this.props.cleanedDailyData[oneWeekAgoIndex].nuovi_positivi) : 0;
		let tamponi_7gg = this.props.cleanedDailyData[oneWeekAgoIndex] ? Number(this.props.cleanedDailyData[oneWeekPlusOneAgoIndex].tamponi - this.props.cleanedDailyData[oneWeekPlusTwoAgoIndex].tamponi) : 0; 		

		//let rapporto_positivi_tamponi_oggi = this.props.cleanedDailyData[todayIndex] ? Number((this.props.cleanedDailyData[todayIndex].nuovi_positivi * 100 ) / (this.props.cleanedDailyData[todayIndex].tamponi - this.props.cleanedDailyData[yesterdayIndex].tamponi)) : 0;
		//let rapporto_positivi_tamponi_ieri = this.props.cleanedDailyData[todayIndex] ? Number((this.props.cleanedDailyData[yesterdayIndex].nuovi_positivi * 100 ) / (this.props.cleanedDailyData[yesterdayIndex].tamponi - this.props.cleanedDailyData[twoDaysAgoIndex].tamponi)) : 0;

		//let rapporto_positivi_testati_oggi = this.props.cleanedDailyData[todayIndex] ? Number((this.props.cleanedDailyData[todayIndex].nuovi_positivi * 100 ) / (this.props.cleanedDailyData[todayIndex].casi_testati - this.props.cleanedDailyData[yesterdayIndex].casi_testati)) : 0;
		//let rapporto_positivi_testati_ieri = this.props.cleanedDailyData[yesterdayIndex] ? Number((this.props.cleanedDailyData[yesterdayIndex].nuovi_positivi * 100 ) / (this.props.cleanedDailyData[yesterdayIndex].casi_testati - this.props.cleanedDailyData[twoDaysAgoIndex].casi_testati)) : 0;

		let morti_oggi = this.props.cleanedDailyData[todayIndex] ? Number(this.props.cleanedDailyData[todayIndex].deceduti - this.props.cleanedDailyData[yesterdayIndex].deceduti) : 0;
		//let morti_ieri = this.props.cleanedDailyData[yesterdayIndex] ? Number(this.props.cleanedDailyData[yesterdayIndex].deceduti - this.props.cleanedDailyData[twoDaysAgoIndex].deceduti) : 0;
		let morti_7gg = this.props.cleanedDailyData[oneWeekAgoIndex] ? Number(this.props.cleanedDailyData[oneWeekAgoIndex].deceduti - this.props.cleanedDailyData[oneWeekPlusOneAgoIndex].deceduti) : 0;

		let ricoverati_oggi = this.props.cleanedDailyData[todayIndex] ? Number(this.props.cleanedDailyData[todayIndex].ricoverati_con_sintomi - this.props.cleanedDailyData[yesterdayIndex].ricoverati_con_sintomi) : 0;
		//let ricoverati_ieri = this.props.cleanedDailyData[yesterdayIndex] ? Number(this.props.cleanedDailyData[yesterdayIndex].ricoverati_con_sintomi - this.props.cleanedDailyData[twoDaysAgoIndex].ricoverati_con_sintomi) : 0;

		let totale_ricoverati_attuali = this.props.cleanedDailyData[todayIndex] ? Number(this.props.cleanedDailyData[todayIndex].ricoverati_con_sintomi) : 0;
		let totale_ricoverati_7gg = this.props.cleanedDailyData[oneWeekAgoIndex] ? Number(this.props.cleanedDailyData[oneWeekAgoIndex].ricoverati_con_sintomi) : 0;

		let intensive_oggi = this.props.cleanedDailyData[todayIndex] ? Number(this.props.cleanedDailyData[todayIndex].terapia_intensiva - this.props.cleanedDailyData[yesterdayIndex].terapia_intensiva) : 0;
		//let intensive_ieri = this.props.cleanedDailyData[yesterdayIndex] ? Number(this.props.cleanedDailyData[yesterdayIndex].terapia_intensiva - this.props.cleanedDailyData[twoDaysAgoIndex].terapia_intensiva) : 0;

		let totale_intensive_attuali = this.props.cleanedDailyData[todayIndex] ? Number(this.props.cleanedDailyData[todayIndex].terapia_intensiva) : 0;
		let totale_intensive_7gg = this.props.cleanedDailyData[oneWeekAgoIndex] ? Number(this.props.cleanedDailyData[oneWeekAgoIndex].terapia_intensiva) : 0;

		let ingressi_intensive_oggi = this.props.cleanedDailyData[todayIndex] ? Number(this.props.cleanedDailyData[todayIndex].ingressi_terapia_intensiva) : 0;
		//let ingressi_intensive_ieri = this.props.cleanedDailyData[yesterdayIndex] ? Number(this.props.cleanedDailyData[yesterdayIndex].ingressi_terapia_intensiva) : 0;
		let ingressi_intensive_7gg = this.props.cleanedDailyData[oneWeekAgoIndex] ? Number(this.props.cleanedDailyData[oneWeekAgoIndex].ingressi_terapia_intensiva) : 0;

		let attualmente_positivi_oggi = this.props.cleanedDailyData[todayIndex] ? Number(this.props.cleanedDailyData[todayIndex].variazione_totale_positivi) : 0;
		//let attualmente_positivi_ieri = this.props.cleanedDailyData[yesterdayIndex] ? Number(this.props.cleanedDailyData[yesterdayIndex].variazione_totale_positivi) : 0;

		let totale_attualmente_positivi_oggi = this.props.cleanedDailyData[todayIndex] ? Number(this.props.cleanedDailyData[todayIndex].totale_positivi) : 0;
		let totale_attualmente_positivi_7gg = this.props.cleanedDailyData[oneWeekAgoIndex] ? Number(this.props.cleanedDailyData[oneWeekAgoIndex].totale_positivi) : 0;

		let guariti_oggi = this.props.cleanedDailyData[todayIndex] ? Number(this.props.cleanedDailyData[todayIndex].dimessi_guariti - this.props.cleanedDailyData[yesterdayIndex].dimessi_guariti) : 0;
		//let guariti_ieri = this.props.cleanedDailyData[yesterdayIndex] ? Number(this.props.cleanedDailyData[yesterdayIndex].dimessi_guariti - this.props.cleanedDailyData[twoDaysAgoIndex].dimessi_guariti) : 0;
		let guariti_7gg = this.props.cleanedDailyData[oneWeekAgoIndex] ? Number(this.props.cleanedDailyData[oneWeekAgoIndex].dimessi_guariti - this.props.cleanedDailyData[oneWeekPlusOneAgoIndex].dimessi_guariti) : 0;

		let tamponi_pcr_oggi = this.props.cleanedDailyData[todayIndex] ? this.props.cleanedDailyData[todayIndex].tamponi_test_molecolare - this.props.cleanedDailyData[yesterdayIndex].tamponi_test_molecolare : 0;
		let tamponi_rapidi_oggi = this.props.cleanedDailyData[todayIndex] ? this.props.cleanedDailyData[todayIndex].tamponi_test_antigenico_rapido - this.props.cleanedDailyData[yesterdayIndex].tamponi_test_antigenico_rapido : 0;
		//let positivita_tamponi_pcr = this.props.cleanedDailyData[todayIndex] ? this.props.cleanedDailyData[todayIndex].totale_positivi_test_molecolare - this.props.cleanedDailyData[yesterdayIndex].totale_positivi_test_molecolare : 0;
		//let positivita_tamponi_rapidi = this.props.cleanedDailyData[todayIndex] ? this.props.cleanedDailyData[todayIndex].totale_positivi_test_antigenico_rapido - this.props.cleanedDailyData[yesterdayIndex].totale_positivi_test_antigenico_rapido : 0;

		let totale_posti_anc = this.props.cleanedDailyAgenas['totali'] ? this.props.cleanedDailyAgenas['totali'].totale_posti_anc : 0;
		let totale_posti_ti = this.props.cleanedDailyAgenas['totali'] ? this.props.cleanedDailyAgenas['totali'].totale_posti_ti : 0;
		let totale_posti_ti_extra = this.props.cleanedDailyAgenas['totali'] ? this.props.cleanedDailyAgenas['totali'].totale_posti_ti_extra : 0;

		let totale_casi = this.props.cleanedDailyData[todayIndex] ? Number(this.props.cleanedDailyData[todayIndex].totale_casi) : 0;
		let totale_morti = this.props.cleanedDailyData[todayIndex] ? Number(this.props.cleanedDailyData[todayIndex].deceduti) : 0;
		let totale_isolamento_domiciliare = this.props.cleanedDailyData[todayIndex] ? Number(this.props.cleanedDailyData[todayIndex].isolamento_domiciliare) : 0;	
		
		let totale_casi_7gg = 0;
		for (let i = this.props.cleanedDailyData.length - 7; i < this.props.cleanedDailyData.length; i++)
		{
			totale_casi_7gg += this.props.cleanedDailyData[i].nuovi_positivi;
		}

		//Graph data series
		const graph_trending_series = [
			{ 
				name: 'Nuovi casi', 
				type: 'area',
				data: Array.isArray(this.props.cleanedDailyData) ? this.props.cleanedDailyData.map((item) => [getTime(new Date(item.data)), item.nuovi_positivi] ) : null 
			},
			{ 
				name: 'T.I. totali', 
				type: 'area',
				data: Array.isArray(this.props.cleanedDailyData) ? this.props.cleanedDailyData.map((item) => [getTime(new Date(item.data)), item.terapia_intensiva] ) : null 
			},
			{ 
				name: 'Ricoveri totali', 
				type: 'area',
				data: Array.isArray(this.props.cleanedDailyData) ? this.props.cleanedDailyData.map((item) => [getTime(new Date(item.data)), item.totale_ospedalizzati] ) : null 
			},
			

		];
		
		//Graph settings - Main
		const graph_trending_options = {
			chart: {
			  id: 'area-datetime',
			  type: 'area',
			  height: 350,
			  zoom: {
				autoScaleYaxis: true
			  },
			  toolbar: {
				show: false,
			  },
			  sparkline: {
				enabled: true
			  }
			},
			grid: {
				borderColor: '#ededed',
				padding: {
					left: 0,
					right: 0,
					bottom: 0
				}
			},
			dataLabels: {
			  enabled: false
			},
			markers: {
			  size: 0,
			  style: 'hollow',
			},
			xaxis: {
			  type: 'datetime',
			  tickAmount: 'dataPoints',
			  tickPlacement: 'on',
			  labels: {
				formatter: function(val) {
					if(val)
						return format(new Date(val), 'd MMM', {locale:it})
					else
						return "";
				}
			  }
			},
			tooltip: {
			  x: {
				format: 'dd MMM yyyy'
			  }
			},
			fill: {
				type: 'solid',
				opacity: 0.1,
				//colors: ['#E1E8FF', '#c00']
			},
			colors: ['#2664EC', '#EC4899', '#8B5CF6'],
			legend: {
				show: true,
				position: 'top',
				horizontalAlign: 'right',
				itemMargin: { vertical: 10 }
			}
		};

		//Graph settings - Tests
		const graph_covid_tests_settings = {
          
            series: [tamponi_pcr_oggi, tamponi_rapidi_oggi],
            options: {
				chart: {
				  //width: 380,
				  type: 'donut',
				},
				grid: { 
					padding: {
						top: 25,
						//bottom: -15
					}
				},
				yaxis: { show: false },
				labels: ['Tamponi PCR: ' + Number(tamponi_pcr_oggi).toLocaleString('it'), 'Tamponi Rapidi: ' + Number(tamponi_rapidi_oggi).toLocaleString('it')],
				legend: {
				  position: 'right',
				  offsetY: 40,
				  itemMargin: { vertical: 2 }
				},
				tooltip: { enabled: false },
				dataLabels: { enabled : false },
				colors: ['#2563EB', '#DB2777'],
				responsive: [
					{
						breakpoint: 1024,
						options: {
							legend: {
								enabled: false,
								position: 'bottom',
								offsetY: 0
							}
						},
					}
				]
			  },
        };



  return (
	
    <div className="min-h-screen pt-16 md:pt-20 pb-0 bg-indigo-50">
		<SiteHeader />

		<Head>
			<title>Covid-19 Dashboard</title>
		</Head>
	
 		<div className="container max-w-screen-xl px-4 mx-auto">

		 	<div className="relative my-4">
				<h1 className="text-xl md:text-3xl mb-2 md:mb-0 font-bold">Andamento nazionale</h1>
				<span className="relative md:absolute md:right-0 md:top-2 bg-indigo-100 rounded-md p-2 text-xs text-gray-700 uppercase tracking-wide">Aggiornamento: <strong>{format(new Date(ultimo_aggiornamento), 'd MMMM kk:mm', {locale:it})}</strong></span>
			</div>

			<div className="grid grid-cols-12 gap-3">

				<div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-5 xl:col-span-4">
					<div className="bg-blue-200 p-6 rounded-md">
						<h2 className="text-5xl mb-2 font-black text-blue-600">{nuovi_positivi_oggi.toLocaleString('it')}</h2>
						<p className="text-base text-black">nuovi positivi su <strong>{tamponi_oggi.toLocaleString('it')}</strong> tamponi
						<br/>
						7 giorni fa erano <strong>{nuovi_positivi_7gg.toLocaleString('it')}</strong> su <strong>{tamponi_7gg.toLocaleString('it')}</strong>
						<br/>
						l'incidenza 7gg / 100M ab. è del <strong>{Math.round(totale_casi_7gg / popolazione_italiana * 100000)} %</strong></p>
					</div>
					<div className="bg-blue-100 p-3 mt-3 rounded-md">
						<table className="table-auto w-full">
							<tbody>
								<tr>
									<td className="p-1 text-right font-black text-md md:text-xl">{morti_oggi.toLocaleString('it')}</td>
									<td className="p-1 px-3"><p className="text-sm md:text-base">morti</p></td>
									<td className="p-1 p-r-0 text-right">
										<CalculateIncrements new_value={morti_oggi} previous_value={morti_7gg} notice_type="better_lower" display_type="percentage" show_trending_icon />
									</td>
								</tr>
								<tr>
									<td className="p-1 text-right font-black text-md md:text-xl">{ricoverati_oggi.toLocaleString('it')}</td>
									<td className="p-1 px-3"><p className="text-sm md:text-base">ricoverati oggi</p></td>
									<td className="p-1 p-r-0 text-right">
										<CalculateIncrements new_value={totale_ricoverati_attuali} previous_value={totale_ricoverati_7gg} notice_type="better_lower" display_type="percentage" show_trending_icon />	
									</td>
								</tr>
								<tr>
									<td className="p-1 text-right font-black text-md md:text-xl">{intensive_oggi.toLocaleString('it')}</td>
									<td className="border-bo border-gray-100 p-1 px-3"><p className="text-sm md:text-base">saldo intensive</p></td>
									<td className="border-bo border-gray-100 p-1 p-r-0 text-right">
										<CalculateIncrements new_value={totale_intensive_attuali} previous_value={totale_intensive_7gg} notice_type="better_lower" display_type="percentage" show_trending_icon />
									</td>
								</tr>
								<tr>
									<td className="p-1 text-right font-black text-md md:text-xl">{ingressi_intensive_oggi.toLocaleString('it')}</td>
									<td className="p-1 px-3"><p className="text-sm md:text-base">ingressi intensive</p></td>
									<td className="p-1 p-r-0 text-right">
										<CalculateIncrements new_value={ingressi_intensive_oggi} previous_value={ingressi_intensive_7gg} notice_type="better_lower" display_type="percentage" show_trending_icon />
									</td>
								</tr>
								<tr>
									<td className="p-1 text-right font-black text-md md:text-xl">{guariti_oggi.toLocaleString('it')}</td>
									<td className="p-1 px-3"><p className="text-sm md:text-base">guariti</p></td>
									<td className="p-1 p-r-0 text-right">
									<CalculateIncrements new_value={guariti_oggi} previous_value={guariti_7gg} notice_type="better_higher" display_type="percentage" show_trending_icon />
									</td>
								</tr>
								<tr>
									<td className="p-1 text-right font-black text-md md:text-xl">{attualmente_positivi_oggi.toLocaleString('it')}</td>
									<td className="p-1 px-3"><p className="text-sm md:text-base">att.positivi</p></td>
									<td className="p-1 p-r-0 text-right">
									<CalculateIncrements new_value={totale_attualmente_positivi_oggi} previous_value={totale_attualmente_positivi_7gg} notice_type="better_lower" display_type="percentage" show_trending_icon />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-7 xl:col-span-8 relative bg-white rounded-md overflow-hidden">
					<span className="absolute top-4 left-4 text-xs uppercase font-semibold text-gray-500 tracking-widest">Dati ultime 2 settimane</span>
					<div id="chart-timeline" className="abbsolute bottom-0 left-0 w-full">
						<ReactApexChart options={graph_trending_options} series={graph_trending_series} type="area" height={'430'} />
					</div>
				</div>
			</div>

			{/* <div className="relative my-4 mt-12">
				<h1 className="text-xl md:text-3xl mb-2 md:mb-0 font-bold">Tamponi e carichi ospedalieri</h1>
				<span className="relative md:absolute md:right-0 md:top-2 bg-indigo-100 rounded-md p-2 text-xs text-gray-700 uppercase tracking-wide">Aggiornamento: <strong>{format(new Date(ultimo_aggiornamento), 'd MMMM kk:mm', {locale:it})}</strong></span>
			</div> */}

			<div className="grid grid-cols-12 gap-3 mt-3">
				<div className="col-span-12 sm:col-span-12 md:col-span-4 bg-white p-6 rounded-md relative">
					<span className="absolute top-4 left-4 text-xs uppercase font-semibold text-gray-500 tracking-widest">TAMPONI PROCESSATI</span>
					<div id="chart absolute bottom-0 left-4 w-full">
						<ReactApexChart options={graph_covid_tests_settings.options} series={graph_covid_tests_settings.series} type="donut" />
					</div>
				</div>
			
				<div className="col-span-12 sm:col-span-12 md:col-span-4 bg-white p-6 rounded-md relative">
					<span className="absolute top-4 left-4 text-xs uppercase font-semibold text-gray-500 tracking-widest">CARICHI OSPEDALIERI</span>
					<h3 className="text-xl lg:text-3xl mt-6 mb-2 font-black text-blue-600">{ Math.round(totale_intensive_attuali * 100 / totale_posti_ti) }% <span className="text-sm font-semibold text-black">occupazione T.I. <span className="text-pink-500">({totale_intensive_attuali.toLocaleString('it')})</span></span></h3>
					<h3 className="text-xl lg:text-3xl mt-2 mb-2 font-black text-blue-600">{ Math.round(totale_ricoverati_attuali * 100 / totale_posti_anc) }% <span className="text-sm font-semibold text-black">occupazione reparti <span className="text-pink-500">({totale_ricoverati_attuali.toLocaleString('it')})</span></span></h3>
					<p className="mt-6 text-sm text-black"><strong>{totale_posti_ti.toLocaleString('it')}</strong> posti in T.I. disponibili + <strong>{totale_posti_ti_extra.toLocaleString('it')}</strong> attivabili<br/><strong>{totale_posti_anc.toLocaleString('it')}</strong> posti in area non critica disponibili</p>
				</div>

				<div className="col-span-12 sm:col-span-12 md:col-span-4 bg-white p-6 rounded-md relative">
					<span className="absolute top-4 left-4 text-xs uppercase font-semibold text-gray-500 tracking-widest">ALTRE STATISTICHE</span>
					<h3 className="text-xl lg:text-3xl mt-6 mb-2 font-black text-blue-600">{totale_casi.toLocaleString('it')} <span className="text-sm font-semibold text-black">casi totali</span></h3>
					<h3 className="text-xl lg:text-3xl mt-2 mb-2 font-black text-blue-600">{totale_morti.toLocaleString('it')} <span className="text-sm font-semibold text-black">morti totali <span className="text-pink-500">({Number(totale_morti * 100 / totale_casi).toFixed(2)}%)</span></span></h3>
					<p className="mt-6 text-sm text-black"><strong>{totale_attualmente_positivi_oggi.toLocaleString('it')}</strong> casi attualmente positivi<br/><strong>{totale_isolamento_domiciliare.toLocaleString('it')}</strong> persone in isolamento domiciliare</p>
				</div>

			</div>

			{ this.props.cleanedDailyNotes && this.props.cleanedDailyNotes[0].note ? 
			
			<>
				<div className="bg-pink-500 mt-3 rounded-md p-6">
					<p className="text-white text-sm">
						{ this.props.cleanedDailyNotes[0].note }
					</p>
				</div>
			</>
			
			: null }

			<div className="relative my-4 mt-12">
				<h1 className="text-xl md:text-3xl mb-2 md:mb-0 font-bold">Andamento regionale</h1>
				<span className="relative md:absolute md:right-0 md:top-2 bg-indigo-100 rounded-md p-2 text-xs text-gray-700 uppercase tracking-wide">Aggiornamento: <strong>{format(new Date(ultimo_aggiornamento_regioni), 'd MMMM kk:mm', {locale:it})}</strong></span>
			</div>

			<div className="bg-white rounded-md p-0">
				<table className="w-full relative responsive-table covid-regions-trend-table">
					<thead>
						<tr>
							<th className="w-5/12 sticky top-14 left-0 rounded-l-md px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100 tracking-widest">Regione</th>
							<th className="w-1/12 sticky top-14 left-0 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100 tracking-widest">Nuovi casi</th>
							<th className="w-1/12 sticky top-14 left-0 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100 tracking-widest">Ricoverati</th>
							<th className="w-1/12 sticky top-14 left-0 rounded-r-md px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100 tracking-widest">Intensive</th>						
							<th className="z-10 w-2/12 sticky top-14 left-0 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100 tracking-widest">Carico Rep.</th>
							<th className="z-10 w-2/12 sticky top-14 left-0 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100 tracking-widest">Carico T.I.</th>
						</tr>
					</thead>
					<tbody>

						{this.props.cleanedDailyRegions
							.sort((a,b) => b.nuovi_positivi - a.nuovi_positivi)
							.map((item) => 
							<Fragment key={item.codice_regione}>
								<tr id={'regionRow-' + item.codice_regione}>
									<td className="py-2 px-4 border-b border-gray-100">
										{item.denominazione_regione}
										{item.note ? <p className="hidden lg-block text-gray-400 py-2 text-xs">{item.note}</p> : ''}
									</td>
									<td className="py-2 px-4 border-b border-gray-100 text-center">{item.nuovi_positivi}
									<CalculateIncrements new_value={item.nuovi_positivi} previous_value={item.y_nuovi_positivi} notice_type="better_lower" display_type="percentage" show_trending_icon hide_text />
									</td>
									<td className="py-2 px-4 border-b border-gray-100 text-center">{item.ricoverati_con_sintomi}</td>
									<td className="py-2 px-4 border-b border-gray-100 text-center">{item.terapia_intensiva}</td>
									<td className="py-2 px-0 border-b border-gray-100 text-center">
										<CalculatePressure actual_value={item.ricoverati_con_sintomi} total_value={this.props.cleanedDailyAgenas[item.codice_nuts_2].totale_posti_anc} pressure_type='anc' />
									</td>
									<td className="py-2 px-0 border-b border-gray-100 text-center">
										<CalculatePressure actual_value={item.terapia_intensiva} total_value={this.props.cleanedDailyAgenas[item.codice_nuts_2].totale_posti_ti} pressure_type='ti' />
									</td>
								</tr>
							</Fragment>
  						)}
					</tbody>
				</table>
			</div>

		</div>

		<SiteFooter />
 
    </div>
  )
}
}

export default Home;

// add getStaticProps() function
export async function getStaticProps() {

	const fetch = require('node-fetch');

	//Fetch Daily Data
	const dailyData = await fetch("https://www.pierantonioromano.com/bollettinocovid/latest_covid_daily_data.json");
	const cleanedDailyData = await dailyData.json();

	//Fetch Daily Notes
	const dailyNotes = await fetch("https://www.pierantonioromano.com/bollettinocovid/latest_covid_daily_note.json");
	const cleanedDailyNotes = await dailyNotes.json();

	//Fetch Regional Data 
	const dailyRegions = await fetch("https://www.pierantonioromano.com/bollettinocovid/latest_covid_daily_region.json");
	const cleanedDailyRegions = await dailyRegions.json();

	//Fetch Agenas Data
	const dailyAgenas = await fetch("https://www.pierantonioromano.com/bollettinocovid/latest_covid_agenas_data.json");
	const cleanedDailyAgenas = await dailyAgenas.json();
  
	return {
	  	props: {
			cleanedDailyData,
			cleanedDailyNotes,
			cleanedDailyRegions,
			cleanedDailyAgenas
	  	},
    	revalidate: 86400,
	};
  }
