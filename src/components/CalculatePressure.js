"use client"

const CalculatePressure = ({ actual_value, total_value, pressure_type }) => {
	//Calculate Pressure
	let barStyle = ""
	let barStyleInner = "bg-gray-100"
	let pressure_percentage = Number(
		(actual_value * 100) / total_value
	).toFixed(1)

	if (!isFinite(pressure_percentage)) pressure_percentage = 0

	if (pressure_type == "ti") {
		//Terapie intensive
		if (pressure_percentage < 10) {
			// zona bianca
			barStyle = "bg-gray-300"
			barStyleInner = "bg-gray-100"
		} else if (pressure_percentage >= 10 && pressure_percentage < 20) {
			// zona gialla
			barStyle = "bg-yellow-300"
			barStyleInner = "bg-gray-100"
		} else if (pressure_percentage >= 20 && pressure_percentage < 30) {
			// zona arancione
			barStyle = "bg-yellow-500"
			barStyleInner = "bg-gray-100"
		} else if (pressure_percentage >= 30) {
			// zona rossa
			barStyle = "bg-red-600"
			barStyleInner = "bg-gray-100"
		}
	} else if (pressure_type == "anc") {
		//Ricoveri
		if (pressure_percentage < 15) {
			// zona bianca
			barStyle = "bg-gray-300"
			barStyleInner = "bg-gray-100"
		} else if (pressure_percentage >= 15 && pressure_percentage < 30) {
			// zona gialla
			barStyle = "bg-yellow-300"
			barStyleInner = "bg-gray-100"
		} else if (pressure_percentage >= 30 && pressure_percentage < 40) {
			// zona arancione
			barStyle = "bg-yellow-500"
			barStyleInner = "bg-gray-100"
		} else if (pressure_percentage >= 40) {
			// zona rossa
			barStyle = "bg-red-500"
			barStyleInner = "bg-gray-100"
		}
	} else if (pressure_type == "vax") {
		//Vaccini
		if (pressure_percentage < 50) {
			barStyle = "bg-red-200"
			barStyleInner = "bg-red-100"
		} else if (pressure_percentage >= 50 && pressure_percentage < 90) {
			barStyle = "bg-yellow-500"
			barStyleInner = "bg-yellow-100"
		} else {
			barStyle = "bg-green-500"
			barStyleInner = "bg-green-100"
		}
	}

	//Return output
	return (
		<>
			<div className="flex items-center mx-4">
				<div className="relative w-full">
					<div
						className={
							"overflow-hidden h-2 text-xs flex rounded " +
							barStyleInner
						}
					>
						<div
							style={{ width: pressure_percentage + "%" }}
							className={
								"shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center " +
								barStyle
							}
						></div>
					</div>
				</div>
				<span className="ml-2 text-sm text-gray-500">
					{pressure_percentage}%
				</span>
			</div>
		</>
	)
}

export default CalculatePressure
