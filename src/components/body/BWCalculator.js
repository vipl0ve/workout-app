import React, { useState, useEffect } from 'react'
import ExternalLink from '../utils/ExternalLink'
import { useBWForm } from './useBWForm'

const BWCalculator = () => {
	const [values, handleChange] = useBWForm({
		gender: 'Male',
		age: 0,
		weight: 0,
		height: 0,
		unit: 'Metric',
		activity: 'Sedentary',
	})
	const [bmi, setBMI] = useState(0)
	const [bmiCategory, setBMICategory] = useState('')
	const [bmr, setBMR] = useState(0)
	const [dailyCalories, setDailyCalories] = useState(0)

	//console.log(values)

	const onSubmit = () => {
		console.log(values)
	}

	useEffect(() => {
		if (values.height !== 0 && values.weight !== 0) {
			let h = 0,
				w = 0,
				bmi = 0
			if (values.unit === 'Metric') {
				h = values.height
				w = values.weight
			} else if (values.unit === 'Imperial') {
				h = values.height * 2.54
				w = values.weight / 2.2
			}
			bmi = ((w / (h * h)) * 10000).toFixed(1)
			setBMI(bmi)
		}
		return () => {
			setBMI(0)
		}
	}, [values.height, values.weight, values.unit])

	useEffect(() => {
		let bmiCategory = ''
		if (bmi !== 0) {
			if (bmi <= 18.5) {
				bmiCategory = 'Underweight'
			} else if (bmi <= 24.9) {
				bmiCategory = 'Normal Weight'
			} else if (bmi <= 29.9) {
				bmiCategory = 'Overweight'
			} else if (bmi >= 30) {
				bmiCategory = 'Obesity'
			}
			setBMICategory(bmiCategory)
		}
		return () => {
			setBMICategory('')
		}
	}, [bmi])

	useEffect(() => {
		if (values.height !== 0 && values.weight !== 0 && values.age !== 0) {
			let h = 0,
				w = 0,
				bmr = 0
			if (values.unit === 'Metric') {
				h = values.height
				w = values.weight
			} else if (values.unit === 'Imperial') {
				h = values.height * 2.54
				w = values.weight / 2.2
			}
			if (values.gender === 'Male') {
				bmr = h * 6.25 + w * 9.99 - values.age * 4.92 + 5
			} else if (values.gender === 'Female') {
				bmr = h * 6.25 + w * 9.99 - values.age * 4.92 - 161
			}
			setBMR(bmr.toFixed(0))
		}
		return () => {
			setBMR(0)
		}
	}, [values.height, values.weight, values.age, values.gender, values.unit])

	useEffect(() => {
		if (bmr !== 0) {
			let dailyCalories = 0
			if (values.activity === 'Sedentary') {
				dailyCalories = bmr * 1.2
			} else if (values.activity === 'Light Exercise') {
				dailyCalories = bmr * 1.375
			} else if (values.activity === 'Moderate Exercise') {
				dailyCalories = bmr * 1.55
			} else if (values.activity === 'Heavy Exercise') {
				dailyCalories = bmr * 1.725
			} else if (values.activity === 'Athlete') {
				dailyCalories = bmr * 1.9
			}
			setDailyCalories(dailyCalories.toFixed(0))
			return () => {
				setDailyCalories(0)
			}
		}
	}, [bmr, values.activity])

	return (
		<div>
			<form
				className='bg-custom-color2 border border-custom-color3 border-5 rounded p-3'
				onSubmit={onSubmit}
			>
				<div className='form-row'>
					<div className='form-group mb-2'>
						<div className='input-group col-12'>
							<span className='input-group-text col-4 bg-custom-color2 border-custom-color3'>
								Gender
							</span>
							<select
								name='gender'
								className='form-control bg-custom-color4 border-custom-color3'
								required
								value={values.gender}
								onChange={handleChange}
							>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
							</select>
						</div>
					</div>
					<div className='form-group mb-2'>
						<div className='input-group col-12'>
							<span className='input-group-text col-4 bg-custom-color2 border-custom-color3'>
								Age
							</span>
							<input
								type='number'
								name='age'
								className='form-control bg-custom-color4 border-custom-color3'
								required
								placeholder='Add Age'
								value={values.age}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className='form-group mb-2'>
						<div className='input-group col-12'>
							<span className='input-group-text col-4 bg-custom-color2 border-custom-color3'>
								Unit
							</span>
							<select
								name='unit'
								className='form-control bg-custom-color4 border-custom-color3'
								required
								value={values.unit}
								onChange={handleChange}
							>
								<option value='Metric'>Metric</option>
								<option value='Imperial'>Imperial</option>
							</select>
						</div>
					</div>
					<div className='form-group mb-2'>
						<div className='input-group col-12'>
							<span className='input-group-text col-4 bg-custom-color2 border-custom-color3'>
								Weight({values.unit === 'Metric' ? 'kgs' : 'lbs'})
							</span>
							<input
								type='number'
								name='weight'
								className='form-control bg-custom-color4 border-custom-color3'
								required
								placeholder='Add Weight'
								value={values.weight}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className='form-group mb-2'>
						<div className='input-group col-12'>
							<span className='input-group-text col-4 bg-custom-color2 border-custom-color3'>
								Height({values.unit === 'Metric' ? 'cms' : 'ins'})
							</span>
							<input
								type='number'
								name='height'
								className='form-control bg-custom-color4 border-custom-color3'
								required
								placeholder='Add Height'
								value={values.height}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className='form-group mb-2'>
						<div className='input-group col-12'>
							<span className='input-group-text col-4 bg-custom-color2 border-custom-color3'>
								Activity
							</span>
							<select
								name='activity'
								className='form-control bg-custom-color4 border-custom-color3'
								required
								value={values.activity}
								onChange={handleChange}
							>
								<option value='Sedentary'>Sedentary</option>
								<option value='Light Exercise'>Light Exercise</option>
								<option value='Moderate Exercise'>Moderate Exercise</option>
								<option value='Heavy Exercise'>Heavy Exercise</option>
								<option value='Athlete'>Athlete</option>
							</select>
						</div>
					</div>
					<hr />
					<h5 className='text-center text-custom-color6'>Body Weight Report</h5>
					<hr />
					<div className='form-group mb-3'>
						<div className='input-group col-12'>
							<span className='input-group-text col-9 bg-custom-color2 border-custom-color3'>
								Body Mass Index (BMI)
							</span>
							<span className='input-group-text col-3 bg-custom-color2 border-custom-color3'>
								{bmi}
							</span>
						</div>
						<div className='input-group col-12'>
							<span className='input-group-text col-12 bg-custom-color2 border-custom-color3'>
								BMI Score: {bmiCategory}
							</span>
						</div>
					</div>
					<div className='form-group mb-3'>
						<div className='input-group col-12'>
							<span className='input-group-text col-9 bg-custom-color2 border-custom-color3'>
								Basal Metabolic Rate (BMR)
							</span>
							<span className='input-group-text col-3 bg-custom-color2 border-custom-color3'>
								{bmr}
							</span>
						</div>
						<div className='input-group col-12'>
							<span className='input-group-text col-9 bg-custom-color2 border-custom-color3'>
								Daily Maintenance Calories
							</span>
							<span className='input-group-text col-3 bg-custom-color2 border-custom-color3'>
								{dailyCalories}
							</span>
						</div>
						<div className='input-group col-12'>
							<span className='input-group-text col-9 bg-custom-color2 border-custom-color3'>
								Daily Cutting Calories(-500)
							</span>
							<span className='input-group-text col-3 bg-custom-color2 border-custom-color3'>
								{dailyCalories === 0 ? 0 : dailyCalories - 500}
							</span>
						</div>
						<div className='input-group col-12'>
							<span className='input-group-text col-9 bg-custom-color2 border-custom-color3'>
								Daily Bulking Calories(+500)
							</span>
							<span className='input-group-text col-3 bg-custom-color2 border-custom-color3'>
								{dailyCalories === 0 ? 0 : parseInt(dailyCalories) + 500}
							</span>
						</div>
					</div>
				</div>
				<div className='float-right'>
					<ExternalLink
						url='https://tdeecalculator.net/'
						title='Click for More Info'
					/>
				</div>
			</form>
		</div>
	)
}

export default BWCalculator
