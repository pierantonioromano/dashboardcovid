import Head from 'next/head'
import React, { Fragment } from 'react'
import SiteHeader from '../components/SiteHeader.js'
import SiteFooter from '../components/SiteFooter.js'
import { TrendingUpIcon, TrendingDownIcon } from '@heroicons/react/outline'
import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { differenceInMinutes, toDate } from 'date-fns';
import { it } from 'date-fns/locale'


class News extends React.Component {

	constructor(props) {
		super(props);
	
		this.state = {};
	}

	renderNewsItem = (item) => {
		
		let newsImageUrl = (item.i) ? { uri: this.props.cleanedCovidNewsData.sources[item.s].imgPath + item.i} : NoPostImageIcon;
		let newsTitle = item.t;
		let newsSource = (this.props.cleanedCovidNewsData.sources[item.s].label) ? this.props.cleanedCovidNewsData.sources[item.s].label : "";

		return (
					<>
						<div className="bg-white hover:bg-gray-50 col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 rounded-md relative p-4 pb-12">
							
								<div className="h-16 w-16 float-right my-2 mx-2 overflow-hidden w-full rounded-md relative"
										style={{  
											backgroundColor: '#999',
											backgroundImage: "url(" + newsImageUrl.uri + ")",
											backgroundPosition: 'center',
											backgroundSize: 'cover',
											backgroundRepeat: 'no-repeat'
										  }}
								>
									<a target="_blank" rel="noopener" className="block absolute top-0 left-0 w-full h-full" aria-label={item.t} href={item.l}></a>
								</div>
							
								<a target="_blank" rel="noopener" className="block" href={item.l}>
									<h3 className="text-base font-bold text-black pb-2">{newsTitle}</h3>
								</a>
								<span className="absolute bottom-0 left-0 w-full text-xs text-gray-400 px-4 pb-4 pt-0">{newsSource} { item.d? ' - ' + formatDistanceToNow(toDate(item.d*1000), { locale: it, addSuffix: true, includeSeconds: true}) : ''}
								</span>

						</div>
					</>
				)
	}
		
	render() {

  return (
	
    <div className="min-h-screen pt-16 md:pt-20 pb-0 bg-indigo-50">
		<SiteHeader />

		<Head>
			<title>Covid-19 Dashboard - News</title>
			<meta name="description" content="News sul Covid-19 e sulle misure di contenimento italiane." />
		</Head>
	
 		<div className="container max-w-screen-xl px-4 mx-auto">

		 	<div className="relative my-4">
				<h1 className="text-2xl md:text-3xl mb-2 md:mb-0 font-bold">News</h1>
				{/* <span className="relative md:absolute md:right-0 md:top-2 bg-indigo-100 rounded-md p-2 text-xs text-gray-700 uppercase tracking-wide">Aggiornamento: <strong>{format(new Date(ultimo_aggiornamento), 'd MMMM kk:mm', {locale:it})}</strong></span> */}
			</div>

			<div className="grid grid-cols-12 gap-4">
				{ this.props.cleanedCovidNewsData.items.map((item) => this.renderNewsItem(item) ) }
			</div>

		</div>

		<SiteFooter />
 
    </div>
  )
}
}

export default News;

// add getStaticProps() function
export async function getStaticProps() {

	const fetch = require('node-fetch');

	//Fetch Covid News
	const covidNewsData = await fetch("https://www.pierantonioromano.com/bollettinocovid/latest_covid_news.json");
	const cleanedCovidNewsData = await covidNewsData.json();
  
	return {
	  	props: {
			cleanedCovidNewsData
	  	},
    	revalidate: 7200,
	};
  }
