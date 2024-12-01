"use client"

import { Gauge } from "@suyalcinkaya/gauge"

const CircularIndicator = ({
	value,
	size,
	gapPercent,
	strokeWidth,
	variant,
	showValue,
	showAnimation,
	primary,
	secondary,
	props,
	showRawValue,
}) => {
	return (
		<div className="inline-block relative">
			{showRawValue ? (
				<span className="absolute text-white w-full h-full flex items-center justify-center text-lg font-bold">
					{value} %
				</span>
			) : null}
			<Gauge
				value={value}
				size={size}
				gapPercent={gapPercent}
				strokeWidth={strokeWidth}
				variant={variant}
				showValue={showValue}
				showAnimation={showAnimation}
				primary={primary}
				secondary={secondary}
				props={props}
			/>
		</div>
	)
}
export default CircularIndicator
