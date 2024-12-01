"use client"

import dynamic from "next/dynamic"
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

const SiteGraph = ({ options, series, type, height }) => {
	return (
		<ReactApexChart
			options={options}
			series={series}
			type={type}
			height={height}
		/>
	)
}

export default SiteGraph
