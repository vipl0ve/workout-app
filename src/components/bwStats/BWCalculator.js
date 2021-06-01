import React from 'react'
import PageHeader from '../layout/PageHeader'

const BWCalculator = ({ values, handleChange, onSubmit, onReset }) => {
	return (
		<>
			<form className='bg-custom-color2 border border-custom-color3 border-5 rounded p-3'>
				<PageHeader text='Body Weight Calculator' />
				<div className='form-row'>
					<div className='form-group mb-2'>
						<div className='input-group col-12'>
							<span className='input-group-text col-4 bg-custom-color2 border-custom-color3 text-custom-color6'>
								Gender
							</span>
							<select
								name='gender'
								className='form-control bg-custom-color4 border-custom-color3 text-custom-color1'
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
							<span className='input-group-text col-4 bg-custom-color2 border-custom-color3 text-custom-color6'>
								Age
							</span>
							<input
								type='number'
								name='age'
								className='form-control bg-custom-color4 border-custom-color3 text-custom-color1'
								required
								placeholder='Add Age'
								value={values.age}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className='form-group mb-2'>
						<div className='input-group col-12'>
							<span className='input-group-text col-4 bg-custom-color2 border-custom-color3 text-custom-color6'>
								Unit
							</span>
							<select
								name='unit'
								className='form-control bg-custom-color4 border-custom-color3 text-custom-color1'
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
							<span className='input-group-text col-4 bg-custom-color2 border-custom-color3 text-custom-color6'>
								Weight({values.unit === 'Metric' ? 'kgs' : 'lbs'})
							</span>
							<input
								type='number'
								name='weight'
								className='form-control bg-custom-color4 border-custom-color3 text-custom-color1'
								required
								placeholder='Add Weight'
								value={values.weight}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className='form-group mb-2'>
						<div className='input-group col-12'>
							<span className='input-group-text col-4 bg-custom-color2 border-custom-color3 text-custom-color6'>
								Height({values.unit === 'Metric' ? 'cms' : 'ins'})
							</span>
							<input
								type='number'
								name='height'
								className='form-control bg-custom-color4 border-custom-color3 text-custom-color1'
								required
								placeholder='Add Height'
								value={values.height}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className='form-group mb-2'>
						<div className='input-group col-12'>
							<span className='input-group-text col-4 bg-custom-color2 border-custom-color3 text-custom-color6'>
								Activity
							</span>
							<select
								name='activity'
								className='form-control bg-custom-color4 border-custom-color3 text-custom-color1'
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
					<div className='d-flex justify-content-around align-items-center mt-3'>
						<button
							className='btn btn-custom-color5 text-custom-color1'
							type='button'
							onClick={onReset}
						>
							Reset
						</button>
						<button
							className='btn btn-custom-color5 text-custom-color1'
							type='button'
							onClick={onSubmit}
						>
							Calculate
						</button>
					</div>
				</div>
			</form>
		</>
	)
}

export default BWCalculator
