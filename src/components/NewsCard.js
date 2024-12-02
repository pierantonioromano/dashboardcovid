"use client"

import dayjs from "dayjs"
import "dayjs/locale/it"
import relativeTime from "dayjs/plugin/relativeTime"

const NewsCard = ({ title, link, image, date, source }) => {
	dayjs.extend(relativeTime)

	return (
		<>
			<div
				className="newsImageLazyLoad h-20 w-20 min-w-20 float-right my-2 mr-4 overflow-hidden rounded-md relative"
				style={{
					backgroundColor: "#d7e7f7",
					backgroundImage: "url(" + image + ")",
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
				}}
			>
				<a
					target="_blank"
					rel="noopener nofollow"
					className="block absolute top-0 left-0 w-full h-full"
					aria-label={title}
					href={link}
				></a>
			</div>

			<div className="flex flex-col justify-center">
				<a
					target="_blank"
					rel="noopener nofollow"
					className="block"
					href={link}
				>
					<h3 className="text-sm lg:text-lg font-bold text-white">
						{title}
					</h3>
				</a>
				<span className="w-full text-xs text-governor-bay-200 mt-1">
					{source + " - " + dayjs(date).locale("it").fromNow()}
				</span>
			</div>
		</>
	)
}
export default NewsCard
