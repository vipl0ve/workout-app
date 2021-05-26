import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import ExternalLink from '../utils/ExternalLink'

const calculateMacro = (calories) => {
	const moderateCarb = {
		protein: ((calories * 0.3) / 4).toFixed(0),
		fats: ((calories * 0.35) / 9).toFixed(0),
		carbs: ((calories * 0.35) / 4).toFixed(0),
	}
	const lowCarb = {
		protein: ((calories * 0.4) / 4).toFixed(0),
		fats: ((calories * 0.4) / 9).toFixed(0),
		carbs: ((calories * 0.2) / 4).toFixed(0),
	}

	const highCarb = {
		protein: ((calories * 0.3) / 4).toFixed(0),
		fats: ((calories * 0.2) / 9).toFixed(0),
		carbs: ((calories * 0.5) / 4).toFixed(0),
	}
	const dailyMacro = {
		moderateCarb,
		lowCarb,
		highCarb,
	}
	return dailyMacro
}

const updateCalories = (ref, calories) => {
	if (ref === '#maintenance') {
		return calories
	} else if (ref === '#cutting') {
		return calories - 500
	} else if (ref === '#bulking') {
		return parseInt(calories) + 500
	}
}

const BWStats = ({
	bmi,
	bmiCategory,
	idealWeight,
	bmr,
	dailyCalories,
	activity,
	onBack,
}) => {
	const [calories, setCalories] = useState(dailyCalories)
	const [dailyMacro, setDailyMarco] = useState(calculateMacro(calories))

	// update BMI list-group-item
	useEffect(() => {
		$('#bmiScore .list-group-item').removeClass(
			'active bg-custom-color5 text-custom-color1'
		)
		$(`#bmiScore li:nth-child(${bmiCategory.count})`)
			.removeClass('bg-custom-color2 text-custom-color5')
			.addClass('active bg-custom-color5 text-custom-color1')
		return () => {
			$('#bmiScore .list-group-item').removeClass(
				'active bg-custom-color5 text-custom-color1'
			)
		}
	}, [bmiCategory.count])

	// update Cal list-group-item
	useEffect(() => {
		$('#calScore .list-group-item').removeClass(
			'active bg-custom-color5 text-custom-color1'
		)
		if (activity === 'Sedentary') {
			$('#calScore li:nth-child(2)')
				.removeClass('bg-custom-color2 text-custom-color5')
				.addClass('active bg-custom-color5 text-custom-color1')
		} else if (activity === 'Light Exercise') {
			$('#calScore li:nth-child(3)')
				.removeClass('bg-custom-color2 text-custom-color5')
				.addClass('active bg-custom-color5 text-custom-color1')
		} else if (activity === 'Moderate Exercise') {
			$('#calScore li:nth-child(4)')
				.removeClass('bg-custom-color2 text-custom-color5')
				.addClass('active bg-custom-color5 text-custom-color1')
		} else if (activity === 'Heavy Exercise') {
			$('#calScore li:nth-child(5)')
				.removeClass('bg-custom-color2 text-custom-color5')
				.addClass('active bg-custom-color5 text-custom-color1')
		} else if (activity === 'Athlete') {
			$('#calScore li:nth-child(6)')
				.removeClass('bg-custom-color2 text-custom-color5')
				.addClass('active bg-custom-color5 text-custom-color1')
		}

		return () => {
			$('#calScore li').removeClass(
				'active bg-custom-color5 text-custom-color1'
			)
		}
	}, [activity])

	// update DailyMacro when calories updated
	useEffect(() => {
		setDailyMarco(calculateMacro(calories))
		return () => {
			setDailyMarco({})
		}
	}, [calories])

	// handleClick
	const handleNavClick = (e) => {
		e.preventDefault()
		$('#nav-tab .nav-item').removeClass('active bg-custom-color3')
		$(e.target).addClass('active bg-custom-color3')
		setCalories(updateCalories(e.target.getAttribute('href'), dailyCalories))
	}

	return (
		<>
			<div className='mx-3 my-2'>
				<h4 className='text-center text-custom-color6'>Body Weight Report</h4>
				<hr />
				<div className='text-custom-color6'>
					<h5>BMI Score:</h5>
					<p className='text-justify'>
						BMI stands for Body Mass Index. Your current BMI is <b>{bmi}</b>.
						Based on your BMI, you are in <b>{bmiCategory.value}</b> category.
					</p>
					<div className='row mb-3'>
						<ul id='bmiScore' className='list-group'>
							<li className='list-group-item bg-custom-color2 text-custom-color5 d-flex justify-content-between active'>
								<span className=''>18.5 or less</span>
								<span className=''>Underweight</span>
							</li>
							<li className='list-group-item bg-custom-color2 text-custom-color5 d-flex justify-content-between'>
								<span className=''>18.5 – 24.99</span>
								<span className=''>Normal Weight</span>
							</li>
							<li className='list-group-item bg-custom-color2 text-custom-color5 d-flex justify-content-between'>
								<span className=''>25 – 29.99</span>
								<span className=''>Overweight</span>
							</li>
							<li className='list-group-item bg-custom-color2 text-custom-color5 d-flex justify-content-between'>
								<span className=''>30+</span>
								<span className=''>Obese</span>
							</li>
						</ul>
					</div>
				</div>
				<hr />
				<div className='text-custom-color6'>
					<h5>Ideal Weight:</h5>
					<p className='text-justify'>
						Estimate ideal weight are not perfect and may show lower results for
						people with high muscle mass (and lean body mass). Ideal body weight
						calculator uses four different formulas to find your ideal weight.
					</p>
					<div className='row mb-3'>
						<ul id='idealWeight' className='list-group'>
							<li className='list-group-item bg-custom-color2 text-custom-color5 d-flex justify-content-between'>
								<span className=''>Hamwi Formula (1964)</span>
								<span className=''>{idealWeight.hamwi}</span>
							</li>
							<li className='list-group-item bg-custom-color2 text-custom-color5 d-flex justify-content-between'>
								<span className=''>Devine Formula (1974)</span>
								<span className=''>{idealWeight.devine}</span>
							</li>
							<li className='list-group-item bg-custom-color2 text-custom-color5 d-flex justify-content-between'>
								<span className=''>Robinson Formula (1983)</span>
								<span className=''>{idealWeight.robinson}</span>
							</li>
							<li className='list-group-item bg-custom-color2 text-custom-color5 d-flex justify-content-between'>
								<span className=''>Miller Formula (1983)</span>
								<span className=''>{idealWeight.miller}</span>
							</li>
						</ul>
					</div>
				</div>
				<hr />
				<div className='text-custom-color6'>
					<h5>TDDE Score:</h5>
					<p className='text-justify'>
						Your estimated BMR is <b>{bmr} calories</b> and Total Daily Energy
						Expenditure(TDDE) is <b>{dailyCalories} calories</b>. The table
						below shows TDDE based on different activity level.
					</p>
					<div className='row mb-3'>
						<ul id='calScore' className='list-group'>
							<li className='list-group-item bg-custom-color2 text-custom-color5 d-flex justify-content-between active'>
								<span className=''>Basal Metabolic Rate</span>
								<span className=''>
									{bmr}
									<small> Calories Daily</small>
								</span>
							</li>
							<li className='list-group-item bg-custom-color2 text-custom-color5 d-flex justify-content-between'>
								<span className=''>Sedentary</span>
								<span className=''>
									{(bmr * 1.2).toFixed(0)}
									<small> Calories Daily</small>
								</span>
							</li>
							<li className='list-group-item bg-custom-color2 text-custom-color5 d-flex justify-content-between'>
								<span className=''>Light Exercise</span>
								<span className=''>
									{(bmr * 1.375).toFixed(0)}
									<small> Calories Daily</small>
								</span>
							</li>
							<li className='list-group-item bg-custom-color2 text-custom-color5 d-flex justify-content-between'>
								<span className=''>Moderate Exercise</span>
								<span className=''>
									{(bmr * 1.55).toFixed(0)}
									<small> Calories Daily</small>
								</span>
							</li>
							<li className='list-group-item bg-custom-color2 text-custom-color5 d-flex justify-content-between'>
								<span className=''>Heavy Exercise</span>
								<span className=''>
									{(bmr * 1.725).toFixed(0)}
									<small> Calories Daily</small>
								</span>
							</li>
							<li className='list-group-item bg-custom-color2 text-custom-color5 d-flex justify-content-between'>
								<span className=''>Athlete</span>
								<span className=''>
									{(bmr * 1.9).toFixed(0)}
									<small> Calories Daily</small>
								</span>
							</li>
						</ul>
					</div>
				</div>
				<hr />
				<div className='text-custom-color6'>
					<h5>Macronutrients:</h5>
					<p className='text-justify'>
						Macronutrient is calculated based on your diet and daily calories
						requirements. The table below shows macronutrient values based on
						different types of diets and calories requirements.
					</p>
					<nav className='nav nav-justified border-bottom border-custom-color5'>
						<div
							className='nav nav-tabs'
							onClick={handleNavClick}
							id='nav-tab'
							role='tablist'
						>
							<button
								className='nav-item nav-link active bg-custom-color3 text-custom-color6'
								id='maintenance-tab'
								data-toggle='tab'
								role='tab'
								href='#maintenance'
								aria-controls='maintenance'
								aria-selected='true'
							>
								Maintenance
							</button>
							<button
								className='nav-item nav-link text-custom-color6'
								id='cutting-tab'
								data-toggle='tab'
								role='tab'
								href='#cutting'
								aria-controls='cutting'
								aria-selected='false'
							>
								Cutting
							</button>
							<button
								className='nav-item nav-link text-custom-color6'
								id='bulking-tab'
								data-toggle='tab'
								href='#bulking'
								role='tab'
								aria-controls='bulking'
								aria-selected='false'
							>
								Bulking
							</button>
						</div>
					</nav>
					<div className='row'>
						<p className='text-center text-color-custom5 pt-3'>
							Daily Calories Required: <b>{calories} Calories</b>
						</p>
					</div>
					<div className='row row-cols-1 row-cols-md-3 g-1'>
						<div className='col'>
							<div className='card h-80 text-center'>
								<div className='card-body bg-custom-color2'>
									<p className='card-title'>
										<ins>Moderate Carb (30/35/35)</ins>
									</p>
									<p className='card-text'>
										Protein: <b>{dailyMacro.moderateCarb.protein}g</b>
									</p>
									<p className='card-text'>
										Fats: <b>{dailyMacro.moderateCarb.fats}g</b>
									</p>
									<p className='card-text'>
										Carbs: <b>{dailyMacro.moderateCarb.carbs}g</b>
									</p>
								</div>
							</div>
						</div>
						<div className='col'>
							<div className='card h-80 text-center'>
								<div className='card-body bg-custom-color2'>
									<p className='card-title'>
										<ins>Lower Carb (40/40/20)</ins>
									</p>
									<p className='card-text'>
										Protein: <b>{dailyMacro.lowCarb.protein}g</b>
									</p>
									<p className='card-text'>
										Fats: <b>{dailyMacro.lowCarb.fats}g</b>
									</p>
									<p className='card-text'>
										Carbs: <b>{dailyMacro.lowCarb.carbs}g</b>
									</p>
								</div>
							</div>
						</div>
						<div className='col'>
							<div className='card h-80 text-center'>
								<div className='card-body bg-custom-color2'>
									<p className='card-title'>
										<ins>Higher Carb (30/20/50)</ins>
									</p>
									<p className='card-text'>
										Protein: <b>{dailyMacro.highCarb.protein}g</b>
									</p>
									<p className='card-text'>
										Fats: <b>{dailyMacro.highCarb.fats}g</b>
									</p>
									<p className='card-text'>
										Carbs: <b>{dailyMacro.highCarb.carbs}g</b>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='text-custom-color4 py-2'>
					<small className='text-justify text-muted'>
						Note: 30/35/35 means 30% protein, 35% fats, 35% carbs. Also, both
						protein and carbs has 4 calories per gram and fats has 9 calories
						per gram.
					</small>
				</div>
				<div className='d-flex flex-row justify-content-between align-items-start'>
					<button className='btn btn-custom-color4' onClick={onBack}>
						Back
					</button>
					<ExternalLink
						url='https://tdeecalculator.net/'
						title='Click for More Info'
					/>
				</div>
			</div>
		</>
	)
}

export default BWStats
