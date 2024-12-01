"use client"

import React from "react"
import {
	ArrowTrendingUpIcon,
	ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline"

const CalculateIncrements = ({
	new_value,
	previous_value,
	notice_type,
	use_light_colors,
	display_type,
	ignore_color_styles,
	show_trending_icon,
	hide_text,
	extra_classes,
}) => {
	//Styling
	const incrementStyles = {
		positiveNotice: "text-sm text-green-700",
		badNotice: "text-sm text-red-700",
	}

	//Trending Icons
	const trendingIconStyles = {
		positiveNotice: "inline h4 w-4 text-green-700",
		badNotice: "inline h4 w-4 text-red-700",
	}

	//Calculate increment
	let valuesDifferenceRaw = 0
	let valuesDifference = 0
	let incrementType = ""
	let trendingIcon = ""
	let differenceSign = ""

	valuesDifferenceRaw = Number(new_value - previous_value)

	if (display_type == "number_increment")
		valuesDifference = Number(new_value - previous_value)
	else if (display_type == "percentage")
		valuesDifference = Number(
			((new_value - previous_value) / previous_value) * 100
		)

	if (!ignore_color_styles) {
		if (notice_type == "better_lower")
			incrementType =
				valuesDifferenceRaw <= 0 ? "positiveNotice" : "badNotice"
		else if (notice_type == "better_higher")
			incrementType =
				valuesDifferenceRaw >= 0 ? "positiveNotice" : "badNotice"

		let extraStyles = use_light_colors ? "Light" : ""
		incrementType = incrementType + extraStyles
	}

	if (show_trending_icon) {
		if (valuesDifference <= 0)
			trendingIcon = (
				<ArrowTrendingDownIcon
					className={trendingIconStyles[incrementType]}
				/>
			)
		else
			trendingIcon = (
				<ArrowTrendingUpIcon
					className={trendingIconStyles[incrementType]}
				/>
			)
	}

	if (!hide_text) differenceSign = valuesDifference <= 0 ? "" : "+"
	else differenceSign = ""

	//Return output
	return (
		<span
			className={
				(extra_classes || null) + " " + incrementStyles[incrementType]
			}
		>
			{differenceSign}
			{!hide_text
				? valuesDifference.toLocaleString("it", {
						minimumFractionDigits: 1,
						maximumFractionDigits: 2,
				  })
				: ""}
			{!hide_text && display_type == "percentage" ? "%" : ""}{" "}
			{trendingIcon}
		</span>
	)

	// {show_trending_icons != '' ? {trendingIcons.[`${incrementType}`]} : ''}
}

export default CalculateIncrements
