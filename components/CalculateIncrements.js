import React from 'react';
import { TrendingUpIcon, TrendingDownIcon } from '@heroicons/react/outline'

class CalculateIncrements extends React.Component {

	constructor(props){
		super(props);
	}

	render() {

		//Styling
		const incrementStyles = {
			positiveNotice: 'text-sm text-green-500',
			badNotice: 'text-sm text-red-500' 
		}

		//Trending Icons
		const trendingIconStyles = {
			positiveNotice: 'inline h4 w-4 text-green-500',
			badNotice: 'inline h4 w-4 text-red-500'
		}

		//Calculate increment
		let valuesDifferenceRaw = 0;
		let valuesDifference = 0;
		let incrementType = '';
		let trendingIcon = '';
		let differenceSign = '';

		valuesDifferenceRaw = Number(this.props.new_value - this.props.previous_value);

		if(this.props.display_type == 'number_increment')
			valuesDifference = Number(this.props.new_value - this.props.previous_value);
		else if(this.props.display_type == 'percentage')
			valuesDifference = Number(((this.props.new_value - this.props.previous_value)/this.props.previous_value)*100);

		if(!this.props.ignore_color_styles)
		{
			if(this.props.notice_type == 'better_lower')
				incrementType = valuesDifferenceRaw <= 0 ? 'positiveNotice' : 'badNotice';
			else if(this.props.notice_type == 'better_higher')
				incrementType = valuesDifferenceRaw >= 0 ? 'positiveNotice' : 'badNotice';

			let extraStyles = (this.props.use_light_colors) ? 'Light' : '';
			incrementType = incrementType + extraStyles;
		}

		if(this.props.show_trending_icon)
		{
			if(valuesDifference <= 0)
				trendingIcon = <TrendingDownIcon className={trendingIconStyles[incrementType]} />
			else
				trendingIcon = <TrendingUpIcon className={trendingIconStyles[incrementType]} />
		}

		if(!this.props.hide_text)
			differenceSign = valuesDifference <= 0 ? '' : '+';
		else
			differenceSign = '';

		//Return output
		return (
			<span className={incrementStyles[incrementType]}>{differenceSign}{ !this.props.hide_text ? valuesDifference.toLocaleString('it', { minimumFractionDigits: 1, maximumFractionDigits: 2 }) : ''}{!this.props.hide_text && this.props.display_type == 'percentage' ? '%' : ''} {trendingIcon}</span>
		);
	}
	// {this.props.show_trending_icons != '' ? {trendingIcons.[`${incrementType}`]} : ''}
}

export default CalculateIncrements;