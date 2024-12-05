"use client"

import CalculateIncrements from "@components/CalculateIncrements.js"
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const SummaryWidgets = ({ lastWeekArray, lastWeekData, pastWeekArray, pastWeekData, cleanedDailyData, popolazione_italiana }) => {

	return (
		<>

			<Swiper
				modules={[Pagination]}
				slidesPerView={5}
				spaceBetween={0}
				pagination={{ 
					clickable: true, 
					el: '#swiper-pagination', 
				}}
				breakpoints={{
					// when window width is >= 0px
					0: {
						slidesPerView: 1
					},
					700: {
						slidesPerView: 2
					},
					800: {
						slidesPerView: 3
					},
					960: {
						slidesPerView: 4
					},
					1280: {
						slidesPerView: 5
					}
				}}
			>
				<SwiperSlide>
					<div key={"widget-1"} className="w-full text-center text-governor-bay-200 carouselItem">
						<span className="block mb-3 text-7xl font-bold text-white">{lastWeekData?.nuovi_positivi.toLocaleString("it")}</span>
						nuovi positivi questa settimana
						<br />
						su <strong className="text-white">{lastWeekData?.tamponi.toLocaleString("it")}</strong> tamponi
						<br />
						<CalculateIncrements
							new_value={lastWeekData?.nuovi_positivi}
							previous_value={pastWeekData?.nuovi_positivi}
							notice_type="better_lower"
							display_type="percentage"
							show_trending_icon
							extra_classes={"inline-block bg-governor-bay-100 w-auto py-1 px-3 rounded-2xl mt-4 font-bold"}
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div key={"widget-2"} className="text-center text-governor-bay-200 carouselItem">
						<span className="block mb-3 text-7xl font-bold text-white">{lastWeekData?.deceduti}</span>
						decessi nell'ultima settimana,
						<br /> una media di <strong className="text-white">{Math.round(lastWeekData?.deceduti / 7)}</strong> al giorno
						<br />
						<CalculateIncrements
							new_value={lastWeekData?.deceduti}
							previous_value={pastWeekData?.deceduti}
							notice_type="better_lower"
							display_type="percentage"
							show_trending_icon
							extra_classes={"inline-block bg-governor-bay-100 w-auto py-1 px-3 rounded-2xl mt-4 font-bold"}
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div key={"widget-3"} className="text-center text-governor-bay-200 carouselItem">
						<span className="block mb-3 text-7xl font-bold text-white">{lastWeekData.ricoverati_con_sintomi}</span>
						ricoverati in ospedale
						<br /> per un totale di <strong className="text-white">{cleanedDailyData[cleanedDailyData?.length - 1].ricoverati_con_sintomi.toLocaleString("it")}</strong>
						<br />
						<CalculateIncrements
							new_value={lastWeekArray[lastWeekArray.length - 1]?.ricoverati_con_sintomi}
							previous_value={pastWeekArray[pastWeekArray.length - 1]?.ricoverati_con_sintomi}
							notice_type="better_lower"
							display_type="percentage"
							show_trending_icon
							extra_classes={"inline-block bg-governor-bay-100 w-auto py-1 px-3 rounded-2xl mt-4 font-bold"}
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div key={"widget-4"} className="text-center text-governor-bay-200 carouselItem">
						<span className="block mb-3 text-7xl font-bold text-white">{lastWeekData.terapia_intensiva}</span>
						in terapia intensiva
						<br /> per un totale di <strong className="text-white">{cleanedDailyData[cleanedDailyData?.length - 1].terapia_intensiva.toLocaleString("it")}</strong>
						<br />
						<CalculateIncrements
							new_value={lastWeekArray[lastWeekArray.length - 1]?.terapia_intensiva}
							previous_value={pastWeekArray[pastWeekArray.length - 1]?.terapia_intensiva}
							notice_type="better_lower"
							display_type="percentage"
							show_trending_icon
							extra_classes={"inline-block bg-governor-bay-100 w-auto py-1 px-3 rounded-2xl mt-4 font-bold"}
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div key={"widget-5"} className="text-center text-governor-bay-200 carouselItem">
						<span className="block mb-3 text-7xl font-bold text-white">{Math.round((lastWeekData.nuovi_positivi / popolazione_italiana) * 100000)}%</span>
						incidenza settimanale
						<br /> su <strong className="text-white">100.000</strong> abitanti
						<br />
						<CalculateIncrements
							new_value={Math.round((lastWeekData.nuovi_positivi / popolazione_italiana) * 100000)}
							previous_value={Math.round((pastWeekData.nuovi_positivi / popolazione_italiana) * 100000)}
							notice_type="better_lower"
							display_type="percentage"
							show_trending_icon
							extra_classes={"inline-block bg-governor-bay-100 w-auto py-1 px-3 rounded-2xl mt-4 font-bold"}
						/>
					</div>
				</SwiperSlide>
			</Swiper>

			{/* Custom Pagination Element */}
			<div className="bc19-dots" id="swiper-pagination"></div>
		</>
	)
}

export default SummaryWidgets
