import React, { useState, useEffect } from 'react'
import { useBWForm } from '../utils/useBWForm'
import { useLocalStorage } from '../utils/useLocalStorage'
import BWCalculator from './BWCalculator'
import BWReport from './BWReport'

const BWStats = () => {
	const [saveStats, SetSaveStats] = useLocalStorage('bwStats', {
		data: '',
		updatedDate: Date.now(),
	})

	const [values, handleChange] = useBWForm(
		saveStats.data
			? saveStats.data
			: {
					gender: 'Male',
					age: 0,
					weight: 0,
					height: 0,
					unit: 'Metric',
					activity: 'Sedentary',
			  }
	)

	const [showReport, setShowReport] = useState(false)
	const [bmi, setBMI] = useState(0)
	const [bmiCategory, setBMICategory] = useState('')
	const [bmr, setBMR] = useState(0)
	const [dailyCalories, setDailyCalories] = useState(0)

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
		let bmiCategory = {}
		if (bmi !== 0) {
			if (bmi <= 18.5) {
				bmiCategory.count = '1'
				bmiCategory.value = 'Underweight'
			} else if (bmi <= 24.9) {
				bmiCategory.count = '2'
				bmiCategory.value = 'Normal Weight'
			} else if (bmi <= 29.9) {
				bmiCategory.count = '3'
				bmiCategory.value = 'Overweight'
			} else if (bmi >= 30) {
				bmiCategory.count = '4'
				bmiCategory.value = 'Obesity'
			}
			setBMICategory(bmiCategory)
		}
		return () => {
			setBMICategory({})
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

	const onChangeReport = () => {
		SetSaveStats({
			data: values,
			updatedDate: Date.now(),
		})
		setShowReport(!showReport)
	}

	const onReset = () => {
		SetSaveStats({
			data: '',
			updatedDate: Date.now(),
		})
		console.log('Reset')
	}

	return (
		<div
			className='containerExercise d-flex flex-column justify-content-start'
			style={{ minHeight: '90vh', width: 'auto' }}
		>
			{!showReport && (
				<BWCalculator
					values={values}
					handleChange={handleChange}
					onSubmit={onChangeReport}
					onReset={onReset}
				/>
			)}
			{showReport && (
				<BWReport
					bmi={bmi}
					bmiCategory={bmiCategory}
					bmr={bmr}
					dailyCalories={dailyCalories}
					activity={values.activity}
					onBack={onChangeReport}
				/>
			)}
		</div>
	)
}

export default BWStats
