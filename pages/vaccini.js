import Head from 'next/head'
import React, { Fragment } from 'react'
import SiteHeader from '../components/SiteHeader.js'
import SiteFooter from '../components/SiteFooter.js'
import { format } from 'date-fns'
import { it } from 'date-fns/locale'
import dynamic from 'next/dynamic';
import CalculatePressure from '../components/CalculatePressure.js'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import PullToRefresh from 'react-simple-pull-to-refresh';
import Router from 'next/router'
import fetch from 'node-fetch'

class Vaccini extends React.Component {

	constructor(props) {
		super(props);
	
		this.state = {};
	}

	handleRefresh = () => {
		return Promise.resolve(Router.reload(window.location.pathname));
	}
		
	render() {
		
		const popolazione_italiana = 59258384; // updated Jan 2021

		//Graph data series
		const graph_trending_series = [
			{ 
				name: 'Vaccinazioni', 
				type: 'area',
				data: Array.isArray(this.props.cleanedDailyVaxData.data_vax_series) ? this.props.cleanedDailyVaxData.data_vax_series.map((item) => [item.date, item.daily] ) : null 
			},
			{ 
				name: '1° dose', 
				type: 'line',
				data: Array.isArray(this.props.cleanedDailyVaxData.data_vax_series) ? this.props.cleanedDailyVaxData.data_vax_series.map((item) => [item.date, item.prima_dose] ) : null 
			},
			{ 
				name: '2° dose', 
				type: 'line',
				data: Array.isArray(this.props.cleanedDailyVaxData.data_vax_series) ? this.props.cleanedDailyVaxData.data_vax_series.map((item) => [item.date, item.seconda_dose] ) : null 
			},
			{ 
				name: 'Monodose', 
				type: 'line',
				data: Array.isArray(this.props.cleanedDailyVaxData.data_vax_series) ? this.props.cleanedDailyVaxData.data_vax_series.map((item) => [item.date, item.monodose] ) : null 
			},
			{ 
				name: 'Pr. infezione', 
				type: 'line',
				data: Array.isArray(this.props.cleanedDailyVaxData.data_vax_series) ? this.props.cleanedDailyVaxData.data_vax_series.map((item) => [item.date, item.pregressa_infezione] ) : null 
			}
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
					bottom: 0,
					top: 40
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
						return format(new Date(val), 'd MMM - EEEE', {locale:it})
					else
						return "";
				}
			  }
			},
			tooltip: {
			  	x: {
					format: 'dd MMM yyyy'
			  	},
			  	y: {
					formatter: function(value) {
						// use series argument to pull original string from chart data
				  		return value ? value.toLocaleString('it') : value;
					}
				}
			},
			fill: {
				type: 'solid',
				opacity: [0.1, 0.4, 0.4, 0.4, 0.4],
			},
			colors: ['#2664EC', '#EC4899', '#8B5CF6', '#059669', '#DC2626'],
			legend: {
				show: true,
				position: 'top',
				horizontalAlign: 'right',
				itemMargin: { vertical: 10 }
			}
		};

		//Screen values
		let ultimo_aggiornamento = this.props.cleanedDailyVaxData.data_vax_totals[0].ultimo_aggiornamento;
		let totale_dosi_consegnate = Array.isArray(this.props.cleanedDailyVaxData.data_vax_totals) ? this.props.cleanedDailyVaxData.data_vax_totals[0].totale_dosi_consegnate : 0;
		let totale_dosi_somministrate = Array.isArray(this.props.cleanedDailyVaxData.data_vax_totals) ? this.props.cleanedDailyVaxData.data_vax_totals[0].totale_dosi_somministrate : 0;
		let totale_platea = Array.isArray(this.props.cleanedDailyVaxData.data_vax_totals) ? this.props.cleanedDailyVaxData.data_vax_totals[0].totale_platea : 0;
		let totale_vaccinati = Array.isArray(this.props.cleanedDailyVaxData.data_vax_totals) ? this.props.cleanedDailyVaxData.data_vax_totals[0].lab_seconda_dose_con_janssen : 0;
		let totale_vaccinati_prima_dose = Array.isArray(this.props.cleanedDailyVaxData.data_vax_totals) ? this.props.cleanedDailyVaxData.data_vax_totals[0].lab_prima_dose_senza_janssen : 0;
		let totale_vaccinati_seconda_dose = Array.isArray(this.props.cleanedDailyVaxData.data_vax_totals) ? this.props.cleanedDailyVaxData.data_vax_totals[0].lab_seconda_dose : 0;
		let totale_vaccinati_monodose = Array.isArray(this.props.cleanedDailyVaxData.data_vax_totals) ? this.props.cleanedDailyVaxData.data_vax_totals[0].lab_monodose : 0;
		let totale_vaccinati_pregressa_infezione = Array.isArray(this.props.cleanedDailyVaxData.data_vax_totals) ? this.props.cleanedDailyVaxData.data_vax_totals[0].lab_pregressa_infezione : 0;
		let obiettivo_vaccinabili = totale_platea * 80 / 100;
		//console.log("obiettivo vaccinabili: " + obiettivo_vaccinabili);
		let non_vaccinati_totali = totale_platea - totale_vaccinati_prima_dose;
		//console.log("non vaccinati totali: " + non_vaccinati_totali);
		let non_vaccinati_obiettivo = obiettivo_vaccinabili - totale_vaccinati_prima_dose;
		//console.log("non vaccinati obiettivo: " + non_vaccinati_obiettivo);
		let proporzione_monodose = (totale_vaccinati_monodose + totale_vaccinati_pregressa_infezione) * 100 / totale_vaccinati_prima_dose;
		//console.log("proporzione monodose: " + proporzione_monodose);

		let proporzione_monodosi_future = proporzione_monodose * non_vaccinati_obiettivo / totale_vaccinati_prima_dose;
		//console.log("proporzione_monodosi_future: " + proporzione_monodosi_future);
		let stima_dosi_future = (non_vaccinati_obiettivo * 2) - (non_vaccinati_obiettivo * proporzione_monodosi_future / 100);
		//console.log("stima dosi future: " + stima_dosi_future);

		let seriesLastDayIndex = Array.isArray(this.props.cleanedDailyVaxData.data_vax_series) ? this.props.cleanedDailyVaxData.data_vax_series.length - 1 : 12; 
		let totale_vaccinati_24h = Array.isArray(this.props.cleanedDailyVaxData.data_vax_series) ? this.props.cleanedDailyVaxData.data_vax_series[seriesLastDayIndex].daily : 0;
		let ultimo_giorno_series = Array.isArray(this.props.cleanedDailyVaxData.data_vax_series) ? this.props.cleanedDailyVaxData.data_vax_series[seriesLastDayIndex].date : 0;

		let totale_vaccinati_7gg = 0;
		for (let i = this.props.cleanedDailyVaxData.data_vax_series.length - 7; i < this.props.cleanedDailyVaxData.data_vax_series.length; i++)
		{
			//console.log(this.props.cleanedDailyVaxData.data_vax_series[i].date + " - " + this.props.cleanedDailyVaxData.data_vax_series[i].daily)
			totale_vaccinati_7gg += this.props.cleanedDailyVaxData.data_vax_series[i].daily;
		}

		//Graph settings - Cycle
		const graph_covid_vax_cycle_settings = {
	
			series: [ totale_vaccinati_seconda_dose, totale_vaccinati_monodose, totale_vaccinati_pregressa_infezione, non_vaccinati_totali],
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
				labels: ['Seconda dose', 'Monodose', 'Pregressa infezione', 'Non vaccinati'],
				legend: {
					position: 'right',
					offsetY: 25,
					itemMargin: { vertical: 2 }
				},
				tooltip: { 
					enabled: true,
					y: {
						formatter: function(value) {
						  // use series argument to pull original string from chart data
						  return value.toLocaleString('it');
						}
					}
				},
				dataLabels: { enabled : false },
				colors: ['#2563EB', '#DB2777', '#059669', '#FBBF24'],
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
			
			<div className="min-h-screen pb-0 bg-indigo-50">

				<SiteHeader />

				<Head>
					<title>Covid-19 Dashboard - Vaccini</title>
					<meta name="description" content="Monitora l'andamento della campagna vaccinale." />
				</Head>
			
				<PullToRefresh pullDownThreshold={100} maxPullDownDistance={30} pullingContent="" onRefresh={this.handleRefresh}>
					<div className="container max-w-screen-xl px-4 mx-auto">

						<div className="relative my-4">
							<h1 className="text-2xl md:text-3xl mb-2 md:mb-0 md:mt-8 font-bold">Andamento nazionale</h1>
							<span className="relative md:absolute md:right-0 md:top-2 bg-indigo-100 rounded-md p-2 text-xs text-gray-700 uppercase tracking-wide">Aggiornamento: <strong>{format(new Date(ultimo_aggiornamento), 'd MMMM kk:mm', {locale:it})}</strong></span>
						</div>

						<div className="grid grid-cols-12 gap-3">

							<div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-5 xl:col-span-4">
								<div className="bg-blue-200 p-6 rounded-md">
									<h2 className="text-5xl mb-2 font-black text-blue-600">{totale_vaccinati.toLocaleString('it')}</h2>
									<p className="text-base md:text-base text-black">
										persone hanno completato il ciclo vaccinale, pari al <strong className="text-blue-600"> {Number(totale_vaccinati / totale_platea * 100).toLocaleString('it', { maximumFractionDigits: 1 })}%</strong> della popolazione italiana over 12
									</p>
								</div>
								<div className="bg-pink-500 p-3 mt-3 rounded-md">
									<table className="table-auto w-full text-white">
										<tbody>
											<tr>
												<td className="p-1 text-right font-black text-xl">{totale_vaccinati_prima_dose.toLocaleString('it')}</td>
												<td className="p-1 px-3"><p className="text-base">con prima dose</p></td>
											</tr>
											<tr>
												<td className="p-1 text-right font-black text-xl">{totale_vaccinati_monodose.toLocaleString('it')}</td>
												<td className="p-1 px-3"><p className="text-base">monodose</p></td>
											</tr>
											<tr>
												<td className="p-1 text-right font-black text-xl">{totale_vaccinati_pregressa_infezione.toLocaleString('it')}</td>
												<td className="p-1 px-3"><p className="text-base">pregressa infezione</p></td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="bg-blue-600 p-3 mt-3 rounded-md">
									<table className="table-auto w-full text-white">
										<tbody>
											<tr>
												<td className="p-1 text-right font-black text-xl">{ totale_dosi_somministrate.toLocaleString('it') }</td>
												<td className="p-1 px-3"><p className="md:text-base">dosi somministrate</p></td>
											</tr>
											<tr>
												<td className="p-1 text-right font-black text-xl">{ totale_dosi_consegnate.toLocaleString('it') }</td>
												<td className="p-1 px-3"><p className="md:text-base">dosi consegnate</p></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>

							<div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-7 xl:col-span-8 relative bg-white rounded-md overflow-hidden">
								<span className="absolute top-4 left-4 text-xs uppercase font-semibold text-gray-500 tracking-widest">Dati ultime 2 settimane</span>
								<div id="chart-timeline" className="abbsolute bottom-0 left-0 w-full">
									<ReactApexChart options={graph_trending_options} series={graph_trending_series} type="area" height={'405'} />
								</div>
							</div>
						</div>

						<div className="grid grid-cols-12 gap-3 mt-3">
							<div className="col-span-12 sm:col-span-12 md:col-span-4 bg-white p-6 rounded-md relative">
								<span className="absolute top-4 left-4 text-xs uppercase font-semibold text-gray-500 tracking-widest">DETTAGLIO DOSI</span>
								<div id="chart absolute bottom-0 left-4 w-full">
									<ReactApexChart options={graph_covid_vax_cycle_settings.options} series={graph_covid_vax_cycle_settings.series} type="donut" />
								</div>
							</div>
							<div className="col-span-12 sm:col-span-12 md:col-span-4 bg-white p-6 rounded-md relative">
								<span className="absolute top-4 left-4 text-xs uppercase font-semibold text-gray-500 tracking-widest">ANDAMENTO CAMPAGNA VACCINALE</span>
								<h3 className="text-xl lg:text-3xl mt-6 mb-2 font-black text-blue-600">{ totale_vaccinati_24h.toLocaleString('it') } <span className="text-base font-semibold text-black">vaccinati il {format(new Date(ultimo_giorno_series), 'd MMMM', {locale:it})}</span></h3>		
								<h3 className="text-xl lg:text-3xl mb-2 font-black text-blue-600">{ Math.round(totale_vaccinati_7gg / 7).toLocaleString('it') } <span className="text-base font-semibold text-black">media giornaliera 7gg</span></h3>				
								<p className="mt-6 text-base text-black">con la media attuale sono necessari circa <strong>{Math.round(stima_dosi_future / (totale_vaccinati_7gg / 7))}</strong> giorni per vaccinare l'80% degli over 12</p>
							</div>
							<div className="col-span-12 sm:col-span-12 md:col-span-4 bg-white p-6 rounded-md relative">
								<span className="absolute top-4 left-4 text-xs uppercase font-semibold text-gray-500 tracking-widest">PLATEA CAMPAGNA VACCINALE</span>
								<h3 className="text-xl lg:text-3xl mt-6 mb-2 font-black text-blue-600">{ totale_platea.toLocaleString('it') } <span className="text-base font-semibold text-black"> italiani vaccinabili</span></h3>		
								<h3 className="text-xl lg:text-3xl mb-2 font-black text-blue-600">{ non_vaccinati_totali.toLocaleString('it') } <span className="text-base font-semibold text-black">con nessuna dose</span></h3>				
								<p className="mt-6 text-base text-black">la campagna vaccinale italiana è iniziata il 27 dicembre 2020 e sarà conclusa entro l'anno</p>
							</div>
						</div>


						<div className="relative my-4 mt-12">
							<h1 className="text-2xl md:text-3xl mb-2 md:mb-0 font-bold">Andamento regionale</h1>
							<span className="relative md:absolute md:right-0 md:top-2 bg-indigo-100 rounded-md p-2 text-xs text-gray-700 uppercase tracking-wide">Aggiornamento: <strong>{format(new Date(ultimo_aggiornamento), 'd MMMM kk:mm', {locale:it})}</strong></span>
						</div>

						<div className="bg-white rounded-md p-0">
							<table className="w-full relative responsive-table covid-regions-vax-table">
								<thead>
									<tr>
										<th className="w-6/12 sticky top-14 left-0 rounded-l-md px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100 tracking-widest">Regione</th>
										<th className="w-2/12 sticky top-14 left-0 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100 tracking-widest">Dosi consegnate</th>
										<th className="w-2/12 sticky top-14 left-0 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100 tracking-widest">Dosi somministrate</th>
										<th className="w-2/12 z-10 sticky top-14 left-0 rounded-r-md px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100 tracking-widest">Avanzamento</th>	
									</tr>
								</thead>
								<tbody>

									{this.props.cleanedDailyVaxData.data_vax_summary_regions
										.map((item) => 
										<Fragment key={item.codice_regione}>
											<tr id={'regionRow-' + item.codice_regione}>
												<td className="py-2 px-4 border-b border-gray-100">
													{item.nome_area}
												</td>
												<td className="py-2 px-4 border-b border-gray-100 text-center">
													{Number(item.dosi_consegnate).toLocaleString('it')}
												</td>
												<td className="py-2 px-4 border-b border-gray-100 text-center">	
													{Number(item.dosi_somministrate).toLocaleString('it')}
												</td>
												<td className="py-2 px-4 border-b border-gray-100 text-center">
													<CalculatePressure actual_value={Math.round(item.percentuale_somministrazione)} total_value={100} pressure_type="vax" />
												</td>
											</tr>
										</Fragment>
									)}
								</tbody>
							</table> 
						</div>

					</div>
				</PullToRefresh>

				<SiteFooter />
		
			</div>
		)
	}
}

export default Vaccini;

// add getStaticProps() function
export async function getStaticProps() {

	//const fetch = require('node-fetch');

	//Fetch Daily Vax Data
	const dailyVaxData = await fetch("https://www.pierantonioromano.com/bollettinocovid/latest_vax_data.json");
	const cleanedDailyVaxData = await dailyVaxData.json();
  
	return {
	  	props: {
			cleanedDailyVaxData
	  	},
    	revalidate: 7200,
	};
  }
