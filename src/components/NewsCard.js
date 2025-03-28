"use client"

const dayjs = require("dayjs")
const dajysLocale = require("dayjs/locale/it")
//const relativeTime = require("dayjs/plugin/relativeTime")
//dayjs.extend(relativeTime)
dayjs.locale("it") // use locale globally

const NewsCard = ({ title, link, image, date, source }) => {
	return (
		<>
			<div
				className="newsImageLazyLoad w-12 h-12 min-w-12 lg:h-20 lg:w-20 lg:min-w-20 float-right my-2 mr-4 overflow-hidden rounded-md relative"
				style={{
					backgroundColor: "#d7e7f7",
					backgroundImage: "url(" + image + ")",
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat"
				}}
			>
				<a target="_blank" rel="noopener nofollow" className="block absolute top-0 left-0 w-full h-full" aria-label={title} href={link}></a>
			</div>

			<div className="flex flex-col justify-center">
				<a target="_blank" rel="noopener nofollow" className="block" href={link}>
					<h3 className="text-base lg:text-lg font-bold text-white">{title}</h3>
				</a>
				<span className="w-full text-sm text-governor-bay-200 mt-1" suppressHydrationWarning>
					{source + " - " + dayjs(date).locale("it").format("D MMMM YYYY")}
				</span>
			</div>
		</>
	)
}
export default NewsCard
