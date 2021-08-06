import React, { Component } from 'react';

class CalculatePressure extends React.Component {

	constructor(props){
		super(props);
	}

	render() {

		//Calculate Pressure
		let barStyle = '';
		let barStyleInner = 'bg-gray-100';
		let pressure_percentage = Math.round(this.props.actual_value * 100 / this.props.total_value);

		if(this.props.pressure_type == 'ti')
		{
			//Terapie intensive
			if(pressure_percentage < 10)
			{
				barStyle = "bg-yellow-200";
				barStyleInner = "bg-yellow-100";
			}
			else if(pressure_percentage >= 10 && pressure_percentage < 30)
			{
				barStyle = "bg-yellow-500";
				barStyleInner = "bg-yellow-100";
			}
			else
			{
				barStyle = "bg-red-300";
				barStyleInner = "bg-red-100";
			}
		}
		else if(this.props.pressure_type == 'anc')
		{
			//Ricoveri
			if(pressure_percentage < 15)
			{
				barStyle = "bg-yellow-200";
				barStyleInner = "bg-yellow-100";
			}
			else if(pressure_percentage >= 15 && pressure_percentage < 40)
			{
				barStyle = "bg-yellow-500";
				barStyleInner = "bg-yellow-100";
			}
			else
			{
				barStyle = "bg-red-500";
				barStyleInner = "bg-red-100";
			}	
		}
		else if(this.props.pressure_type == 'vax')
		{
			//Ricoveri
			if(pressure_percentage < 50)
			{
				barStyle = "bg-red-200";
				barStyleInner = "bg-red-100";
			}
			else if(pressure_percentage >= 50 && pressure_percentage < 90)
			{
				barStyle = "bg-yellow-500";
				barStyleInner = "bg-yellow-100";
			}
			else
			{
				barStyle = "bg-green-500";
				barStyleInner = "bg-green-100";
			}	
		}

		//Return output
		return (
			<>
				<div className="flex items-center mx-4">
					<div className="relative w-full">
						<div className={"overflow-hidden h-2 text-xs flex rounded " + barStyleInner}>
							<div style={{ width: pressure_percentage + '%'}} className={"shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center " + barStyle}>
							</div>
						</div>
					</div>
					<span className="ml-2 text-sm text-gray-500">{pressure_percentage}%</span>
				</div>
			</>
		
		);
	}
}

//	<span className={incrementStyles.[`${incrementType}`]}>{valuesDifference <= 0 ? '' : '+'}{valuesDifference.toLocaleString('it', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}{this.props.display_type == 'percentage' ? '%' : ''} {trendingIcon}</span>

export default CalculatePressure;